package com.archflow.controller;

import com.archflow.model.Notification;
import com.archflow.model.User;
import com.archflow.service.IAuthenticationContext;
import com.archflow.service.INotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final INotificationService notificationService;
    private final IAuthenticationContext authContext;

    public NotificationController(INotificationService notificationService, IAuthenticationContext authContext) {
        this.notificationService = notificationService;
        this.authContext = authContext;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications() {
        User currentUser = authContext.getCurrentUser();
        return ResponseEntity.ok(notificationService.getUserNotifications(currentUser.getId()));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount() {
        User currentUser = authContext.getCurrentUser();
        return ResponseEntity.ok(notificationService.countUnreadNotifications(currentUser.getId()));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable UUID id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
