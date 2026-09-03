
import {
  Mail,
  MoreHorizontal,
  Plus,
  UserPlus,
  Users,
  Search,
} from "lucide-react";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMembers } from "../../context/MemberContext";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

function ProjectMembers() {
  const { projectId } = useParams();

  const {
    members = [],
  } = useMembers();

  const {
    projects = [],
    updateProject,
  } = useProjects();

  const {
    tasks = [],
  } = useTasks();

  const {
    users = [],
  } = useAuth();

  const [showAddMember, setShowAddMember] =
    useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] =
    useState("");

  /*
   * =========================================================
   * ADD MEMBER SEARCH / FILTER
   * =========================================================
   */

  const [memberSearch, setMemberSearch] =
    useState("");

  const [memberFilter, setMemberFilter] =
    useState("all");

  /*
   * =========================================================
   * FIND CURRENT PROJECT
   * =========================================================
   */

  const currentProject = projects.find(
    (project) =>
      String(project?.id).toUpperCase() ===
      String(projectId).toUpperCase() ||
      String(project?.code).toUpperCase() ===
      String(projectId).toUpperCase()
  );

  /*
   * =========================================================
   * PROJECT NOT FOUND
   * =========================================================
   */

  if (!currentProject) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">
        <h1 className="text-xl font-semibold">
          Project Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The project with ID "{projectId}" does not
          exist.
        </p>
      </div>
    );
  }

  /*
   * =========================================================
   * PROJECT MEMBER IDS
   * =========================================================
   */

  const projectMemberIds =
    currentProject?.members?.map(
      (member) => String(member?.id)
    ) || [];

  /*
   * =========================================================
   * CURRENT PROJECT MEMBERS
   * =========================================================
   */

  const projectMembers = members.filter(
    (member) =>
      projectMemberIds.includes(
        String(member?.id)
      )
  );

  /*
   * =========================================================
   * PROJECT COMPANY ID
   * =========================================================
   */

  const projectCompanyId = String(
    currentProject?.company?.id ||
    currentProject?.companyId ||
    ""
  );

  /*
   * =========================================================
   * COMPANY EMPLOYEES
   * =========================================================
   *
   * Only EMPLOYEE users belonging to the
   * current project's company.
   *
   */

  const companyEmployees = users.filter(
    (user) => {
      const userCompanyId = String(
        user?.company?.id ||
        user?.companyId ||
        ""
      );

      const role = String(
        user?.role || ""
      ).toUpperCase();

      return (
        userCompanyId === projectCompanyId &&
        role === "EMPLOYEE"
      );
    }
  );

  /*
   * =========================================================
   * AVAILABLE EMPLOYEES
   * =========================================================
   *
   * Company employees who are not already
   * members of this project.
   *
   */

  const availableEmployees =
    companyEmployees.filter(
      (employee) =>
        !projectMemberIds.includes(
          String(employee?.id)
        )
    );

  /*
   * =========================================================
   * GET MEMBER NAME
   * =========================================================
   */

  const getMemberName = (member) => {
    if (!member) {
      return "Unknown User";
    }

    if (member.name) {
      return member.name;
    }

    const fullName =
      `${member.firstName || ""} ${member.surname || ""
        }`.trim();

    return (
      fullName ||
      member.email ||
      "Unknown User"
    );
  };

  /*
   * =========================================================
   * GET INITIALS
   * =========================================================
   */

  const getInitials = (member) => {
    if (member?.initials) {
      return member.initials;
    }

    const name = getMemberName(member);

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (word) =>
          word.charAt(0)
      )
      .join("")
      .toUpperCase();
  };

  /*
   * =========================================================
   * ROLE LABEL
   * =========================================================
   */

  const getRoleLabel = (role) => {
    const roles = {
      WEBSITE_ADMIN: "Website Admin",
      COMPANY_HEAD: "Company Head",
      PROJECT_LEAD: "Project Lead",
      EMPLOYEE: "Employee",
    };

    return (
      roles[role] ||
      role ||
      "Employee"
    );
  };

  /*
   * =========================================================
   * GET MEMBER TASK COUNT
   * =========================================================
   */

  const getMemberTaskCount = (memberId) => {
    if (!memberId) {
      return 0;
    }

    const normalizedMemberId =
      String(memberId).trim();

    return tasks.filter((task) => {
      const assigneeObjectId =
        typeof task?.assignee === "object"
          ? task?.assignee?.id
          : null;

      const assigneeDirectId =
        typeof task?.assignee !== "object"
          ? task?.assignee
          : null;

      const assigneeId =
        task?.assigneeId;

      return (
        String(
          assigneeObjectId || ""
        ).trim() === normalizedMemberId ||
        String(
          assigneeDirectId || ""
        ).trim() === normalizedMemberId ||
        String(
          assigneeId || ""
        ).trim() === normalizedMemberId
      );
    }).length;
  };

  /*
   * =========================================================
   * EMPLOYEE PROJECTS
   * =========================================================
   */

  const getEmployeeProjects = (employeeId) => {
    return projects.filter((project) => {
      const projectMembers =
        Array.isArray(project?.members)
          ? project.members
          : [];

      return projectMembers.some(
        (member) =>
          String(
            member?.id || member
          ) === String(employeeId)
      );
    });
  };

  /*
   * =========================================================
   * EMPLOYEE FILTER HELPERS
   * =========================================================
   */

  const isEmployeeUnassigned = (
    employeeId
  ) => {
    const employeeProjects =
      getEmployeeProjects(employeeId);

    return employeeProjects.length === 0;
  };

  const hasOnlyCompletedProjects = (
    employeeId
  ) => {
    const employeeProjects =
      getEmployeeProjects(employeeId);

    return (
      employeeProjects.length > 0 &&
      employeeProjects.every(
        (project) =>
          String(
            project?.status || ""
          ).toUpperCase() ===
          "COMPLETED"
      )
    );
  };

  /*
   * =========================================================
   * FILTERED AVAILABLE EMPLOYEES
   * =========================================================
   */

  const filteredAvailableEmployees =
    availableEmployees.filter(
      (employee) => {
        const searchText =
          memberSearch
            .trim()
            .toLowerCase();

        const name =
          getMemberName(
            employee
          ).toLowerCase();

        const email =
          String(
            employee?.email || ""
          ).toLowerCase();

        /*
         * SEARCH
         */

        const matchesSearch =
          !searchText ||
          name.includes(searchText) ||
          email.includes(searchText);

        if (!matchesSearch) {
          return false;
        }

        /*
         * FILTER
         */

        if (
          memberFilter ===
          "unassigned"
        ) {
          return isEmployeeUnassigned(
            employee.id
          );
        }

        if (
          memberFilter ===
          "completed"
        ) {
          return hasOnlyCompletedProjects(
            employee.id
          );
        }

        return true;
      }
    );

  /*
   * =========================================================
   * ADD EXISTING EMPLOYEE TO PROJECT
   * =========================================================
   */

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!selectedEmployeeId) {
      return;
    }

    /*
     * Prevent duplicate member
     */

    if (
      projectMemberIds.includes(
        String(selectedEmployeeId)
      )
    ) {
      return;
    }

    /*
     * Add selected employee ID
     */

    const updatedMemberIds = [
      ...projectMemberIds,
      String(selectedEmployeeId),
    ];


    /*
     * Preserve existing project data
     */

    const result = await updateProject(
      currentProject.id,
      {
        code:
          currentProject.code,

        name:
          currentProject.name,

        description:
          currentProject.description,

        type:
          currentProject.type,

        visibility:
          currentProject.visibility,

        companyId:
          currentProject?.company?.id ||
          currentProject?.companyId,

        projectLeaderId:
          currentProject?.projectLeader?.id ||
          currentProject?.projectLeaderId,

        memberIds:
          updatedMemberIds,
      }
    );

   

    if (result?.success) {
      setSelectedEmployeeId("");
      setMemberSearch("");
      setMemberFilter("all");
      setShowAddMember(false);
    } else {
      alert(
        result?.message ||
        "Failed to add member."
      );
    }
  };

  /*
   * =========================================================
   * REMOVE MEMBER
   * =========================================================
   */

  const handleRemoveMember = async (
    memberId
  ) => {
    const member =
      projectMembers.find(
        (item) =>
          String(item?.id) ===
          String(memberId)
      );

    const memberName =
      getMemberName(member);

    /*
     * Don't allow removing project leader
     */

    const leaderId = String(
      currentProject?.projectLeader?.id ||
      currentProject?.projectLeaderId ||
      ""
    );

    if (
      leaderId &&
      String(memberId) === leaderId
    ) {
      alert(
        "The project leader cannot be removed from the project."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Remove ${memberName} from this project?`
      );

    if (!confirmed) {
      return;
    }

    /*
     * Remove employee ID
     */

    const updatedMemberIds =
      projectMemberIds.filter(
        (id) =>
          String(id) !==
          String(memberId)
      );


    /*
     * Update project
     */

    const result =
      await updateProject(
        currentProject.id,
        {
          code:
            currentProject.code,

          name:
            currentProject.name,

          description:
            currentProject.description,

          type:
            currentProject.type,

          visibility:
            currentProject.visibility,

          companyId:
            currentProject?.company?.id ||
            currentProject?.companyId,

          projectLeaderId:
            currentProject?.projectLeader?.id ||
            currentProject?.projectLeaderId,

          memberIds:
            updatedMemberIds,
        }
      );



    if (!result?.success) {
      alert(
        result?.message ||
        "Failed to remove member."
      );
    }
  };

  /*
   * =========================================================
   * OPEN ADD MEMBER MODAL
   * =========================================================
   */

  const handleOpenAddMember = () => {
    setSelectedEmployeeId("");
    setMemberSearch("");
    setMemberFilter("all");
    setShowAddMember(true);
  };

  /*
   * =========================================================
   * CLOSE ADD MEMBER MODAL
   * =========================================================
   */

  const handleCloseAddMember = () => {
    setSelectedEmployeeId("");
    setMemberSearch("");
    setMemberFilter("all");
    setShowAddMember(false);
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-bold">
              Project Members
            </h1>

            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {currentProject.code ||
                currentProject.id}
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage the people working on this
            project.
          </p>

        </div>

        <button
          type="button"
          onClick={handleOpenAddMember}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Member
        </button>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <SummaryCard
          icon={<Users size={19} />}
          label="Total Members"
          value={
            projectMembers.length
          }
        />

        <SummaryCard
          icon={<UserPlus size={19} />}
          label="Employees"
          value={
            projectMembers.filter(
              (member) =>
                String(
                  member?.role || ""
                ).toUpperCase() ===
                "EMPLOYEE"
            ).length
          }
        />

        <SummaryCard
          icon={<Mail size={19} />}
          label="Project Admins"
          value={
            projectMembers.filter(
              (member) =>
                String(
                  member?.role || ""
                )
                  .toLowerCase()
                  .includes(
                    "admin"
                  ) ||
                String(
                  member?.role || ""
                ).toUpperCase() ===
                "PROJECT_LEAD"
            ).length
          }
        />

      </div>

      {/* =================================================
          MEMBERS
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">

          <h2 className="font-semibold">
            Team Members
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {projectMembers.length}{" "}
            people are currently part
            of this project.
          </p>

        </div>

        {projectMembers.length >
          0 ? (

          <div className="divide-y divide-slate-200 dark:divide-slate-800">

            {projectMembers.map(
              (member) => {

                const memberName =
                  getMemberName(
                    member
                  );

                const initials =
                  getInitials(
                    member
                  );

                const role =
                  getRoleLabel(
                    member?.role
                  );

                const leaderId =
                  String(
                    currentProject
                      ?.projectLeader
                      ?.id ||
                    currentProject?.projectLeaderId ||
                    ""
                  );

                const isLeader =
                  String(
                    member?.id
                  ) ===
                  leaderId;

                const taskCount =
                  getMemberTaskCount(
                    member?.id
                  );

                return (
                  <div
                    key={
                      member?.id ||
                      member?.email
                    }
                    className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-slate-900/50"
                  >

                    {/* MEMBER */}

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        {initials}
                      </div>

                      <div>

                        <div className="flex items-center gap-2">

                          <p className="text-sm font-semibold">
                            {memberName}
                          </p>

                          {isLeader && (
                            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                              Leader
                            </span>
                          )}

                        </div>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {member?.email ||
                            "No email"}
                        </p>

                      </div>

                    </div>

                    {/* ROLE */}

                    <div className="min-w-[150px]">

                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Role
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {role}
                      </p>

                    </div>

                    {/* TASKS */}

                    <div className="min-w-[130px]">

                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Tasks
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {taskCount}
                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center">

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveMember(
                            member?.id
                          )
                        }
                        disabled={
                          isLeader
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-500/10"
                        title={
                          isLeader
                            ? "Project leader cannot be removed"
                            : "Remove member"
                        }
                      >
                        <MoreHorizontal
                          size={18}
                        />
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        ) : (

          <div className="px-5 py-12 text-center">

            <Users
              size={32}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm font-medium">
              No project members
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Add members to this
              project to get started.
            </p>

          </div>

        )}

      </div>

      {/* =================================================
          ADD MEMBER MODAL
      ================================================= */}

      {showAddMember && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="border-b border-slate-200 p-5 dark:border-slate-800">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-lg font-semibold">
                    Add Project Member
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Select an employee from your
                    company to add to{" "}
                    <span className="font-medium">
                      {currentProject.code ||
                        currentProject.id}
                    </span>
                    .
                  </p>

                </div>

                <button
                  type="button"
                  onClick={
                    handleCloseAddMember
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <span className="text-lg">
                    ×
                  </span>
                </button>

              </div>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={
                handleAddMember
              }
            >

              <div className="space-y-4 p-5">

                {availableEmployees.length >
                  0 ? (

                  <>
                    {/* SEARCH + FILTER */}

                    <div className="flex flex-col gap-2 sm:flex-row">

                      {/* SEARCH */}

                      <div className="relative flex-1">

                        <Search
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          value={
                            memberSearch
                          }
                          onChange={(e) =>
                            setMemberSearch(
                              e.target.value
                            )
                          }
                          placeholder="Search employees by name or email..."
                          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                        />

                      </div>

                      {/* FILTER */}

                      <select
                        value={
                          memberFilter
                        }
                        onChange={(e) =>
                          setMemberFilter(
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 sm:w-48"
                      >
                        <option value="all">
                          All Employees
                        </option>

                        <option value="unassigned">
                          Unassigned
                        </option>

                        <option value="completed">
                          Project Completed
                        </option>
                      </select>

                    </div>

                    {/* RESULTS */}

                    <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-300 dark:border-slate-700">

                      {filteredAvailableEmployees.length >
                        0 ? (

                        filteredAvailableEmployees.map(
                          (employee) => {

                            const selected =
                              String(
                                selectedEmployeeId
                              ) ===
                              String(
                                employee.id
                              );

                            return (
                              <button
                                key={
                                  employee.id
                                }
                                type="button"
                                onClick={() =>
                                  setSelectedEmployeeId(
                                    employee.id
                                  )
                                }
                                className={`flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 dark:border-slate-800 ${selected
                                    ? "bg-indigo-50 dark:bg-indigo-500/10"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                  }`}
                              >

                                {/* SELECT INDICATOR */}

                                <div
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected
                                      ? "border-indigo-600 bg-indigo-600 text-white"
                                      : "border-slate-300 dark:border-slate-600"
                                    }`}
                                >
                                  {selected && (
                                    <span className="text-xs font-bold">
                                      ✓
                                    </span>
                                  )}
                                </div>

                                {/* AVATAR */}

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                  {getInitials(
                                    employee
                                  )}
                                </div>

                                {/* EMPLOYEE */}

                                <div className="min-w-0 flex-1">

                                  <p className="truncate text-sm font-medium">
                                    {getMemberName(
                                      employee
                                    )}
                                  </p>

                                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                    {employee.email ||
                                      "No email"}
                                  </p>

                                </div>

                              </button>
                            );
                          }
                        )

                      ) : (

                        <div className="p-5 text-center text-sm text-slate-400">
                          No employees match your
                          search or filter.
                        </div>

                      )}

                    </div>

                    {/* RESULT COUNT */}

                    <div className="flex items-center justify-between text-xs text-slate-400">

                      <span>
                        Showing{" "}
                        {
                          filteredAvailableEmployees.length
                        }{" "}
                        of{" "}
                        {
                          availableEmployees.length
                        }{" "}
                        available employees
                      </span>

                      {selectedEmployeeId && (
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          1 employee selected
                        </span>
                      )}

                    </div>

                    {/* SELECTED EMPLOYEE PREVIEW */}

                    {selectedEmployeeId && (
                      <SelectedEmployeePreview
                        employee={
                          availableEmployees.find(
                            (employee) =>
                              String(
                                employee.id
                              ) ===
                              String(
                                selectedEmployeeId
                              )
                          )
                        }
                        getMemberName={
                          getMemberName
                        }
                        getInitials={
                          getInitials
                        }
                      />
                    )}
                  </>

                ) : (

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                    All employees from this
                    company are already
                    members of this project.
                  </div>

                )}

              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

                <button
                  type="button"
                  onClick={
                    handleCloseAddMember
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium dark:border-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    !selectedEmployeeId
                  }
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  Add Member
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

/*
 * =========================================================
 * SELECTED EMPLOYEE PREVIEW
 * =========================================================
 */

function SelectedEmployeePreview({
  employee,
  getMemberName,
  getInitials,
}) {
  if (!employee) {
    return null;
  }

  return (
    <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          {getInitials(employee)}
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold">
            {getMemberName(employee)}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {employee.email ||
              "No email"}
          </p>

          <p className="mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            Employee
          </p>

        </div>

      </div>

    </div>
  );
}

/*
 * =========================================================
 * SUMMARY CARD
 * =========================================================
 */

function SummaryCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">

      <div className="flex items-center justify-between">

        <span className="text-indigo-600 dark:text-indigo-400">
          {icon}
        </span>

        <span className="text-2xl font-bold">
          {value}
        </span>

      </div>

      <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

    </div>
  );
}

export default ProjectMembers;

