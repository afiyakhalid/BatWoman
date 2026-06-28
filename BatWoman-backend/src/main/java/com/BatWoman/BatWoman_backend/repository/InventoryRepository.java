
package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import jakarta.persistence.LockModeType;

import java.util.Optional;
import java.util.UUID;

public interface InventoryRepository extends JpaRepository<Inventory, UUID> {

    Optional<Inventory> findByProduct_Id(UUID productId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
           SELECT i
           FROM Inventory i
           WHERE i.product.id = :productId
           """)
    Optional<Inventory> lockInventory(UUID productId);

}