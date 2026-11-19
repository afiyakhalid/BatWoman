package com.BatWoman.BatWoman_backend.service.media;

import org.springframework.web.multipart.MultipartFile;

public interface MediaStorageService {

    MediaUploadResult uploadFile(MultipartFile file, String folder);

    void deleteFile(String objectKey);

    String getPublicUrl(String objectKey);
}
