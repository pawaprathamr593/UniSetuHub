package com.unisetuhub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unisetuhub.entity.ProjectMemberHistory;
import com.unisetuhub.service.ProjectMemberHistoryService;

@RestController
@RequestMapping("/project-member-history")
@CrossOrigin
public class ProjectMemberHistoryController {

    private final ProjectMemberHistoryService historyService;

    public ProjectMemberHistoryController(
            ProjectMemberHistoryService historyService) {

        this.historyService = historyService;
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ProjectMemberHistory>>
            getProjectHistory(
                    @PathVariable String projectId) {

        return ResponseEntity.ok(
                historyService.getProjectHistory(
                        projectId
                )
        );
    }
}