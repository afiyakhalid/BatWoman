package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.address.AddressResponse;
import com.BatWoman.BatWoman_backend.dto.address.CreateAddressRequest;
import com.BatWoman.BatWoman_backend.dto.address.UpdateAddressRequest;
import com.BatWoman.BatWoman_backend.entity.Address;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.mapper.AddressMapper;
import com.BatWoman.BatWoman_backend.repository.AddressRepository;
import com.BatWoman.BatWoman_backend.service.AddressService;
import com.BatWoman.BatWoman_backend.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final AuthService authService;

    @Override
    public AddressResponse createAddress(CreateAddressRequest request) {

        User user = authService.getCurrentUser();

        if (Boolean.TRUE.equals(request.defaultAddress())) {

            addressRepository.findByUserAndDefaultAddressTrue(user)
                    .ifPresent(address -> address.setDefaultAddress(false));
        }

        Address address = addressMapper.toEntity(request);

        address.setId(UUID.randomUUID());
        address.setUser(user);
        address.setCreatedAt(OffsetDateTime.now());

        if (address.getDefaultAddress() == null) {
            address.setDefaultAddress(false);
        }

        Address saved = addressRepository.save(address);

        return addressMapper.toResponse(saved);
    }

    @Override
    public List<AddressResponse> getMyAddresses() {

        User user = authService.getCurrentUser();

        return addressRepository.findByUser(user)
                .stream()
                .map(addressMapper::toResponse)
                .toList();
    }

    @Override
    public AddressResponse getAddressById(UUID addressId) {

        User user = authService.getCurrentUser();

        Address address = addressRepository
                .findByIdAndUser(addressId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found."));

        return addressMapper.toResponse(address);
    }

    @Override
    public AddressResponse updateAddress(
            UUID addressId,
            UpdateAddressRequest request) {

        User user = authService.getCurrentUser();

        Address address = addressRepository
                .findByIdAndUser(addressId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found."));

        if (Boolean.TRUE.equals(request.defaultAddress())) {

            addressRepository.findByUserAndDefaultAddressTrue(user)
                    .ifPresent(existing -> existing.setDefaultAddress(false));
        }

        addressMapper.updateAddressFromDto(request, address);

        return addressMapper.toResponse(addressRepository.save(address));
    }

    @Override
    public void deleteAddress(UUID addressId) {

        User user = authService.getCurrentUser();

        Address address = addressRepository
                .findByIdAndUser(addressId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found."));

        addressRepository.delete(address);
    }
}
