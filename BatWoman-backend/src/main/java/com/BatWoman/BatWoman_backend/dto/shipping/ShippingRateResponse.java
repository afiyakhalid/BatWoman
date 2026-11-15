
package com.BatWoman.BatWoman_backend.dto.shipping;

import java.math.BigDecimal;
import java.util.List;

public record ShippingRateResponse(

        List<CourierOption> availableCouriers

) {

    public record CourierOption(

            Integer courierCompanyId,

            String courierName,

            BigDecimal rate,

            String estimatedDeliveryDays,

            String estimatedDeliveryDate,

            BigDecimal rating

    ) {
    }
}

