package com.BatWoman.BatWoman_backend.event;

import java.util.UUID;

public record OrderPaidEvent(UUID orderId) {
}