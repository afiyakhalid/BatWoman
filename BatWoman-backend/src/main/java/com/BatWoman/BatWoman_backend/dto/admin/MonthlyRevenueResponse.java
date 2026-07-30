package com.BatWoman.BatWoman_backend.dto.admin;

import java.math.BigDecimal;

public record MonthlyRevenueResponse(

        String month,

        BigDecimal revenue

) {
}
