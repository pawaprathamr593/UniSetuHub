package com.unisetuhub.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "project_member_history")
public class ProjectMemberHistory {

    @Id
    private String id;

    private String projectId;

    private String memberId;

    // ADD / REMOVE
    private String action;

    // User who performed the action
    private String changedById;

    private LocalDateTime changedAt;

    public ProjectMemberHistory() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
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

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}