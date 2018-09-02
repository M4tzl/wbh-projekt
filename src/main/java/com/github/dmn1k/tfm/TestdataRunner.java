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
        List<Rasse> rassen = inserateRepository.findRassen();
        Rasse bernhardiner = rassen.stream()
            .filter(r -> r.getBezeichnung().equals("Bernhardiner"))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Bernhardiner nicht in DB gefunden"));

        Rasse dackel = rassen.stream()
            .filter(r -> r.getBezeichnung().equals("Dackel"))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Dackel nicht in DB gefunden"));


        Schulterhoehe schulterhoehe1 = inserateRepository.findSchulterhoehen().get(1);
        Schulterhoehe schulterhoehe2 = inserateRepository.findSchulterhoehen().get(2);

        inserateRepository.save(Inserat.builder()
            .lastUpdate(LocalDate.of(2018, 8, 10))
            .status(InseratStatus.AKTIV)
            .geburtsdatum(LocalDate.now())
            .rasse(bernhardiner)
            .rufname("Hansi")
            .schulterhoehe(schulterhoehe1)
            .voraussichtlicheSchulterhoehe(schulterhoehe2)
            .geschlecht(Geschlecht.M)
            .build());

        inserateRepository.save(Inserat.builder()
            .status(InseratStatus.ENTWURF)
            .created(LocalDate.of(2015, 1, 1))
            .geburtsdatum(LocalDate.now())
            .rasse(bernhardiner)
            .rufname("Hansi 2")
            .schulterhoehe(schulterhoehe2)
            .voraussichtlicheSchulterhoehe(schulterhoehe2)
            .geschlecht(Geschlecht.M)
            .build());

        inserateRepository.save(Inserat.builder()
            .status(InseratStatus.VERMITTELT)
            .created(LocalDate.of(2015, 1, 1))
            .lastUpdate(LocalDate.of(2018, 5, 2))
            .geburtsdatum(LocalDate.of(2000, 1, 5))
            .rasse(dackel)
            .rufname("Fritz")
            .schulterhoehe(schulterhoehe1)
            .voraussichtlicheSchulterhoehe(schulterhoehe1)
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
