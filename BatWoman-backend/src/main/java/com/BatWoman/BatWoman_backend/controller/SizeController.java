package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.size.SizeResponse;
import com.BatWoman.BatWoman_backend.entity.Size;
import com.BatWoman.BatWoman_backend.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sizes")
public class SizeController {

    private final SizeRepository sizeRepository;

    @GetMapping
    public List<SizeResponse> getActiveSizes() {
        return sizeRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private SizeResponse toResponse(Size size) {
        return new SizeResponse(
                size.getId(),
                size.getLabel(),
                size.getNumericValue()
        );
    }
}