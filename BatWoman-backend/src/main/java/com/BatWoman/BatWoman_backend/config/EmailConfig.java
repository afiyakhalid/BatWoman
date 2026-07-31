package com.BatWoman.BatWoman_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Configuration
public class EmailConfig {

    @Bean
    public SpringTemplateEngine emailTemplateEngine() {

        return new SpringTemplateEngine();

    }

}
