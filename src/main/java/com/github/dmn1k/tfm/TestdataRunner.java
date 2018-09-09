package com.github.dmn1k.tfm;

import com.github.dmn1k.tfm.inserate.*;
import com.github.dmn1k.tfm.security.Role;
import com.github.dmn1k.tfm.security.RoleRepository;
import com.github.dmn1k.tfm.security.User;
import com.github.dmn1k.tfm.security.UserRepository;
import com.github.dmn1k.tfm.stories.StoriesRepository;
import com.github.dmn1k.tfm.stories.Story;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Profile("!prod")
@RequiredArgsConstructor
@Component
public class TestdataRunner implements ApplicationRunner {
    private final InserateRepository inserateRepository;
    private final StoriesRepository storiesRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        Role vermittlerRole = roleRepository.findByName("VERMITTLER");
        User vermittler = User.builder()
            .username("vermittler1@test.de")
            .password(passwordEncoder.encode("test123"))
            .role(vermittlerRole)
            .build();

        userRepository.save(vermittler);

        inserateRepository.save(Inserat.builder()
            .lastUpdate(LocalDate.of(2018, 8, 10))
            .status(InseratStatus.AKTIV)
            .geburtsdatum(LocalDate.now())
            .rasse("cocker spaniel")
            .rufname("Hansi")
            .schulterhoehe("<20cm")
            .voraussichtlicheSchulterhoehe("51-75cm")
            .geschlecht(Geschlecht.M)
            .vermittler(vermittler)
            .build());

        inserateRepository.save(Inserat.builder()
            .status(InseratStatus.ENTWURF)
            .created(LocalDate.of(2015, 1, 1))
            .geburtsdatum(LocalDate.now())
            .rasse("husky")
            .rufname("Hansi 2")
            .schulterhoehe("51-75cm")
            .voraussichtlicheSchulterhoehe("51-75cm")
            .geschlecht(Geschlecht.M)
            .vermittler(vermittler)
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
            .vermittler(vermittler)
            .build());

        storiesRepository.save(new Story(null, "Story 1", "Blablubb"));
        storiesRepository.save(new Story(null, "Story 2", "Blablubbnvnv"));
        storiesRepository.save(new Story(null, "Story 3", "Blablubbvnvn"));
        storiesRepository.save(new Story(null, "Story 4", "Blablubb gdfgdh"));
        storiesRepository.save(new Story(null, "Story 5", "Blablubbvhfghd hdhdh"));
        storiesRepository.save(new Story(null, "Story 6", "Blablubb hdhdfgh"));
        storiesRepository.save(new Story(null, "Story 7", "Blablubb hsdhsdh "));
        storiesRepository.save(new Story(null, "Story 8", "Blablubb hdhs hs"));
    }
}
