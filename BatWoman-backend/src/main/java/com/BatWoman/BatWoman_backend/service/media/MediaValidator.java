package com.BatWoman.BatWoman_backend.service.media;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;

@Component
public class MediaValidator {

    private static final long MAX_IMAGE_SIZE = 10L * 1024 * 1024;
    private static final long MAX_VIDEO_SIZE = 100L * 1024 * 1024;

    public void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty.");
        }

        String contentType = file.getContentType();
        if (contentType == null) {
            throw new IllegalArgumentException("Unknown file type.");
        }

        String normalizedType = contentType.toLowerCase(Locale.ROOT);
        long maximumSize;
        switch (normalizedType) {
            case "image/jpeg", "image/png", "image/webp", "image/gif" ->
                    maximumSize = MAX_IMAGE_SIZE;
            case "video/mp4", "video/webm" -> maximumSize = MAX_VIDEO_SIZE;
            default -> throw new IllegalArgumentException("Unsupported media type.");
        }

        if (file.getSize() > maximumSize) {
            throw new IllegalArgumentException(
                    normalizedType.startsWith("image/")
                            ? "Image exceeds 10MB."
                            : "Video exceeds 100MB."
            );
        }

        validateSignature(file, normalizedType);
    }

    private void validateSignature(MultipartFile file, String contentType) {
        try (InputStream inputStream = file.getInputStream()) {
            byte[] header = inputStream.readNBytes(12);
            boolean valid = switch (contentType) {
                case "image/jpeg" -> startsWith(header, 0xFF, 0xD8, 0xFF);
                case "image/png" -> startsWith(
                        header, 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
                );
                case "image/gif" -> startsWithAscii(header, "GIF87a")
                        || startsWithAscii(header, "GIF89a");
                case "image/webp" -> startsWithAscii(header, "RIFF")
                        && containsAscii(header, 8, "WEBP");
                case "video/mp4" -> containsAscii(header, 4, "ftyp");
                case "video/webm" -> startsWith(
                        header, 0x1A, 0x45, 0xDF, 0xA3
                );
                default -> false;
            };

            if (!valid) {
                throw new IllegalArgumentException(
                        "File contents do not match the declared media type."
                );
            }
        } catch (IOException exception) {
            throw new IllegalArgumentException("Unable to inspect uploaded media.", exception);
        }
    }

    private boolean startsWith(byte[] data, int... expected) {
        if (data.length < expected.length) {
            return false;
        }
        for (int index = 0; index < expected.length; index++) {
            if ((data[index] & 0xFF) != expected[index]) {
                return false;
            }
        }
        return true;
    }

    private boolean startsWithAscii(byte[] data, String expected) {
        return containsAscii(data, 0, expected);
    }

    private boolean containsAscii(byte[] data, int offset, String expected) {
        if (data.length < offset + expected.length()) {
            return false;
        }
        for (int index = 0; index < expected.length(); index++) {
            if (data[offset + index] != (byte) expected.charAt(index)) {
                return false;
            }
        }
        return true;
    }
}
