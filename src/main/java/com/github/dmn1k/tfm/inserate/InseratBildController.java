package com.github.dmn1k.tfm.inserate;

import com.github.dmn1k.tfm.images.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@RestController
public class InseratBildController {
    private final InseratBildRepository inseratBildRepository;
    private final ImageService imageService;

    @SneakyThrows
    @PostMapping(value = "/api/inserate/{id}/images")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @RequestParam("file") MultipartFile file) {
        String key = imageService.upload(file);
        InseratBild inseratBild = inseratBildRepository.save(InseratBild.builder()
            .inseratId(id)
            .bildKey(key)
            .build());

        return ResponseEntity.ok(inseratBild);
    }

    @SneakyThrows
    @PutMapping(value = "/api/inserate/{id}/images/{inseratBildId}")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @PathVariable long inseratBildId,
                                              @RequestParam("file") MultipartFile file) {

        InseratBild inseratBild = inseratBildRepository.findById(inseratBildId)
            .orElseThrow(() -> new RuntimeException("InseratBild mit ID " + id + " nicht gefunden!"));

        String key = imageService.upload(file);
        inseratBild.setBildKey(key);

        InseratBild updated = inseratBildRepository.save(inseratBild);
        return ResponseEntity.ok(updated);
    }

    @SneakyThrows
    @GetMapping("/api/inserate/{id}/images/{bildKey}")
    public ResponseEntity<byte[]> serve(@PathVariable long id, @PathVariable String bildKey) {
        return imageService.download(bildKey);
    }

    @SneakyThrows
    @GetMapping("/api/inserate/{id}/thumbnail")
    public ResponseEntity<byte[]> serveThumbnail(@PathVariable long id) {
        String bildKey = inseratBildRepository.findFirstByInseratIdOrderByIdAsc(id)
            .map(InseratBild::getBildKey)
            .orElse("thumbnail-missing.png");

        return imageService.downloadThumbnail(bildKey);
    }

    @GetMapping("/api/inserate/{id}/images")
    public ResponseEntity<List<InseratBild>> getImages(@PathVariable long id) {
        List<InseratBild> result = inseratBildRepository.findByInseratId(id);

        return ResponseEntity.ok(result);
    }
}
