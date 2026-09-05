package com.BatWoman.BatWoman_backend.service.shipping;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import org.springframework.stereotype.Service;

@Service
public class ShiprocketService implements ShippingProviderClient {

    @Override
    public void createShipment(
            Order order,
            Shipment shipment
    ) {
        /*
         * Shiprocket API integration will be implemented
         * in Phase 2.
         */
    }

    @Override
    public void updateTracking(
            Shipment shipment
    ) {
        /*
         * Shiprocket tracking API integration will be
         * implemented in Phase 2.
         */
    }

    @Override
    public void cancelShipment(
            Shipment shipment
    ) {
        /*
         * Shiprocket cancellation API integration will be
         * implemented in Phase 2.
         */
    }
}