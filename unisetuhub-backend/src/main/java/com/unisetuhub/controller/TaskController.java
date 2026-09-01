package com.unisetuhub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unisetuhub.entity.Task;
import com.unisetuhub.service.TaskService;

@RestController
@RequestMapping("/tasks")

public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // =========================================================
    // GET ALL TASKS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {

        return ResponseEntity.ok(
                taskService.getAllTasks()
        );
    }

    // =========================================================
    // GET TASK BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(
            @PathVariable String id) {

        Task task = taskService.getTaskById(id);

        if (task == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(task);
    }

    // =========================================================
    // GET TASKS BY PROJECT
    // =========================================================

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getTasksByProject(
            @PathVariable String projectId) {

        return ResponseEntity.ok(
                taskService.getTasksByProject(projectId)
        );
    }

    // =========================================================
    // GET TASKS BY ASSIGNEE
    // =========================================================

    @GetMapping("/assignee/{userId}")
    public ResponseEntity<List<Task>> getTasksByAssignee(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                taskService.getTasksByAssignee(userId)
        );
    }

    // =========================================================
    // CREATE TASK
    // =========================================================

    @PostMapping
    public ResponseEntity<?> createTask(
            @RequestBody Task task,
            @RequestParam String projectId,
            @RequestParam(required = false) String assigneeId,
            @RequestParam(required = false) String createdById) {

        try {

            Task createdTask =
                    taskService.createTask(
                            task,
                            projectId,
                            assigneeId,
                            createdById
                    );

            return ResponseEntity.ok(createdTask);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // UPDATE TASK
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(
            @PathVariable String id,
            @RequestBody Task task) {

        try {

            Task updatedTask =
                    taskService.updateTask(
                            id,
                            task
                    );

            if (updatedTask == null) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            return ResponseEntity.ok(updatedTask);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // DELETE TASK
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(
            @PathVariable String id) {

        boolean deleted =
                taskService.deleteTask(id);

        if (!deleted) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                "Task deleted successfully."
        );
    }

    // =========================================================
    // START TASK
    // =========================================================
    // TODO / REJECTED → IN_PROGRESS

    @PutMapping("/{taskId}/start")
    public ResponseEntity<?> startTask(
            @PathVariable String taskId,
            @RequestParam String userId) {

        try {

            Task task =
                    taskService.startTask(
                            taskId,
                            userId
                    );

            if (task == null) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            return ResponseEntity.ok(task);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // SUBMIT TASK
    // =========================================================
    // IN_PROGRESS → SUBMITTED

    @PutMapping("/{taskId}/submit")
    public ResponseEntity<?> submitTask(
            @PathVariable String taskId,
            @RequestParam String userId) {

        try {

            Task task =
                    taskService.submitTask(
                            taskId,
                            userId
                    );

            if (task == null) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            return ResponseEntity.ok(task);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // ACCEPT TASK
    // =========================================================
    // SUBMITTED → DONE

    @PutMapping("/{taskId}/accept")
    public ResponseEntity<?> acceptTask(
            @PathVariable String taskId,
            @RequestParam String reviewerId,
            @RequestParam(required = false) String comment) {

        try {

            Task task =
                    taskService.acceptTask(
                            taskId,
                            reviewerId,
                            comment
                    );

            if (task == null) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            return ResponseEntity.ok(task);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // REJECT TASK
    // =========================================================
    // SUBMITTED → REJECTED

    @PutMapping("/{taskId}/reject")
    public ResponseEntity<?> rejectTask(
            @PathVariable String taskId,
            @RequestParam String reviewerId,
            @RequestParam(required = false) String comment) {

        try {

            Task task =
                    taskService.rejectTask(
                            taskId,
                            reviewerId,
                            comment
                    );

            if (task == null) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            return ResponseEntity.ok(task);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}