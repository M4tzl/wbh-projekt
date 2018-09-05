package com.github.dmn1k.tfm.files;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String upload(MultipartFile multipartFile);

    ResponseEntity<byte[]> download(String key);
}
