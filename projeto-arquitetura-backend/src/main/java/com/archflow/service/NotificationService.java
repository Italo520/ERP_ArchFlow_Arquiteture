package com.archflow.service;

import com.archflow.model.Notification;
import com.archflow.model.User;
import com.archflow.repository.NotificationRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationService implements INotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(NotificationRepository notificationRepository, SimpMessagingTemplate messagingTemplate) {
        this.notificationRepository = notificationRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public Notification sendNotification(User toUser, String title, String message, UUID resourceId,
            String resourceType) {
        // 1. Persist the notification
        Notification notification = new Notification(toUser, title, message, resourceId, resourceType);
        Notification saved = notificationRepository.save(notification);

        // 2. Push to WebSocket
        // Destination: /user/{userId}/queue/notifications
        messagingTemplate.convertAndSendToUser(
                toUser.getId().toString(),
                "/queue/notifications",
                saved);

        return saved;
    }

    @Override
    public List<Notification> getUserNotifications(UUID userId) {
        return notificationRepository.findByDestinationUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public long countUnreadNotifications(UUID userId) {
        return notificationRepository.countByDestinationUserIdAndReadFalse(userId);
    }

    @Override
    public void markAsRead(UUID notificationId) {
        notificationRepository.findById(notificationId).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }
}
