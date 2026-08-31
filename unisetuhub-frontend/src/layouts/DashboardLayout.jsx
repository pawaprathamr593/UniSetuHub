import { NavLink, Outlet } from "react-router-dom";
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
  Users,
  UsersRound,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function DashboardLayout() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
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

          {/* Workspace */}
          <div className="p-4">

            <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  AT
                </div>

                <div className="text-left">
                  <p className="text-sm font-medium">
                    Acme Technologies
                  </p>

                  <p className="text-xs text-slate-400">
                    Workspace
                  </p>
                </div>

              </div>

              <ChevronDown size={16} className="text-slate-400" />

            </button>

          </div>

          {/* Navigation */}
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
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        isActive
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

            <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Management
            </p>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>

          </nav>

          {/* Logout */}
          <div className="absolute bottom-4 w-64 px-3">

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400">
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Navbar */}
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">

            <div>
              <p className="text-sm font-medium">
                Acme Technologies
              </p>

              <p className="text-xs text-slate-400">
                Company Workspace
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {theme === "dark" ? (
                  <Sun size={19} />
                ) : (
                  <Moon size={19} />
                )}
              </button>

              {/* Notifications */}
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                <Bell size={19} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* User */}
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-800">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  PP
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-medium">
                    Pratham Pawar
                  </p>

                  <p className="text-xs text-slate-400">
                    Admin
                  </p>
                </div>

              </div>

            </div>

          </header>

          {/* Page */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;