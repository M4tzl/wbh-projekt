package com.github.dmn1k.tfm.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class SecurityController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/api/user")
    public ResponseEntity<?> user() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!(principal instanceof org.springframework.security.core.userdetails.User)){
            return ResponseEntity.ok(null);
        }

        org.springframework.security.core.userdetails.User springUser = (org.springframework.security.core.userdetails.User) principal;
        User user = userRepository.findByUsername(springUser.getUsername());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/api/register/interessent")
    public ResponseEntity<?> register(@RequestBody InteressentRegistrationData regData) {
        Role role = roleRepository.findByName("INTERESSENT");
        User user = User.builder()
            .username(regData.getUsername())
            .password(passwordEncoder.encode(regData.getPassword()))
            .role(role)
            .build();

        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
}
