package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.color.ColorResponse;
import com.BatWoman.BatWoman_backend.dto.color.CreateColorRequest;
import com.BatWoman.BatWoman_backend.dto.color.UpdateColorRequest;
import com.BatWoman.BatWoman_backend.entity.Color;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.ColorRepository;
import com.BatWoman.BatWoman_backend.repository.ProductVariantRepository;
import com.BatWoman.BatWoman_backend.service.ColorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ColorServiceImpl implements ColorService {

    private final ColorRepository colorRepository;
    private final ProductVariantRepository productVariantRepository;

    @Override
    public ColorResponse createColor(
            CreateColorRequest request) {

        String name =
                normalizeName(request.name());

        String code =
                normalizeCode(request.code());

        validateHexCode(request.hexCode());

        if (colorRepository.existsByNameIgnoreCase(name)) {

            throw new ValidationException(
                    "Color name already exists."
            );
        }

        if (colorRepository.existsByCode(code)) {

            throw new ValidationException(
                    "Color code already exists."
            );
        }

        Color color =
                Color.builder()
                        .id(UUID.randomUUID())
                        .name(name)
                        .code(code)
                        .hexCode(normalizeHexCode(request.hexCode()))
                        .active(true)
                        .displayOrder(
                                request.displayOrder() != null
                                        ? request.displayOrder()
                                        : 0
                        )
                        .createdAt(
                                OffsetDateTime.now()
                        )
                        .updatedAt(
                                OffsetDateTime.now()
                        )
                        .build();

        Color savedColor =
                colorRepository.save(color);

        return toResponse(savedColor);
    }

    @Override
    public ColorResponse updateColor(
            UUID colorId,
            UpdateColorRequest request) {

        Color color =
                colorRepository
                        .findById(colorId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Color not found."
                                )
                        );

        if (request.name() != null) {

            String name =
                    normalizeName(request.name());

            if (name.isBlank()) {

                throw new ValidationException(
                        "Color name cannot be blank."
                );
            }

            if (!name.equalsIgnoreCase(
                    color.getName()
            )
                    && colorRepository
                    .existsByNameIgnoreCase(name)) {

                throw new ValidationException(
                        "Color name already exists."
                );
            }

            color.setName(name);
        }

        if (request.code() != null) {

            String code =
                    normalizeCode(request.code());

            if (code.isBlank()) {

                throw new ValidationException(
                        "Color code cannot be blank."
                );
            }

            if (!code.equals(
                    color.getCode()
            )
                    && colorRepository
                    .existsByCode(code)) {

                throw new ValidationException(
                        "Color code already exists."
                );
            }

            color.setCode(code);
        }

        if (request.hexCode() != null) {

            validateHexCode(
                    request.hexCode()
            );

            color.setHexCode(
                    normalizeHexCode(
                            request.hexCode()
                    )
            );
        }

        if (request.displayOrder() != null) {

            if (request.displayOrder() < 0) {

                throw new ValidationException(
                        "Display order cannot be negative."
                );
            }

            color.setDisplayOrder(
                    request.displayOrder()
            );
        }

        if (request.active() != null) {

            color.setActive(
                    request.active()
            );
        }

        color.setUpdatedAt(
                OffsetDateTime.now()
        );

        Color updatedColor =
                colorRepository.save(color);

        return toResponse(updatedColor);
    }

    @Override
    public void deleteColor(
            UUID colorId) {

        Color color =
                colorRepository
                        .findById(colorId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Color not found."
                                )
                        );

        /*
         * A color cannot be physically deleted if it is already
         * referenced by a ProductVariant.
         *
         * This protects the foreign-key relationship and prevents
         * existing product variants from becoming invalid.
         */
        if (productVariantRepository
                .existsByColor_Id(colorId)) {

            throw new ValidationException(
                    "Cannot delete color \"" +
                            color.getName() +
                            "\" because it is currently used by one or more product variants. " +
                            "Deactivate it instead."
            );
        }

        colorRepository.delete(color);
    }

    @Override
    @Transactional
    public ColorResponse getColorById(
            UUID colorId) {

        Color color =
                colorRepository
                        .findById(colorId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Color not found."
                                )
                        );

        return toResponse(color);
    }

    @Override
    @Transactional
    public List<ColorResponse> getActiveColors() {

        return colorRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public List<ColorResponse> getAllColors() {

        return colorRepository
                .findAll()
                .stream()
                .sorted(
                        (a, b) -> {

                            int orderA =
                                    a.getDisplayOrder() != null
                                            ? a.getDisplayOrder()
                                            : 0;

                            int orderB =
                                    b.getDisplayOrder() != null
                                            ? b.getDisplayOrder()
                                            : 0;

                            return Integer.compare(
                                    orderA,
                                    orderB
                            );
                        }
                )
                .map(this::toResponse)
                .toList();
    }

    private ColorResponse toResponse(
            Color color) {

        return new ColorResponse(

                color.getId(),

                color.getName(),

                color.getCode(),

                color.getHexCode(),

                color.getActive(),

                color.getDisplayOrder(),

                color.getCreatedAt(),

                color.getUpdatedAt()
        );
    }

    private String normalizeName(
            String name) {

        if (name == null) {
            return "";
        }

        return name.trim();
    }

    private String normalizeCode(
            String code) {

        if (code == null) {
            return "";
        }

        return code.trim();
    }

    private String normalizeHexCode(
            String hexCode) {

        if (hexCode == null) {
            return null;
        }

        String normalized =
                hexCode.trim();

        if (normalized.isBlank()) {
            return null;
        }

        return normalized.toUpperCase();
    }

    private void validateHexCode(
            String hexCode) {

        if (hexCode == null
                || hexCode.isBlank()) {

            return;
        }

        String normalized =
                hexCode.trim();

        if (!normalized.matches(
                "^#[A-Fa-f0-9]{6}$"
        )) {

            throw new ValidationException(
                    "Hex code must be a valid 6-digit hexadecimal color in the format #RRGGBB."
            );
        }
    }
}