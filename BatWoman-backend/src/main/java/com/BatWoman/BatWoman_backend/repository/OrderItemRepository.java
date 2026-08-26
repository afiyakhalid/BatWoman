package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, UUID> {

    List<OrderItem> findByOrder_Id(
            UUID orderId
    );

    /*
     * A product referenced by an order item must not be physically
     * deleted because that would destroy the relationship required
     * for historical order data.
     */
    boolean existsByProduct_Id(
            UUID productId
    );
}