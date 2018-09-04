package com.github.dmn1k.tfm.infrastructure;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.Cleanup;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Profile("prod")
@Service
public class S3UploadService implements UploadService {
    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    @Override
    @SneakyThrows
    public String upload(MultipartFile multipartFile) {
        if(!StringUtils.isEmpty(multipartFile.getOriginalFilename())){
            try (InputStream inputStream = multipartFile.getInputStream()) {
                String key = UUID.randomUUID().toString();
                PutObjectRequest putObjectRequest = new PutObjectRequest(bucket,
                    key, inputStream, new ObjectMetadata());
                putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);

                amazonS3Client.putObject(putObjectRequest);
                return key;
            }
        }

        return null;
    }

    @Override
    @SneakyThrows
    public ResponseEntity<byte[]> download(String key) {
        GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, key);
        @Cleanup S3Object s3Object = amazonS3Client.getObject(getObjectRequest);
        @Cleanup S3ObjectInputStream objectInputStream = s3Object.getObjectContent();

        byte[] bytes = IOUtils.toByteArray(objectInputStream);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentLength(bytes.length);
        httpHeaders.setContentDispositionFormData("inline", null);

        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
    }
}
