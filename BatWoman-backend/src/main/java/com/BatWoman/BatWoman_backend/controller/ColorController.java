package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.color.ColorResponse;
import com.BatWoman.BatWoman_backend.dto.color.CreateColorRequest;
import com.BatWoman.BatWoman_backend.dto.color.UpdateColorRequest;
import com.BatWoman.BatWoman_backend.service.ColorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/colors")
@RequiredArgsConstructor
public class ColorController {

    private final ColorService colorService;

    /*
     * Public endpoint.
     *
     * Product creation/customer product filtering should only
     * receive colors that are currently active.
     */
    @GetMapping
    public ResponseEntity<List<ColorResponse>> getActiveColors() {

        return ResponseEntity.ok(
                colorService.getActiveColors()
        );
    }

    /*
     * Admin endpoint.
     *
     * Returns both active and inactive colors.
     */
    @GetMapping("/admin")
    public ResponseEntity<List<ColorResponse>> getAllColors() {

        return ResponseEntity.ok(
                colorService.getAllColors()
        );
    }

    /*
     * Admin endpoint.
     */
    @GetMapping("/{colorId}")
    public ResponseEntity<ColorResponse> getColorById(
            @PathVariable UUID colorId) {

        return ResponseEntity.ok(
                colorService.getColorById(colorId)
        );
    }

    /*
     * Admin endpoint.
     */
    @PostMapping
    public ResponseEntity<ColorResponse> createColor(
            @Valid
            @RequestBody
            CreateColorRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        colorService.createColor(request)
                );
    }

    /*
     * Admin endpoint.
     */
    @PutMapping("/{colorId}")
    public ResponseEntity<ColorResponse> updateColor(
            @PathVariable UUID colorId,
            @Valid
            @RequestBody
            UpdateColorRequest request) {

        return ResponseEntity.ok(
                colorService.updateColor(
                        colorId,
                        request
                )
        );
    }

    /*
     * Admin endpoint.
     */
    @DeleteMapping("/{colorId}")
    public ResponseEntity<Void> deleteColor(
            @PathVariable UUID colorId) {

        colorService.deleteColor(colorId);

        return ResponseEntity.noContent().build();
    }
}