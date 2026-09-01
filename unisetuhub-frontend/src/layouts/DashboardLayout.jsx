import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  CheckSquare,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  Monitor,
  Users,
  UsersRound,
  ShieldCheck,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  /*
   * =========================================================
   * THEME
   * =========================================================
   */

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /*
   * =========================================================
   * USER ROLE
   * =========================================================
   */

  const role = currentUser?.role;

  /*
   * =========================================================
   * ROLE LABEL
   * =========================================================
   */

  const getRoleLabel = () => {
    switch (role) {
      case "WEBSITE_ADMIN":
        return "Website Admin";

      case "COMPANY_HEAD":
        return "Company Head";

      case "PROJECT_LEAD":
        return "Project Lead";

      case "EMPLOYEE":
        return "Employee";

      default:
        return "User";
    }
  };

  /*
   * =========================================================
   * INITIALS
   * =========================================================
   */

  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }

    return parts[0]?.slice(0, 2).toUpperCase() || "U";
  };

  /*
   * =========================================================
   * ROLE BASED NAVIGATION
   * =========================================================
   */

  const getNavItems = () => {
    /*
     * WEBSITE ADMIN
     *
     * Admin manages companies and platform statistics.
     */

    if (role === "WEBSITE_ADMIN") {
      return [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Companies",
          path: "/companies",
          icon: ShieldCheck,
        },
      ];
    }

    /*
     * COMPANY HEAD
     *
     * Company head can:
     * - View company dashboard
     * - Manage projects
     * - Manage tasks
     * - Manage employees
     * - Manage teams
     */

    if (role === "COMPANY_HEAD") {
      return [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Projects",
          path: "/projects",
          icon: FolderKanban,
        },
        {
          name: "Tasks",
          path: "/tasks",
          icon: CheckSquare,
        },
        {
          name: "Employees",
          path: "/employees",
          icon: Users,
        },
        {
          name: "Teams",
          path: "/teams",
          icon: UsersRound,
        },
      ];
    }

    /*
     * PROJECT LEAD
     *
     * Project lead only manages
     * projects assigned to him.
     */

    if (role === "PROJECT_LEAD") {
      return [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "My Projects",
          path: "/projects",
          icon: FolderKanban,
        },
        {
          name: "My Tasks",
          path: "/tasks",
          icon: CheckSquare,
        },
      ];
    }


    /*
     * =========================================================
     * EMPLOYEE
     * =========================================================
     */

    if (role === "EMPLOYEE") {
      return [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "My Projects",
          path: "/my-projects",
          icon: FolderKanban,
        },
        {
          name: "My Tasks",
          path: "/my-tasks",
          icon: CheckSquare,
        },
      ];
    }



    return [];
  };

  const navItems = getNavItems();

  /*
 * =========================================================
 * WORKSPACE NAME
 * =========================================================
 *
 * WEBSITE_ADMIN:
 *   UniSetuHub
 *
 * Other users:
 *   Use the company attached to the logged-in user.
 *
 * Supports different possible backend structures:
 *
 * currentUser.company.name
 * currentUser.companyName
 * currentUser.company?.companyName
 * currentUser.companyId
 *
 */

  const getCompanyName = () => {
    if (role === "WEBSITE_ADMIN") {
      return "UniSetuHub";
    }

    const companyName =
      currentUser?.company?.name ||
      currentUser?.company?.companyName ||
      currentUser?.companyName;

    return companyName || "Company Workspace";
  };

  const workspaceName = getCompanyName();

  const workspaceSubtitle =
    role === "WEBSITE_ADMIN"
      ? "Platform Workspace"
      : "Company Workspace";
  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">

      <div className="flex min-h-screen">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="relative hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">

          {/* Logo */}

          <div className="flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800">

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                U
              </div>

              <span className="text-lg font-bold">
                UniSetuHub
              </span>

            </div>

          </div>


          {/* =================================================
              WORKSPACE
          ================================================= */}

          <div className="p-4">

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {workspaceName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div className="text-left">

                  <p className="text-sm font-medium">
                    {workspaceName}
                  </p>

                  <p className="text-xs text-slate-400">
                    {workspaceSubtitle}
                  </p>

                </div>

              </div>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />

            </button>

          </div>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <nav className="px-3">

            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </p>

            <div className="space-y-1">

              {navItems.map((item) => {

                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                      }`
                    }
                  >

                    <Icon size={18} />

                    {item.name}

                  </NavLink>
                );

              })}

            </div>


            {/* =================================================
                SETTINGS
            ================================================= */}

            {role !== "EMPLOYEE" && (
              <>
                <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Management
                </p>

                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`
                  }
                >

                  <Settings size={18} />

                  Settings

                </NavLink>
              </>
            )}

          </nav>


          {/* =================================================
              LOGOUT
          ================================================= */}

          <div className="absolute bottom-4 w-64 px-3">

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </aside>


        {/* =================================================
            MAIN
        ================================================= */}

        <div className="flex min-w-0 flex-1 flex-col">


          {/* =================================================
              TOP NAVBAR
          ================================================= */}

          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">

            {/* Workspace */}

            <div>

              <p className="text-sm font-medium">
                {workspaceName}
              </p>

              <p className="text-xs text-slate-400">
                {workspaceSubtitle}
              </p>

            </div>


            {/* Right */}

            <div className="flex items-center gap-3">


              {/* Theme */}

              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                title={
                  theme === "light"
                    ? "Light mode"
                    : theme === "dark"
                      ? "Dark mode"
                      : "System mode"
                }
              >
                {theme === "light" ? (
                  <Sun size={19} />
                ) : theme === "dark" ? (
                  <Moon size={19} />
                ) : (
                  <Monitor size={19} />
                )}
              </button>


              {/* Notifications */}

              <button
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                title="Notifications"
              >

                <Bell size={19} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

              </button>


              {/* User */}

              <div className="flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-800">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {getInitials(currentUser?.name)}
                </div>

                <div className="hidden sm:block">

                  <p className="text-sm font-medium">
                    {currentUser?.name || "User"}
                  </p>

                  <p className="text-xs text-slate-400">
                    {getRoleLabel()}
                  </p>

                </div>

              </div>

            </div>

          </header>


          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          <main className="flex-1 p-6">

            <Outlet />

          </main>

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;