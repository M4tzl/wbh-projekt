package com.github.dmn1k.tfm.security;

import com.github.dmn1k.tfm.mail.Email;
import com.github.dmn1k.tfm.mail.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class SecurityController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VermittlerRepository vermittlerRepository;
    private final UserActivationRepository userActivationRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/api/user")
    public ResponseEntity<?> user() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof org.springframework.security.core.userdetails.User)) {
            return ResponseEntity.ok(null);
        }

        org.springframework.security.core.userdetails.User springUser = (org.springframework.security.core.userdetails.User) principal;
        User user = userRepository.findByUsername(springUser.getUsername());

        return ResponseEntity.ok(user);
    }

    @PostMapping("/api/register/interessent")
    public ResponseEntity<?> register(@RequestBody InteressentRegistrationData regData,
                                      HttpServletRequest request) {
        Role role = roleRepository.findByName("INTERESSENT");
        User user = User.builder()
            .username(regData.getUsername())
            .password(passwordEncoder.encode(regData.getPassword()))
            .role(role)
            .build();

        userRepository.save(user);

        handleActivation(regData.getUsername(), request);

        return ResponseEntity.ok(user);
    }


    @PostMapping("/api/register/vermittler")
    public ResponseEntity<?> register(@RequestBody VermittlerRegistrationData regData,
                                      HttpServletRequest request) {
        Role role = roleRepository.findByName("VERMITTLER");
        User user = User.builder()
            .username(regData.getUsername())
            .password(passwordEncoder.encode(regData.getPassword()))
            .role(role)
            .build();

        userRepository.save(user);
        vermittlerRepository.save(regData.getVermittler());

        handleActivation(regData.getUsername(), request);

        return ResponseEntity.ok(user);
    }

    @SneakyThrows
    @GetMapping("/api/activate/{token}")
    public void activate(@PathVariable String token,
                         HttpServletResponse response) {
        UserActivation activation = userActivationRepository.findByToken(token);

        if (activation == null) {
            throw new IllegalStateException("No activation record found for token");
        }

        try {
            if (activation.getValid().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Token expired");
            }

            User user = userRepository.findByUsername(activation.getUsername());
            user.setEnabled(true);

            userRepository.save(user);

            response.sendRedirect("/");
        } finally {
            userActivationRepository.delete(activation);
        }
    }

    private void handleActivation(String username, HttpServletRequest request) {
        UserActivation userActivation = UserActivation.builder()
            .username(username)
            .token(UUID.randomUUID().toString())
            .valid(LocalDate.now().plusDays(14))
            .build();

        userActivationRepository.save(userActivation);

        String activationurl = MessageFormat.format("{0}://{1}:{2}/api/activate/{3}", request.getScheme(),
            request.getServerName(), String.valueOf(request.getServerPort()), userActivation.getToken());

        emailService.send(Email.builder()
            .fromAddress("no-reply@tier-fair-mittlung.de")
            .toAddress(username)
            .subject("Registrierung bei Tier-Fair-Mittlung")
            .content(MessageFormat.format("<a href=\"{0}\">Bitte bestätigen Sie ihre Registrierung</a>", activationurl))
            .build());
    }
}
