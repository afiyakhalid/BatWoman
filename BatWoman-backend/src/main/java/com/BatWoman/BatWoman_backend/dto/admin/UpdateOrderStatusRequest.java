
package com.BatWoman.BatWoman_backend.dto.admin;

import com.BatWoman.BatWoman_backend.enums.OrderStatus;

public record UpdateOrderStatusRequest(

        OrderStatus status

) {
}