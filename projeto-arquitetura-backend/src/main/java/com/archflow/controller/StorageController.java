package com.archflow.controller;

import com.archflow.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/storage")
public class StorageController {

    private final StorageService storageService;

    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload-url")
    public ResponseEntity<Map<String, String>> getUploadUrl(@RequestBody Map<String, String> request) {
        String fileName = request.get("fileName");
        String contentType = request.get("contentType");

        URL url = storageService.generateUploadUrl(fileName, contentType);

        return ResponseEntity.ok(Map.of("url", url.toString()));
    }
}
