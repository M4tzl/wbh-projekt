package com.github.dmn1k.tfm.security;

import com.github.dmn1k.tfm.Constants;
import com.github.dmn1k.tfm.mail.Email;
import com.github.dmn1k.tfm.mail.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Transactional
@RequiredArgsConstructor
@RestController
public class SecurityController {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final VermittlerRepository vermittlerRepository;
    private final AccountActivationRepository accountActivationRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/api/user")
    public ResponseEntity<Account> user() {
        Account account = Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .filter(principal -> principal instanceof User)
            .map(principal -> (User) principal)
            .flatMap(u -> accountRepository.findByUsername(u.getUsername()))
            .orElse(null);

        return ResponseEntity.ok(account);
    }

    @GetMapping("/api/user/vermittler")
    public ResponseEntity<?> currentVermittler() {
        Vermittler vermittler = Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .filter(principal -> principal instanceof User)
            .map(principal -> (User) principal)
            .flatMap(u -> vermittlerRepository.findByUsername(u.getUsername()))
            .orElseThrow(() -> new IllegalStateException("Nutzer ist kein Vermittler!"));

        return ResponseEntity.ok(vermittler);
    }

    @PostMapping("/api/register/interessent")
    public ResponseEntity<?> register(@RequestBody AccountCredentials regData,
                                      HttpServletRequest request) {
        Role role = roleRepository.findByName("INTERESSENT");
        Account account = Account.builder()
            .username(regData.getUsername())
            .password(passwordEncoder.encode(regData.getPassword()))
            .role(role)
            .build();

        accountRepository.save(account);

        handleActivation(regData.getUsername(), request);

        return ResponseEntity.ok(account);
    }


    @PutMapping("/api/register/interessent")
    public ResponseEntity<?> updateInteressentRegistration(@RequestBody AccountCredentials regData) {
        Account origAccount = accountRepository.findByUsername(regData.getUsername())
            .filter(acc -> Objects.equals(user().getBody(), acc))
            .orElseThrow(() -> new IllegalStateException("Interessent-Account existiert nicht"));

        Account account = origAccount.toBuilder()
            .password(passwordEncoder.encode(regData.getPassword()))
            .build();

        accountRepository.save(account);

        return ResponseEntity.ok(account);
    }

    @PostMapping("/api/register/vermittler")
    public ResponseEntity<?> register(@RequestBody VermittlerRegistrationData regData,
                                      HttpServletRequest request) {
        Role role = roleRepository.findByName("VERMITTLER");
        Account account = Account.builder()
            .username(regData.getUsername())
            .password(passwordEncoder.encode(regData.getPassword()))
            .role(role)
            .build();

        accountRepository.save(account);
        vermittlerRepository.save(regData.getVermittler());

        handleActivation(regData.getUsername(), request);

        return ResponseEntity.ok(account);
    }

    @PutMapping("/api/register/vermittler")
    public ResponseEntity<?> updateVermittlerRegistration(@RequestBody VermittlerRegistrationData regData) {

        Account origAccount = accountRepository.findByUsername(regData.getVermittler().getUsername())
            .filter(acc -> Objects.equals(user().getBody(), acc))
            .orElseThrow(() -> new IllegalStateException("Vermittler-Account existiert nicht"));

        Account account = origAccount.toBuilder()
            .password(passwordEncoder.encode(regData.getPassword()))
            .build();

        vermittlerRepository.updateVermittlerInInseraten(regData.getVermittler());
        accountRepository.save(account);
        vermittlerRepository.save(regData.getVermittler());

        return ResponseEntity.ok(account);
    }

    @SneakyThrows
    @PostMapping("/api/password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody AccountCredentials credentials,
                                           HttpServletRequest request) {
        Account account = accountRepository.findByUsername(credentials.getUsername())
            .orElseThrow(() -> new IllegalStateException("Nutzer existiert nicht"));

        AccountToken accountToken = createToken(account.getUsername());
        String url = MessageFormat.format("{0}://{1}:{2}/#/reset-password?token={3}", request.getScheme(),
            request.getServerName(), String.valueOf(request.getServerPort()), accountToken.getToken());

        emailService.send(Email.builder()
            .toAddress(credentials.getUsername())
            .subject("Password-Reset bei Tier-Fair-Mittlung")
            .content(MessageFormat.format("<a href=\"{0}\">Bitte auf den Link klicken um Ihr Passwort neu zu vergeben</a><br/><br/><strong>{1}</strong>",
                url, Constants.STUDIENPROJEKT_DISCLAIMER))
            .build());

        return ResponseEntity.ok(account);
    }

    @SneakyThrows
    @PostMapping("/api/password/reset/{token}")
    public ResponseEntity<?> changePassword(@RequestBody AccountCredentials credentials,
                                            @PathVariable String token) {
        AccountToken activation = accountActivationRepository.findByToken(token);

        if (activation == null) {
            throw new IllegalStateException("No activation record found for token");
        }

        try {
            if (activation.getValid().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Token expired");
            }

            Account account = accountRepository.findByUsername(activation.getUsername())
                .orElseThrow(() -> new IllegalStateException("Nutzer existiert nicht"));
            account.setPassword(passwordEncoder.encode(credentials.getPassword()));

            accountRepository.save(account);

            return ResponseEntity.ok(account);
        } finally {
            accountActivationRepository.delete(activation);
        }
    }

    @SneakyThrows
    @GetMapping("/api/activate/{token}")
    public void activate(@PathVariable String token,
                         HttpServletResponse response) {
        AccountToken activation = accountActivationRepository.findByToken(token);

        if (activation == null) {
            throw new IllegalStateException("No activation record found for token");
        }

        try {
            if (activation.getValid().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Token expired");
            }

            Account account = accountRepository.findByUsername(activation.getUsername())
                .orElseThrow(() -> new IllegalStateException("Nutzer existiert nicht"));
            account.setEnabled(true);

            accountRepository.save(account);

            response.sendRedirect("/");
        } finally {
            accountActivationRepository.delete(activation);
        }
    }

    private void handleActivation(String username, HttpServletRequest request) {
        AccountToken accountToken = createToken(username);

        String activationurl = MessageFormat.format("{0}://{1}:{2}/api/activate/{3}", request.getScheme(),
            request.getServerName(), String.valueOf(request.getServerPort()), accountToken.getToken());

        emailService.send(Email.builder()
            .toAddress(username)
            .subject("Registrierung bei Tier-Fair-Mittlung")
            .content(MessageFormat.format("<a href=\"{0}\">Bitte bestätigen Sie ihre Registrierung</a><br/><br/><strong>{1}</strong>",
                activationurl, Constants.STUDIENPROJEKT_DISCLAIMER))
            .build());
    }

    private AccountToken createToken(String username) {
        AccountToken accountToken = AccountToken.builder()
            .username(username)
            .token(UUID.randomUUID().toString())
            .valid(LocalDate.now().plusDays(14))
            .build();

        accountActivationRepository.save(accountToken);
        return accountToken;
    }
}
