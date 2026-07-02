package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.address.AddressResponse;
import com.BatWoman.BatWoman_backend.dto.address.CreateAddressRequest;
import com.BatWoman.BatWoman_backend.dto.address.UpdateAddressRequest;
import com.BatWoman.BatWoman_backend.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressResponse> createAddress(
            @Valid @RequestBody CreateAddressRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addressService.createAddress(request));
    }

    @GetMapping
    public ResponseEntity<List<AddressResponse>> getMyAddresses() {

        return ResponseEntity.ok(
                addressService.getMyAddresses()
        );
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressResponse> getAddressById(
            @PathVariable UUID addressId) {

        return ResponseEntity.ok(
                addressService.getAddressById(addressId)
        );
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponse> updateAddress(
            @PathVariable UUID addressId,
            @Valid @RequestBody UpdateAddressRequest request) {

        return ResponseEntity.ok(
                addressService.updateAddress(addressId, request)
        );
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(
            @PathVariable UUID addressId) {

        addressService.deleteAddress(addressId);

        return ResponseEntity.noContent().build();
    }
}
