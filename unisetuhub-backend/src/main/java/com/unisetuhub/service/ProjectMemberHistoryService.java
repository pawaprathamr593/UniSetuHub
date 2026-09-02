package com.unisetuhub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unisetuhub.entity.ProjectMemberHistory;
import com.unisetuhub.repository.ProjectMemberHistoryRepository;

@Service
public class ProjectMemberHistoryService {

    private final ProjectMemberHistoryRepository historyRepository;

    public ProjectMemberHistoryService(
            ProjectMemberHistoryRepository historyRepository) {

        this.historyRepository = historyRepository;
    }

    // =========================================================
    // GET HISTORY FOR PROJECT
    // =========================================================

    public List<ProjectMemberHistory> getProjectHistory(
            String projectId) {

        return historyRepository
                .findByProjectIdOrderByChangedAtDesc(
                        projectId
                );
    }

    // =========================================================
    // SAVE HISTORY
    // =========================================================

    public ProjectMemberHistory saveHistory(
            ProjectMemberHistory history) {

        return historyRepository.save(history);
    }
}