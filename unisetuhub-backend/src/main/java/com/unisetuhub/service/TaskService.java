package com.unisetuhub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unisetuhub.entity.Project;
import com.unisetuhub.entity.Task;
import com.unisetuhub.entity.User;
import com.unisetuhub.repository.ProjectRepository;
import com.unisetuhub.repository.TaskRepository;
import com.unisetuhub.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskService(
            TaskRepository taskRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // =========================================================
    // GET ALL TASKS
    // =========================================================

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // =========================================================
    // GET TASK BY ID
    // =========================================================

    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElse(null);
    }

    // =========================================================
    // GET TASKS BY PROJECT
    // =========================================================

    public List<Task> getTasksByProject(String projectId) {

        return taskRepository.findByProjectId(projectId);
    }

    // =========================================================
    // GET TASKS BY ASSIGNEE
    // =========================================================

    public List<Task> getTasksByAssignee(String userId) {

        return taskRepository.findByAssigneeId(userId);
    }

    // =========================================================
    // CREATE TASK
    // =========================================================

    public Task createTask(
            Task task,
            String projectId,
            String assigneeId,
            String createdById) {

        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        if (task.getTitle() == null ||
                task.getTitle().trim().isEmpty()) {

            throw new RuntimeException(
                    "Task title is required."
            );
        }

        if (projectId == null ||
                projectId.trim().isEmpty()) {

            throw new RuntimeException(
                    "Project ID is required."
            );
        }

        // -----------------------------------------------------
        // PROJECT
        // -----------------------------------------------------

        Project project =
                projectRepository.findById(projectId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project not found."
                                )
                        );

        // -----------------------------------------------------
        // ASSIGNEE
        // -----------------------------------------------------

        User assignee = null;

        if (assigneeId != null &&
                !assigneeId.trim().isEmpty()) {

            assignee =
                    userRepository.findById(assigneeId)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Assignee not found."
                                    )
                            );

            // Assignee must belong to project
            if (!project.getMembers().contains(assignee)) {

                throw new RuntimeException(
                        "Assignee is not a member of this project."
                );
            }
        }

        // -----------------------------------------------------
        // CREATED BY
        // -----------------------------------------------------

        User createdBy = null;

        if (createdById != null &&
                !createdById.trim().isEmpty()) {

            createdBy =
                    userRepository.findById(createdById)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Task creator not found."
                                    )
                            );
        }

        // -----------------------------------------------------
        // SET TASK DATA
        // -----------------------------------------------------

        task.setProject(project);

        task.setAssignee(assignee);

        task.setCreatedBy(createdBy);

        task.setTitle(
                task.getTitle().trim()
        );

        task.setDescription(
                task.getDescription() == null
                        ? ""
                        : task.getDescription().trim()
        );

        // -----------------------------------------------------
        // DEFAULT PRIORITY
        // -----------------------------------------------------

        if (task.getPriority() == null ||
                task.getPriority().trim().isEmpty()) {

            task.setPriority("Medium");
        }

        // -----------------------------------------------------
        // DEFAULT STATUS
        // -----------------------------------------------------

        task.setStatus("TODO");

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        return taskRepository.save(task);
    }

    // =========================================================
    // UPDATE TASK
    // =========================================================

    public Task updateTask(
            String id,
            Task updatedTask) {

        Task existingTask =
                taskRepository.findById(id)
                        .orElse(null);

        if (existingTask == null) {
            return null;
        }

        // -----------------------------------------------------
        // BASIC INFORMATION
        // -----------------------------------------------------

        if (updatedTask.getTitle() != null &&
                !updatedTask.getTitle().trim().isEmpty()) {

            existingTask.setTitle(
                    updatedTask.getTitle().trim()
            );
        }

        if (updatedTask.getDescription() != null) {

            existingTask.setDescription(
                    updatedTask.getDescription().trim()
            );
        }

        if (updatedTask.getPriority() != null) {

            existingTask.setPriority(
                    updatedTask.getPriority()
            );
        }

        // -----------------------------------------------------
        // DUE DATE
        // -----------------------------------------------------

        if (updatedTask.getDueDate() != null) {

            existingTask.setDueDate(
                    updatedTask.getDueDate()
            );
        }

        // -----------------------------------------------------
        // STATUS
        // -----------------------------------------------------

        if (updatedTask.getStatus() != null) {

            String status =
                    updatedTask.getStatus()
                            .trim()
                            .toUpperCase();

            if (!"TODO".equals(status) &&
                    !"IN_PROGRESS".equals(status) &&
                    !"SUBMITTED".equals(status) &&
                    !"REJECTED".equals(status) &&
                    !"DONE".equals(status)) {

                throw new RuntimeException(
                        "Invalid task status."
                );
            }

            existingTask.setStatus(status);
        }

        // -----------------------------------------------------
        // ASSIGNEE
        // -----------------------------------------------------

        if (updatedTask.getAssignee() != null &&
                updatedTask.getAssignee().getId() != null) {

            User assignee =
                    userRepository.findById(
                            updatedTask
                                    .getAssignee()
                                    .getId()
                    ).orElseThrow(() ->
                            new RuntimeException(
                                    "Assignee not found."
                            )
                    );

            Project project =
                    existingTask.getProject();

            if (!project.getMembers().contains(assignee)) {

                throw new RuntimeException(
                        "Assignee is not a member of this project."
                );
            }

            existingTask.setAssignee(assignee);
        }

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        return taskRepository.save(existingTask);
    }

    // =========================================================
    // DELETE TASK
    // =========================================================

    public boolean deleteTask(String id) {

        if (!taskRepository.existsById(id)) {
            return false;
        }

        taskRepository.deleteById(id);

        return true;
    }

    // =========================================================
    // START TASK
    // =========================================================
    // TODO / REJECTED -> IN_PROGRESS

    public Task startTask(
            String taskId,
            String userId) {

        Task task = getTaskById(taskId);

        if (task == null) {
            return null;
        }

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found."
                                )
                        );

        // Only assigned employee can start
        if (task.getAssignee() == null ||
                !task.getAssignee()
                        .getId()
                        .equals(user.getId())) {

            throw new RuntimeException(
                    "Only the assigned employee can start this task."
            );
        }

        if (!"TODO".equals(task.getStatus()) &&
                !"REJECTED".equals(task.getStatus())) {

            throw new RuntimeException(
                    "Task cannot be started from its current status."
            );
        }

        task.setStatus("IN_PROGRESS");

        return taskRepository.save(task);
    }

    // =========================================================
    // SUBMIT TASK
    // =========================================================
    // IN_PROGRESS -> SUBMITTED

    public Task submitTask(
            String taskId,
            String userId) {

        Task task = getTaskById(taskId);

        if (task == null) {
            return null;
        }

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found."
                                )
                        );

        // Only assigned employee can submit
        if (task.getAssignee() == null ||
                !task.getAssignee()
                        .getId()
                        .equals(user.getId())) {

            throw new RuntimeException(
                    "Only the assigned employee can submit this task."
            );
        }

        // Must be IN_PROGRESS
        if (!"IN_PROGRESS".equals(task.getStatus())) {

            throw new RuntimeException(
                    "Only an in-progress task can be submitted for review."
            );
        }

        task.setStatus("SUBMITTED");

        return taskRepository.save(task);
    }

    // =========================================================
    // ACCEPT TASK
    // =========================================================
    // SUBMITTED -> DONE

    public Task acceptTask(
            String taskId,
            String reviewerId,
            String comment) {

        Task task = getTaskById(taskId);

        if (task == null) {
            return null;
        }

        User reviewer =
                userRepository.findById(reviewerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Reviewer not found."
                                )
                        );

        Project project = task.getProject();

        // Check reviewer
        validateReviewer(
                reviewer,
                project
        );

        // Check status
        if (!"SUBMITTED".equals(task.getStatus())) {

            throw new RuntimeException(
                    "Only submitted tasks can be accepted."
            );
        }

        // Accept
        task.setStatus("DONE");

        task.setReviewedBy(reviewer);

        task.setReviewComment(
                comment == null
                        ? ""
                        : comment.trim()
        );

        Task savedTask =
                taskRepository.save(task);

        checkProjectCompletion(project);

        return savedTask;
    }

    // =========================================================
    // REJECT TASK
    // =========================================================
    // SUBMITTED -> REJECTED

    public Task rejectTask(
            String taskId,
            String reviewerId,
            String comment) {

        Task task = getTaskById(taskId);

        if (task == null) {
            return null;
        }

        User reviewer =
                userRepository.findById(reviewerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Reviewer not found."
                                )
                        );

        Project project =
                task.getProject();

        // Check reviewer
        validateReviewer(
                reviewer,
                project
        );

        // Check status
        if (!"SUBMITTED".equals(task.getStatus())) {

            throw new RuntimeException(
                    "Only submitted tasks can be rejected."
            );
        }

        // Reject
        task.setStatus("REJECTED");

        task.setReviewedBy(reviewer);

        task.setReviewComment(
                comment == null
                        ? ""
                        : comment.trim()
        );

        return taskRepository.save(task);
    }

    // =========================================================
    // VALIDATE REVIEWER
    // =========================================================

    private void validateReviewer(
            User reviewer,
            Project project) {

        if (reviewer == null ||
                reviewer.getRole() == null) {

            throw new RuntimeException(
                    "Invalid reviewer."
            );
        }

        String role =
                reviewer.getRole()
                        .trim()
                        .toUpperCase();

        // Website Admin
        if ("WEBSITE_ADMIN".equals(role)) {
            return;
        }

        // Company Head
        if ("COMPANY_HEAD".equals(role)) {

            if (reviewer.getCompany() == null ||
                    project.getCompany() == null ||
                    !reviewer.getCompany()
                            .getId()
                            .equals(
                                    project.getCompany()
                                            .getId()
                            )) {

                throw new RuntimeException(
                        "Company Head does not belong to this project company."
                );
            }

            return;
        }

        // Project Lead
        if ("PROJECT_LEAD".equals(role)) {

            if (project.getProjectLeader() == null ||
                    !project.getProjectLeader()
                            .getId()
                            .equals(
                                    reviewer.getId()
                            )) {

                throw new RuntimeException(
                        "Only the Project Lead can review this task."
                );
            }

            return;
        }

        throw new RuntimeException(
                "You do not have permission to review this task."
        );
    }

    // =========================================================
    // CHECK PROJECT COMPLETION
    // =========================================================

    private void checkProjectCompletion(
            Project project) {

        long totalTasks =
                taskRepository.countByProjectId(
                        project.getId()
                );

        long completedTasks =
                taskRepository.countByProjectIdAndStatus(
                        project.getId(),
                        "DONE"
                );

        if (totalTasks > 0 &&
                completedTasks == totalTasks) {

            project.setStatus("COMPLETED");

            projectRepository.save(project);
        }
    }
}