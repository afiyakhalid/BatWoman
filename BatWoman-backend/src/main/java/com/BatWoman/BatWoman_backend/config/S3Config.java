
package com.BatWoman.BatWoman_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config {

    @Value("${aws.region}")
    private String region;

    @Bean
    @Profile("dev")
    public S3Client devS3Client(
            @Value("${aws.access-key}") String accessKey,
            @Value("${aws.secret-key}") String secretKey
    ) {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(
                                        accessKey, secretKey
                                )
                        )
                )
                .build();
    }

    @Bean
    @Profile("dev")
    public S3Presigner devS3Presigner(
            @Value("${aws.access-key}") String accessKey,
            @Value("${aws.secret-key}") String secretKey
    ) {
        return S3Presigner.builder()
                .region(Region.of(region))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(
                                        accessKey, secretKey
                                )
                        )
                )
                .build();
    }

    @Bean
    @Profile("prod")
    public S3Client prodS3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .build();
    }

    @Bean
    @Profile("prod")
    public S3Presigner prodS3Presigner() {
        return S3Presigner.builder()
                .region(Region.of(region))
                .build();
    }
}
