package com.github.dmn1k.tfm.inserate;

import com.github.dmn1k.tfm.Constants;
import com.github.dmn1k.tfm.mail.Email;
import com.github.dmn1k.tfm.mail.EmailService;
import com.github.dmn1k.tfm.security.Account;
import com.github.dmn1k.tfm.security.AccountRepository;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@RestController
public class InserateController {

    private final InserateRepository repository;
    private final EmailService emailService;
    private final AccountRepository accountRepository;

    @GetMapping("/api/inserate")
    public @ResponseBody ResponseEntity<?> loadInserate(@QuerydslPredicate(root = Inserat.class) Predicate predicate,
                                                        Pageable pageable) {
        return ResponseEntity.ok(repository.findAll(predicate, pageable));
    }

    @GetMapping("/api/inserate/{id}")
    public @ResponseBody ResponseEntity<?> loadInserat(@PathVariable long id) {
        return repository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/api/inserate")
    public @ResponseBody ResponseEntity<?> createInserat(@RequestBody Inserat inserat) {
        Optional<User> loggedInUser = getLoggedInUser();

        if(loggedInUser.isPresent()) {
            Inserat updatedInserat = inserat.toBuilder()
                .vermittler(loggedInUser.get().getUsername())
                .created(LocalDate.now())
                .lastUpdate(LocalDate.now())
                .status(InseratStatus.ENTWURF)
                .build();

            Inserat saved = repository.save(updatedInserat);
            return ResponseEntity.ok(saved);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PutMapping("/api/inserate/{id}")
    public @ResponseBody ResponseEntity<?> updateInserat(@PathVariable long id, @RequestBody Inserat inserat) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getVermittler().equals(u.getUsername())))
            .map(i -> i.toBuilder()
                .id(id)
                .lastUpdate(LocalDate.now())
                .build())
            .orElseThrow(() -> new IllegalStateException("Inserat existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/api/inserate/{id}/publish")
    public @ResponseBody ResponseEntity<?> publishInserat(@PathVariable long id, @RequestBody Inserat inserat) {
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
    public @ResponseBody ResponseEntity<?> closeInserat(@PathVariable long id,
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

        if(updatedInserat.getStoryschreiber() != null) {
            sendStoryschreiberEmail(request, updatedInserat);
        }

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    private void sendStoryschreiberEmail(HttpServletRequest request, Inserat inserat) {
        Account account = accountRepository.findByUsername(inserat.getStoryschreiber());

        String url = MessageFormat.format("{0}://{1}:{2}/#/login", request.getScheme(),
            request.getServerName(), String.valueOf(request.getServerPort()));
        String message = MessageFormat.format("<a href=\"{0}\">Loggen Sie sich ein und schreiben Sie eine Story über Ihren neuen Hund!</a><br/><br/><strong>{0}</strong>",
            url, Constants.STUDIENPROJEKT_DISCLAIMER);

        if(account == null){
            url = MessageFormat.format("{0}://{1}:{2}/#/interessent/register", request.getScheme(),
                request.getServerName(), String.valueOf(request.getServerPort()));
            message = MessageFormat.format("<a href=\"{0}\">Registrieren Sie sich bei Tier-Fair-Mittlung und schreiben Sie eine Story über Ihren neuen Hund!</a><br/><br/><strong>{0}</strong>",
                url, Constants.STUDIENPROJEKT_DISCLAIMER);
        }

        emailService.send(Email.builder()
            .toAddress(inserat.getStoryschreiber())
            .subject("Schreiben Sie eine Story über Ihren, durch uns vermittelten, Hund!")
            .content(message)
            .build());
    }

    @PutMapping("/api/inserate/{id}/activate")
    public @ResponseBody ResponseEntity<?> activateInserat(@PathVariable long id) {
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
    public @ResponseBody ResponseEntity<?> deactivateInserat(@PathVariable long id) {
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
        if(!(principal instanceof User)){
            return Optional.empty();
        }

        return Optional.of((User) principal);
    }

}
