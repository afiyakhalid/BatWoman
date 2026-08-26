package com.BatWoman.BatWoman_backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

    S3UploadResult uploadFile(
            MultipartFile file,
            String folder
    );

    void deleteFile(String objectKey);

    String generatePresignedUrl(String objectKey);
}