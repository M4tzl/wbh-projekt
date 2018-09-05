package com.github.dmn1k.tfm.inserate;

import com.github.dmn1k.tfm.files.FileService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class InseratBildController {
    private final InseratBildRepository inseratBildRepository;
    private final FileService fileService;

    @SneakyThrows
    @PostMapping(value = "/api/inserate/{id}/images")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @RequestParam("file") MultipartFile file) {
        String key = fileService.upload(file);
        InseratBild inseratBild = inseratBildRepository.save(new InseratBild(null, id, key));

        return ResponseEntity.ok(inseratBild);
    }

    @SneakyThrows
    @PutMapping(value = "/api/inserate/{id}/images/{inseratBildId}")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @PathVariable long inseratBildId,
                                              @RequestParam("file") MultipartFile file) {

        InseratBild inseratBild = inseratBildRepository.findById(inseratBildId)
            .orElseThrow(() -> new RuntimeException("InseratBild mit ID " + id + " nicht gefunden!"));

        String key = fileService.upload(file);
        inseratBild.setBildKey(key);

        InseratBild updated = inseratBildRepository.save(inseratBild);
        return ResponseEntity.ok(updated);
    }

    @SneakyThrows
    @GetMapping("/api/inserate/{id}/images/{bildKey}")
    public @ResponseBody
    ResponseEntity<byte[]> serve(@PathVariable long id, @PathVariable String bildKey) {
        return fileService.download(bildKey);
    }

    @GetMapping("/api/inserate/{id}/images")
    public @ResponseBody ResponseEntity<List<InseratBild>> getImages(@PathVariable long id) {
        List<InseratBild> result = inseratBildRepository.findByInseratId(id);

        return ResponseEntity.ok(result);
    }
}
