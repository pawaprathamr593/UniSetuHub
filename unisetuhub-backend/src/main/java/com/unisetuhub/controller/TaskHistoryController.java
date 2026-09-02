package com.unisetuhub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unisetuhub.entity.TaskHistory;
import com.unisetuhub.service.TaskHistoryService;

@RestController
@RequestMapping("/task-history")
@CrossOrigin
public class TaskHistoryController {

    private final TaskHistoryService historyService;

    public TaskHistoryController(
            TaskHistoryService historyService) {

        this.historyService = historyService;
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<TaskHistory>>
            getTaskHistory(
                    @PathVariable String taskId) {

        return ResponseEntity.ok(
                historyService.getTaskHistory(
                        taskId
                )
        );
    }
}