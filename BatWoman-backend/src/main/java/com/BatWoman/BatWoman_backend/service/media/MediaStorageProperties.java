package com.BatWoman.BatWoman_backend.service.media;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@ConfigurationProperties(prefix = "media.storage")
public class MediaStorageProperties {

    private Path basePath = Paths.get("./storage");

    private String publicBaseUrl = "http://localhost:8080/media";

    public Path getBasePath() {
        return basePath;
    }

    public void setBasePath(Path basePath) {
        this.basePath = basePath;
    }

    public String getPublicBaseUrl() {
        return publicBaseUrl;
    }

    public void setPublicBaseUrl(String publicBaseUrl) {
        this.publicBaseUrl = publicBaseUrl;
    }
}
