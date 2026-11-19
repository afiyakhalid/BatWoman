package com.BatWoman.BatWoman_backend.service.media;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
@RequiredArgsConstructor
public class MediaResourceConfig implements WebMvcConfigurer {

    private final MediaStorageProperties properties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path storageDirectory = properties.getBasePath().toAbsolutePath().normalize();
        String resourceLocation = storageDirectory.toUri().toString();
        if (!resourceLocation.endsWith("/")) {
            resourceLocation += "/";
        }

        registry.addResourceHandler("/media/**")
                .addResourceLocations(resourceLocation)
                .setCachePeriod(3600);
    }
}
