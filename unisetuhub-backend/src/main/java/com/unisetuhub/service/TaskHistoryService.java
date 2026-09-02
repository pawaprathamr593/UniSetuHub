package com.unisetuhub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unisetuhub.entity.TaskHistory;
import com.unisetuhub.repository.TaskHistoryRepository;

@Service
public class TaskHistoryService {

    private final TaskHistoryRepository historyRepository;

    public TaskHistoryService(
            TaskHistoryRepository historyRepository) {

        this.historyRepository = historyRepository;
    }

    // =========================================================
    // GET TASK HISTORY
    // =========================================================

    public List<TaskHistory> getTaskHistory(
            String taskId) {

        return historyRepository
                .findByTaskIdOrderByChangedAtDesc(
                        taskId
                );
    }

    // =========================================================
    // SAVE TASK HISTORY
    // =========================================================

    public TaskHistory saveHistory(
            TaskHistory history) {

        return historyRepository.save(history);
    }
}