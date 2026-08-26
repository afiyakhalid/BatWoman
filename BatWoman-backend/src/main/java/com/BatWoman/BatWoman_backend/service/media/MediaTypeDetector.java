package com.BatWoman.BatWoman_backend.service.media;

import com.BatWoman.BatWoman_backend.enums.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class MediaTypeDetector {

    public MediaType detect(MultipartFile file) {

        String contentType = file.getContentType();

        if (contentType == null) {
            throw new IllegalArgumentException("Unable to detect file type.");
        }

        if (contentType.startsWith("image/")) {
            return MediaType.IMAGE;
        }

        if (contentType.startsWith("video/")) {
            return MediaType.VIDEO;
        }

        throw new IllegalArgumentException(
                "Unsupported media type: " + contentType
        );
    }
}