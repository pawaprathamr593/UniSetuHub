package com.unisetuhub.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unisetuhub.entity.Project;
import com.unisetuhub.entity.User;
import com.unisetuhub.service.ProjectService;

@RestController
@RequestMapping("/projects")

public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // =========================================================
    // GET ALL PROJECTS
    // GET /projects
    // =========================================================

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    // =========================================================
    // GET PROJECT BY ID
    // GET /projects/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable String id) {

        Project project =
                projectService.getProjectById(id);

        if (project == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(project);
    }

    // =========================================================
    // GET PROJECTS BY COMPANY
    // GET /projects/company/{companyId}
    // =========================================================

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<Project>> getProjectsByCompany(
            @PathVariable String companyId) {

        return ResponseEntity.ok(
                projectService.getProjectsByCompany(companyId)
        );
    }

    // =========================================================
    // GET PROJECTS BY PROJECT LEADER
    // GET /projects/leader/{employeeId}
    // =========================================================

    @GetMapping("/leader/{employeeId}")
    public ResponseEntity<List<Project>> getProjectsByLeader(
            @PathVariable String employeeId) {

        User user = new User();
        user.setId(employeeId);

        return ResponseEntity.ok(
                projectService.getProjectsByLeader(user)
        );
    }

    // =========================================================
    // ADD PROJECT
    // POST /projects
    // =========================================================

    @PostMapping
    public ResponseEntity<?> addProject(
            @RequestBody Project project) {

        Project savedProject =
                projectService.addProject(project);

        if (savedProject == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Project code already exists.");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProject);
    }

    // =========================================================
    // UPDATE PROJECT
    // PUT /projects/{id}?changedById=USER_ID
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable String id,
            @RequestBody Project project,
            @RequestParam(required = false) String changedById) {

        Project updatedProject =
                projectService.updateProject(
                        id,
                        project,
                        changedById
                );

        if (updatedProject == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedProject);
    }

    // =========================================================
    // DELETE PROJECT
    // DELETE /projects/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(
            @PathVariable String id) {

        boolean deleted =
                projectService.deleteProject(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Project deleted successfully."
        );
    }
}