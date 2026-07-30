package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.admin.CustomerResponse;
import com.BatWoman.BatWoman_backend.dto.admin.InventoryResponse;
import com.BatWoman.BatWoman_backend.dto.admin.RestockInventoryRequest;
import com.BatWoman.BatWoman_backend.dto.admin.UpdateOrderStatusRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;
import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;
import com.BatWoman.BatWoman_backend.dto.admin.settings.AdminProfileResponse;
import com.BatWoman.BatWoman_backend.dto.admin.settings.ChangeEmailRequest;
import com.BatWoman.BatWoman_backend.dto.admin.settings.ChangePasswordRequest;
import com.BatWoman.BatWoman_backend.dto.admin.settings.UpdateAdminProfileRequest;

import java.util.List;
import java.util.UUID;
import com.BatWoman.BatWoman_backend.dto.admin.DashboardResponse;

public interface AdminService {

    void restockInventory(RestockInventoryRequest request);

    void updateOrderStatus(
            UUID orderId,
            UpdateOrderStatusRequest request
    );
    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(UUID orderId);
    List<PaymentResponse> getAllPayments();

    PaymentResponse getPaymentById(UUID paymentId);
    List<InventoryResponse> getAllInventory();

    InventoryResponse getInventory(UUID productId);
    List<CustomerResponse> getAllCustomers();

    CustomerResponse getCustomerById(UUID customerId);
    DashboardResponse getDashboard();
    AdminProfileResponse getAdminProfile();

    AdminProfileResponse updateAdminProfile(UpdateAdminProfileRequest request);

    void changeEmail(ChangeEmailRequest request);

    void changePassword(ChangePasswordRequest request);
}