package com.github.dmn1k.tfm.inserate;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.EnumSet;

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
        Inserat originalInserat = this.repository.findById(id).orElseThrow(() -> new IllegalStateException("Inserat not found"));

        if(!originalInserat.isAktivierbar()){
            throw new IllegalStateException("Inserat ist nicht aktivierbar");
        }

        Inserat updatedInserat = inserat.toBuilder()
            .id(id)
            .lastUpdate(LocalDate.now())
            .status(InseratStatus.AKTIV)
            .build();

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/inserate/{id}/close")
    public @ResponseBody ResponseEntity<?> closeInserat(@PathVariable long id) {
        Inserat inserat = this.repository.findById(id).orElseThrow(() -> new IllegalStateException("Inserat not found"));

        if(!inserat.isVermittelbar()){
            throw new IllegalStateException("Inserat ist nicht vermittelbar");
        }

        Inserat updatedInserat = inserat.toBuilder()
            .lastUpdate(LocalDate.now())
            .status(InseratStatus.VERMITTELT)
            .build();

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/inserate/{id}/activate")
    public @ResponseBody ResponseEntity<?> activateInserat(@PathVariable long id) {
        Inserat inserat = this.repository.findById(id).orElseThrow(() -> new IllegalStateException("Inserat not found"));

        if(!inserat.isAktivierbar()){
            throw new IllegalStateException("Inserat ist nicht aktivierbar");
        }

        Inserat updatedInserat = inserat.toBuilder()
            .lastUpdate(LocalDate.now())
            .status(InseratStatus.AKTIV)
            .build();

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/inserate/{id}/deactivate")
    public @ResponseBody ResponseEntity<?> deactivateInserat(@PathVariable long id) {
        Inserat inserat = this.repository.findById(id).orElseThrow(() -> new IllegalStateException("Inserat not found"));

        if(!inserat.isDeaktivierbar()){
            throw new IllegalStateException("Inserat ist nicht deaktivierbar");
        }

        Inserat updatedInserat = inserat.toBuilder()
            .lastUpdate(LocalDate.now())
            .status(InseratStatus.INAKTIV)
            .build();

        Inserat saved = repository.save(updatedInserat);
        return ResponseEntity.ok(saved);
    }

}
