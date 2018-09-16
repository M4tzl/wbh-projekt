package com.github.dmn1k.tfm.images;

import com.google.common.io.ByteStreams;
import lombok.*;
import org.springframework.context.annotation.Profile;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Profile("!prod")
@RequiredArgsConstructor
@Service
public class InMemoryImageService implements ImageService {
    private static Map<String, UploadedFile> IMAGE_STORE = new ConcurrentHashMap<>();

    private final ImageResizer imageResizer;

    @Override
    @SneakyThrows
    public String upload(MultipartFile multipartFile) {
        String key = UUID.randomUUID().toString();

        byte[] thumbnail = imageResizer.tryCreateThumbnail(multipartFile)
            .orElse(null);
        IMAGE_STORE.put(key, new UploadedFile(multipartFile.getBytes(), thumbnail, multipartFile.getOriginalFilename(), multipartFile.getContentType()));

        return key;
    }

    @SneakyThrows
    @Override
    public ResponseEntity<byte[]> downloadThumbnail(String key) {
        UploadedFile file = getUploadedFile(key);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.parseMediaType(file.getContentType()));
        httpHeaders.setContentLength(file.getThumbnail().length);
        httpHeaders.setContentDisposition(ContentDisposition.builder("inline")
            .filename(file.getName())
            .build());

        return new ResponseEntity<>(file.getThumbnail(), httpHeaders, HttpStatus.OK);
    }

    private UploadedFile getUploadedFile(String key) throws IOException {
        UploadedFile file;
        if("thumbnail-missing.png".equals(key)){
            @Cleanup InputStream missingImageStream = getClass().getResourceAsStream("/images/thumbnail-missing.png");
            byte[] content = ByteStreams.toByteArray(missingImageStream);
            file = new UploadedFile(content, content,"thumbnail", "image/png");
        } else {
            file = IMAGE_STORE.get(key);
        }
        return file;
    }

    @SneakyThrows
    @Override
    public ResponseEntity<byte[]> download(String key) {
        UploadedFile file= getUploadedFile(key);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.parseMediaType(file.getContentType()));
        httpHeaders.setContentLength(file.getContent().length);
        httpHeaders.setContentDisposition(ContentDisposition.builder("inline")
            .filename(file.getName())
            .build());

        return new ResponseEntity<>(file.getContent(), httpHeaders, HttpStatus.OK);
    }

    @AllArgsConstructor
    @Getter
    private static class UploadedFile {
        private byte[] content;
        private byte[] thumbnail;
        private String name;
        private String contentType;
    }
}
