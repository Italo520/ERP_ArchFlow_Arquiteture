package com.archflow.service.impl;

import com.archflow.service.StorageService;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;

@Service
@Profile("!prod") // Use this implementation for non-prod environments
public class LocalStorageService implements StorageService {

    @Override
    public URL generateUploadUrl(String fileName, String contentType) {
        try {
            // Mock URL for local testing
            return new URL("http://localhost:8080/api/v1/storage/upload/" + UUID.randomUUID() + "/" + fileName);
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error generating URL", e);
        }
    }

    @Override
    public URL generateDownloadUrl(String fileName) {
        try {
            return new URL("http://localhost:8080/api/v1/storage/download/" + fileName);
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error generating URL", e);
        }
    }
}
