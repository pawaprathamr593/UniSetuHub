package com.unisetuhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unisetuhub.entity.Task;

public interface TaskRepository extends JpaRepository<Task, String> {

    // All tasks of a project
    List<Task> findByProjectId(String projectId);

    // All tasks assigned to an employee
    List<Task> findByAssigneeId(String userId);

    // Tasks by project and status
    List<Task> findByProjectIdAndStatus(
            String projectId,
            String status
    );

    // Count all tasks in project
    long countByProjectId(String projectId);

    // Count completed tasks
    long countByProjectIdAndStatus(
            String projectId,
            String status
    );
}