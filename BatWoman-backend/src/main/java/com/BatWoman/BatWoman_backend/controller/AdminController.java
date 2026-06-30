package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.admin.RestockInventoryRequest;
import com.BatWoman.BatWoman_backend.dto.admin.UpdateOrderStatusRequest;
import com.BatWoman.BatWoman_backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
}