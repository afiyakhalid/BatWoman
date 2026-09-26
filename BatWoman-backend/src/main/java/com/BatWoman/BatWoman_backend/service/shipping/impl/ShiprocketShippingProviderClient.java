//package com.BatWoman.BatWoman_backend.service.shipping.impl;
//
//import com.BatWoman.BatWoman_backend.config.ShiprocketConfig;
//import com.BatWoman.BatWoman_backend.entity.Address;
//import com.BatWoman.BatWoman_backend.entity.Order;
//import com.BatWoman.BatWoman_backend.entity.OrderItem;
//import com.BatWoman.BatWoman_backend.entity.Shipment;
//import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
//import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
//import com.BatWoman.BatWoman_backend.service.shipping.ShiprocketAuthenticationService;
//import com.BatWoman.BatWoman_backend.service.shipping.ShippingProviderClient;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.core.ParameterizedTypeReference;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.math.BigDecimal;
//import java.time.OffsetDateTime;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class ShiprocketShippingProviderClient implements ShippingProviderClient {
//
//    private static final ParameterizedTypeReference<Map<String, Object>> MAP_TYPE =
//            new ParameterizedTypeReference<>() {};
//
//    private final RestTemplate restTemplate;
//    private final ShiprocketAuthenticationService authenticationService;
//    private final ShiprocketConfig properties;
//    private final ShipmentRepository shipmentRepository;
//
//    private static final String BASE_URL = "https://apiv2.shiprocket.in/v1/external";
//
//    // =========================================================
//    // CREATE SHIPMENT
//    // =========================================================
//
//    @Override
//    public void createShipment(Order order, Shipment shipment) {
//
//        String token = authenticationService.getAccessToken();
//        Map<String, Object> payload = buildCreateOrderPayload(order);
//
//        log.info("Creating Shiprocket order for BatWoman order {}", order.getOrderNumber());
//
//        HttpHeaders headers = createHeaders(token);
//        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);
//
//        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
//                BASE_URL + "/orders/create/adhoc",
//                HttpMethod.POST,
//                requestEntity,
//                MAP_TYPE
//        );
//
//        Map<String, Object> response = responseEntity.getBody();
//
//        if (response == null) {
//            throw new IllegalStateException("Shiprocket returned an empty response.");
//        }
//
//        log.info("Shiprocket order creation response for BatWoman order {}: {}", order.getOrderNumber(), response);
//
//        Object shiprocketOrderId = response.get("order_id");
//        Object shiprocketShipmentId = response.get("shipment_id");
//
//        if (shiprocketOrderId == null || shiprocketShipmentId == null) {
//            throw new IllegalStateException("Shiprocket order creation failed: " + response);
//        }
//
//        shipment.setStatus(ShipmentStatus.PROCESSING);
//        shipmentRepository.save(shipment);
//
//        assignAwb(token, shipment, shiprocketShipmentId);
//    }
//
//    // =========================================================
//    // UPDATE TRACKING
//    // =========================================================
//
//    @Override
//    public void updateTracking(Shipment shipment) {
//
//        String awbCode = shipment.getTrackingNumber();
//
//        if (awbCode == null || awbCode.isBlank()) {
//            throw new IllegalStateException("Cannot update tracking: shipment does not have an AWB/tracking number.");
//        }
//
//        String token = authenticationService.getAccessToken();
//
//        log.info("Fetching Shiprocket tracking for AWB {}", awbCode);
//
//        HttpHeaders headers = createHeaders(token);
//        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
//
//        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
//                BASE_URL + "/courier/track/awb/" + awbCode,
//                HttpMethod.GET,
//                requestEntity,
//                MAP_TYPE
//        );
//
//        Map<String, Object> response = responseEntity.getBody();
//
//        if (response == null) {
//            throw new IllegalStateException("Shiprocket returned an empty tracking response for AWB " + awbCode);
//        }
//
//        Object trackingDataObject = response.get("tracking_data");
//
//        if (!(trackingDataObject instanceof Map<?, ?> trackingData)) {
//            throw new IllegalStateException("Shiprocket tracking response does not contain tracking_data: " + response);
//        }
//
//        Object shipmentTrackObject = trackingData.get("shipment_track");
//
//        if (!(shipmentTrackObject instanceof List<?> shipmentTrack) || shipmentTrack.isEmpty()) {
//            log.warn("No shipment tracking information available for AWB {}", awbCode);
//            return;
//        }
//
//        Object firstTrackingObject = shipmentTrack.get(0);
//
//        if (!(firstTrackingObject instanceof Map<?, ?> tracking)) {
//            throw new IllegalStateException("Invalid shipment_track response from Shiprocket: " + shipmentTrack);
//        }
//
//        Object currentStatusObject = tracking.get("current_status");
//
//        if (currentStatusObject != null) {
//            String currentStatus = currentStatusObject.toString().trim().toUpperCase();
//            ShipmentStatus mappedStatus = mapShiprocketStatus(currentStatus);
//
//            if (mappedStatus != null) {
//                shipment.setStatus(mappedStatus);
//                log.info("Updated BatWoman shipment AWB {} status to {}", awbCode, mappedStatus);
//
//                if (mappedStatus == ShipmentStatus.SHIPPED && shipment.getShippedAt() == null) {
//                    shipment.setShippedAt(OffsetDateTime.now());
//                }
//
//                if (mappedStatus == ShipmentStatus.DELIVERED && shipment.getDeliveredAt() == null) {
//                    shipment.setDeliveredAt(OffsetDateTime.now());
//                }
//            }
//        }
//
//        Object returnedAwb = tracking.get("awb_code");
//        if (returnedAwb != null && !returnedAwb.toString().isBlank()) {
//            shipment.setTrackingNumber(returnedAwb.toString());
//        }
//
//        Object trackUrl = trackingData.get("track_url");
//        if (trackUrl != null && !trackUrl.toString().isBlank()) {
//            shipment.setTrackingUrl(trackUrl.toString());
//        }
//
//        Object courierName = tracking.get("courier_name");
//        if (courierName != null && !courierName.toString().isBlank()) {
//            shipment.setCarrier(courierName.toString());
//        }
//
//        Object expectedDelivery = trackingData.get("etd");
//        if (expectedDelivery != null && !expectedDelivery.toString().isBlank()) {
//            try {
//                shipment.setExpectedDelivery(OffsetDateTime.parse(expectedDelivery.toString()));
//            } catch (Exception exception) {
//                log.warn("Could not parse Shiprocket expected delivery date '{}' for AWB {}", expectedDelivery, awbCode);
//            }
//        }
//
//        shipmentRepository.save(shipment);
//        log.info("Shiprocket tracking updated successfully for AWB {}", awbCode);
//    }
//
//    // =========================================================
//    // CANCEL SHIPMENT
//    // =========================================================
//
//    @Override
//    public void cancelShipment(Shipment shipment) {
//
//        String awbCode = shipment.getTrackingNumber();
//
//        if (awbCode == null || awbCode.isBlank()) {
//            throw new IllegalStateException("Cannot cancel shipment: shipment does not have a Shiprocket AWB.");
//        }
//
//        if (shipment.getStatus() == ShipmentStatus.DELIVERED) {
//            throw new IllegalStateException("Cannot cancel a delivered shipment.");
//        }
//
//        if (shipment.getStatus() == ShipmentStatus.CANCELLED) {
//            log.info("Shipment with AWB {} is already cancelled.", awbCode);
//            return;
//        }
//
//        if (shipment.getStatus() == ShipmentStatus.OUT_FOR_DELIVERY) {
//            throw new IllegalStateException("Cannot cancel shipment " + awbCode + " because it is already out for delivery.");
//        }
//
//        if (shipment.getStatus() == ShipmentStatus.SHIPPED) {
//            throw new IllegalStateException("Cannot cancel shipment " + awbCode + " because it has already been shipped.");
//        }
//
//        if (shipment.getStatus() == ShipmentStatus.RETURNED) {
//            throw new IllegalStateException("Cannot cancel a returned shipment.");
//        }
//
//        String token = authenticationService.getAccessToken();
//        Map<String, Object> payload = Map.of("awbs", List.of(awbCode));
//
//        log.info("Requesting Shiprocket cancellation for AWB {}", awbCode);
//
//        HttpHeaders headers = createHeaders(token);
//        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);
//
//        restTemplate.exchange(
//                BASE_URL + "/orders/cancel/shipment/awbs",
//                HttpMethod.POST,
//                requestEntity,
//                Void.class
//        );
//
//        shipment.setStatus(ShipmentStatus.CANCELLED);
//        shipmentRepository.save(shipment);
//
//        log.info("Shiprocket shipment cancelled successfully for AWB {}", awbCode);
//    }
//
//    // =========================================================
//    // ASSIGN AWB
//    // =========================================================
//
//    private void assignAwb(String token, Shipment shipment, Object shiprocketShipmentId) {
//
//        Map<String, Object> payload = Map.of("shipment_id", shiprocketShipmentId);
//
//        log.info("Assigning courier/AWB for Shiprocket shipment {}", shiprocketShipmentId);
//
//        HttpHeaders headers = createHeaders(token);
//        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);
//
//        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
//                BASE_URL + "/courier/assign/awb",
//                HttpMethod.POST,
//                requestEntity,
//                MAP_TYPE
//        );
//
//        Map<String, Object> response = responseEntity.getBody();
//
//        if (response == null) {
//            throw new IllegalStateException("Shiprocket returned an empty AWB assignment response.");
//        }
//
//        log.info("Shiprocket AWB assignment response: {}", response);
//
//        Object awbCode = response.get("awb_code");
//        Object courierName = response.get("courier_name");
//
//        Object responseData = response.get("response");
//
//        if (responseData instanceof Map<?, ?> responseMap) {
//            if (awbCode == null) {
//                awbCode = responseMap.get("awb_code");
//            }
//            if (courierName == null) {
//                courierName = responseMap.get("courier_name");
//            }
//        }
//
//        if (awbCode != null && !awbCode.toString().isBlank()) {
//            shipment.setTrackingNumber(awbCode.toString());
//            log.info("AWB {} assigned to BatWoman shipment {}", awbCode, shipment.getId());
//        } else {
//            log.warn("Shiprocket did not return an AWB for shipment {}. Response: {}", shipment.getId(), response);
//        }
//
//        if (courierName != null && !courierName.toString().isBlank()) {
//            shipment.setCarrier(courierName.toString());
//        }
//
//        shipment.setStatus(ShipmentStatus.PROCESSING);
//        shipmentRepository.save(shipment);
//    }
//
//    // =========================================================
//    // HELPER METHODS
//    // =========================================================
//
//    private HttpHeaders createHeaders(String token) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(token);
//        return headers;
//    }
//
//    private ShipmentStatus mapShiprocketStatus(String status) {
//
//        if (status == null || status.isBlank()) {
//            return null;
//        }
//
//        String normalized = status.trim().toUpperCase();
//
//        if (normalized.contains("OUT FOR DELIVERY")) {
//            return ShipmentStatus.OUT_FOR_DELIVERY;
//        }
//
//        if (normalized.contains("DELIVER")) {
//            return ShipmentStatus.DELIVERED;
//        }
//
//        if (normalized.contains("RETURN") || normalized.contains("RTO")) {
//            return ShipmentStatus.RETURNED;
//        }
//
//        if (normalized.contains("CANCEL")) {
//            return ShipmentStatus.CANCELLED;
//        }
//
//        if (normalized.contains("PICKED UP")
//                || normalized.contains("SHIPPED")
//                || normalized.contains("IN TRANSIT")
//                || normalized.contains("DISPATCH")) {
//            return ShipmentStatus.SHIPPED;
//        }
//
//        if (normalized.contains("PACK") || normalized.contains("READY TO SHIP")) {
//            return ShipmentStatus.PACKED;
//        }
//
//        if (normalized.contains("MANIFEST")
//                || normalized.contains("PROCESS")
//                || normalized.contains("PICKUP")) {
//            return ShipmentStatus.PROCESSING;
//        }
//
//        log.warn("Unknown Shiprocket shipment status: {}", status);
//        return null;
//    }
//
//    private Map<String, Object> buildCreateOrderPayload(Order order) {
//
//        Map<String, Object> payload = new HashMap<>();
//        Address address = order.getAddress();
//
//        if (address == null) {
//            throw new IllegalStateException("Cannot create Shiprocket shipment: order has no shipping address.");
//        }
//
//        payload.put("order_id", order.getOrderNumber());
//        payload.put("order_date", order.getCreatedAt().toString());
//        payload.put("pickup_location", properties.getPickupLocation());
//
//        payload.put("billing_customer_name", address.getFullName());
//        payload.put("billing_address", address.getAddressLine1());
//
//        if (address.getAddressLine2() != null && !address.getAddressLine2().isBlank()) {
//            payload.put("billing_address_2", address.getAddressLine2());
//        }
//
//        payload.put("billing_city", address.getCity());
//        payload.put("billing_state", address.getState());
//        payload.put("billing_country", address.getCountry());
//        payload.put("billing_pincode", address.getPostalCode());
//        payload.put("billing_phone", address.getPhone());
//
//        payload.put("shipping_is_billing", true);
//        payload.put("shipping_customer_name", address.getFullName());
//        payload.put("shipping_address", address.getAddressLine1());
//
//        if (address.getAddressLine2() != null && !address.getAddressLine2().isBlank()) {
//            payload.put("shipping_address_2", address.getAddressLine2());
//        }
//
//        payload.put("shipping_city", address.getCity());
//        payload.put("shipping_state", address.getState());
//        payload.put("shipping_country", address.getCountry());
//        payload.put("shipping_pincode", address.getPostalCode());
//        payload.put("shipping_phone", address.getPhone());
//
//        List<Map<String, Object>> items = new ArrayList<>();
//
//        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
//            throw new IllegalStateException("Cannot create Shiprocket shipment: order has no order items.");
//        }
//
//        for (OrderItem item : order.getOrderItems()) {
//            Map<String, Object> shiprocketItem = new HashMap<>();
//
//            shiprocketItem.put("name", item.getVariantSku());
//            shiprocketItem.put("sku", item.getVariantSku());
//            shiprocketItem.put("units", item.getQuantity());
//            shiprocketItem.put("selling_price", item.getUnitPrice());
//            shiprocketItem.put("discount", BigDecimal.ZERO);
//
//            items.add(shiprocketItem);
//        }
//
//        payload.put("order_items", items);
//        payload.put("payment_method", "Prepaid");
//        payload.put("sub_total", order.getSubtotal());
//
//        return payload;
//    }
//}
package com.BatWoman.BatWoman_backend.service.shipping.impl;

import com.BatWoman.BatWoman_backend.config.ShiprocketConfig;
import com.BatWoman.BatWoman_backend.entity.Address;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.OrderItem;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
import com.BatWoman.BatWoman_backend.service.shipping.ShiprocketAuthenticationService;
import com.BatWoman.BatWoman_backend.service.shipping.ShippingProviderClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShiprocketShippingProviderClient implements ShippingProviderClient {

    private static final ParameterizedTypeReference<Map<String, Object>> MAP_TYPE =
            new ParameterizedTypeReference<>() {};

    private final RestTemplate restTemplate;
    private final ShiprocketAuthenticationService authenticationService;
    private final ShiprocketConfig properties;
    private final ShipmentRepository shipmentRepository;

    private static final String BASE_URL = "https://apiv2.shiprocket.in/v1/external";

    // =========================================================
    // CREATE SHIPMENT
    // =========================================================

    @Override
    public void createShipment(Order order, Shipment shipment) {

        String token = authenticationService.getAccessToken();
        Map<String, Object> payload = buildCreateOrderPayload(order);

        log.info("Creating Shiprocket order for BatWoman order {}", order.getOrderNumber());

        HttpHeaders headers = createHeaders(token);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                BASE_URL + "/orders/create/adhoc",
                HttpMethod.POST,
                requestEntity,
                MAP_TYPE
        );

        Map<String, Object> response = responseEntity.getBody();

        if (response == null) {
            throw new IllegalStateException("Shiprocket returned an empty response.");
        }

        log.info("Shiprocket order creation response for BatWoman order {}: {}", order.getOrderNumber(), response);

        Object shiprocketOrderId = response.get("order_id");
        Object shiprocketShipmentId = response.get("shipment_id");

        if (shiprocketOrderId == null || shiprocketShipmentId == null) {
            throw new IllegalStateException("Shiprocket order creation failed: " + response);
        }

        shipment.setStatus(ShipmentStatus.PROCESSING);
        shipmentRepository.save(shipment);

        assignAwb(token, shipment, shiprocketShipmentId);
    }

    // =========================================================
    // UPDATE TRACKING
    // =========================================================

    @Override
    public void updateTracking(Shipment shipment) {

        String awbCode = shipment.getTrackingNumber();

        if (awbCode == null || awbCode.isBlank()) {
            throw new IllegalStateException("Cannot update tracking: shipment does not have an AWB/tracking number.");
        }

        String token = authenticationService.getAccessToken();

        log.info("Fetching Shiprocket tracking for AWB {}", awbCode);

        HttpHeaders headers = createHeaders(token);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                BASE_URL + "/courier/track/awb/" + awbCode,
                HttpMethod.GET,
                requestEntity,
                MAP_TYPE
        );

        Map<String, Object> response = responseEntity.getBody();

        if (response == null) {
            throw new IllegalStateException("Shiprocket returned an empty tracking response for AWB " + awbCode);
        }

        Object trackingDataObject = response.get("tracking_data");

        if (!(trackingDataObject instanceof Map<?, ?> trackingData)) {
            throw new IllegalStateException("Shiprocket tracking response does not contain tracking_data: " + response);
        }

        Object shipmentTrackObject = trackingData.get("shipment_track");

        if (!(shipmentTrackObject instanceof List<?> shipmentTrack) || shipmentTrack.isEmpty()) {
            log.warn("No shipment tracking information available for AWB {}", awbCode);
            return;
        }

        Object firstTrackingObject = shipmentTrack.get(0);

        if (!(firstTrackingObject instanceof Map<?, ?> tracking)) {
            throw new IllegalStateException("Invalid shipment_track response from Shiprocket: " + shipmentTrack);
        }

        Object currentStatusObject = tracking.get("current_status");

        if (currentStatusObject != null) {
            String currentStatus = currentStatusObject.toString().trim().toUpperCase();
            ShipmentStatus mappedStatus = mapShiprocketStatus(currentStatus);

            if (mappedStatus != null) {
                shipment.setStatus(mappedStatus);
                log.info("Updated BatWoman shipment AWB {} status to {}", awbCode, mappedStatus);

                if (mappedStatus == ShipmentStatus.SHIPPED && shipment.getShippedAt() == null) {
                    shipment.setShippedAt(OffsetDateTime.now());
                }

                if (mappedStatus == ShipmentStatus.DELIVERED && shipment.getDeliveredAt() == null) {
                    shipment.setDeliveredAt(OffsetDateTime.now());
                }
            }
        }

        Object returnedAwb = tracking.get("awb_code");
        if (returnedAwb != null && !returnedAwb.toString().isBlank()) {
            shipment.setTrackingNumber(returnedAwb.toString());
        }

        Object trackUrl = trackingData.get("track_url");
        if (trackUrl != null && !trackUrl.toString().isBlank()) {
            shipment.setTrackingUrl(trackUrl.toString());
        }

        Object courierName = tracking.get("courier_name");
        if (courierName != null && !courierName.toString().isBlank()) {
            shipment.setCarrier(courierName.toString());
        }

        Object expectedDelivery = trackingData.get("etd");
        if (expectedDelivery != null && !expectedDelivery.toString().isBlank()) {
            try {
                shipment.setExpectedDelivery(OffsetDateTime.parse(expectedDelivery.toString()));
            } catch (Exception exception) {
                log.warn("Could not parse Shiprocket expected delivery date '{}' for AWB {}", expectedDelivery, awbCode);
            }
        }

        shipmentRepository.save(shipment);
        log.info("Shiprocket tracking updated successfully for AWB {}", awbCode);
    }

    // =========================================================
    // CANCEL SHIPMENT
    // =========================================================

    @Override
    public void cancelShipment(Shipment shipment) {

        String awbCode = shipment.getTrackingNumber();

        if (awbCode == null || awbCode.isBlank()) {
            throw new IllegalStateException("Cannot cancel shipment: shipment does not have a Shiprocket AWB.");
        }

        if (shipment.getStatus() == ShipmentStatus.DELIVERED) {
            throw new IllegalStateException("Cannot cancel a delivered shipment.");
        }

        if (shipment.getStatus() == ShipmentStatus.CANCELLED) {
            log.info("Shipment with AWB {} is already cancelled.", awbCode);
            return;
        }

        if (shipment.getStatus() == ShipmentStatus.OUT_FOR_DELIVERY) {
            throw new IllegalStateException("Cannot cancel shipment " + awbCode + " because it is already out for delivery.");
        }

        if (shipment.getStatus() == ShipmentStatus.SHIPPED) {
            throw new IllegalStateException("Cannot cancel shipment " + awbCode + " because it has already been shipped.");
        }

        if (shipment.getStatus() == ShipmentStatus.RETURNED) {
            throw new IllegalStateException("Cannot cancel a returned shipment.");
        }

        String token = authenticationService.getAccessToken();
        Map<String, Object> payload = Map.of("awbs", List.of(awbCode));

        log.info("Requesting Shiprocket cancellation for AWB {}", awbCode);

        HttpHeaders headers = createHeaders(token);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

        restTemplate.exchange(
                BASE_URL + "/orders/cancel/shipment/awbs",
                HttpMethod.POST,
                requestEntity,
                Void.class
        );

        shipment.setStatus(ShipmentStatus.CANCELLED);
        shipmentRepository.save(shipment);

        log.info("Shiprocket shipment cancelled successfully for AWB {}", awbCode);
    }

    // =========================================================
    // ASSIGN AWB
    // =========================================================

    private void assignAwb(String token, Shipment shipment, Object shiprocketShipmentId) {

        Map<String, Object> payload = Map.of("shipment_id", shiprocketShipmentId);

        log.info("Assigning courier/AWB for Shiprocket shipment {}", shiprocketShipmentId);

        HttpHeaders headers = createHeaders(token);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                BASE_URL + "/courier/assign/awb",
                HttpMethod.POST,
                requestEntity,
                MAP_TYPE
        );

        Map<String, Object> response = responseEntity.getBody();

        if (response == null) {
            throw new IllegalStateException("Shiprocket returned an empty AWB assignment response.");
        }

        log.info("Shiprocket AWB assignment response: {}", response);

        Object awbCode = response.get("awb_code");
        Object courierName = response.get("courier_name");

        Object responseData = response.get("response");

        if (responseData instanceof Map<?, ?> responseMap) {
            if (awbCode == null) {
                awbCode = responseMap.get("awb_code");
            }
            if (courierName == null) {
                courierName = responseMap.get("courier_name");
            }
        }

        // -----------------------------------------------------
        // Save AWB
        // -----------------------------------------------------
        if (awbCode != null && !awbCode.toString().isBlank()) {
            shipment.setTrackingNumber(awbCode.toString());
            log.info("AWB {} assigned to BatWoman shipment {}", awbCode, shipment.getId());
        } else {
            log.warn("Shiprocket did not return an AWB for shipment {}. Response: {}", shipment.getId(), response);
            shipmentRepository.save(shipment);
            return;
        }

        // -----------------------------------------------------
        // Save courier
        // -----------------------------------------------------
        if (courierName != null && !courierName.toString().isBlank()) {
            shipment.setCarrier(courierName.toString());
        }

        // -----------------------------------------------------
        // Save shipment
        // -----------------------------------------------------
        shipment.setStatus(ShipmentStatus.PROCESSING);
        shipmentRepository.save(shipment);

        // -----------------------------------------------------
        // AWB assigned → request pickup
        // -----------------------------------------------------
        generatePickup(token, shiprocketShipmentId);
    }

    // =========================================================
    // GENERATE PICKUP
    // =========================================================

    private void generatePickup(String token, Object shiprocketShipmentId) {

        if (shiprocketShipmentId == null) {
            throw new IllegalStateException("Cannot generate pickup: Shiprocket shipment ID is missing.");
        }

        Map<String, Object> payload = Map.of(
                "shipment_id", List.of(shiprocketShipmentId)
        );

        log.info("Requesting Shiprocket pickup for shipment {}", shiprocketShipmentId);

        HttpHeaders headers = createHeaders(token);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                BASE_URL + "/courier/generate/pickup",
                HttpMethod.POST,
                requestEntity,
                MAP_TYPE
        );

        Map<String, Object> response = responseEntity.getBody();

        if (response == null) {
            throw new IllegalStateException("Shiprocket returned an empty pickup response.");
        }

        log.info("Shiprocket pickup response for shipment {}: {}", shiprocketShipmentId, response);
    }

    // =========================================================
    // HELPER METHODS
    // =========================================================

    private HttpHeaders createHeaders(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);
        return headers;
    }

    private ShipmentStatus mapShiprocketStatus(String status) {

        if (status == null || status.isBlank()) {
            return null;
        }

        String normalized = status.trim().toUpperCase();

        if (normalized.contains("OUT FOR DELIVERY")) {
            return ShipmentStatus.OUT_FOR_DELIVERY;
        }

        if (normalized.contains("DELIVER")) {
            return ShipmentStatus.DELIVERED;
        }

        if (normalized.contains("RETURN") || normalized.contains("RTO")) {
            return ShipmentStatus.RETURNED;
        }

        if (normalized.contains("CANCEL")) {
            return ShipmentStatus.CANCELLED;
        }

        if (normalized.contains("PICKED UP")
                || normalized.contains("SHIPPED")
                || normalized.contains("IN TRANSIT")
                || normalized.contains("DISPATCH")) {
            return ShipmentStatus.SHIPPED;
        }

        if (normalized.contains("PACK") || normalized.contains("READY TO SHIP")) {
            return ShipmentStatus.PACKED;
        }

        if (normalized.contains("MANIFEST")
                || normalized.contains("PROCESS")
                || normalized.contains("PICKUP")) {
            return ShipmentStatus.PROCESSING;
        }

        log.warn("Unknown Shiprocket shipment status: {}", status);
        return null;
    }

    private Map<String, Object> buildCreateOrderPayload(Order order) {

        Map<String, Object> payload = new HashMap<>();

        Address address = order.getAddress();

        if (address == null) {
            throw new IllegalStateException(
                    "Cannot create Shiprocket shipment: order has no shipping address."
            );
        }

        // =========================================================
        // ORDER DETAILS
        // =========================================================

        payload.put("order_id", order.getOrderNumber());
        payload.put("order_date", order.getCreatedAt().toString());

        String pickupLocation = properties.getPickupLocation();

        if (pickupLocation == null || pickupLocation.isBlank()) {
            throw new IllegalStateException(
                    "Shiprocket pickup location is not configured."
            );
        }

        payload.put("pickup_location", pickupLocation);

        // =========================================================
        // CUSTOMER NAME
        // =========================================================

        String fullName = address.getFullName();

        if (fullName == null || fullName.isBlank()) {
            throw new IllegalStateException(
                    "Cannot create Shiprocket shipment: customer name is missing."
            );
        }

        String trimmedName = fullName.trim();

        String firstName;
        String lastName;

        int firstSpace = trimmedName.indexOf(' ');

        if (firstSpace > 0 && firstSpace < trimmedName.length() - 1) {

            firstName = trimmedName.substring(0, firstSpace).trim();
            lastName = trimmedName.substring(firstSpace + 1).trim();

        } else {

            firstName = trimmedName;
            lastName = "Customer";
        }

        payload.put("billing_customer_name", firstName);
        payload.put("billing_last_name", lastName);

        // =========================================================
        // BILLING ADDRESS
        // =========================================================

        payload.put("billing_address", address.getAddressLine1());

        if (address.getAddressLine2() != null
                && !address.getAddressLine2().isBlank()) {

            payload.put(
                    "billing_address_2",
                    address.getAddressLine2()
            );
        }

        payload.put("billing_city", address.getCity());
        payload.put("billing_state", address.getState());
        payload.put("billing_country", address.getCountry());
        payload.put("billing_pincode", address.getPostalCode());
        payload.put("billing_phone", address.getPhone());

        // =========================================================
        // SHIPPING ADDRESS
        // =========================================================

        payload.put("shipping_is_billing", true);
        payload.put("shipping_customer_name", firstName);
        payload.put("shipping_address", address.getAddressLine1());

        if (address.getAddressLine2() != null
                && !address.getAddressLine2().isBlank()) {

            payload.put(
                    "shipping_address_2",
                    address.getAddressLine2()
            );
        }

        payload.put("shipping_city", address.getCity());
        payload.put("shipping_state", address.getState());
        payload.put("shipping_country", address.getCountry());
        payload.put("shipping_pincode", address.getPostalCode());
        payload.put("shipping_phone", address.getPhone());

        // =========================================================
        // ORDER ITEMS
        // =========================================================

        List<Map<String, Object>> items = new ArrayList<>();

        if (order.getOrderItems() == null
                || order.getOrderItems().isEmpty()) {

            throw new IllegalStateException(
                    "Cannot create Shiprocket shipment: order has no order items."
            );
        }

        for (OrderItem item : order.getOrderItems()) {

            Map<String, Object> shiprocketItem = new HashMap<>();

            shiprocketItem.put(
                    "name",
                    item.getProduct().getName()
            );

            shiprocketItem.put(
                    "sku",
                    item.getVariantSku()
            );

            shiprocketItem.put(
                    "units",
                    item.getQuantity()
            );

            shiprocketItem.put(
                    "selling_price",
                    item.getUnitPrice()
            );

            shiprocketItem.put(
                    "discount",
                    BigDecimal.ZERO
            );

            items.add(shiprocketItem);
        }

        payload.put("order_items", items);

        // =========================================================
        // PAYMENT
        // =========================================================

        payload.put("payment_method", "Prepaid");

        // =========================================================
        // ORDER TOTALS
        // =========================================================

        payload.put(
                "sub_total",
                order.getSubtotal()
        );

        if (order.getDiscount() != null) {
            payload.put(
                    "total_discount",
                    order.getDiscount()
            );
        } else {
            payload.put(
                    "total_discount",
                    BigDecimal.ZERO
            );
        }

        // =========================================================
        // PACKAGE DETAILS
        // =========================================================
        /*
         * Temporary package defaults.
         *
         * These values are required by Shiprocket.
         * Replace them with your actual packaging measurements
         * before production shipping.
         *
         * Dimensions are in centimeters.
         * Weight is in kilograms.
         */

        payload.put("length", 20);
        payload.put("breadth", 20);
        payload.put("height", 10);
        payload.put("weight", 0.5);

        return payload;
    }
}