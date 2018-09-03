package com.github.dmn1k.tfm.inserate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RequiredArgsConstructor
@RestController
public class InseratBildController {
    // TODO: Durch AWS (S3) ersetzen (bzw. durch irgendetwas vernünftiges ;-)
    private static List<UploadedFile> IMAGE_STORE = new CopyOnWriteArrayList<>();

    private final InseratBildRepository inseratBildRepository;

    @SneakyThrows
    @PostMapping(value = "/api/inserate/{id}/images")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @RequestParam("file") MultipartFile file) {

        UploadedFile uploadedFile = new UploadedFile(file.getBytes(), file.getOriginalFilename(), file.getContentType());
        IMAGE_STORE.add(uploadedFile);

        String bildUrl = "/api/inserate/" + id + "/images/" + (IMAGE_STORE.size() - 1);
        InseratBild inseratBild = inseratBildRepository.save(new InseratBild(null, id, bildUrl));

        return ResponseEntity.ok(inseratBild);
    }

    @SneakyThrows
    @PutMapping(value = "/api/inserate/{id}/images/{inseratBildId}")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @PathVariable long inseratBildId,
                                              @RequestParam("file") MultipartFile file) {

        InseratBild inseratBild = inseratBildRepository.findById(inseratBildId)
            .orElseThrow(() -> new RuntimeException("InseratBild mit ID " + id + " nicht gefunden!"));

        UploadedFile uploadedFile = new UploadedFile(file.getBytes(), file.getOriginalFilename(), file.getContentType());
        IMAGE_STORE.add(uploadedFile);

        String bildUrl = "/api/inserate/" + id + "/images/" + (IMAGE_STORE.size() - 1);
        inseratBild.setBildUrl(bildUrl);

        return ResponseEntity.ok(inseratBild);
    }

    @SneakyThrows
    @GetMapping("/api/inserate/{id}/images/{imageId}")
    public @ResponseBody
    ResponseEntity<byte[]> serve(@PathVariable long id, @PathVariable int imageId) {
        UploadedFile file = IMAGE_STORE.get(imageId);

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(file.getContentType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + file.getName() + "\"")
            .body(file.getContent());
    }

    @GetMapping("/api/inserate/{id}/images")
    public @ResponseBody ResponseEntity<List<InseratBild>> getImages(@PathVariable long id) {
        List<InseratBild> result = inseratBildRepository.findByInseratId(id);

        return ResponseEntity.ok(result);
    }

    @AllArgsConstructor
    @Getter
    private static class UploadedFile {
        private byte[] content;
        private String name;
        private String contentType;
    }
}
