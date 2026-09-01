package com.unisetuhub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "companies")
@Data
public class Company {

    @Id
    private String id;

    private String name;

    private String email;

    private String phone;

    private String address;

    private String status;
}