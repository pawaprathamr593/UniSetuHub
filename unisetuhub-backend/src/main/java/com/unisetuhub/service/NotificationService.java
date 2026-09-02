package com.unisetuhub.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.unisetuhub.entity.Notification;
import com.unisetuhub.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(
            NotificationRepository notificationRepository) {

        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(
            String recipientId,
            String actorId,
            String type,
            String title,
            String message,
            String projectId,
            String taskId) {

        Notification notification =
                new Notification();

        notification.setId(
                UUID.randomUUID().toString()
        );

        notification.setRecipientId(
                recipientId
        );

        notification.setActorId(
                actorId
        );

        notification.setType(
                type
        );

        notification.setTitle(
                title
        );

        notification.setMessage(
                message
        );

        notification.setProjectId(
                projectId
        );

        notification.setTaskId(
                taskId
        );

        notification.setRead(false);

        notification.setCreatedAt(
                LocalDateTime.now()
        );

        return notificationRepository.save(
                notification
        );
    }

    public List<Notification> getUserNotifications(
            String userId) {

        return notificationRepository
                .findByRecipientIdOrderByCreatedAtDesc(
                        userId
                );
    }

    public long getUnreadCount(
            String userId) {

        return notificationRepository
                .countByRecipientIdAndIsReadFalse(
                        userId
                );
    }

    public boolean markAsRead(
            String notificationId) {

        Notification notification =
                notificationRepository
                        .findById(notificationId)
                        .orElse(null);

        if (notification == null) {
            return false;
        }

        notification.setRead(true);

        notificationRepository.save(
                notification
        );

        return true;
    }

    public void markAllAsRead(
            String userId) {

        List<Notification> notifications =
                notificationRepository
                        .findByRecipientIdOrderByCreatedAtDesc(
                                userId
                        );

        for (Notification notification :
                notifications) {

            notification.setRead(true);
        }

        notificationRepository.saveAll(
                notifications
        );
    }
}