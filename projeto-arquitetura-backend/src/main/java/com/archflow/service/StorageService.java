package com.archflow.service;

import java.net.URL;

public interface StorageService {
    URL generateUploadUrl(String fileName, String contentType);

    URL generateDownloadUrl(String fileName);
}
