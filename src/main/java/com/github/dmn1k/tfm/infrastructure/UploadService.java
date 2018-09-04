package com.github.dmn1k.tfm.infrastructure;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UploadService {
    String upload(MultipartFile multipartFile);

    ResponseEntity<byte[]> download(String key);
}
