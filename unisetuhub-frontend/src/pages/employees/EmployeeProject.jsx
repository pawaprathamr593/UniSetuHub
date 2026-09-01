import { FolderKanban } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function EmployeeProjects() {
  const { projects = [] } = useProjects();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const employeeId = String(currentUser?.id || "");

  const myProjects = projects.filter((project) => {
    const members = Array.isArray(project?.members)
      ? project.members
      : [];

    return members.some(
      (member) =>
        String(member?.id || member) === employeeId
    );
  });

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          My Projects
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Projects assigned to you.
        </p>
      </div>

      {myProjects.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">

          <FolderKanban
            size={40}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-4 font-semibold">
            No Projects Assigned
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You are not assigned to any projects yet.
          </p>

        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {myProjects.map((project) => (

            <button
              key={project.id || project.code}
              onClick={() =>
                navigate(
                  `/my-projects/${project.id || project.code}`
                )
              }
              className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <FolderKanban size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    {project.name}
                  </h2>

                  <p className="text-xs text-slate-400">
                    {project.code}
                  </p>
                </div>

              </div>

              <p className="mt-4 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                {project.description ||
                  "No description available."}
              </p>

            </button>

          ))}

        </div>
      )}

    </div>
  );
}

export default EmployeeProjects;