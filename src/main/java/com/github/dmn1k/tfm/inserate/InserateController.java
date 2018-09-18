package com.github.dmn1k.tfm.inserate;

import com.github.dmn1k.tfm.Constants;
import com.github.dmn1k.tfm.mail.Email;
import com.github.dmn1k.tfm.mail.EmailService;
import com.github.dmn1k.tfm.security.Account;
import com.github.dmn1k.tfm.security.AccountRepository;
import com.github.dmn1k.tfm.security.Role;
import com.github.dmn1k.tfm.security.VermittlerRepository;
import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import com.google.common.collect.Sets;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.Response;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@RestController
public class InserateController {
    private static final Multimap<Role, InseratStatus> VISIBLE_STATUSES_PER_ROLE = HashMultimap.create();

    static {
        VISIBLE_STATUSES_PER_ROLE.putAll(Role.VERMITTLER, EnumSet.allOf(InseratStatus.class));
        VISIBLE_STATUSES_PER_ROLE.put(Role.INTERESSENT, InseratStatus.AKTIV);
        VISIBLE_STATUSES_PER_ROLE.putAll(Role.ADMIN, Sets.difference(EnumSet.allOf(InseratStatus.class), Sets.newHashSet(InseratStatus.VERMITTELT)));
    }

    private final InserateRepository repository;
    private final EmailService emailService;
    private final AccountRepository accountRepository;
    private final VermittlerRepository vermittlerRepository;

    @GetMapping("/api/inserate")
    public ResponseEntity<?> loadInserate(@QuerydslPredicate(root = Inserat.class) Predicate predicate,
                                          @RequestParam(value = "alterVon", required = false) Integer alterVon,
                                          @RequestParam(value = "alterBis", required = false) Integer alterBis,
                                          @RequestParam(value = "reinrassig", required = false) Boolean reinrassig,
                                          Pageable pageable) {
        List<Predicate> predicates = new ArrayList<>();

        if (predicate != null) {
            predicates.add(predicate);
        }

        Optional<Account> account = getLoggedInAccount();
        List<InseratStatus> relevantStatuses = getRelevantStatuses(account);

        if (!relevantStatuses.isEmpty()) {
            predicates.add(QInserat.inserat.status.in(relevantStatuses));
        }

        account.filter(a -> a.getRoles().contains(Role.VERMITTLER))
            .map(Account::getUsername)
            .map(QInserat.inserat.vermittler::eq)
            .ifPresent(predicates::add);

        if (alterVon != null) {
            predicates.add(QInserat.inserat.alter.goe(alterVon));
        }

        if (alterBis != null) {
            predicates.add(QInserat.inserat.alter.loe(alterBis));
        }

        if (reinrassig != null) {
            predicates.add(QInserat.inserat.rassenFreitext.isNull()
                .or(QInserat.inserat.rassenFreitext.isEmpty()));
        }

        BooleanExpression completePredicate = Expressions.allOf(predicates.stream()
            .map(Expressions::asBoolean)
            .toArray(BooleanExpression[]::new));

        Page<InseratUebersicht> result = repository.findAll(completePredicate, pageable)
            .map(Inserat::toUebersicht);
        return ResponseEntity.ok(result);
    }

    private Optional<Account> getLoggedInAccount() {
        return getLoggedInUser()
                .map(User::getUsername)
                .flatMap(accountRepository::findByUsername);
    }

    private List<InseratStatus> getRelevantStatuses(Optional<Account> account) {
        return account
                .map(Account::getRoles)
                .orElse(Sets.newHashSet(Role.INTERESSENT)).stream() // Anonyme Nutzer dürfen alle Inserate sehen, die ein angemeldeter Interessent sehen darf
                .flatMap(r -> VISIBLE_STATUSES_PER_ROLE.get(r).stream())
                .collect(Collectors.toList());
    }

    @GetMapping("/api/inserate/{id}")
    public ResponseEntity<?> loadInserat(@PathVariable long id) {
        return repository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @DeleteMapping("/api/inserate/{id}")
    public ResponseEntity<?> deleteInserat(@PathVariable long id) {
        Inserat inserat = getLoggedInUser()
            .map(User::getUsername)
            .flatMap(accountRepository::findByUsername)
            .flatMap(u -> repository.findById(id)
                .filter(i -> u.getRoles().contains(Role.ADMIN) || i.getVermittler().equals(u.getUsername())))
            .filter(Inserat::isLoeschbar)
            .orElseThrow(() -> new IllegalStateException("Inserat kann nicht gelöscht werden!"));

        repository.delete(inserat);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/inserate")
    public ResponseEntity<?> createInserat(@RequestBody Inserat inserat) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> vermittlerRepository.findByUsername(u.getUsername()))
            .map(vermittler -> inserat.toBuilder()
                .vermittler(vermittler.getUsername())
                .bundesland(vermittler.getBundesland())
                .plz(vermittler.getPlz())
                .ort(vermittler.getOrt())
                .organisation(vermittler.getOrganisation())
                .created(LocalDate.now())
                .lastUpdate(LocalDate.now())
                .status(InseratStatus.ENTWURF)
                .build())
            .orElseThrow(() -> new IllegalStateException("Nur Vermittler koennen Inserate erstellen!"));

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/api/inserate/{id}")
    public ResponseEntity<?> updateInserat(@PathVariable long id, @RequestBody Inserat inserat) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getVermittler().equals(u.getUsername())))
            .map(i -> inserat.toBuilder()
                .id(id)
                .lastUpdate(LocalDate.now())
                .build())
            .orElseThrow(() -> new IllegalStateException("Inserat existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/api/inserate/{id}/publish")
    public ResponseEntity<?> publishInserat(@PathVariable long id, @RequestBody Inserat inserat) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getVermittler().equals(u.getUsername())))
            .filter(Inserat::isEditierbar)
            .map(i -> inserat.toBuilder()
                .id(id)
                .lastUpdate(LocalDate.now())
                .status(InseratStatus.AKTIV)
                .build())
            .orElseThrow(() -> new IllegalStateException("Inserat existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/api/inserate/{id}/close")
    public ResponseEntity<?> closeInserat(@PathVariable long id,
                                          @RequestBody Inserat inserat,
                                          HttpServletRequest request) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getVermittler().equals(u.getUsername())))
            .filter(Inserat::isVermittelbar)
            .map(i -> i.toBuilder()
                .storyschreiber(inserat.getStoryschreiber())
                .lastUpdate(LocalDate.now())
                .status(InseratStatus.VERMITTELT)
                .build())
            .orElseThrow(() -> new IllegalStateException("Inserat existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        if (updatedInserat.getStoryschreiber() != null
            && !updatedInserat.getStoryschreiber().isEmpty()) {
            sendStoryschreiberEmail(request, updatedInserat);
        }

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    private void sendStoryschreiberEmail(HttpServletRequest request, Inserat inserat) {
        Optional<Account> account = accountRepository.findByUsername(inserat.getStoryschreiber());

        String url = MessageFormat.format("{0}://{1}:{2}/#/login", request.getScheme(),
            request.getServerName(), String.valueOf(request.getServerPort()));
        String message = MessageFormat.format("<a href=\"{0}\">Loggen Sie sich ein und schreiben Sie eine Story über Ihren neuen Hund!</a><br/><br/><strong>{1}</strong>",
            url, Constants.STUDIENPROJEKT_DISCLAIMER);

        if (account.isPresent()) {
            if(!account.get().getRoles().contains(Role.INTERESSENT)){
                throw new IllegalStateException("Account existiert ist aber kein Interessent");
            }

            url = MessageFormat.format("{0}://{1}:{2}/#/interessent/register", request.getScheme(),
                request.getServerName(), String.valueOf(request.getServerPort()));
            message = MessageFormat.format("<a href=\"{0}\">Registrieren Sie sich bei Tier-Fair-Mittlung und schreiben Sie eine Story über Ihren neuen Hund!</a><br/><br/><strong>{1}</strong>",
                url, Constants.STUDIENPROJEKT_DISCLAIMER);
        }

        emailService.send(Email.builder()
            .toAddress(inserat.getStoryschreiber())
            .subject("Schreiben Sie eine Story über Ihren, durch uns vermittelten, Hund!")
            .content(message)
            .build());
    }

    @PutMapping("/api/inserate/{id}/activate")
    public ResponseEntity<?> activateInserat(@PathVariable long id) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getVermittler().equals(u.getUsername())))
            .filter(Inserat::isAktivierbar)
            .map(i -> i.toBuilder()
                .lastUpdate(LocalDate.now())
                .status(InseratStatus.AKTIV)
                .build())
            .orElseThrow(() -> new IllegalStateException("Inserat existiert nicht bzw. der Zugriff ist nicht erlaubt"));


        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/api/inserate/{id}/deactivate")
    public ResponseEntity<?> deactivateInserat(@PathVariable long id) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getVermittler().equals(u.getUsername())))
            .filter(Inserat::isDeaktivierbar)
            .map(i -> i.toBuilder()
                .lastUpdate(LocalDate.now())
                .status(InseratStatus.INAKTIV)
                .build())
            .orElseThrow(() -> new IllegalStateException("Inserat existiert nicht bzw. der Zugriff ist nicht erlaubt"));


        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    private Optional<User> getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User)) {
            return Optional.empty();
        }

        return Optional.of((User) principal);
    }

}
