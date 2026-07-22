package com.BatWoman.BatWoman_backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "razorpay")
public class RazorpayProperties {

    /**
     * Razorpay Test/Live Key ID
     */
    private String keyId;

    /**
     * Razorpay Test/Live Key Secret
     */
    private String keySecret;

}