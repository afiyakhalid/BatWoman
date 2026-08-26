package com.BatWoman.BatWoman_backend.service.media;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class MediaValidator {

    private static final long MAX_IMAGE_SIZE =
            10 * 1024 * 1024;

    private static final long MAX_VIDEO_SIZE =
            100 * 1024 * 1024;

    public void validate(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "File cannot be empty."
            );
        }

        String contentType = file.getContentType();

        if (contentType == null) {
            throw new IllegalArgumentException(
                    "Unknown file type."
            );
        }

        if (contentType.startsWith("image/")) {

            if (file.getSize() > MAX_IMAGE_SIZE) {
                throw new IllegalArgumentException(
                        "Image exceeds 10MB."
                );
            }

            return;
        }

        if (contentType.startsWith("video/")) {

            if (file.getSize() > MAX_VIDEO_SIZE) {
                throw new IllegalArgumentException(
                        "Video exceeds 100MB."
                );
            }

            return;
        }

        throw new IllegalArgumentException(
                "Unsupported media type."
        );
    }
}