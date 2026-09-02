package com.unisetuhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unisetuhub.entity.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, String> {

    List<Notification> findByRecipientIdOrderByCreatedAtDesc(
            String recipientId
    );

    long countByRecipientIdAndIsReadFalse(
            String recipientId
    );
}