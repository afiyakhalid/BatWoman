package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.admin.InventoryResponse;
import com.BatWoman.BatWoman_backend.dto.admin.RestockInventoryRequest;
import com.BatWoman.BatWoman_backend.dto.admin.UpdateOrderStatusRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;
import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;
import com.BatWoman.BatWoman_backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import com.BatWoman.BatWoman_backend.dto.admin.CustomerResponse;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/inventory/restock")
    public ResponseEntity<Void> restockInventory(

            @Valid @RequestBody RestockInventoryRequest request) {

        adminService.restockInventory(request);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Void> updateOrderStatus(

            @PathVariable UUID orderId,

            @Valid @RequestBody UpdateOrderStatusRequest request) {

        adminService.updateOrderStatus(
                orderId,
                request
        );

        return ResponseEntity.ok().build();
    }
    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                adminService.getAllOrders()
        );
    }
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(

            @PathVariable UUID orderId) {

        return ResponseEntity.ok(
                adminService.getOrderById(orderId)
        );
    }
    @GetMapping("/payments")
    public ResponseEntity<List<PaymentResponse>> getAllPayments() {

        return ResponseEntity.ok(
                adminService.getAllPayments()
        );
    }

    @GetMapping("/payments/{paymentId}")
    public ResponseEntity<PaymentResponse> getPaymentById(
            @PathVariable UUID paymentId) {

        return ResponseEntity.ok(
                adminService.getPaymentById(paymentId)
        );
    }
    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryResponse>> getAllInventory() {
        return ResponseEntity.ok(adminService.getAllInventory());
    }

    @GetMapping("/inventory/{productId}")
    public ResponseEntity<InventoryResponse> getInventory(
            @PathVariable UUID productId) {
        return ResponseEntity.ok(adminService.getInventory(productId));
    }
    @GetMapping("/customers")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {

        return ResponseEntity.ok(
                adminService.getAllCustomers()
        );
    }

    @GetMapping("/customers/{customerId}")
    public ResponseEntity<CustomerResponse> getCustomerById(

            @PathVariable UUID customerId) {

        return ResponseEntity.ok(
                adminService.getCustomerById(customerId)
        );
    }

}