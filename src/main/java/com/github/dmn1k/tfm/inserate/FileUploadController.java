package com.github.dmn1k.tfm.inserate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
public class FileUploadController {
    // TODO: Durch AWS (S3) ersetzen (bzw. durch irgendetwas vernünftiges ;-)
    private static List<UploadedFile> IMAGE_STORE = new CopyOnWriteArrayList<>();

    @SneakyThrows
    @PostMapping(value = "/api/inserate/{id}/images")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @RequestParam("file") MultipartFile file) {

        UploadedFile uploadedFile = new UploadedFile(file.getBytes(), file.getOriginalFilename(), file.getContentType());
        IMAGE_STORE.add(uploadedFile);

        Map<String, String> jsonObject = new HashMap<>();
        jsonObject.put("downloadLink", "/api/inserate/" + id + "/images/" + (IMAGE_STORE.size() - 1));
        return ResponseEntity.ok(jsonObject);
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

    @AllArgsConstructor
    @Getter
    private static class UploadedFile {
        private byte[] content;
        private String name;
        private String contentType;
    }
}
