package com.github.dmn1k.tfm;

import com.github.dmn1k.tfm.inserate.Geschlecht;
import com.github.dmn1k.tfm.inserate.Inserat;
import com.github.dmn1k.tfm.inserate.InseratStatus;
import com.github.dmn1k.tfm.inserate.InserateRepository;
import com.github.dmn1k.tfm.security.*;
import com.github.dmn1k.tfm.stories.StoriesRepository;
import com.github.dmn1k.tfm.stories.Story;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Profile("!prod")
@RequiredArgsConstructor
@Component
public class TestdataRunner implements ApplicationRunner {
    private final InserateRepository inserateRepository;
    private final StoriesRepository storiesRepository;
    private final AccountRepository userRepository;
    private final VermittlerRepository vermittlerRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        Role vermittlerRole = roleRepository.findByName("VERMITTLER");
        Role interessentRole = roleRepository.findByName("INTERESSENT");

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

        Account interessent = Account.builder()
            .username("interessent@dominik-schlosser.de")
            .password(passwordEncoder.encode("test123"))
            .role(interessentRole)
            .enabled(true)
            .build();

        userRepository.save(interessent);

        Inserat inserat1 = inserateRepository.save(Inserat.builder()
            .lastUpdate(LocalDate.of(2018, 8, 10))
            .status(InseratStatus.AKTIV)
            .geburtsdatum(LocalDate.now())
            .rasse("cocker spaniel")
            .rufname("Hansi")
            .schulterhoehe("<20cm")
            .voraussichtlicheSchulterhoehe("51-75cm")
            .geschlecht(Geschlecht.M)
            .vermittler(vermittler.getUsername())
            .storyschreiber(interessent.getUsername())
            .build());

        Inserat inserat2 = inserateRepository.save(Inserat.builder()
            .status(InseratStatus.ENTWURF)
            .created(LocalDate.of(2015, 1, 1))
            .geburtsdatum(LocalDate.now())
            .rasse("husky")
            .rufname("Hansi 2")
            .schulterhoehe("51-75cm")
            .voraussichtlicheSchulterhoehe("51-75cm")
            .geschlecht(Geschlecht.M)
            .vermittler(vermittler.getUsername())
            .storyschreiber(interessent.getUsername())
            .build());

        inserateRepository.save(Inserat.builder()
            .status(InseratStatus.VERMITTELT)
            .created(LocalDate.of(2015, 1, 1))
            .lastUpdate(LocalDate.of(2018, 5, 2))
            .geburtsdatum(LocalDate.of(2000, 1, 5))
            .rasse("germanshepherd")
            .rufname("Fritz")
            .schulterhoehe("<20cm")
            .voraussichtlicheSchulterhoehe("<20cm")
            .geschlecht(Geschlecht.W)
            .vermittler(vermittler.getUsername())
            .storyschreiber(interessent.getUsername())
            .build());

        storiesRepository.save(new Story(null, inserat1, interessent.getUsername(), "Story 1", "Blablubb", false));
        storiesRepository.save(new Story(null, inserat2, interessent.getUsername(), "Story 2", "Blablubbnvnv", false));
    }
}
