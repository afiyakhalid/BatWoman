package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByOrderNumber(String orderNumber);

    Page<Order> findByUser_Id(UUID userId, Pageable pageable);

    Page<Order> findByStatus(OrderStatus status, Pageable pageable);
    long countByStatus(OrderStatus status);

    List<Order> findTop5ByOrderByCreatedAtDesc();

    @Query("""
       SELECT COALESCE(SUM(o.total),0)
       FROM Order o
       WHERE o.status = com.BatWoman.BatWoman_backend.enums.OrderStatus.DELIVERED
       """)
    BigDecimal getTotalRevenue();
    @Query(value = """
SELECT
TO_CHAR(created_at, 'Mon') AS month,
COALESCE(SUM(total), 0) AS revenue
FROM orders
WHERE status = 'DELIVERED'
GROUP BY
DATE_PART('month', created_at),
TO_CHAR(created_at, 'Mon')
ORDER BY
DATE_PART('month', created_at)
""", nativeQuery = true)
    List<Object[]> getMonthlyRevenue();
    @Query(value = """
SELECT
    p.id,
    p.name,
    SUM(oi.quantity) AS unitsSold
FROM order_items oi
JOIN products p
ON oi.product_id = p.id
GROUP BY
    p.id,
    p.name
ORDER BY
    unitsSold DESC
LIMIT 5
""", nativeQuery = true)
    List<Object[]> getTopSellingProducts();
    @Query("""
SELECT COALESCE(AVG(o.total),0)
FROM Order o
WHERE o.status = com.BatWoman.BatWoman_backend.enums.OrderStatus.DELIVERED
""")
    BigDecimal getAverageOrderValue();

}
