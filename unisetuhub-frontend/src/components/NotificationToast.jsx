import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

function NotificationToast() {
  const {
    toastNotification,
    dismissToast,
    markAsRead,
  } = useNotifications();

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  if (!toastNotification) {
    return null;
  }

  const notification = toastNotification;

  /*
   * =========================================================
   * ICON
   * =========================================================
   */

  const getIcon = () => {
    const type =
      notification?.type || "";

    if (
      type === "TASK_APPROVED" ||
      type === "TASK_COMPLETED"
    ) {
      return (
        <CheckCircle
          size={20}
          className="text-emerald-500"
        />
      );
    }

    if (
      type === "TASK_REJECTED" ||
      type === "PROJECT_MEMBER_REMOVED"
    ) {
      return (
        <AlertCircle
          size={20}
          className="text-red-500"
        />
      );
    }

    if (
      type === "TASK_SUBMITTED" ||
      type === "TASK_ASSIGNED" ||
      type === "PROJECT_MEMBER_ADDED"
    ) {
      return (
        <Info
          size={20}
          className="text-indigo-500"
        />
      );
    }

    return (
      <Bell
        size={20}
        className="text-indigo-500"
      />
    );
  };

  /*
   * =========================================================
   * CLICK TO OPEN NOTIFICATION
   * =========================================================
   */

  const handleClick = async () => {
    /*
     * ---------------------------------------------------------
     * MARK AS READ
     * ---------------------------------------------------------
     */

    if (
      notification?.id &&
      notification?.isRead !== true
    ) {
      await markAsRead(
        notification.id
      );
    }

    /*
     * Close popup
     */

    dismissToast();

    /*
     * ---------------------------------------------------------
     * TASK NOTIFICATION
     * ---------------------------------------------------------
     */

    if (notification?.taskId) {
      if (
        currentUser?.role ===
        "EMPLOYEE"
      ) {
        navigate("/my-tasks");
      } else {
        navigate("/tasks");
      }

      return;
    }

    /*
     * ---------------------------------------------------------
     * PROJECT MEMBER NOTIFICATION
     * ---------------------------------------------------------
     */

    if (
      notification?.type ===
        "PROJECT_MEMBER_ADDED" ||
      notification?.type ===
        "PROJECT_MEMBER_REMOVED"
    ) {
      if (notification?.projectId) {
        navigate(
          `/projects/${notification.projectId}/members`
        );
      }

      return;
    }

    /*
     * ---------------------------------------------------------
     * GENERAL PROJECT NOTIFICATION
     * ---------------------------------------------------------
     */

    if (notification?.projectId) {
      navigate(
        `/projects/${notification.projectId}`
      );
    }
  };

  return (
    <div className="fixed right-5 top-20 z-[9999] w-[360px] max-w-[calc(100vw-2rem)]">

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

        {/* =================================================
            CONTENT
        ================================================= */}

        <button
          type="button"
          onClick={handleClick}
          className="flex w-full gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
        >

          {/* Icon */}

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-500/10">
            {getIcon()}
          </div>

          {/* Text */}

          <div className="min-w-0 flex-1 pr-5">

            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {notification?.title ||
                "New notification"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              {notification?.message ||
                ""}
            </p>

          </div>

        </button>

        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          onClick={dismissToast}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          title="Dismiss"
        >
          <X size={15} />
        </button>

        {/* =================================================
            PROGRESS BAR
        ================================================= */}

        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">

          <div
            className="h-full bg-indigo-500"
            style={{
              animation:
                "notificationToastProgress 5s linear forwards",
            }}
          />

        </div>

      </div>

      <style>
        {`
          @keyframes notificationToastProgress {
            from {
              width: 100%;
            }

            to {
              width: 0%;
            }
          }
        `}
      </style>

    </div>
  );
}

export default NotificationToast;