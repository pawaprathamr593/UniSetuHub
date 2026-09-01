package com.unisetuhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unisetuhub.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, String> {

}