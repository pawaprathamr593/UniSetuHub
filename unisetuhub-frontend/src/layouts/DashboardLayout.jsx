import { useEffect, useRef, useState } from "react";
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
  Check,
  X,
  Menu,
} from "lucide-react";
import logo from "../assets/logo.png";

import NotificationToast from "../components/NotificationToast";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext.jsx";

function DashboardLayout() {
  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    loading: notificationsLoading,
  } = useNotifications();

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

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
    setShowProfileDropdown(false);
    setShowMobileSidebar(false);

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
     * EMPLOYEE
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
   * CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
   * =========================================================
   */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /*
   * =========================================================
   * CLOSE MOBILE SIDEBAR WHEN SCREEN BECOMES DESKTOP
   * =========================================================
   */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * =========================================================
   * PREVENT BODY SCROLL WHEN MOBILE SIDEBAR IS OPEN
   * =========================================================
   */

  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileSidebar]);

  /*
   * =========================================================
   * PROFILE DROPDOWN
   * =========================================================
   */

  const handleProfileToggle = () => {
    setShowProfileDropdown((current) => !current);
    setShowNotifications(false);
  };

  const handleSettingsClick = () => {
    setShowProfileDropdown(false);
    navigate("/settings");
  };

  /*
   * =========================================================
   * NOTIFICATION CLICK
   * =========================================================
   */

  const handleNotificationClick = async (notification) => {
    if (!notification) {
      return;
    }

    /*
     * MARK AS READ
     */

    if (
      notification.id &&
      notification.isRead !== true
    ) {
      await markAsRead(notification.id);
    }

    /*
     * CLOSE DROPDOWN
     */

    setShowNotifications(false);

    /*
     * TASK NOTIFICATION
     */

    if (notification.taskId) {
      if (role === "EMPLOYEE") {
        navigate("/my-tasks");
      } else {
        navigate("/tasks");
      }

      return;
    }

    /*
     * PROJECT MEMBER NOTIFICATION
     */

    if (
      notification.type === "PROJECT_MEMBER_ADDED" ||
      notification.type === "PROJECT_MEMBER_REMOVED"
    ) {
      if (notification.projectId) {
        navigate(
          `/projects/${notification.projectId}/members`
        );
      }

      return;
    }

    /*
     * GENERAL PROJECT NOTIFICATION
     */

    if (notification.projectId) {
      navigate(`/projects/${notification.projectId}`);
    }
  };

  /*
   * =========================================================
   * NOTIFICATION TIME
   * =========================================================
   */

  const formatNotificationTime = (createdAt) => {
    if (!createdAt) {
      return "";
    }

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    const diffMinutes = Math.floor(
      diffMs / (1000 * 60)
    );

    if (diffMinutes < 1) {
      return "Just now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }

    const diffHours = Math.floor(
      diffMinutes / 60
    );

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }

    const diffDays = Math.floor(
      diffHours / 24
    );

    if (diffDays < 7) {
      return `${diffDays}d ago`;
    }

    return date.toLocaleDateString();
  };

  /*
   * =========================================================
   * SIDEBAR CONTENT
   * =========================================================
   */

  const renderSidebarContent = (mobile = false) => {
    return (
      <>
        {/* =================================================
            LOGO
        ================================================= */}

        <div
          className={`flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800 ${mobile ? "justify-between" : ""
            }`}
        >
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="UniSetuHub"
              className="h-9 w-9 rounded-lg object-contain"
            />

            <span className="text-lg font-bold">
              UniSetuHub
            </span>
          </div>

          {/* Mobile close button */}

          {mobile && (
            <button
              type="button"
              onClick={() => setShowMobileSidebar(false)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
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
                  onClick={() => {
                    if (mobile) {
                      setShowMobileSidebar(false);
                    }
                  }}
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

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Management
          </p>

          <NavLink
            to="/settings"
            onClick={() => {
              if (mobile) {
                setShowMobileSidebar(false);
              }
            }}
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
        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <div className="absolute bottom-4 w-full px-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut size={18} />

            Logout
          </button>
        </div>
      </>
    );
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">

        {/* =================================================
            DESKTOP SIDEBAR
        ================================================= */}

        <aside className="relative hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          {renderSidebarContent(false)}
        </aside>

        {/* =================================================
            MOBILE SIDEBAR
        ================================================= */}

        {showMobileSidebar && (
          <div className="fixed inset-0 z-[3000] md:hidden">

            {/* Backdrop */}

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setShowMobileSidebar(false)}
              className="absolute inset-0 cursor-default bg-black/40"
            />

            {/* Sidebar */}

            <aside className="relative z-10 h-full w-72 overflow-y-auto border-r border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="relative min-h-full">
                {renderSidebarContent(true)}
              </div>
            </aside>
          </div>
        )}

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* =================================================
              TOP NAVBAR
          ================================================= */}

          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="flex min-w-0 items-center gap-3">

              {/* Mobile Menu */}

              <button
                type="button"
                onClick={() => setShowMobileSidebar(true)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white md:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>

              {/* Workspace */}

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {workspaceName}
                </p>

                <p className="truncate text-xs text-slate-400">
                  {workspaceSubtitle}
                </p>
              </div>
            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="flex items-center gap-2 sm:gap-3">

              {/* =================================================
                  THEME
              ================================================= */}

              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
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

              {/* =================================================
                  NOTIFICATIONS
              ================================================= */}

              <div
                ref={notificationRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(
                      (current) => !current
                    )
                  }
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  title="Notifications"
                >
                  <Bell size={19} />

                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                      {unreadCount > 99
                        ? "99+"
                        : unreadCount}
                    </span>
                  )}
                </button>

                {/* =================================================
                    NOTIFICATION DROPDOWN
                ================================================= */}

                {showNotifications && (
                  <div className="absolute right-0 top-12 z-[2000] w-[calc(100vw-32px)] max-w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

                    {/* Header */}

                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                      <div>
                        <h3 className="text-sm font-semibold">
                          Notifications
                        </h3>

                        {unreadCount > 0 && (
                          <p className="mt-0.5 text-xs text-slate-400">
                            {unreadCount} unread
                          </p>
                        )}
                      </div>

                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllAsRead}
                          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                        >
                          <Check size={13} />

                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* Notification List */}

                    <div className="max-h-[420px] overflow-y-auto">
                      {notificationsLoading ? (
                        <div className="px-4 py-10 text-center text-sm text-slate-400">
                          Loading notifications...
                        </div>
                      ) : notifications.filter(
                        (notification) =>
                          notification.isRead !== true
                      ).length === 0 ? (
                        <div className="px-4 py-10 text-center">
                          <Bell
                            size={28}
                            className="mx-auto mb-2 text-slate-300 dark:text-slate-700"
                          />

                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            No notifications
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            You're all caught up.
                          </p>
                        </div>
                      ) : (
                        notifications
                          .filter(
                            (notification) =>
                              notification.isRead !== true
                          )
                          .map((notification) => {
                            const isRead =
                              notification.isRead === true;

                            return (
                              <button
                                key={notification.id}
                                type="button"
                                onClick={() =>
                                  handleNotificationClick(
                                    notification
                                  )
                                }
                                className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 dark:border-slate-800 ${isRead
                                    ? "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/60"
                                    : "bg-indigo-50/60 hover:bg-indigo-50 dark:bg-indigo-500/5 dark:hover:bg-indigo-500/10"
                                  }`}
                              >
                                {/* Notification Indicator */}

                                <div className="relative mt-0.5 shrink-0">
                                  <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${isRead
                                        ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                        : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                                      }`}
                                  >
                                    <Bell size={15} />
                                  </div>

                                  {!isRead && (
                                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                                  )}
                                </div>

                                {/* Content */}

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <p
                                      className={`text-sm ${isRead
                                          ? "font-medium text-slate-700 dark:text-slate-300"
                                          : "font-semibold text-slate-900 dark:text-white"
                                        }`}
                                    >
                                      {notification.title ||
                                        "Notification"}
                                    </p>

                                    <span className="shrink-0 text-[10px] text-slate-400">
                                      {formatNotificationTime(
                                        notification.createdAt
                                      )}
                                    </span>
                                  </div>

                                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    {notification.message || ""}
                                  </p>
                                </div>
                              </button>
                            );
                          })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* =================================================
                  PROFILE
              ================================================= */}

              <div
                ref={profileRef}
                className="relative border-l border-slate-200 pl-2 dark:border-slate-800 sm:pl-3"
              >
                <button
                  type="button"
                  onClick={handleProfileToggle}
                  className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Open profile menu"
                  aria-expanded={showProfileDropdown}
                >
                  {/* Avatar */}

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                    {getInitials(currentUser?.name)}
                  </div>

                  {/* User Info */}

                  <div className="hidden text-left sm:block">
                    <p className="max-w-[140px] truncate text-sm font-medium">
                      {currentUser?.name || "User"}
                    </p>

                    <p className="max-w-[140px] truncate text-xs text-slate-400">
                      {getRoleLabel()}
                    </p>
                  </div>

                  {/* Arrow */}

                  <ChevronDown
                    size={15}
                    className={`hidden text-slate-400 transition-transform sm:block ${showProfileDropdown
                        ? "rotate-180"
                        : ""
                      }`}
                  />
                </button>

                {/* =================================================
                    PROFILE DROPDOWN
                ================================================= */}

                {showProfileDropdown && (
                  <div className="absolute right-0 top-12 z-[2500] w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

                    {/* Profile Header */}

                    <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                          {getInitials(currentUser?.name)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {currentUser?.name || "User"}
                          </p>

                          <p className="truncate text-xs text-slate-400">
                            {getRoleLabel()}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Dropdown Actions */}

                    <div className="p-2">

                      {/* Settings */}

                      <button
                        type="button"
                        onClick={handleSettingsClick}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <Settings size={18} />

                        <span>
                          Settings
                        </span>
                      </button>

                      {/* Logout */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        <LogOut size={18} />

                        <span>
                          Logout
                        </span>
                      </button>

                    </div>

                  </div>
                )}
              </div>

            </div>
          </header>

          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          <main className="flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <NotificationToast />
    </div>
  );
}

export default DashboardLayout;