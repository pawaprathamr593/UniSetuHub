package com.unisetuhub.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "projects")
@Getter
@Setter
public class Project {

    @Id
    private String id;

    private String code;

    private String name;

    private String description;

    private String type;

    private String visibility;
    
    private String status;

    // =========================================================
    // PROJECT -> COMPANY
    // =========================================================

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties({
        "users",
        "projects"
    })
    private Company company;

    // =========================================================
    // PROJECT -> PROJECT LEADER
    // =========================================================

    @ManyToOne
    @JoinColumn(name = "project_leader_id")
    @JsonIgnoreProperties({
        "company",
        "projects"
    })
    private User projectLeader;

    // =========================================================
    // PROJECT <-> USERS
    // MANY-TO-MANY
    // =========================================================

    @ManyToMany
    @JoinTable(
        name = "project_members",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnoreProperties({
        "company",
        "projects",
        "password"
    })
    private Set<User> members = new HashSet<>();

    // =========================================================
    // EQUALS / HASHCODE
    // =========================================================
    // Only use ID.
    // Do NOT include relationships.

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }

        if (!(o instanceof Project)) {
            return false;
        }

        Project project = (Project) o;

        return id != null &&
               id.equals(project.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}