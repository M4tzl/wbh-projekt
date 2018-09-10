package com.github.dmn1k.tfm.security;

import com.github.dmn1k.tfm.mail.Email;
import com.github.dmn1k.tfm.mail.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.UUID;

@Transactional
@RequiredArgsConstructor
@RestController
public class SecurityController {
    private final AccountRepository userRepository;
    private final RoleRepository roleRepository;
    private final VermittlerRepository vermittlerRepository;
    private final AccountActivationRepository accountActivationRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService userDetailsService;

    @GetMapping("/api/user")
    public ResponseEntity<?> user() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof org.springframework.security.core.userdetails.User)) {
            return ResponseEntity.ok(null);
        }

        org.springframework.security.core.userdetails.User springUser = (org.springframework.security.core.userdetails.User) principal;
        Account account = userRepository.findByUsername(springUser.getUsername());

        return ResponseEntity.ok(account);
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

        userRepository.save(account);

        handleActivation(regData.getUsername(), request);

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

        userRepository.save(account);
        vermittlerRepository.save(regData.getVermittler());

        handleActivation(regData.getUsername(), request);

        return ResponseEntity.ok(account);
    }

    @SneakyThrows
    @PostMapping("/api/password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody AccountCredentials credentials,
                                           HttpServletRequest request) {
        Account account = userRepository.findByUsername(credentials.getUsername());

        if (account == null) {
            return ResponseEntity.badRequest().build();
        }

        AccountToken accountToken = createToken(credentials.getUsername());

        String url = MessageFormat.format("{0}://{1}:{2}/#/reset-password?token={3}", request.getScheme(),
            request.getServerName(), String.valueOf(request.getServerPort()), URLEncoder.encode(accountToken.getToken(), "UTF-8"));

        emailService.send(Email.builder()
            .toAddress(credentials.getUsername())
            .subject("Password-Reset bei Tier-Fair-Mittlung")
            .content(MessageFormat.format("<a href=\"{0}\">Bitte auf den Link klicken um Ihr Passwort neu zu vergeben</a>", url))
            .build());

        return ResponseEntity.ok(account);
    }

    @SneakyThrows
    @PostMapping("/api/password/reset/{token}")
    public void changePassword(@RequestBody AccountCredentials credentials,
                               @PathVariable String token,
                               HttpServletResponse response) {
        AccountToken activation = accountActivationRepository.findByToken(token);

        if (activation == null) {
            throw new IllegalStateException("No activation record found for token");
        }

        try {
            if (activation.getValid().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Token expired");
            }

            Account account = userRepository.findByUsername(activation.getUsername());
            account.setPassword(passwordEncoder.encode(credentials.getPassword()));

            userRepository.save(account);

            login(credentials);
            response.sendRedirect("/");
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

            Account account = userRepository.findByUsername(activation.getUsername());
            account.setEnabled(true);

            userRepository.save(account);

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
            .content(MessageFormat.format("<a href=\"{0}\">Bitte bestätigen Sie ihre Registrierung</a>", activationurl))
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

    private void login(AccountCredentials credentials) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(credentials.getUsername());
        Authentication auth = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}
