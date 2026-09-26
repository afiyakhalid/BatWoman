package com.BatWoman.BatWoman_backend.service;

public interface ShiprocketWebhookService {

    void processTrackingWebhook(
            String payload,
            String apiKey
    );
}