import { ArrowLeft, FolderKanban, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

function CreateProject() {
  const navigate = useNavigate();

  const { projects = [], addProject } = useProjects();

  const {
    currentUser,
    users = [],
    isWebsiteAdmin,
    isCompanyHead,
  } = useAuth();

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    type: "Software Development",
    visibility: "Company members",
    companyId: "",
    projectLeaderId: "",
    memberIds: [],
  });

  const [loading, setLoading] = useState(false);

  /*
   * =========================================================
   * ACCESS
   * =========================================================
   */

  const canCreateProject =
    isWebsiteAdmin || isCompanyHead;

  /*
   * =========================================================
   * SELECTED COMPANY
   * =========================================================
   */

  const selectedCompanyId = isCompanyHead
    ? currentUser?.company?.id ||
      currentUser?.companyId ||
      ""
    : form.companyId;

  /*
   * =========================================================
   * GET COMPANIES
   * =========================================================
   */

  const companies = [];

  users.forEach((user) => {
    const company = user.company;

    if (company?.id) {
      const exists = companies.some(
        (item) =>
          String(item.id) === String(company.id)
      );

      if (!exists) {
        companies.push(company);
      }
    }
  });

  /*
   * =========================================================
   * COMPANY USERS
   * =========================================================
   */

  const companyUsers = users.filter((user) => {
    const userCompanyId =
      user.company?.id ||
      user.companyId ||
      "";

    return (
      String(userCompanyId) ===
      String(selectedCompanyId)
    );
  });

  /*
   * =========================================================
   * PROJECT LEADERS
   * =========================================================
   */

  const projectLeaders = companyUsers.filter(
    (user) =>
      user.role === "PROJECT_LEAD" ||
      user.role === "EMPLOYEE"
  );

  /*
   * =========================================================
   * PROJECT MEMBERS
   * =========================================================
   */

  const projectMembers = companyUsers.filter(
    (user) =>
      user.role === "PROJECT_LEAD" ||
      user.role === "EMPLOYEE"
  );

  /*
   * =========================================================
   * USER NAME
   * =========================================================
   */

  const getUserName = (user) => {
    if (user.name) {
      return user.name;
    }

    return (
      `${user.firstName || ""} ${
        user.surname || ""
      }`.trim() || "Unnamed User"
    );
  };

  /*
   * =========================================================
   * HANDLE INPUT CHANGE
   * =========================================================
   */

  const handleChange = (e) => {
    const { name, value } = e.target;

    /*
     * COMPANY CHANGE
     */

    if (name === "companyId") {
      setForm((current) => ({
        ...current,
        companyId: value,
        projectLeaderId: "",
        memberIds: [],
      }));

      return;
    }

    /*
     * PROJECT LEADER CHANGE
     */

    if (name === "projectLeaderId") {
      setForm((current) => {
        const oldLeaderId =
          current.projectLeaderId;

        let newMembers =
          current.memberIds.filter(
            (id) =>
              String(id) !==
              String(oldLeaderId)
          );

        /*
         * Add new leader automatically
         */

        if (value) {
          const alreadyMember =
            newMembers.some(
              (id) =>
                String(id) ===
                String(value)
            );

          if (!alreadyMember) {
            newMembers.push(value);
          }
        }

        return {
          ...current,
          projectLeaderId: value,
          memberIds: newMembers,
        };
      });

      return;
    }

    /*
     * NORMAL INPUT
     */

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /*
   * =========================================================
   * MEMBER CHECKBOX
   * =========================================================
   */

  const handleMemberChange = (userId) => {
    setForm((current) => {
      const exists =
        current.memberIds.some(
          (id) =>
            String(id) ===
            String(userId)
        );

      /*
       * Leader cannot be removed
       */

      if (
        exists &&
        String(userId) ===
          String(current.projectLeaderId)
      ) {
        return current;
      }

      /*
       * Remove member
       */

      if (exists) {
        return {
          ...current,
          memberIds:
            current.memberIds.filter(
              (id) =>
                String(id) !==
                String(userId)
            ),
        };
      }

      /*
       * Add member
       */

      return {
        ...current,
        memberIds: [
          ...current.memberIds,
          userId,
        ],
      };
    });
  };

  /*
   * =========================================================
   * SUBMIT
   * =========================================================
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
     * ACCESS
     */

    if (!canCreateProject) {
      alert(
        "You do not have permission to create projects."
      );

      return;
    }

    /*
     * COMPANY
     */

    if (!selectedCompanyId) {
      alert("Please select a company.");
      return;
    }

    /*
     * REQUIRED FIELDS
     */

    if (
      !form.name.trim() ||
      !form.code.trim() ||
      !form.projectLeaderId
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

    /*
     * PROJECT CODE
     */

    const projectCode = form.code
      .trim()
      .toUpperCase();

    /*
     * VALID PROJECT CODE
     */

    if (!/^[A-Z0-9_-]+$/.test(projectCode)) {
      alert(
        "Project key can contain only letters, numbers, hyphens and underscores."
      );

      return;
    }

    /*
     * DUPLICATE CHECK
     */

    const alreadyExists = projects.some(
      (project) =>
        String(project.code || "")
          .trim()
          .toUpperCase() === projectCode
    );

    if (alreadyExists) {
      alert(
        "Project key already exists."
      );

      return;
    }

    /*
     * VERIFY LEADER BELONGS TO COMPANY
     */

    const leaderExists =
      projectLeaders.some(
        (user) =>
          String(user.id) ===
          String(form.projectLeaderId)
      );

    if (!leaderExists) {
      alert(
        "Selected project leader does not belong to this company."
      );

      return;
    }

    /*
     * FINAL MEMBERS
     *
     * Project leader is always included.
     */

    const finalMemberIds = [
      ...new Set(
        [
          ...form.memberIds,
          form.projectLeaderId,
        ].map((id) => String(id))
      ),
    ];

    /*
     * VERIFY ALL MEMBERS BELONG TO COMPANY
     */

    const validMemberIds =
      finalMemberIds.filter((memberId) =>
        projectMembers.some(
          (user) =>
            String(user.id) ===
            String(memberId)
        )
      );

    /*
     * Leader must be present
     */

    if (
      !validMemberIds.some(
        (id) =>
          String(id) ===
          String(form.projectLeaderId)
      )
    ) {
      alert(
        "Project leader must be a member of the project."
      );

      return;
    }

    setLoading(true);

    try {
      const result = await addProject({
        code: projectCode,

        name: form.name.trim(),

        description:
          form.description.trim(),

        type: form.type,

        visibility: form.visibility,

        companyId: selectedCompanyId,

        projectLeaderId:
          form.projectLeaderId,

        memberIds: validMemberIds,
      });

      /*
       * BACKEND RESULT
       */

      if (!result?.success) {
        alert(
          result?.message ||
            "Failed to create project."
        );

        return;
      }

      /*
       * SUCCESS
       */

      alert(
        "Project created successfully."
      );

      navigate("/projects");
    } catch (error) {
      console.error(
        "Create project error:",
        error
      );

      alert(
        "Unable to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * ACCESS DENIED
   * =========================================================
   */

  if (!canCreateProject) {
    return (
      <div className="mx-auto max-w-3xl">

        <Link
          to="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">

          <h1 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Access Denied
          </h1>

          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            You do not have permission to create projects.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">

      {/* BACK */}

      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* HEADER */}

      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <FolderKanban size={20} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Create Project
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create a new project for your company.
          </p>
        </div>

      </div>

      {/* FORM */}

      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        <form onSubmit={handleSubmit}>

          {/* PROJECT INFORMATION */}

          <div className="border-b border-slate-200 p-6 dark:border-slate-800">

            <h2 className="font-semibold">
              Project Information
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enter the basic details of your project.
            </p>

            <div className="mt-6 space-y-5">

              {/* COMPANY */}

              {isWebsiteAdmin && (
                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Company
                  </label>

                  <select
                    name="companyId"
                    value={form.companyId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="">
                      Select company
                    </option>

                    {companies.map(
                      (company) => (
                        <option
                          key={company.id}
                          value={company.id}
                        >
                          {company.name}
                        </option>
                      )
                    )}
                  </select>

                </div>
              )}

              {/* COMPANY HEAD */}

              {isCompanyHead && (
                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Company
                  </label>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
                    {currentUser?.company?.name ||
                      currentUser?.companyId ||
                      "Company not found"}
                  </div>

                </div>
              )}

              {/* PROJECT NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Project name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Website Redesign"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                />

              </div>

              {/* PROJECT KEY */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Project key
                </label>

                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  placeholder="WEB"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm uppercase outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  A short identifier used for tasks, e.g. WEB-101.
                </p>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe what this project is about..."
                  className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                />

              </div>

            </div>
          </div>

          {/* PROJECT SETTINGS */}

          <div className="border-b border-slate-200 p-6 dark:border-slate-800">

            <h2 className="font-semibold">
              Project Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure how this project will work.
            </p>

            <div className="mt-6 space-y-5">

              {/* TYPE + VISIBILITY */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Project type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="Software Development">
                      Software Development
                    </option>

                    <option value="Marketing">
                      Marketing
                    </option>

                    <option value="Business">
                      Business
                    </option>

                    <option value="Operations">
                      Operations
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Visibility
                  </label>

                  <select
                    name="visibility"
                    value={form.visibility}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="Company members">
                      Company members
                    </option>

                    <option value="Project members only">
                      Project members only
                    </option>
                  </select>

                </div>

              </div>

              {/* PROJECT LEADER */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Project Leader
                </label>

                <select
                  name="projectLeaderId"
                  value={form.projectLeaderId}
                  onChange={handleChange}
                  required
                  disabled={!selectedCompanyId}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:disabled:bg-slate-800"
                >
                  <option value="">
                    {!selectedCompanyId
                      ? "Select company first"
                      : "Select project leader"}
                  </option>

                  {projectLeaders.map(
                    (user) => (
                      <option
                        key={user.id}
                        value={user.id}
                      >
                        {getUserName(user)}
                        {" — "}
                        {user.role}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* PROJECT MEMBERS */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Users size={16} />
                    Project Members
                  </label>

                  <span className="text-xs text-slate-400">
                    {form.memberIds.length} selected
                  </span>

                </div>

                <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-300 dark:border-slate-700">

                  {!selectedCompanyId ? (
                    <div className="p-4 text-sm text-slate-400">
                      Select a company first.
                    </div>
                  ) : projectMembers.length === 0 ? (
                    <div className="p-4 text-sm text-red-500">
                      No employees or project leads found
                      for this company.
                    </div>
                  ) : (
                    projectMembers.map(
                      (user) => {
                        const selected =
                          form.memberIds.some(
                            (id) =>
                              String(id) ===
                              String(user.id)
                          );

                        const isLeader =
                          String(user.id) ===
                          String(
                            form.projectLeaderId
                          );

                        return (
                          <label
                            key={user.id}
                            className={`flex cursor-pointer items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 dark:border-slate-800 ${
                              selected
                                ? "bg-indigo-50 dark:bg-indigo-500/10"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              disabled={isLeader}
                              onChange={() =>
                                handleMemberChange(
                                  user.id
                                )
                              }
                              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />

                            <div className="flex-1">

                              <p className="text-sm font-medium">
                                {getUserName(user)}
                              </p>

                              <p className="text-xs text-slate-400">
                                {user.role}
                              </p>

                            </div>

                            {isLeader && (
                              <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                Leader
                              </span>
                            )}
                          </label>
                        );
                      }
                    )
                  )}

                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  Select multiple employees who will work on
                  this project. The project leader is automatically
                  included.
                </p>

              </div>

            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center justify-end gap-3 p-6">

            <Link
              to="/projects"
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                loading ||
                !selectedCompanyId ||
                projectLeaders.length === 0 ||
                !form.projectLeaderId
              }
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </form>
      </div>

    </div>
  );
}

export default CreateProject;