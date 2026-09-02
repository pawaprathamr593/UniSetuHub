package com.unisetuhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unisetuhub.entity.TaskHistory;

public interface TaskHistoryRepository
        extends JpaRepository<TaskHistory, String> {

    List<TaskHistory> findByTaskIdOrderByChangedAtDesc(
            String taskId
    );
}