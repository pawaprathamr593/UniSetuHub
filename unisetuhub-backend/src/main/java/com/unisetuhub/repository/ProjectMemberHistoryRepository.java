package com.unisetuhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unisetuhub.entity.ProjectMemberHistory;

public interface ProjectMemberHistoryRepository
        extends JpaRepository<ProjectMemberHistory, String> {

    List<ProjectMemberHistory> findByProjectIdOrderByChangedAtDesc(
            String projectId
    );
}