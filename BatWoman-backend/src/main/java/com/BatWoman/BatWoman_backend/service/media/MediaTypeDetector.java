package com.BatWoman.BatWoman_backend.service.media;

import com.BatWoman.BatWoman_backend.enums.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Locale;

@Component
public class MediaTypeDetector {

    public MediaType detect(MultipartFile file) {
        if (file == null || file.getContentType() == null) {
            throw new IllegalArgumentException("Unable to detect file type.");
        }

        return switch (file.getContentType().toLowerCase(Locale.ROOT)) {
            case "image/jpeg", "image/png", "image/webp", "image/gif" -> MediaType.IMAGE;
            case "video/mp4", "video/webm" -> MediaType.VIDEO;
            default -> throw new IllegalArgumentException("Unsupported media type.");
        };
    }
}
