
package com.unisetuhub.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.unisetuhub.entity.Company;
import com.unisetuhub.entity.Project;
import com.unisetuhub.entity.User;
import com.unisetuhub.repository.CompanyRepository;
import com.unisetuhub.repository.ProjectRepository;
import com.unisetuhub.repository.UserRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public ProjectService(
            ProjectRepository projectRepository,
            CompanyRepository companyRepository,
            UserRepository userRepository) {

        this.projectRepository = projectRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
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

    public Project updateProject(
            String id,
            Project updatedProject) {

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

        existingProject.setMembers(members);

        // -----------------------------------------------------
        // SAVE UPDATED PROJECT
        // -----------------------------------------------------

        return projectRepository.save(existingProject);
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
