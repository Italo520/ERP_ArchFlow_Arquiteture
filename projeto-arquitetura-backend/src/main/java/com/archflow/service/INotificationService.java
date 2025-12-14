package com.archflow.service;

import com.archflow.model.Notification;
import com.archflow.model.User;

import java.util.List;
import java.util.UUID;

public interface INotificationService {
    Notification sendNotification(User toUser, String title, String message, UUID resourceId, String resourceType);

    List<Notification> getUserNotifications(UUID userId);

    long countUnreadNotifications(UUID userId);

    void markAsRead(UUID notificationId);
}
