package com.github.dmn1k.tfm.images;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String upload(MultipartFile multipartFile);

    ResponseEntity<byte[]> download(String key);

    ResponseEntity<byte[]> downloadThumbnail(String key);
}
