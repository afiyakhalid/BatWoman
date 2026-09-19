package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

import java.util.List;
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
            @Param("variantId") UUID variantId
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

    @Query("""
           SELECT p.id
           FROM Inventory i
           JOIN i.variant v
           JOIN v.product p
           JOIN v.size s
           JOIN v.color c
           WHERE (
                :search IS NULL OR :search = '' OR
                LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(v.sku) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(s.label) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))
           )
           GROUP BY p.id
           HAVING (
                :filter = 'ALL' OR
                (:filter = 'IN_STOCK'
                    AND SUM(i.availableQuantity) > 0) OR
                (:filter = 'LOW_STOCK'
                    AND SUM(i.availableQuantity) > 0
                    AND SUM(i.availableQuantity) <= :lowStockThreshold) OR
                (:filter = 'OUT_OF_STOCK'
                    AND SUM(i.availableQuantity) = 0) OR
                (:filter = 'HAS_RESERVED_STOCK'
                    AND SUM(i.reservedQuantity) > 0)
           )
           ORDER BY MAX(i.updatedAt) DESC
           """)
    Page<UUID> findProductIdsForAdminInventory(
            @Param("search") String search,
            @Param("filter") String filter,
            @Param("lowStockThreshold") Integer lowStockThreshold,
            Pageable pageable
    );

    @Query("""
           SELECT i
           FROM Inventory i
           JOIN FETCH i.variant v
           JOIN FETCH v.product p
           JOIN FETCH v.size s
           JOIN FETCH v.color c
           WHERE p.id IN :productIds
           ORDER BY p.id, i.updatedAt DESC
           """)
    List<Inventory> findByProductIdsWithVariantDetails(
            @Param("productIds") List<UUID> productIds
    );

    /*
     * Returns one aggregated row per product:
     *
     * [0] product ID
     * [1] available units
     * [2] reserved units
     *
     * This avoids loading every inventory row merely to build
     * the summary cards.
     */
    @Query("""
           SELECT
               p.id,
               COALESCE(SUM(i.availableQuantity), 0),
               COALESCE(SUM(i.reservedQuantity), 0)
           FROM Inventory i
           JOIN i.variant v
           JOIN v.product p
           JOIN v.size s
           JOIN v.color c
           WHERE (
                :search IS NULL OR :search = '' OR
                LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(v.sku) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(s.label) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))
           )
           GROUP BY p.id
           """)
    List<Object[]> findProductInventorySummary(
            @Param("search") String search
    );
}