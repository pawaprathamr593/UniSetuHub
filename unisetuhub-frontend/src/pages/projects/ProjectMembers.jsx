import {
  Mail,
  MoreHorizontal,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMembers } from "../../context/MemberContext";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";

function ProjectMembers() {
  const { projectId } = useParams();

  const {
    members = [],
  } = useMembers();

  const {
    projects = [],
    updateProject,
  } = useProjects();

  /*
   * =========================================================
   * TASK CONTEXT
   * =========================================================
   */

  const {
    tasks = [],
  } = useTasks();

  const [showAddMember, setShowAddMember] =
    useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] =
    useState("");

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
   *
   * Project stores:
   *
   * members: [
   *   { id: "EMP002" },
   *   { id: "EMP003" }
   * ]
   *
   */

  const projectMemberIds =
    currentProject?.members?.map(
      (member) => String(member?.id)
    ) || [];

  /*
   * =========================================================
   * CURRENT PROJECT MEMBERS
   * =========================================================
   *
   * Get complete employee profiles from
   * MemberContext.
   *
   */

  const projectMembers = members.filter(
    (member) =>
      projectMemberIds.includes(
        String(member?.id)
      )
  );

  /*
   * =========================================================
   * AVAILABLE EMPLOYEES
   * =========================================================
   *
   * Show all employees who are NOT already
   * members of this project.
   *
   */

  const availableEmployees =
    members.filter(
      (member) =>
        !projectMemberIds.includes(
          String(member?.id)
        )
    );

  /*
   * =========================================================
   * DEBUG
   * =========================================================
   */

  console.log(
    "========== PROJECT MEMBERS =========="
  );

  console.log(
    "URL PROJECT ID:",
    projectId
  );

  console.log(
    "CURRENT PROJECT:",
    currentProject
  );

  console.log(
    "PROJECT MEMBER IDS:",
    projectMemberIds
  );

  console.log(
    "ALL EMPLOYEES:",
    members
  );

  console.log(
    "PROJECT MEMBERS:",
    projectMembers
  );

  console.log(
    "AVAILABLE EMPLOYEES:",
    availableEmployees
  );

  console.log(
    "ALL TASKS:",
    tasks
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
      `${member.firstName || ""} ${
        member.surname || ""
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
   *
   * Handles both:
   *
   * task.assignee.id
   *
   * and:
   *
   * task.assigneeId
   *
   */

  const getMemberTaskCount = (memberId) => {
    if (!memberId) {
      return 0;
    }

    const normalizedMemberId =
      String(memberId).trim();

    return tasks.filter((task) => {

      /*
       * Assignee can be an object:
       *
       * task.assignee = {
       *   id: "EMP001"
       * }
       */

      const assigneeObjectId =
        typeof task?.assignee === "object"
          ? task?.assignee?.id
          : null;

      /*
       * Assignee can also directly be an ID:
       *
       * task.assignee = "EMP001"
       */

      const assigneeDirectId =
        typeof task?.assignee !== "object"
          ? task?.assignee
          : null;

      /*
       * Or backend may provide:
       *
       * task.assigneeId
       */

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
     * to existing project members.
     */

    const updatedMemberIds = [
      ...projectMemberIds,
      String(selectedEmployeeId),
    ];

    console.log(
      "ADDING EMPLOYEE:",
      selectedEmployeeId
    );

    console.log(
      "UPDATED MEMBER IDS:",
      updatedMemberIds
    );

    /*
     * IMPORTANT:
     *
     * Preserve all existing project data.
     *
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

    console.log(
      "UPDATE PROJECT RESULT:",
      result
    );

    if (result?.success) {
      setSelectedEmployeeId("");
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

    console.log(
      "REMOVING MEMBER:",
      memberId
    );

    console.log(
      "UPDATED MEMBER IDS:",
      updatedMemberIds
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

    console.log(
      "REMOVE MEMBER RESULT:",
      result
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
    setShowAddMember(true);
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
          onClick={
            handleOpenAddMember
          }
          disabled={
            availableEmployees.length ===
            0
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
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
          label="Developers"
          value={
            projectMembers.filter(
              (member) =>
                String(
                  member?.role || ""
                )
                  .toLowerCase()
                  .includes(
                    "developer"
                  ) ||
                member?.role ===
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
                member?.role ===
                  "WEBSITE_ADMIN"
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

                /*
                 * =================================================
                 * MEMBER TASK COUNT
                 * =================================================
                 */

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

                    {/* Member */}

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

                    {/* Role */}

                    <div className="min-w-[150px]">

                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Role
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {role}
                      </p>

                    </div>

                    {/* Tasks */}

                    <div className="min-w-[130px]">

                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Tasks
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {taskCount}
                      </p>

                    </div>

                    {/* Actions */}

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

          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

            {/* Header */}

            <div className="border-b border-slate-200 p-5 dark:border-slate-800">

              <h2 className="text-lg font-semibold">
                Add Project Member
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Select an employee to add
                to{" "}
                <span className="font-medium">
                  {currentProject.code ||
                    currentProject.id}
                </span>
                .
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={
                handleAddMember
              }
            >

              <div className="space-y-4 p-5">

                {/* Employee */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Select Employee
                  </label>

                  {availableEmployees.length >
                  0 ? (

                    <select
                      value={
                        selectedEmployeeId
                      }
                      onChange={(e) =>
                        setSelectedEmployeeId(
                          e.target.value
                        )
                      }
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                    >

                      <option value="">
                        -- Select Employee --
                      </option>

                      {availableEmployees.map(
                        (employee) => {

                          const name =
                            getMemberName(
                              employee
                            );

                          return (
                            <option
                              key={
                                employee.id
                              }
                              value={
                                employee.id
                              }
                            >
                              {name}{" "}
                              —{" "}
                              {employee.email}{" "}
                              —{" "}
                              {getRoleLabel(
                                employee.role
                              )}
                            </option>
                          );
                        }
                      )}

                    </select>

                  ) : (

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                      All employees are
                      already members of
                      this project.
                    </div>

                  )}

                </div>

                {/* Selected Employee Preview */}

                {selectedEmployeeId && (
                  <SelectedEmployeePreview
                    employee={members.find(
                      (member) =>
                        String(
                          member.id
                        ) ===
                        String(
                          selectedEmployeeId
                        )
                    )}
                    getMemberName={
                      getMemberName
                    }
                    getInitials={
                      getInitials
                    }
                    getRoleLabel={
                      getRoleLabel
                    }
                  />
                )}

              </div>

              {/* Footer */}

              <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

                <button
                  type="button"
                  onClick={() => {
                    setShowAddMember(
                      false
                    );
                    setSelectedEmployeeId(
                      ""
                    );
                  }}
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
  getRoleLabel,
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
            {employee.email}
          </p>

          <p className="mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {getRoleLabel(
              employee.role
            )}
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