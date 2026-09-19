package com.BatWoman.BatWoman_backend.dto.admin;

import com.BatWoman.BatWoman_backend.dto.common.PageResponse;

public record AdminInventoryPageResponse(

        PageResponse<AdminInventoryProductResponse> inventory,

        AdminInventorySummaryResponse summary

) {
}
