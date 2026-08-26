package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductMediaService {

    void uploadFiles(
            Product product,
            List<MultipartFile> files
    );

    void deleteMedia(UUID mediaId);

    void deleteAllMedia(Product product);

}