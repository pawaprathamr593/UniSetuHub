package com.unisetuhub.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "task_history")
public class TaskHistory {

    @Id
    private String id;

    private String taskId;

    private String action;

    private String changedById;

    private String oldStatus;

    private String newStatus;

    private String comment;

    private LocalDateTime changedAt;

    public TaskHistory() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getChangedById() {
        return changedById;
    }

    public void setChangedById(String changedById) {
        this.changedById = changedById;
    }

    public String getOldStatus() {
        return oldStatus;
    }

    public void setOldStatus(String oldStatus) {
        this.oldStatus = oldStatus;
    }

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}