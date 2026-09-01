
package com.unisetuhub.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    private String firstName;

    private String surname;

    private String email;

    private String password;

    private String phone;

    private String address;

    private String role;

    // =========================================================
    // USER BELONGS TO ONE COMPANY
    // =========================================================

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties({
        "users",
        "projects"
    })
    private Company company;

    // =========================================================
    // USER CAN BELONG TO MANY PROJECTS
    // =========================================================

    @ManyToMany(mappedBy = "members")
    @JsonIgnoreProperties({
        "company",
        "projectLeader",
        "members"
    })
    private Set<Project> projects = new HashSet<>();
}

