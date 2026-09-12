package com.BatWoman.BatWoman_backend.config;

import com.BatWoman.BatWoman_backend.security.CustomUserDetailsService;
import com.BatWoman.BatWoman_backend.security.JwtAuthenticationFilter;
import com.BatWoman.BatWoman_backend.security.oauth2.CustomOAuth2UserService;
import com.BatWoman.BatWoman_backend.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.BatWoman.BatWoman_backend.security.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;
    private final CustomOAuth2UserService customOAuth2UserService;

    private final OAuth2AuthenticationSuccessHandler successHandler;
    private final PasswordEncoder passwordEncoder;
    private final OAuth2AuthenticationFailureHandler failureHandler;

    /**
     * Authentication Provider
     *
     * Responsible for loading the user and validating passwords.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(
                        customUserDetailsService
                );

        provider.setPasswordEncoder(
                passwordEncoder
        );

        return provider;
    }

    /**
     * Authentication Manager
     *
     * Used during Login.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    /**
     * Main Spring Security Configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http

                // Disable CSRF for REST APIs
                .csrf(csrf ->
                        csrf.disable()
                )

                // Enable CORS
                .cors(
                        Customizer.withDefaults()
                )

                // Stateless Authentication
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // Register Authentication Provider
                .authenticationProvider(
                        authenticationProvider()
                )

                .oauth2Login(oauth ->
                        oauth
                                .userInfoEndpoint(
                                        userInfo ->
                                                userInfo.userService(
                                                        customOAuth2UserService
                                                )
                                )
                                .successHandler(
                                        successHandler
                                )
                                .failureHandler(
                                        failureHandler
                                )
                )

                // Route Authorization
                .authorizeHttpRequests(auth -> auth

                        // =====================================================
                        // Public Authentication APIs
                        // =====================================================

                        .requestMatchers(
                                "/api/v1/auth/register",
                                "/api/v1/auth/login",
                                "/api/v1/auth/refresh",
                                "/oauth2/**",
                                "/login/oauth2/**"
                        ).permitAll()

                        // =====================================================
                        // Categories - Public Read
                        // =====================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/categories/**"
                        ).permitAll()

                        // Categories - Admin Only

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/categories/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/categories/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/categories/**"
                        ).hasRole("ADMIN")

                        // =====================================================
                        // Colors - Public Read
                        // =====================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/colors"
                        ).permitAll()

                        // =====================================================
                        // Colors - Admin Read
                        // =====================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/colors/admin"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/colors/*"
                        ).hasRole("ADMIN")

                        // =====================================================
                        // Colors - Admin Write
                        // =====================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/colors"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/colors/*"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/colors/*"
                        ).hasRole("ADMIN")

                        // =====================================================
                        // Products - Public Read
                        // =====================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/products/**"
                        ).permitAll()

                        // Product Search

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/products/search"
                        ).permitAll()

                        // Product Image Upload - Admin

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/products/*/images"
                        ).hasRole("ADMIN")

                        // Product CRUD - Admin

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/products"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/products/admin"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/products/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/products/**"
                        ).hasRole("ADMIN")

                        // =====================================================
                        // Cart - Authenticated Users
                        // =====================================================

                        .requestMatchers(
                                "/api/v1/cart/**"
                        ).authenticated()

                        // =====================================================
                        // Wishlist - Authenticated Users
                        // =====================================================

                        .requestMatchers(
                                "/api/v1/wishlist/**"
                        ).authenticated()

                        // =====================================================
                        // Reviews - Public Read
                        // =====================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/reviews/**"
                        ).permitAll()

                        // Reviews - Logged-in Users

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/reviews/**"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/reviews/**"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/reviews/**"
                        ).authenticated()

                        // =====================================================
                        // Orders - Authenticated Users
                        // =====================================================

                        .requestMatchers(
                                "/api/v1/orders/**"
                        ).authenticated()

                        // =====================================================
                        // Payment Creation & Verification
                        // =====================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/payments"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/payments/verify"
                        ).authenticated()

                        // Razorpay Webhook

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/payments/webhook"
                        ).permitAll()

                        // =====================================================
                        // Admin APIs
                        // =====================================================

                        .requestMatchers(
                                "/api/v1/admin/**"
                        ).hasRole("ADMIN")

                        // =====================================================
                        // Swagger / OpenAPI
                        // =====================================================

                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // =====================================================
                        // Everything Else
                        // =====================================================

                        .anyRequest().authenticated()
                )

                // Register JWT Filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}