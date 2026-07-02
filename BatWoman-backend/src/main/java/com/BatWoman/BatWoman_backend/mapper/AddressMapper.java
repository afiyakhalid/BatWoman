package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.address.AddressResponse;
import com.BatWoman.BatWoman_backend.dto.address.CreateAddressRequest;
import com.BatWoman.BatWoman_backend.dto.address.UpdateAddressRequest;
import com.BatWoman.BatWoman_backend.entity.Address;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    Address toEntity(CreateAddressRequest request);

    AddressResponse toResponse(Address address);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAddressFromDto(
            UpdateAddressRequest request,
            @MappingTarget Address address
    );
}