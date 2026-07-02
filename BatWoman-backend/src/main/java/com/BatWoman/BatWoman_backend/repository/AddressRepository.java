package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Address;
import com.BatWoman.BatWoman_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {

    List<Address> findByUser(User user);

    Optional<Address> findByIdAndUser(UUID id, User user);

    Optional<Address> findByUserAndDefaultAddressTrue(User user);

}