
package com.BatWoman.BatWoman_backend.service.shipping;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.dto.shipping.ShippingRateRequest;
import com.BatWoman.BatWoman_backend.dto.shipping.ShippingRateResponse;

public interface ShippingProviderClient {

    ShippingRateResponse getShippingRates(
            ShippingRateRequest request
    );

    void createShipment(
            Order order,
            Shipment shipment
    );

    void updateTracking(
            Shipment shipment
    );

    void cancelShipment(
            Shipment shipment
    );

}
