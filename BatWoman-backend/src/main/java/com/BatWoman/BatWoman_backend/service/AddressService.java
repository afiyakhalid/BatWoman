package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.address.AddressResponse;
import com.BatWoman.BatWoman_backend.dto.address.CreateAddressRequest;
import com.BatWoman.BatWoman_backend.dto.address.UpdateAddressRequest;

import java.util.List;
import java.util.UUID;

public interface AddressService {

    AddressResponse createAddress(CreateAddressRequest request);

    List<AddressResponse> getMyAddresses();

    AddressResponse getAddressById(UUID addressId);

    AddressResponse updateAddress(
            UUID addressId,
            UpdateAddressRequest request
    );

    void deleteAddress(UUID addressId);
}
