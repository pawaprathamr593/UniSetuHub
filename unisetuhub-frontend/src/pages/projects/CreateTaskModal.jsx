import { X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";

function CreateTaskModal({
  onClose,
  onCreate,
  projectId,
}) {
  const { users = [] } = useAuth();
  const { getProjectById } = useProjects();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assigneeId: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    await onCreate(form);
  };

  /*
   * =========================================================
   * CURRENT PROJECT
   * =========================================================
   */

  const currentProject =
    getProjectById(projectId);

  /*
   * =========================================================
   * PROJECT MEMBER IDS
   * =========================================================
   */

  const projectMemberIds =
    currentProject?.members?.map(
      (member) => String(member.id)
    ) || [];

  /*
   * =========================================================
   * PROJECT MEMBERS
   * =========================================================
   *
   * ProjectContext gives us member IDs.
   * AuthContext gives us the actual user details/names.
   *
   * Therefore we match them here.
   */

  const projectMembers = users.filter(
    (user) =>
      projectMemberIds.includes(
        String(user.id)
      )
  );

  /*
   * =========================================================
   * FALLBACK
   * =========================================================
   *
   * In case the backend returns project members
   * with complete user information instead of IDs.
   */

  const membersWithNames =
    projectMembers.length > 0
      ? projectMembers
      : currentProject?.members || [];

  console.log(
    "========== CREATE TASK MEMBERS =========="
  );

  console.log(
    "PROJECT ID:",
    projectId
  );

  console.log(
    "CURRENT PROJECT:",
    currentProject
  );

  console.log(
    "PROJECT MEMBERS:",
    currentProject?.members
  );

  console.log(
    "AUTH USERS:",
    users
  );

  console.log(
    "MATCHED PROJECT MEMBERS:",
    projectMembers
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">

          <div>
            <h2 className="text-lg font-semibold">
              Create Task
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Add a new task to this project.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X size={19} />
          </button>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-5 p-5">

            {/* TITLE */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Task title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Create login page"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
              />

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
                rows="3"
                placeholder="Describe the task..."
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
              />

            </div>

            {/* PRIORITY + ASSIGNEE */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* PRIORITY */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Priority
                </label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                >

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                </select>

              </div>

              {/* ASSIGNEE */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Assignee
                </label>

                <select
                  name="assigneeId"
                  value={form.assigneeId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                >

                  <option value="">
                    Unassigned
                  </option>

                  {membersWithNames.map(
                    (member) => {

                      const name =
                        `${member?.firstName || ""} ${
                          member?.surname || ""
                        }`.trim() ||
                        member?.name ||
                        member?.email ||
                        `Member ${member?.id}`;

                      return (
                        <option
                          key={member.id}
                          value={member.id}
                        >
                          {name}
                        </option>
                      );
                    }
                  )}

                </select>

                {membersWithNames.length === 0 && (
                  <p className="mt-1 text-xs text-red-500">
                    No members assigned to this project.
                  </p>
                )}

              </div>

            </div>

            {/* DUE DATE */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Due date
              </label>

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
              />

            </div>

          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Create Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateTaskModal;