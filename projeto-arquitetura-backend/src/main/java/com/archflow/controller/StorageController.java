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

    // Endpoint for local testing - receives the file content
    @PutMapping("/upload/{uuid}/{fileName}")
    public ResponseEntity<Void> uploadFileLocal(@PathVariable String uuid, @PathVariable String fileName,
            @RequestBody byte[] content) {
        try {
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(System.getProperty("user.home"),
                    "archflow-uploads");
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }
            java.nio.file.Path filePath = uploadPath.resolve(fileName);
            java.nio.file.Files.write(filePath, content);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // Endpoint for local testing - serves the file
    @GetMapping("/download/{fileName}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadFileLocal(@PathVariable String fileName) {
        try {
            java.nio.file.Path filePath = java.nio.file.Paths.get(System.getProperty("user.home"), "archflow-uploads")
                    .resolve(fileName);
            org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(
                    filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
