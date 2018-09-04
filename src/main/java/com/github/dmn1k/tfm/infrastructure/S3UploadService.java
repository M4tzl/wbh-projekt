package com.github.dmn1k.tfm.infrastructure;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.Cleanup;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Profile("prod")
@Service
public class S3UploadService implements UploadService {
    private static final String CONTENT_TYPE = "content-type";
    private static final String FILE_NAME = "fileName";

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    @Override
    @SneakyThrows
    public String upload(MultipartFile multipartFile) {
        if (!StringUtils.isEmpty(multipartFile.getOriginalFilename())) {
            @Cleanup InputStream inputStream = multipartFile.getInputStream();

            String key = UUID.randomUUID().toString();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.addUserMetadata(CONTENT_TYPE, multipartFile.getContentType());
            metadata.addUserMetadata(FILE_NAME, multipartFile.getOriginalFilename());
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket,
                key, inputStream, metadata);
            putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);

            amazonS3Client.putObject(putObjectRequest);
            return key;
        }

        return null;
    }

    @Override
    @SneakyThrows
    public ResponseEntity<byte[]> download(String key) {
        GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, key);
        @Cleanup S3Object s3Object = amazonS3Client.getObject(getObjectRequest);
        @Cleanup S3ObjectInputStream objectInputStream = s3Object.getObjectContent();

        ObjectMetadata objectMetadata = s3Object.getObjectMetadata();

        byte[] bytes = IOUtils.toByteArray(objectInputStream);

        String metadataContentType = objectMetadata.getUserMetaDataOf(CONTENT_TYPE);
        MediaType contentType = metadataContentType == null
            ? MediaType.APPLICATION_OCTET_STREAM
            : MediaType.parseMediaType(metadataContentType);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(contentType);
        httpHeaders.setContentLength(bytes.length);
        httpHeaders.setContentDisposition(ContentDisposition.builder("inline")
            .filename(objectMetadata.getUserMetaDataOf(FILE_NAME))
            .build());

        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
    }
}
