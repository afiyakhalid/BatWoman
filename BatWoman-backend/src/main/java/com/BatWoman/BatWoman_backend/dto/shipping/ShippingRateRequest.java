
package com.BatWoman.BatWoman_backend.dto.shipping;

import java.math.BigDecimal;

public record ShippingRateRequest(

        String pickupPostcode,

        String deliveryPostcode,

        BigDecimal weight,

        boolean cod,

        BigDecimal declaredValue

) {
}

