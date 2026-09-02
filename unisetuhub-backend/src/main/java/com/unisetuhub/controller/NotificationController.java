package com.unisetuhub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unisetuhub.entity.Notification;
import com.unisetuhub.service.NotificationService;

@RestController
@RequestMapping("/notifications")
@CrossOrigin
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService =
                notificationService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>>
            getUserNotifications(
                    @PathVariable String userId) {

        return ResponseEntity.ok(
                notificationService
                        .getUserNotifications(userId)
        );
    }

    @GetMapping("/user/{userId}/unread-count")
    public ResponseEntity<Long>
            getUnreadCount(
                    @PathVariable String userId) {

        return ResponseEntity.ok(
                notificationService
                        .getUnreadCount(userId)
        );
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(
            @PathVariable String id) {

        boolean success =
                notificationService.markAsRead(id);

        if (!success) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<?> markAllAsRead(
            @PathVariable String userId) {

        notificationService
                .markAllAsRead(userId);

        return ResponseEntity.ok().build();
    }
}