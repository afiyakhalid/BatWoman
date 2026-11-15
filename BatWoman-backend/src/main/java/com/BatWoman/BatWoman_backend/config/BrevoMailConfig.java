package com.BatWoman.BatWoman_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class BrevoMailConfig {

    @Bean("brevoMailSender")
    public JavaMailSender brevoMailSender(
            @Value("${brevo.mail.host}") String host,
            @Value("${brevo.mail.port}") int port,
            @Value("${brevo.mail.username}") String username,
            @Value("${brevo.mail.password}") String password) {

        JavaMailSenderImpl sender = new JavaMailSenderImpl();

        sender.setHost(host);
        sender.setPort(port);
        sender.setUsername(username);
        sender.setPassword(password);

        Properties properties = sender.getJavaMailProperties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.starttls.required", "true");

        return sender;
    }
}