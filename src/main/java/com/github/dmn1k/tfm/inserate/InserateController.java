package com.github.dmn1k.tfm.inserate;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;

@RequiredArgsConstructor
@RepositoryRestController
public class InserateController {

    private final InserateRepository repository;

    @PostMapping("/inserate")
    public @ResponseBody ResponseEntity<?> createInserat(@RequestBody Inserat inserat) {
        Inserat updatedInserat = inserat.toBuilder()
            .created(LocalDate.now())
            .lastUpdate(LocalDate.now())
            .status(InseratStatus.ENTWURF)
            .build();

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/inserate/{id}")
    public @ResponseBody ResponseEntity<?> updateInserat(@PathVariable long id, @RequestBody Inserat inserat) {
        Inserat updatedInserat = inserat.toBuilder()
            .id(id)
            .lastUpdate(LocalDate.now())
            .build();

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/inserate/{id}/publish")
    public @ResponseBody ResponseEntity<?> publishInserat(@PathVariable long id, @RequestBody Inserat inserat) {
        Inserat updatedInserat = inserat.toBuilder()
            .id(id)
            .lastUpdate(LocalDate.now())
            .status(InseratStatus.AKTIV)
            .build();

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

}
