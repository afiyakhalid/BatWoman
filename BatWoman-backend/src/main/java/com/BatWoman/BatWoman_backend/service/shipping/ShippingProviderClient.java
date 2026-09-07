package com.BatWoman.BatWoman_backend.service.shipping;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Shipment;

public interface ShippingProviderClient {

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