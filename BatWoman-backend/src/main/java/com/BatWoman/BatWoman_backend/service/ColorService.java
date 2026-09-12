package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.color.ColorResponse;
import com.BatWoman.BatWoman_backend.dto.color.CreateColorRequest;
import com.BatWoman.BatWoman_backend.dto.color.UpdateColorRequest;

import java.util.List;
import java.util.UUID;

public interface ColorService {

    ColorResponse createColor(
            CreateColorRequest request
    );

    ColorResponse updateColor(
            UUID colorId,
            UpdateColorRequest request
    );

    void deleteColor(
            UUID colorId
    );

    ColorResponse getColorById(
            UUID colorId
    );

    List<ColorResponse> getActiveColors();

    List<ColorResponse> getAllColors();

}