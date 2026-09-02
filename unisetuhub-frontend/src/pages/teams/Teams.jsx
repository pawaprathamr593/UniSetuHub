
import {
  UsersRound,
  UserRound,
  FolderKanban,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";
import { ROLES } from "../../constants/roles";

function Teams() {
  const { currentUser } = useAuth();

  const {
    projects = [],
    getCompanyProjects,
    getProjectsByLeader,
    getProjectsByMember,
  } = useProjects();

  const role = currentUser?.role;
  const currentUserId = String(
    currentUser?.id || ""
  );

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  const getUserName = (user) => {
    if (!user) {
      return "Unknown User";
    }

    return (
      user?.name ||
      `${user?.firstName || ""} ${
        user?.surname || ""
      }`.trim() ||
      user?.email ||
      "Unknown User"
    );
  };

  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0][0]}${
        parts[parts.length - 1][0]
      }`.toUpperCase();
    }

    return (
      parts[0]?.slice(0, 2).toUpperCase() ||
      "U"
    );
  };

  /*
   * =========================================================
   * COMPANY ID
   * =========================================================
   */

  const companyId = String(
    currentUser?.company?.id ||
      currentUser?.companyId ||
      ""
  );

  /*
   * =========================================================
   * GET TEAMS
   * =========================================================
   *
   * We use Projects as Teams.
   *
   */

  let teams = [];

  if (role === ROLES.WEBSITE_ADMIN) {
    /*
     * Website Admin sees all projects/teams.
     */
    teams = projects;
  }

  else if (
    role === ROLES.COMPANY_HEAD
  ) {
    /*
     * Company Head sees only teams/projects
     * belonging to their company.
     */

    teams =
      companyId &&
      typeof getCompanyProjects ===
        "function"
        ? getCompanyProjects(companyId)
        : projects.filter(
            (project) =>
              String(
                project?.company?.id ||
                  project?.companyId ||
                  ""
              ) === companyId
          );
  }

  else if (
    role === ROLES.PROJECT_LEAD
  ) {
    /*
     * Project Lead sees only projects
     * where they are the project leader.
     */

    teams =
      typeof getProjectsByLeader ===
      "function"
        ? getProjectsByLeader(
            currentUserId
          )
        : projects.filter(
            (project) =>
              String(
                project?.projectLeader?.id ||
                  project?.leader?.id ||
                  project?.projectLeaderId ||
                  ""
              ) === currentUserId
          );
  }

  else if (
    role === ROLES.EMPLOYEE
  ) {
    /*
     * Employee sees only projects
     * where they are a member.
     */

    teams =
      typeof getProjectsByMember ===
      "function"
        ? getProjectsByMember(
            currentUserId
          )
        : projects.filter((project) =>
            project?.members?.some(
              (member) =>
                String(member?.id) ===
                currentUserId
            )
          );
  }

  /*
   * =========================================================
   * REMOVE DUPLICATES
   * =========================================================
   */

  const uniqueTeams = Array.from(
    new Map(
      teams.map((team) => [
        String(team?.id),
        team,
      ])
    ).values()
  );

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

      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <UsersRound size={20} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            Teams
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Teams working on projects in your workspace.
          </p>

        </div>

      </div>

      {/* =================================================
          TEAM COUNT
      ================================================= */}

      <div className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        {uniqueTeams.length}{" "}
        {uniqueTeams.length === 1
          ? "team"
          : "teams"}
      </div>

      {/* =================================================
          TEAMS GRID
      ================================================= */}

      {uniqueTeams.length > 0 ? (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {uniqueTeams.map((team) => {

            const projectLead =
              team?.projectLeader ||
              team?.leader ||
              null;

            const members =
              Array.isArray(
                team?.members
              )
                ? team.members
                : [];

            const leadName =
              getUserName(
                projectLead
              );

            return (
              <div
                key={team.id}
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >

                {/* =================================================
                    TEAM HEADER
                ================================================= */}

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {(
                      team?.code ||
                      team?.name ||
                      "TM"
                    )
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    Active
                  </span>

                </div>

                {/* =================================================
                    TEAM NAME
                ================================================= */}

                <h2 className="mt-4 text-lg font-semibold">
                  {team?.name ||
                    "Unnamed Team"}
                </h2>

                {/* =================================================
                    PROJECT LEAD
                ================================================= */}

                <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                      {projectLead ? (
                        getInitials(
                          leadName
                        )
                      ) : (
                        <UserRound
                          size={16}
                        />
                      )}
                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Project Lead
                      </p>

                      <p className="truncate text-sm font-semibold">
                        {projectLead
                          ? leadName
                          : "Not assigned"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    PROJECT REFERENCE
                ================================================= */}

                <div className="mt-4 flex items-center gap-2">

                  <FolderKanban
                    size={15}
                    className="text-slate-400"
                  />

                  <div className="min-w-0">

                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Project
                    </p>

                    <p className="truncate text-sm font-medium">
                      {team?.name ||
                        team?.code ||
                        "Project"}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    MEMBERS
                ================================================= */}

                <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">

                  <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <UsersRound
                        size={15}
                        className="text-slate-400"
                      />

                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Team Members
                      </span>

                    </div>

                    <span className="text-xs text-slate-400">
                      {members.length}
                    </span>

                  </div>

                  {members.length > 0 ? (

                    <div className="space-y-3">

                      {members
                        .slice(0, 5)
                        .map((member) => {

                          const memberName =
                            getUserName(
                              member
                            );

                          const memberId =
                            String(
                              member?.id ||
                                ""
                            );

                          const isLead =
                            projectLead &&
                            String(
                              projectLead?.id ||
                                ""
                            ) ===
                              memberId;

                          return (
                            <div
                              key={
                                memberId ||
                                memberName
                              }
                              className="flex items-center gap-3"
                            >

                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                {getInitials(
                                  memberName
                                )}
                              </div>

                              <div className="min-w-0 flex-1">

                                <div className="flex items-center gap-2">

                                  <p className="truncate text-sm font-medium">
                                    {memberName}
                                  </p>

                                  {isLead && (
                                    <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                      Lead
                                    </span>
                                  )}

                                </div>

                                <p className="text-xs text-slate-400">
                                  {member?.role ||
                                    "Team Member"}
                                </p>

                              </div>

                            </div>
                          );
                        })}

                      {members.length > 5 && (
                        <p className="pt-1 text-xs text-slate-400">
                          +{" "}
                          {members.length -
                            5}{" "}
                          more members
                        </p>
                      )}

                    </div>

                  ) : (

                    <p className="text-sm text-slate-400">
                      No members assigned.
                    </p>

                  )}

                </div>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">

          <UsersRound
            size={34}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-3 text-lg font-semibold">
            No teams found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            There are no projects available for your current access.
          </p>

        </div>

      )}

    </div>
  );
}

export default Teams;

