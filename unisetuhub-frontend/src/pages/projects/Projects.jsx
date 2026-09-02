import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  Plus,
  Search,
  User,
  Users,
} from "lucide-react";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

function Projects() {
  const { tasks = [] } = useTasks();
  const { projects = [] } = useProjects();

  const { currentUser } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /*
   * =========================================================
   * DEBUG
   * =========================================================
   */

  console.log("========== PROJECT PAGE ==========");
  console.log("CURRENT USER:", currentUser);
  console.log("PROJECTS FROM CONTEXT:", projects);
  console.log("TASKS FROM CONTEXT:", tasks);

  /*
   * =========================================================
   * CURRENT USER DETAILS
   * =========================================================
   */

  const currentUserId = String(
    currentUser?.id || ""
  );

  const currentUserRole = String(
    currentUser?.role || ""
  ).toUpperCase();

  const currentCompanyId = String(
    currentUser?.company?.id ||
    currentUser?.companyId ||
    ""
  );

  console.log("USER ID:", currentUserId);
  console.log("USER ROLE:", currentUserRole);
  console.log("COMPANY ID:", currentCompanyId);

  /*
   * =========================================================
   * GET ACCESSIBLE PROJECTS
   * =========================================================
   */

  const accessibleProjects = useMemo(() => {
    if (!currentUser) {
      console.log("No current user.");
      return [];
    }

    if (!Array.isArray(projects)) {
      console.log("Projects is not an array.");
      return [];
    }

    /*
     * =======================================================
     * WEBSITE ADMIN
     * =======================================================
     */

    if (currentUserRole === "WEBSITE_ADMIN") {
      console.log(
        "Access granted: WEBSITE_ADMIN"
      );

      return projects;
    }

    /*
     * =======================================================
     * COMPANY HEAD
     * =======================================================
     *
     * Company Head can see all projects
     * belonging to their company.
     */

    if (currentUserRole === "COMPANY_HEAD") {
      console.log(
        "Access granted: COMPANY_HEAD"
      );

      const companyProjects =
        projects.filter((project) => {
          const projectCompanyId = String(
            project?.company?.id || ""
          );

          console.log(
            "Company check:",
            project?.name,
            projectCompanyId,
            "===",
            currentCompanyId
          );

          return (
            projectCompanyId ===
            currentCompanyId
          );
        });

      console.log(
        "COMPANY HEAD PROJECTS:",
        companyProjects
      );

      return companyProjects;
    }

    /*
     * =======================================================
     * PROJECT LEAD
     * =======================================================
     *
     * Project Lead can see projects where
     * project.projectLeader.id matches
     * current user's ID.
     */

    if (currentUserRole === "PROJECT_LEAD") {
      console.log(
        "Access granted: PROJECT_LEAD"
      );

      const leaderProjects =
        projects.filter((project) => {
          const leaderId = String(
            project?.projectLeader?.id || ""
          );

          console.log(
            "Leader check:",
            project?.name,
            leaderId,
            "===",
            currentUserId
          );

          return (
            leaderId === currentUserId
          );
        });

      console.log(
        "PROJECT LEAD PROJECTS:",
        leaderProjects
      );

      return leaderProjects;
    }

    /*
     * =======================================================
     * EMPLOYEE
     * =======================================================
     *
     * Employee can see projects where
     * their ID exists inside project.members.
     */

    if (currentUserRole === "EMPLOYEE") {
      console.log(
        "Access granted: EMPLOYEE"
      );

      const employeeProjects =
        projects.filter((project) => {
          const members =
            Array.isArray(project?.members)
              ? project.members
              : [];

          const isMember = members.some(
            (member) => {
              const memberId = String(
                member?.id || ""
              );

              return (
                memberId ===
                currentUserId
              );
            }
          );

          console.log(
            "Member check:",
            project?.name,
            "Members:",
            members,
            "Current User:",
            currentUserId,
            "Is Member:",
            isMember
          );

          return isMember;
        });

      console.log(
        "EMPLOYEE PROJECTS:",
        employeeProjects
      );

      return employeeProjects;
    }

    /*
     * =======================================================
     * UNKNOWN ROLE
     * =======================================================
     */

    console.log(
      "Unknown user role:",
      currentUserRole
    );

    return [];
  }, [
    projects,
    currentUser,
    currentUserId,
    currentUserRole,
    currentCompanyId,
  ]);

  /*
   * =========================================================
   * PROJECT STATISTICS
   * =========================================================
   */

  const projectsWithStats = useMemo(() => {
    return accessibleProjects.map(
      (project) => {
        /*
         * -----------------------------------------------------
         * PROJECT CODE
         * -----------------------------------------------------
         */

        const projectCode =
          project?.code
            ?.toString()
            .toUpperCase() || "";

        /*
         * -----------------------------------------------------
         * MEMBERS
         * -----------------------------------------------------
         */

        const projectMembers =
          Array.isArray(project?.members)
            ? project.members
            : [];

        /*
         * -----------------------------------------------------
         * MEMBER COUNT
         * -----------------------------------------------------
         */

        const memberCount =
          projectMembers.length;

        /*
         * -----------------------------------------------------
         * PROJECT TASKS
         * -----------------------------------------------------
         */

        const projectTasks =
          Array.isArray(tasks)
            ? tasks.filter((task) => {
              const taskProjectId =
                task?.projectId
                  ?.toString()
                  .toUpperCase();

              const projectId =
                project?.id
                  ?.toString()
                  .toUpperCase();

              return (
                taskProjectId ===
                projectCode ||
                taskProjectId ===
                projectId
              );
            })
            : [];

        /*
         * -----------------------------------------------------
         * TOTAL TASKS
         * -----------------------------------------------------
         */

        const totalTasks =
          projectTasks.length;

        /*
         * -----------------------------------------------------
         * COMPLETED TASKS
         * -----------------------------------------------------
         */

        const completedTasks =
          projectTasks.filter(
            (task) =>
              task?.status
                ?.toString()
                .toLowerCase() ===
              "done"
          ).length;

        /*
         * -----------------------------------------------------
         * PROGRESS
         * -----------------------------------------------------
         */

        const progress =
          totalTasks > 0
            ? Math.round(
              (completedTasks /
                totalTasks) *
              100
            )
            : 0;

        /*
         * -----------------------------------------------------
         * STATUS
         * -----------------------------------------------------
         */

        const status =
          totalTasks > 0 &&
            completedTasks ===
            totalTasks
            ? "completed"
            : "active";

        return {
          ...project,

          code: projectCode,

          members: projectMembers,

          memberCount,

          tasks: totalTasks,

          completed: completedTasks,

          progress,

          status,
        };
      }
    );
  }, [
    accessibleProjects,
    tasks,
  ]);

  /*
   * =========================================================
   * SEARCH + STATUS FILTER
   * =========================================================
   */

  const filteredProjects =
    projectsWithStats.filter(
      (project) => {
        const searchText =
          search
            .toLowerCase()
            .trim();

        const projectName =
          project?.name
            ?.toLowerCase() || "";

        const projectCode =
          project?.code
            ?.toLowerCase() || "";

        const projectDescription =
          project?.description
            ?.toLowerCase() || "";

        const projectType =
          project?.type
            ?.toLowerCase() || "";

        const matchesSearch =
          projectName.includes(
            searchText
          ) ||
          projectCode.includes(
            searchText
          ) ||
          projectDescription.includes(
            searchText
          ) ||
          projectType.includes(
            searchText
          );

        const matchesStatus =
          statusFilter === "all" ||
          project.status ===
          statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  /*
   * =========================================================
   * CREATE PROJECT PERMISSION
   * =========================================================
   */

  const canCreateProject =
    currentUserRole ===
    "WEBSITE_ADMIN" ||
    currentUserRole ===
    "COMPANY_HEAD";

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

              <FolderKanban
                size={20}
              />

            </div>

            <h1 className="text-2xl font-bold">
              Projects
            </h1>

          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage and organize your
            company's projects.
          </p>

        </div>

        {/* =================================================
            CREATE PROJECT
        ================================================= */}

        {canCreateProject && (
          <Link
            to="/projects/create"
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <Plus size={18} />

            Create Project
          </Link>
        )}

      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search projects..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-600"
          />

        </div>

        {/* Status */}

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-900"
        >

          <option value="all">
            All Projects
          </option>

          <option value="active">
            Active
          </option>

          <option value="completed">
            Completed
          </option>

        </select>

      </div>

      {/* =================================================
          PROJECT CARDS
      ================================================= */}

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">

        {filteredProjects.length >
          0 ? (

          filteredProjects.map(
            (project) => {

              /*
               * =================================================
               * PROJECT LEADER
               * =================================================
               */

              const leader =
                project?.projectLeader;

              const leaderName =
                leader?.firstName ||
                  leader?.surname
                  ? `${leader?.firstName || ""} ${leader?.surname || ""
                    }`.trim()
                  : leader?.name ||
                  leader?.email ||
                  "Not assigned";

              /*
               * =================================================
               * PROJECT MEMBERS
               * =================================================
               */

              const members =
                Array.isArray(
                  project?.members
                )
                  ? project.members
                  : [];

              return (
                <div
                  key={
                    project?.id ||
                    project?.code
                  }
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >

                  {/* =================================================
                      CARD HEADER
                  ================================================= */}

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                      {project?.code ||
                        "PRJ"}

                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${project?.status ===
                          "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                        }`}
                    >

                      {project?.status ===
                        "completed"
                        ? "Completed"
                        : "Active"}

                    </span>

                  </div>

                  {/* =================================================
                      PROJECT INFO
                  ================================================= */}

                  <div className="mt-5">

                    <h2 className="text-lg font-semibold">

                      {project?.name ||
                        "Unnamed Project"}

                    </h2>

                    <p className="mt-1 min-h-10 text-sm text-slate-500 dark:text-slate-400">

                      {project?.description ||
                        "No description available."}

                    </p>

                  </div>

                  {/* =================================================
                      PROJECT DETAILS
                  ================================================= */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    {/* Project Type */}

                    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">

                      <div className="flex items-center gap-2 text-slate-400">

                        <FolderKanban
                          size={15}
                        />

                        <span className="text-xs">
                          Type
                        </span>

                      </div>

                      <p className="mt-1 truncate text-sm font-semibold">

                        {project?.type ||
                          "Not specified"}

                      </p>

                    </div>

                    {/* Project Leader */}

                    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">

                      <div className="flex items-center gap-2 text-slate-400">

                        <User size={15} />

                        <span className="text-xs">
                          Leader
                        </span>

                      </div>

                      <p className="mt-1 truncate text-sm font-semibold">

                        {leaderName}

                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      MEMBERS
                  ================================================= */}

                  <div className="mt-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">

                    <div className="flex items-center gap-2 text-slate-400">

                      <Users size={15} />

                      <span className="text-xs">
                        Members
                      </span>

                    </div>

                    <p className="mt-1 text-sm font-semibold">

                      {project?.memberCount ||
                        0}{" "}

                      {project?.memberCount ===
                        1
                        ? "member"
                        : "members"}

                    </p>

                    {/* Member names */}

                    {members.length >
                      0 && (
                        <div className="mt-2 flex flex-wrap gap-1">

                          {members
                            .slice(0, 3)
                            .map(
                              (
                                member
                              ) => {

                                const memberName =
                                  `${member?.firstName || ""} ${member?.surname || ""
                                    }`.trim() ||
                                  member?.name ||
                                  member?.email ||
                                  "User";

                                return (
                                  <span
                                    key={
                                      member?.id ||
                                      member?.email
                                    }
                                    className="rounded-full bg-white px-2 py-1 text-[10px] text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                                  >
                                    {
                                      memberName
                                    }
                                  </span>
                                );
                              }
                            )}

                          {members.length >
                            3 && (
                              <span className="rounded-full bg-white px-2 py-1 text-[10px] text-slate-500 dark:bg-slate-700 dark:text-slate-400">

                                +
                                {members.length -
                                  3}{" "}
                                more

                              </span>
                            )}

                        </div>
                      )}

                  </div>

                  {/* =================================================
                      TASKS
                  ================================================= */}

                  <div className="mt-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">

                    <div className="flex items-center gap-2 text-slate-400">

                      <CheckCircle2
                        size={15}
                      />

                      <span className="text-xs">
                        Tasks
                      </span>

                    </div>

                    <p className="mt-1 text-sm font-semibold">

                      {project?.tasks ||
                        0}{" "}
                      total

                    </p>

                  </div>

                  {/* =================================================
                      PROGRESS
                  ================================================= */}

                  <div className="mt-5">

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">

                        <Clock3
                          size={14}
                        />

                        Progress

                      </div>

                      <span className="text-xs font-semibold">

                        {project?.progress ||
                          0}%

                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                        style={{
                          width: `${project?.progress || 0}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* =================================================
                      FOOTER
                  ================================================= */}

                  <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">

                    <span className="text-xs text-slate-400">

                      {project?.completed ||
                        0}{" "}
                      of{" "}
                      {project?.tasks ||
                        0}{" "}
                      completed

                    </span>

                    <Link
                      to={`/projects/${project?.id}`}
                    >
                      Open Project →
                    </Link>

                  </div>

                </div>
              );
            }
          )

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="col-span-full rounded-xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">

            <FolderKanban
              size={32}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm font-medium">
              No projects found
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try changing your search
              or project filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Projects;