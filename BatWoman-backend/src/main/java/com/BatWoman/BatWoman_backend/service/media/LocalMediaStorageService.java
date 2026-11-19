package com.BatWoman.BatWoman_backend.service.media;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class LocalMediaStorageService implements MediaStorageService {

    private static final Pattern SAFE_FOLDER_SEGMENT =
            Pattern.compile("[A-Za-z0-9_-]{1,100}");

    private static final Pattern SAFE_FILE_SEGMENT =
            Pattern.compile("[A-Za-z0-9._-]{1,150}");

    private final MediaStorageProperties properties;

    @Override
    public MediaUploadResult uploadFile(MultipartFile file, String folder) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store an empty media file.");
        }

        String safeFolder = validateFolder(folder);
        String extension = extensionFor(file.getContentType());
        String objectKey = safeFolder + "/" + UUID.randomUUID() + extension;
        Path destination = resolveObjectKey(objectKey);
        Path temporaryFile = null;

        try {
            Files.createDirectories(destination.getParent());
            setDirectoryPermissions(destination.getParent());
            temporaryFile = Files.createTempFile(
                    destination.getParent(),
                    ".upload-",
                    ".tmp"
            );

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(
                        inputStream,
                        temporaryFile,
                        StandardCopyOption.REPLACE_EXISTING
                );
            }

            try {
                Files.move(
                        temporaryFile,
                        destination,
                        StandardCopyOption.ATOMIC_MOVE
                );
            } catch (AtomicMoveNotSupportedException ignored) {
                Files.move(
                        temporaryFile,
                        destination,
                        StandardCopyOption.REPLACE_EXISTING
                );
            }

            setFilePermissions(destination);
            return new MediaUploadResult(objectKey, getPublicUrl(objectKey));
        } catch (IOException exception) {
            if (temporaryFile != null) {
                try {
                    Files.deleteIfExists(temporaryFile);
                } catch (IOException cleanupException) {
                    exception.addSuppressed(cleanupException);
                }
            }
            throw new IllegalStateException("Failed to store media file.", exception);
        }
    }

    @Override
    public void deleteFile(String objectKey) {
        if (objectKey == null || objectKey.isBlank()) {
            return;
        }

        try {
            Files.deleteIfExists(resolveObjectKey(objectKey));
        } catch (IOException exception) {
            throw new IllegalStateException("Failed to delete stored media file.", exception);
        }
    }

    @Override
    public String getPublicUrl(String objectKey) {
        if (objectKey == null || objectKey.isBlank()) {
            return null;
        }

        String safeKey = validateObjectKey(objectKey);
        String baseUrl = properties.getPublicBaseUrl();
        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalStateException("Media public base URL is not configured.");
        }

        return baseUrl.replaceAll("/+$", "") + "/" + safeKey;
    }

    private Path resolveObjectKey(String objectKey) {
        String safeKey = validateObjectKey(objectKey);
        Path root = properties.getBasePath().toAbsolutePath().normalize();
        Path resolved = root.resolve(safeKey).normalize();

        if (!resolved.startsWith(root)) {
            throw new IllegalArgumentException("Invalid media object key.");
        }

        return resolved;
    }

    private String validateFolder(String folder) {
        if (folder == null || folder.isBlank()) {
            throw new IllegalArgumentException("Media folder is required.");
        }

        String normalized = folder.replace('\\', '/');
        String[] segments = normalized.split("/");
        StringBuilder result = new StringBuilder();

        for (String segment : segments) {
            if (segment.isBlank()) {
                continue;
            }
            if (!SAFE_FOLDER_SEGMENT.matcher(segment).matches()) {
                throw new IllegalArgumentException("Invalid media folder.");
            }
            if (result.length() > 0) {
                result.append('/');
            }
            result.append(segment);
        }

        if (result.isEmpty()) {
            throw new IllegalArgumentException("Media folder is required.");
        }

        return result.toString();
    }

    private String validateObjectKey(String objectKey) {
        String normalized = objectKey.replace('\\', '/');
        String[] segments = normalized.split("/");
        StringBuilder result = new StringBuilder();

        for (String segment : segments) {
            if (segment.isBlank() || segment.equals(".") || segment.equals("..")
                    || !SAFE_FILE_SEGMENT.matcher(segment).matches()) {
                throw new IllegalArgumentException("Invalid media object key.");
            }
            if (result.length() > 0) {
                result.append('/');
            }
            result.append(segment);
        }

        if (result.isEmpty()) {
            throw new IllegalArgumentException("Media object key is required.");
        }

        return result.toString();
    }

    private void setDirectoryPermissions(Path directory) {
        try {
            Files.setPosixFilePermissions(
                    directory,
                    PosixFilePermissions.fromString("rwxr-xr-x")
            );
        } catch (UnsupportedOperationException | IOException ignored) {
            // Non-POSIX filesystems use their platform defaults.
        }
    }

    private void setFilePermissions(Path file) {
        try {
            Files.setPosixFilePermissions(
                    file,
                    PosixFilePermissions.fromString("rw-r--r--")
            );
        } catch (UnsupportedOperationException | IOException ignored) {
            // Non-POSIX filesystems use their platform defaults.
        }
    }

    private String extensionFor(String contentType) {
        if (contentType == null) {
            throw new IllegalArgumentException("Media content type is required.");
        }

        return switch (contentType.toLowerCase(Locale.ROOT)) {
            case "image/jpeg" -> ".jpg";
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            case "image/gif" -> ".gif";
            case "video/mp4" -> ".mp4";
            case "video/webm" -> ".webm";
            default -> throw new IllegalArgumentException("Unsupported media content type.");
        };
    }
}
