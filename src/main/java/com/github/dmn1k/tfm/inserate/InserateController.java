package com.github.dmn1k.tfm.inserate;

import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class InserateController {

    private final InserateRepository repository;

    @GetMapping("/api/inserate")
    public @ResponseBody ResponseEntity<?> loadInserate(@QuerydslPredicate(root = Inserat.class) Predicate predicate,
                                                        Pageable pageable) {
        Optional<User> loggedInUser = getLoggedInUser();

        if(loggedInUser.isPresent()) {
            return ResponseEntity.ok(repository.findAll(predicate, pageable));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping("/api/inserate/{id}")
    public @ResponseBody ResponseEntity<?> loadInserat(@PathVariable long id) {
        return getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(inserat -> inserat.getVermittler().equals(u.getUsername()))
            )
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).build());
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
            .filter(Inserat::isAktivierbar)
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
    public @ResponseBody ResponseEntity<?> closeInserat(@PathVariable long id) {
        Inserat updatedInserat = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getVermittler().equals(u.getUsername())))
            .filter(Inserat::isVermittelbar)
            .map(i -> i.toBuilder()
                .lastUpdate(LocalDate.now())
                .status(InseratStatus.VERMITTELT)
                .build())
            .orElseThrow(() -> new IllegalStateException("Inserat existiert nicht bzw. der Zugriff ist nicht erlaubt"));


        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
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
        if(!(principal instanceof org.springframework.security.core.userdetails.User)){
            return Optional.empty();
        }

        return Optional.of((User) principal);
    }

}
