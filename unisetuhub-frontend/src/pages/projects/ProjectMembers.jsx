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

function ProjectMembers() {
  const { projectId } = useParams();

  const {
    members,
    addMember,
    removeMember,
  } = useMembers();

  const [showAddMember, setShowAddMember] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Developer",
  });

  /*
   * =========================================================
   * CURRENT PROJECT MEMBERS
   * =========================================================
   */

  const projectMembers = members.filter(
    (member) =>
      member.projectId === projectId?.toUpperCase()
  );

  /*
   * =========================================================
   * HANDLE INPUT
   * =========================================================
   */

  const handleChange = (e) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };

  /*
   * =========================================================
   * ADD MEMBER
   * =========================================================
   */

  const handleAddMember = (e) => {
    e.preventDefault();

    if (
      !newMember.name.trim() ||
      !newMember.email.trim()
    ) {
      return;
    }

    addMember(newMember, projectId);

    setNewMember({
      name: "",
      email: "",
      role: "Developer",
    });

    setShowAddMember(false);
  };

  /*
   * =========================================================
   * REMOVE MEMBER
   * =========================================================
   */

  const handleRemoveMember = (memberId) => {
    const member = projectMembers.find(
      (item) => item.id === memberId
    );

    const confirmed = window.confirm(
      `Remove ${member?.name} from this project?`
    );

    if (!confirmed) return;

    removeMember(memberId);
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-bold">
              Project Members
            </h1>

            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {projectId?.toUpperCase()}
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage the people working on this project.
          </p>

        </div>

        <button
          onClick={() => setShowAddMember(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Member
        </button>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <SummaryCard
          icon={<Users size={19} />}
          label="Total Members"
          value={projectMembers.length}
        />

        <SummaryCard
          icon={<UserPlus size={19} />}
          label="Developers"
          value={
            projectMembers.filter((member) =>
              member.role
                .toLowerCase()
                .includes("developer")
            ).length
          }
        />

        <SummaryCard
          icon={<Mail size={19} />}
          label="Project Admins"
          value={
            projectMembers.filter((member) =>
              member.role
                .toLowerCase()
                .includes("admin")
            ).length
          }
        />

      </div>

      {/* Members */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">

          <h2 className="font-semibold">
            Team Members
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {projectMembers.length} people are currently part
            of this project.
          </p>

        </div>

        {projectMembers.length > 0 ? (

          <div className="divide-y divide-slate-200 dark:divide-slate-800">

            {projectMembers.map((member) => (

              <div
                key={member.id}
                className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-slate-900/50"
              >

                {/* Member */}

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {member.initials}
                  </div>

                  <div>

                    <p className="text-sm font-semibold">
                      {member.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {member.email}
                    </p>

                  </div>

                </div>

                {/* Role */}

                <div className="min-w-[150px]">

                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Role
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {member.role}
                  </p>

                </div>

                {/* Tasks */}

                <div className="min-w-[130px]">

                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Tasks
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    —
                  </p>

                </div>

                {/* Actions */}

                <div className="flex items-center">

                  <button
                    onClick={() =>
                      handleRemoveMember(member.id)
                    }
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                    title="Remove member"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                </div>

              </div>

            ))}

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
              Add members to this project to get started.
            </p>

          </div>

        )}

      </div>

      {/* Add Member Modal */}

      {showAddMember && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

            {/* Header */}

            <div className="border-b border-slate-200 p-5 dark:border-slate-800">

              <h2 className="text-lg font-semibold">
                Add Project Member
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Add someone to the{" "}
                {projectId?.toUpperCase()} project.
              </p>

            </div>

            {/* Form */}

            <form onSubmit={handleAddMember}>

              <div className="space-y-4 p-5">

                {/* Name */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={newMember.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                  />

                </div>

                {/* Role */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Role
                  </label>

                  <select
                    name="role"
                    value={newMember.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option>Developer</option>
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>UI/UX Designer</option>
                    <option>Tester</option>
                    <option>Project Manager</option>
                  </select>

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddMember(false)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium dark:border-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
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
 * SUMMARY CARD
 * =========================================================
 */

function SummaryCard({ icon, label, value }) {
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