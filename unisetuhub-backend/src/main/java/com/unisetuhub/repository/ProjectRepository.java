package com.unisetuhub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unisetuhub.entity.Project;
import com.unisetuhub.entity.User;

public interface ProjectRepository extends JpaRepository<Project, String> {

    Optional<Project> findByCode(String code);

    List<Project> findByCompanyId(String companyId);

    List<Project> findByProjectLeader(User projectLeader);

    boolean existsByCode(String code);
}