package com.BatWoman.BatWoman_backend.service;

public record S3UploadResult(
        String objectKey,
        String mediaUrl
) {
}