package com.github.dmn1k.tfm.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Profile("!prod")
@Service
public class InMemoryUploadService implements UploadService {
    private static Map<String, UploadedFile> IMAGE_STORE = new ConcurrentHashMap<>();

    @Override
    @SneakyThrows
    public String upload(MultipartFile multipartFile) {
        String key = UUID.randomUUID().toString();
        IMAGE_STORE.put(key, new UploadedFile(multipartFile.getBytes(), multipartFile.getOriginalFilename(), multipartFile.getContentType()));

        return key;
    }

    @Override
    public ResponseEntity<byte[]> download(String key) {
        byte[] content = IMAGE_STORE.get(key).getContent();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentLength(content.length);
        httpHeaders.setContentDispositionFormData("inline", null);

        return new ResponseEntity<>(content, httpHeaders, HttpStatus.OK);
    }

    @AllArgsConstructor
    @Getter
    private static class UploadedFile {
        private byte[] content;
        private String name;
        private String contentType;
    }
}
