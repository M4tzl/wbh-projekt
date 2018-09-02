package com.github.dmn1k.tfm;

import com.github.dmn1k.tfm.inserate.*;
import com.github.dmn1k.tfm.stories.StoriesRepository;
import com.github.dmn1k.tfm.stories.Story;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Component
public class TestdataRunner implements ApplicationRunner {
    private final InserateRepository inserateRepository;
    private final StoriesRepository storiesRepository;

    @Override
    public void run(ApplicationArguments args) {
        inserateRepository.save(Inserat.builder()
            .lastUpdate(LocalDate.of(2018, 8, 10))
            .status(InseratStatus.AKTIV)
            .geburtsdatum(LocalDate.now())
            .rasse("cocker spaniel")
            .rufname("Hansi")
            .schulterhoehe("<20cm")
            .voraussichtlicheSchulterhoehe("51-75cm")
            .geschlecht(Geschlecht.M)
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
