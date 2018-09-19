package com.github.dmn1k.tfm.admin;

import com.github.dmn1k.tfm.inserate.InserateRepository;
import com.github.dmn1k.tfm.security.Account;
import com.github.dmn1k.tfm.security.AccountRepository;
import com.github.dmn1k.tfm.security.Role;
import com.github.dmn1k.tfm.stories.StoriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@RestController
public class AdminController {
    private final AccountRepository accountRepository;
    private final InserateRepository inserateRepository;
    private final StoriesRepository storiesRepository;

    @GetMapping("/api/admin/users")
    public ResponseEntity<?> users(@RequestParam(value = "username", required = false) String username,
                                   Pageable pageable) {
        Account currentAccount = getLoggedInUser()
            .map(User::getUsername)
            .flatMap(accountRepository::findByUsername)
            .filter(a -> a.getRoles().contains(Role.ADMIN))
            .orElseThrow(() -> new IllegalStateException("Keine Zugriffsberechtigung"));

        Page<AccountUebersicht> result = accountRepository
            .findByUsernameIgnoreCaseContainingAndIdNot(username, currentAccount.getId(), pageable)
            .map(this::toAccountUebersicht);

        return ResponseEntity.ok(result);
    }

    private AccountUebersicht toAccountUebersicht(Account a) {
        return AccountUebersicht.builder()
            .id(a.getId())
            .roles(a.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
            .username(a.getUsername())
            .veroeffentlichungen(calcVeroeffentlichungenCount(a))
            .build();
    }

    @GetMapping("/api/admin/users/{id}")
    public ResponseEntity<?> user(@PathVariable long id) {
        getLoggedInUser()
            .map(User::getUsername)
            .flatMap(accountRepository::findByUsername)
            .filter(a -> a.getRoles().contains(Role.ADMIN))
            .orElseThrow(() -> new IllegalStateException("Keine Zugriffsberechtigung"));

        return accountRepository.findById(id)
            .map(this::toAccountUebersicht)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new IllegalStateException("Account not found"));
    }

    @DeleteMapping("/api/admin/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable long id) {
        getLoggedInUser()
            .map(User::getUsername)
            .flatMap(accountRepository::findByUsername)
            .filter(a -> a.getRoles().contains(Role.ADMIN))
            .orElseThrow(() -> new IllegalStateException("Keine Zugriffsberechtigung"));

        Account user = accountRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException("User existiert nicht"));

        inserateRepository.deleteZurAbrechnungNichtMehrRelevanteInserate(user.getUsername());
        storiesRepository.deleteAllByAutor(user.getUsername());
        accountRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }

    private long calcVeroeffentlichungenCount(Account account) {
        long result = 0;

        if (account.getRoles().contains(Role.INTERESSENT)) {
            result += storiesRepository.countStoriesByAutor(account.getUsername());
        }

        if (account.getRoles().contains(Role.VERMITTLER)) {
            result += inserateRepository.countByVermittler(account.getUsername());
        }

        return result;
    }

    private Optional<User> getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User)) {
            return Optional.empty();
        }

        return Optional.of((User) principal);
    }
}
