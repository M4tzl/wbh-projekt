package com.github.dmn1k.tfm.infrastructure;

import com.amazonaws.auth.ContainerCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("prod")
@Configuration
public class AwsConfiguration {
    @Bean
    public AmazonS3 amazonS3Client() {
        return AmazonS3ClientBuilder.standard()
            .withCredentials(new ContainerCredentialsProvider())
            .build();
    }
}
