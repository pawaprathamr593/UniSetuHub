package com.unisetuhub.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unisetuhub.entity.Project;
import com.unisetuhub.entity.Task;
import com.unisetuhub.entity.TaskHistory;
import com.unisetuhub.entity.User;
import com.unisetuhub.repository.ProjectRepository;
import com.unisetuhub.repository.TaskRepository;
import com.unisetuhub.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final TaskHistoryService taskHistoryService;

    private final NotificationService notificationService;

    public TaskService(

            TaskRepository taskRepository,

            ProjectRepository projectRepository,

            UserRepository userRepository,

            TaskHistoryService taskHistoryService,

            NotificationService notificationService) {

        this.taskRepository = taskRepository;

        this.projectRepository = projectRepository;

        this.userRepository = userRepository;

        this.taskHistoryService = taskHistoryService;

        this.notificationService = notificationService;
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

    @Transactional
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
        // SAVE TASK
        // -----------------------------------------------------

        Task savedTask =

                taskRepository.save(task);

        // -----------------------------------------------------
        // TASK HISTORY - CREATE
        // -----------------------------------------------------

        saveHistory(
                savedTask,
                "CREATE",
                createdById,
                null,
                "TODO",
                null
        );

        // -----------------------------------------------------
        // NOTIFICATION - TASK CREATED / ASSIGNED
        // -----------------------------------------------------

        if (assignee != null) {

            String actorId = createdById;

            notificationService.createNotification(
                    assignee.getId(),
                    actorId,
                    "TASK_ASSIGNED",
                    "Task assigned",
                    "You have been assigned task \""
                            + savedTask.getTitle()
                            + "\" in project "
                            + project.getName(),
                    project.getId(),
                    savedTask.getId()
            );

        }

        return savedTask;
    }

    // =========================================================
    // UPDATE TASK
    // =========================================================

    @Transactional
    public Task updateTask(

            String id,

            Task updatedTask,

            String changedById) {

        Task existingTask =

                taskRepository.findById(id)

                        .orElse(null);

        if (existingTask == null) {

            return null;

        }

        // -----------------------------------------------------
        // SAVE OLD VALUES
        // -----------------------------------------------------

        String oldStatus =
                existingTask.getStatus();

        String oldAssigneeId =
                existingTask.getAssignee() != null
                        ? existingTask.getAssignee().getId()
                        : null;

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

        Task savedTask =

                taskRepository.save(existingTask);

        String newStatus =
                savedTask.getStatus();

        String newAssigneeId =
                savedTask.getAssignee() != null
                        ? savedTask.getAssignee().getId()
                        : null;

        // -----------------------------------------------------
        // TASK HISTORY - UPDATE
        // -----------------------------------------------------

        saveHistory(
                savedTask,
                "UPDATE",
                changedById,
                oldStatus,
                newStatus,
                null
        );

        // -----------------------------------------------------
        // NOTIFICATION - UPDATED
        // -----------------------------------------------------

        if (newAssigneeId != null) {

            notificationService.createNotification(
                    newAssigneeId,
                    changedById,
                    "TASK_UPDATED",
                    "Task updated",
                    "Task \""
                            + savedTask.getTitle()
                            + "\" has been updated.",
                    savedTask.getProject().getId(),
                    savedTask.getId()
            );
        }

        // -----------------------------------------------------
        // NOTIFICATION - ASSIGNED TO DIFFERENT USER
        // -----------------------------------------------------

        if (newAssigneeId != null &&

                !newAssigneeId.equals(oldAssigneeId)) {

            notificationService.createNotification(
                    newAssigneeId,
                    changedById,
                    "TASK_ASSIGNED",
                    "Task assigned",
                    "You have been assigned task \""
                            + savedTask.getTitle()
                            + "\".",
                    savedTask.getProject().getId(),
                    savedTask.getId()
            );
        }

        return savedTask;
    }

    // =========================================================
    // BACKWARD COMPATIBILITY
    // =========================================================

    public Task updateTask(

            String id,

            Task updatedTask) {

        return updateTask(
                id,
                updatedTask,
                null
        );
    }

    // =========================================================
    // DELETE TASK
    // =========================================================

    @Transactional
    public boolean deleteTask(

            String id,

            String deletedById) {

        Task task =

                taskRepository.findById(id)

                        .orElse(null);

        if (task == null) {

            return false;

        }

        // -----------------------------------------------------
        // SAVE DATA BEFORE DELETE
        // -----------------------------------------------------

        String taskTitle =
                task.getTitle();

        String projectId =
                task.getProject() != null
                        ? task.getProject().getId()
                        : null;

        String assigneeId =
                task.getAssignee() != null
                        ? task.getAssignee().getId()
                        : null;

        // -----------------------------------------------------
        // HISTORY - DELETE
        // -----------------------------------------------------

        saveHistory(
                task,
                "DELETE",
                deletedById,
                task.getStatus(),
                null,
                null
        );

        // -----------------------------------------------------
        // NOTIFICATION - DELETE
        // -----------------------------------------------------

        if (assigneeId != null) {

            notificationService.createNotification(
                    assigneeId,
                    deletedById,
                    "TASK_DELETED",
                    "Task deleted",
                    "Task \""
                            + taskTitle
                            + "\" has been deleted.",
                    projectId,
                    task.getId()
            );
        }

        // -----------------------------------------------------
        // DELETE
        // -----------------------------------------------------

        taskRepository.delete(task);

        return true;
    }

    // =========================================================
    // BACKWARD COMPATIBILITY
    // =========================================================

    public boolean deleteTask(String id) {

        return deleteTask(
                id,
                null
        );
    }

    // =========================================================
    // START TASK
    // =========================================================

    // TODO / REJECTED -> IN_PROGRESS

    @Transactional
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

        // -----------------------------------------------------
        // OLD STATUS
        // -----------------------------------------------------

        String oldStatus =
                task.getStatus();

        // -----------------------------------------------------
        // UPDATE
        // -----------------------------------------------------

        task.setStatus("IN_PROGRESS");

        Task savedTask =
                taskRepository.save(task);

        // -----------------------------------------------------
        // HISTORY
        // -----------------------------------------------------

        saveHistory(
                savedTask,
                "START",
                userId,
                oldStatus,
                "IN_PROGRESS",
                null
        );

        // -----------------------------------------------------
        // NOTIFICATION - PROJECT LEAD
        // -----------------------------------------------------

        notifyProjectLead(
                savedTask,
                userId,
                "TASK_STARTED",
                "Task started",
                "Task \""
                        + savedTask.getTitle()
                        + "\" has been started."
        );

        return savedTask;
    }

    // =========================================================
    // SUBMIT TASK
    // =========================================================

    // IN_PROGRESS -> SUBMITTED

    @Transactional
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

        // -----------------------------------------------------
        // OLD STATUS
        // -----------------------------------------------------

        String oldStatus =
                task.getStatus();

        // -----------------------------------------------------
        // UPDATE
        // -----------------------------------------------------

        task.setStatus("SUBMITTED");

        Task savedTask =
                taskRepository.save(task);

        // -----------------------------------------------------
        // HISTORY
        // -----------------------------------------------------

        saveHistory(
                savedTask,
                "SUBMIT",
                userId,
                oldStatus,
                "SUBMITTED",
                null
        );

        // -----------------------------------------------------
        // NOTIFICATION - PROJECT LEAD
        // -----------------------------------------------------

        notifyProjectLead(
                savedTask,
                userId,
                "TASK_SUBMITTED",
                "Task submitted",
                "Task \""
                        + savedTask.getTitle()
                        + "\" has been submitted for review."
        );

        return savedTask;
    }

    // =========================================================
    // ACCEPT TASK
    // =========================================================

    // SUBMITTED -> DONE

    @Transactional
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

        String oldStatus =
                task.getStatus();

        String reviewText =
                comment == null
                        ? ""
                        : comment.trim();

        // -----------------------------------------------------
        // ACCEPT
        // -----------------------------------------------------

        task.setStatus("DONE");

        task.setReviewedBy(reviewer);

        task.setReviewComment(reviewText);

        Task savedTask =

                taskRepository.save(task);

        // -----------------------------------------------------
        // HISTORY
        // -----------------------------------------------------

        saveHistory(
                savedTask,
                "APPROVE",
                reviewerId,
                oldStatus,
                "DONE",
                reviewText
        );

        // -----------------------------------------------------
        // NOTIFICATION - EMPLOYEE
        // -----------------------------------------------------

        if (savedTask.getAssignee() != null) {

            notificationService.createNotification(
                    savedTask.getAssignee().getId(),
                    reviewerId,
                    "TASK_APPROVED",
                    "Task approved",
                    "Your task \""
                            + savedTask.getTitle()
                            + "\" has been approved.",
                    project.getId(),
                    savedTask.getId()
            );
        }

        // -----------------------------------------------------
        // PROJECT COMPLETION
        // -----------------------------------------------------

        checkProjectCompletion(project);

        return savedTask;
    }

    // =========================================================
    // REJECT TASK
    // =========================================================

    // SUBMITTED -> REJECTED

    @Transactional
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

        String oldStatus =
                task.getStatus();

        String reviewText =
                comment == null
                        ? ""
                        : comment.trim();

        // -----------------------------------------------------
        // REJECT
        // -----------------------------------------------------

        task.setStatus("REJECTED");

        task.setReviewedBy(reviewer);

        task.setReviewComment(reviewText);

        Task savedTask =
                taskRepository.save(task);

        // -----------------------------------------------------
        // HISTORY
        // -----------------------------------------------------

        saveHistory(
                savedTask,
                "REJECT",
                reviewerId,
                oldStatus,
                "REJECTED",
                reviewText
        );

        // -----------------------------------------------------
        // NOTIFICATION - EMPLOYEE
        // -----------------------------------------------------

        if (savedTask.getAssignee() != null) {

            notificationService.createNotification(
                    savedTask.getAssignee().getId(),
                    reviewerId,
                    "TASK_REJECTED",
                    "Task rejected",
                    "Your task \""
                            + savedTask.getTitle()
                            + "\" has been rejected."
                            + (reviewText.isEmpty()
                                    ? ""
                                    : " Comment: "
                                      + reviewText),
                    project.getId(),
                    savedTask.getId()
            );
        }

        return savedTask;
    }

    // =========================================================
    // SAVE TASK HISTORY
    // =========================================================

    private void saveHistory(

            Task task,

            String action,

            String changedById,

            String oldStatus,

            String newStatus,

            String comment) {

        TaskHistory history =
                new TaskHistory();

        history.setId(
                UUID.randomUUID().toString()
        );

        history.setTaskId(
                task.getId()
        );

        history.setAction(
                action
        );

        history.setChangedById(
                changedById
        );

        history.setOldStatus(
                oldStatus
        );

        history.setNewStatus(
                newStatus
        );

        history.setComment(
                comment
        );

        history.setChangedAt(
                LocalDateTime.now()
        );

        taskHistoryService.saveHistory(history);
    }

    // =========================================================
    // NOTIFY PROJECT LEAD
    // =========================================================

    private void notifyProjectLead(

            Task task,

            String actorId,

            String type,

            String title,

            String message) {

        if (task.getProject() == null ||

                task.getProject().getProjectLeader() == null) {

            return;

        }

        String projectLeaderId =
                task.getProject()
                        .getProjectLeader()
                        .getId();

        // Don't notify actor about their own action

        if (projectLeaderId != null &&

                !projectLeaderId.equals(actorId)) {

            notificationService.createNotification(
                    projectLeaderId,
                    actorId,
                    type,
                    title,
                    message,
                    task.getProject().getId(),
                    task.getId()
            );
        }
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
                                    project
                                            .getCompany()
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