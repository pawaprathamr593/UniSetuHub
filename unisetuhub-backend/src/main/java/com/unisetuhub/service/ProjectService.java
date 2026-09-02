package com.unisetuhub.service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unisetuhub.entity.Company;
import com.unisetuhub.entity.Project;
import com.unisetuhub.entity.ProjectMemberHistory;
import com.unisetuhub.entity.User;
import com.unisetuhub.repository.CompanyRepository;
import com.unisetuhub.repository.ProjectRepository;
import com.unisetuhub.repository.UserRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    private final ProjectMemberHistoryService projectMemberHistoryService;
    private final NotificationService notificationService;

    public ProjectService(
            ProjectRepository projectRepository,
            CompanyRepository companyRepository,
            UserRepository userRepository,
            ProjectMemberHistoryService projectMemberHistoryService,
            NotificationService notificationService) {

        this.projectRepository = projectRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.projectMemberHistoryService = projectMemberHistoryService;
        this.notificationService = notificationService;
    }

    // =========================================================
    // GET ALL PROJECTS
    // =========================================================

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // =========================================================
    // GET PROJECT BY ID
    // =========================================================

    public Project getProjectById(String id) {
        return projectRepository.findById(id)
                .orElse(null);
    }

    // =========================================================
    // GET PROJECT BY CODE
    // =========================================================

    public Project getProjectByCode(String code) {
        return projectRepository.findByCode(code)
                .orElse(null);
    }

    // =========================================================
    // GET PROJECTS BY COMPANY
    // =========================================================

    public List<Project> getProjectsByCompany(String companyId) {
        return projectRepository.findByCompanyId(companyId);
    }

    // =========================================================
    // GET PROJECTS BY PROJECT LEADER
    // =========================================================

    public List<Project> getProjectsByLeader(User projectLeader) {
        return projectRepository.findByProjectLeader(projectLeader);
    }

    // =========================================================
    // ADD PROJECT
    // =========================================================

    public Project addProject(Project project) {

        // -----------------------------------------------------
        // CHECK PROJECT CODE
        // -----------------------------------------------------

        if (project.getCode() == null ||
                project.getCode().trim().isEmpty()) {

            throw new RuntimeException(
                    "Project code is required."
            );
        }

        String projectCode =
                project.getCode().trim().toUpperCase();

        if (projectRepository.existsByCode(projectCode)) {
            return null;
        }

        project.setCode(projectCode);

        // -----------------------------------------------------
        // CHECK PROJECT NAME
        // -----------------------------------------------------

        if (project.getName() == null ||
                project.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Project name is required."
            );
        }

        project.setName(
                project.getName().trim()
        );

        // -----------------------------------------------------
        // CHECK COMPANY
        // -----------------------------------------------------

        if (project.getCompany() == null ||
                project.getCompany().getId() == null) {

            throw new RuntimeException(
                    "Company ID is required."
            );
        }

        Company company =
                companyRepository.findById(
                        project.getCompany().getId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Company not found."
                        )
                );

        project.setCompany(company);

        // -----------------------------------------------------
        // PROJECT LEADER
        // -----------------------------------------------------

        User projectLeader = null;

        if (project.getProjectLeader() != null &&
                project.getProjectLeader().getId() != null) {

            projectLeader =
                    userRepository.findById(
                            project.getProjectLeader().getId()
                    ).orElseThrow(() ->
                            new RuntimeException(
                                    "Project leader not found."
                            )
                    );

            // Leader must belong to selected company

            if (projectLeader.getCompany() == null ||
                    !projectLeader.getCompany()
                            .getId()
                            .equals(company.getId())) {

                throw new RuntimeException(
                        "Project leader does not belong to this company."
                );
            }

            project.setProjectLeader(projectLeader);
        }

        // -----------------------------------------------------
        // PROJECT MEMBERS
        // -----------------------------------------------------

        Set<User> members = new HashSet<>();

        if (project.getMembers() != null) {

            for (User member : project.getMembers()) {

                if (member == null ||
                        member.getId() == null) {

                    continue;
                }

                User actualUser =
                        userRepository.findById(
                                member.getId()
                        ).orElseThrow(() ->
                                new RuntimeException(
                                        "Project member not found: "
                                                + member.getId()
                                )
                        );

                // Member must belong to same company

                if (actualUser.getCompany() == null ||
                        !actualUser.getCompany()
                                .getId()
                                .equals(company.getId())) {

                    throw new RuntimeException(
                            "Project member "
                                    + actualUser.getId()
                                    + " does not belong to this company."
                    );
                }

                members.add(actualUser);
            }
        }

        // -----------------------------------------------------
        // ALWAYS ADD PROJECT LEADER
        // -----------------------------------------------------

        if (projectLeader != null) {
            members.add(projectLeader);
        }

        project.setMembers(members);

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        return projectRepository.save(project);
    }

    // =========================================================
    // UPDATE PROJECT
    // =========================================================

    @Transactional
    public Project updateProject(
            String id,
            Project updatedProject,
            String changedById) {

        // -----------------------------------------------------
        // FIND EXISTING PROJECT
        // -----------------------------------------------------

        Project existingProject =
                projectRepository.findById(id)
                        .orElse(null);

        if (existingProject == null) {
            return null;
        }

        // -----------------------------------------------------
        // SAVE OLD MEMBERS
        // -----------------------------------------------------

        Set<String> oldMemberIds = new HashSet<>();

        if (existingProject.getMembers() != null) {

            for (User member : existingProject.getMembers()) {

                if (member != null &&
                        member.getId() != null) {

                    oldMemberIds.add(member.getId());
                }
            }
        }

        // -----------------------------------------------------
        // UPDATE CODE
        // -----------------------------------------------------

        if (updatedProject.getCode() != null &&
                !updatedProject.getCode().trim().isEmpty()) {

            String newCode =
                    updatedProject.getCode()
                            .trim()
                            .toUpperCase();

            // Check if another project already uses code

            Project projectWithSameCode =
                    projectRepository.findByCode(newCode)
                            .orElse(null);

            if (projectWithSameCode != null &&
                    !projectWithSameCode.getId().equals(id)) {

                throw new RuntimeException(
                        "Project code already exists."
                );
            }

            existingProject.setCode(newCode);
        }

        // -----------------------------------------------------
        // UPDATE NAME
        // -----------------------------------------------------

        if (updatedProject.getName() != null) {

            existingProject.setName(
                    updatedProject.getName().trim()
            );
        }

        // -----------------------------------------------------
        // UPDATE DESCRIPTION
        // -----------------------------------------------------

        existingProject.setDescription(
                updatedProject.getDescription() == null
                        ? ""
                        : updatedProject.getDescription().trim()
        );

        // -----------------------------------------------------
        // UPDATE TYPE
        // -----------------------------------------------------

        if (updatedProject.getType() != null) {

            existingProject.setType(
                    updatedProject.getType()
            );
        }

        // -----------------------------------------------------
        // UPDATE VISIBILITY
        // -----------------------------------------------------

        if (updatedProject.getVisibility() != null) {

            existingProject.setVisibility(
                    updatedProject.getVisibility()
            );
        }

        // -----------------------------------------------------
        // COMPANY
        // -----------------------------------------------------

        Company company =
                existingProject.getCompany();

        if (updatedProject.getCompany() != null &&
                updatedProject.getCompany().getId() != null) {

            company =
                    companyRepository.findById(
                            updatedProject
                                    .getCompany()
                                    .getId()
                    ).orElseThrow(() ->
                            new RuntimeException(
                                    "Company not found."
                            )
                    );

            existingProject.setCompany(company);
        }

        // -----------------------------------------------------
        // PROJECT LEADER
        // -----------------------------------------------------

        User projectLeader = null;

        if (updatedProject.getProjectLeader() != null &&
                updatedProject.getProjectLeader().getId() != null) {

            projectLeader =
                    userRepository.findById(
                            updatedProject
                                    .getProjectLeader()
                                    .getId()
                    ).orElseThrow(() ->
                            new RuntimeException(
                                    "Project leader not found."
                            )
                    );

            // Leader must belong to company

            if (projectLeader.getCompany() == null ||
                    !projectLeader.getCompany()
                            .getId()
                            .equals(company.getId())) {

                throw new RuntimeException(
                        "Project leader does not belong to this company."
                );
            }

            existingProject.setProjectLeader(
                    projectLeader
            );

        } else {

            // Keep existing leader if no new leader was supplied

            projectLeader =
                    existingProject.getProjectLeader();
        }

        // -----------------------------------------------------
        // PROJECT MEMBERS
        // -----------------------------------------------------

        Set<User> members = new HashSet<>();

        if (updatedProject.getMembers() != null) {

            for (User member :
                    updatedProject.getMembers()) {

                if (member == null ||
                        member.getId() == null) {

                    continue;
                }

                User actualUser =
                        userRepository.findById(
                                member.getId()
                        ).orElseThrow(() ->
                                new RuntimeException(
                                        "Project member not found: "
                                                + member.getId()
                                )
                        );

                // Member must belong to company

                if (actualUser.getCompany() == null ||
                        !actualUser.getCompany()
                                .getId()
                                .equals(company.getId())) {

                    throw new RuntimeException(
                            "Project member "
                                    + actualUser.getId()
                                    + " does not belong to this company."
                    );
                }

                members.add(actualUser);
            }
        }

        // -----------------------------------------------------
        // ALWAYS KEEP PROJECT LEADER AS MEMBER
        // -----------------------------------------------------

        if (projectLeader != null) {
            members.add(projectLeader);
        }

        // -----------------------------------------------------
        // FIND ADDED MEMBERS
        // -----------------------------------------------------

        Set<String> newMemberIds = new HashSet<>();

        for (User member : members) {

            if (member != null &&
                    member.getId() != null) {

                newMemberIds.add(member.getId());
            }
        }

        // -----------------------------------------------------
        // ADDED MEMBERS
        // -----------------------------------------------------

        for (String memberId : newMemberIds) {

            if (!oldMemberIds.contains(memberId)) {

                ProjectMemberHistory history =
                        new ProjectMemberHistory();

                history.setId(
                        UUID.randomUUID().toString()
                );

                history.setProjectId(
                        existingProject.getId()
                );

                history.setMemberId(
                        memberId
                );

                history.setAction(
                        "ADD"
                );

                history.setChangedById(
                        changedById
                );

                history.setChangedAt(
                        LocalDateTime.now()
                );

                projectMemberHistoryService
                        .saveHistory(history);

                // -------------------------------------------------
                // NOTIFICATION TO ADDED MEMBER
                // -------------------------------------------------

                notificationService.createNotification(
                        memberId,
                        changedById,
                        "PROJECT_MEMBER_ADDED",
                        "Added to project",
                        "You have been added to project "
                                + existingProject.getName(),
                        existingProject.getId(),
                        null
                );
            }
        }

        // -----------------------------------------------------
        // REMOVED MEMBERS
        // -----------------------------------------------------

        for (String oldMemberId : oldMemberIds) {

            if (!newMemberIds.contains(oldMemberId)) {

                ProjectMemberHistory history =
                        new ProjectMemberHistory();

                history.setId(
                        UUID.randomUUID().toString()
                );

                history.setProjectId(
                        existingProject.getId()
                );

                history.setMemberId(
                        oldMemberId
                );

                history.setAction(
                        "REMOVE"
                );

                history.setChangedById(
                        changedById
                );

                history.setChangedAt(
                        LocalDateTime.now()
                );

                projectMemberHistoryService
                        .saveHistory(history);

                // -------------------------------------------------
                // NOTIFICATION TO REMOVED MEMBER
                // -------------------------------------------------

                notificationService.createNotification(
                        oldMemberId,
                        changedById,
                        "PROJECT_MEMBER_REMOVED",
                        "Removed from project",
                        "You have been removed from project "
                                + existingProject.getName(),
                        existingProject.getId(),
                        null
                );
            }
        }

        // -----------------------------------------------------
        // SET MEMBERS
        // -----------------------------------------------------

        existingProject.setMembers(members);

        // -----------------------------------------------------
        // SAVE UPDATED PROJECT
        // -----------------------------------------------------

        return projectRepository.save(existingProject);
    }

    // =========================================================
    // BACKWARD COMPATIBILITY
    // =========================================================

    public Project updateProject(
            String id,
            Project updatedProject) {

        return updateProject(
                id,
                updatedProject,
                null
        );
    }

    // =========================================================
    // DELETE PROJECT
    // =========================================================

    public boolean deleteProject(String id) {

        if (!projectRepository.existsById(id)) {
            return false;
        }

        projectRepository.deleteById(id);

        return true;
    }
}