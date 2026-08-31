import { Plus, UsersRound, X } from "lucide-react";
import { useState } from "react";

function Teams() {
  const [showModal, setShowModal] = useState(false);

  const [teams, setTeams] = useState([
    {
      id: 1,
      code: "FE",
      name: "Frontend Team",
      description: "Responsible for web application development.",
      members: ["PP", "AS", "RK"],
      status: "Active",
    },
    {
      id: 2,
      code: "BE",
      name: "Backend Team",
      description: "Responsible for APIs and server-side development.",
      members: ["AM", "SK"],
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    const code = form.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newTeam = {
      id: Date.now(),
      code,
      name: form.name,
      description:
        form.description || "No description provided.",
      members: [],
      status: "Active",
    };

    setTeams((current) => [
      ...current,
      newTeam,
    ]);

    setForm({
      name: "",
      description: "",
    });

    setShowModal(false);
  };

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <UsersRound size={20} />
          </div>

          <div>

            <h1 className="text-2xl font-bold">
              Teams
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Organize employees into teams.
            </p>

          </div>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Create Team
        </button>

      </div>

      {/* =================================================
          TEAMS GRID
      ================================================= */}

      {teams.length > 0 ? (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {teams.map((team) => (

            <div
              key={team.id}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >

              {/* Top */}

              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {team.code}
                </div>

                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                  {team.status}
                </span>

              </div>

              {/* Team Name */}

              <h2 className="mt-4 text-lg font-semibold">
                {team.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {team.description}
              </p>

              {/* Members */}

              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">

                <div className="flex -space-x-2">

                  {team.members.length > 0 ? (

                    team.members.slice(0, 4).map((member, index) => (

                      <div
                        key={index}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-xs text-white dark:border-slate-900"
                      >
                        {member}
                      </div>

                    ))

                  ) : (

                    <span className="text-xs text-slate-400">
                      No members
                    </span>

                  )}

                </div>

                <span className="text-xs text-slate-400">
                  {team.members.length}{" "}
                  {team.members.length === 1
                    ? "member"
                    : "members"}
                </span>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-lg font-semibold">
            No teams yet
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create your first team to get started.
          </p>

        </div>

      )}

      {/* =================================================
          CREATE TEAM MODAL
      ================================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">

              <div>

                <h2 className="text-lg font-semibold">
                  Create Team
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Create a new team for your organization.
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={19} />
              </button>

            </div>

            {/* Form */}

            <form onSubmit={handleCreateTeam}>

              <div className="space-y-5 p-5">

                {/* Team Name */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Team name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Frontend Team"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />

                </div>

                {/* Description */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Responsible for frontend development..."
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Create Team
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Teams;