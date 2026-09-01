
import {
  FolderKanban,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

function EmployeeProjects() {
  const navigate = useNavigate();

  const { projects = [] } = useProjects();
  const { currentUser } = useAuth();

  /*
   * =========================================================
   * GET USER ID
   * =========================================================
   */

  const userId = String(currentUser?.id || "");

  /*
   * =========================================================
   * MY PROJECTS
   * =========================================================
   *
   * Employee:
   * Show projects where employee is a member.
   *
   * Project Lead:
   * Show projects where user is project leader.
   *
   */

  const myProjects = projects.filter((project) => {
    const leaderId = String(
      project?.projectLeader?.id ||
      project?.projectLeaderId ||
      ""
    );

    if (leaderId === userId) {
      return true;
    }

    const members = Array.isArray(project?.members)
      ? project.members
      : [];

    return members.some(
      (member) =>
        String(member?.id || member) === userId
    );
  });

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold">
          My Projects
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Projects assigned to you.
        </p>
      </div>

      {/* PROJECTS */}

      {myProjects.length === 0 ? (

        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <FolderKanban size={22} />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No Projects Assigned
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            You don't have any projects assigned to you yet.
          </p>

        </div>

      ) : (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {myProjects.map((project) => {

            const projectId =
              project?.code ||
              project?.id;

            const members = Array.isArray(
              project?.members
            )
              ? project.members
              : [];

            return (
              <div
                key={project?.id || project?.code}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
              >

                {/* PROJECT ICON */}

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <FolderKanban size={21} />
                  </div>

                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {project?.status || "Active"}
                  </span>

                </div>

                {/* PROJECT NAME */}

                <h2 className="mt-4 text-lg font-semibold">
                  {project?.name || "Unnamed Project"}
                </h2>

                <p className="mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {project?.code || "PROJECT"}
                </p>

                {/* DESCRIPTION */}

                <p className="mt-3 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                  {project?.description ||
                    "No description available."}
                </p>

                {/* INFO */}

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">

                    <CalendarDays size={15} />

                    <span>
                      {members.length} member
                      {members.length !== 1
                        ? "s"
                        : ""}
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/my-projects/${projectId}`
                      )
                    }
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-700"
                  >
                    View Project

                    <ArrowRight size={14} />

                  </button>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default EmployeeProjects;
