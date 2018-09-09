package com.github.dmn1k.tfm;

import com.github.dmn1k.tfm.security.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Profile("prod")
@RequiredArgsConstructor
@Component
public class ProdTestdataRunner implements ApplicationRunner {
    private final AccountRepository userRepository;
    private final VermittlerRepository vermittlerRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        Role vermittlerRole = roleRepository.findByName("VERMITTLER");
        Role interessentRole = roleRepository.findByName("INTERESSENT");

        Account vermittlerAccount = userRepository.findByUsername("vermittler@dominik-schlosser.de");
        Account interessentAccount = userRepository.findByUsername("interessent@dominik-schlosser.de");


        if (vermittlerAccount == null) {
            Account vermittler = Account.builder()
                .username("vermittler@dominik-schlosser.de")
                .password(passwordEncoder.encode("test123"))
                .role(vermittlerRole)
                .enabled(true)
                .build();

            userRepository.save(vermittler);
            vermittlerRepository.save(Vermittler.builder()
                .ansprechpartner("Dominik Schlosser")
                .bundesland("Bayern")
                .organisation("Test")
                .ort("Fürth")
                .plz("90765")
                .strasseHsNr("Buchenstraße 6")
                .telefon("N/A")
                .username("vermittler@dominik-schlosser.de")
                .build());
        }

        if (interessentAccount == null) {
            Account interessent = Account.builder()
                .username("interessent@dominik-schlosser.de")
                .password(passwordEncoder.encode("test123"))
                .role(interessentRole)
                .enabled(true)
                .build();

            userRepository.save(interessent);
        }
    }
}
