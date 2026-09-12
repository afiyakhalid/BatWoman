package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import jakarta.persistence.LockModeType;

import java.util.Optional;
import java.util.UUID;

public interface InventoryRepository
        extends JpaRepository<Inventory, UUID> {

    Optional<Inventory> findByVariant_Id(
            UUID variantId
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
           SELECT i
           FROM Inventory i
           WHERE i.variant.id = :variantId
           """)
    Optional<Inventory> lockInventory(
            UUID variantId
    );

    long countByAvailableQuantityGreaterThan(
            Integer quantity
    );

    long countByAvailableQuantityBetween(
            Integer min,
            Integer max
    );

    long countByAvailableQuantity(
            Integer quantity
    );
}