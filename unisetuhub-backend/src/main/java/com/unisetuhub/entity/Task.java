package com.unisetuhub.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Task {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    private String title;

    private String description;

    private String priority;

    /*
     * TODO
     * IN_PROGRESS
     * SUBMITTED
     * REJECTED
     * DONE
     */
    private String status;

    private LocalDate dueDate;

    // =========================================================
    // TASK -> PROJECT
    // =========================================================

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnoreProperties({
        "members",
        "projectLeader",
        "company"
    })
    private Project project;

    // =========================================================
    // TASK -> ASSIGNEE
    // =========================================================

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    @JsonIgnoreProperties({
        "company",
        "projects",
        "password"
    })
    private User assignee;

    // =========================================================
    // TASK -> CREATED BY
    // =========================================================

    @ManyToOne
    @JoinColumn(name = "created_by")
    @JsonIgnoreProperties({
        "company",
        "projects",
        "password"
    })
    private User createdBy;

    // =========================================================
    // TASK -> REVIEWER
    // =========================================================

    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    @JsonIgnoreProperties({
        "company",
        "projects",
        "password"
    })
    private User reviewedBy;

    // =========================================================
    // REVIEW INFORMATION
    // =========================================================

    private String reviewComment;
}