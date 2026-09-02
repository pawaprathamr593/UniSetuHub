package com.unisetuhub.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    private String id;

    private String recipientId;

    private String actorId;

    private String type;

    private String title;

    private String message;

    private String projectId;

    private String taskId;

    @JsonProperty("isRead")
    private boolean isRead = false;

    private LocalDateTime createdAt;

    public Notification() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public String getActorId() {
        return actorId;
    }

    public void setActorId(String actorId) {
        this.actorId = actorId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    @JsonProperty("isRead")
    public boolean isRead() {
        return isRead;
    }

    @JsonProperty("isRead")
    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}