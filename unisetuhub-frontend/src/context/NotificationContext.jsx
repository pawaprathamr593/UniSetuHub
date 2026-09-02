import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

const API_URL = "http://localhost:8080";

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  /*
   * =========================================================
   * TOAST NOTIFICATION
   * =========================================================
   */

  const [toastNotification, setToastNotification] =
    useState(null);

  /*
   * Keep track of notifications already known by frontend.
   * This prevents the same notification from appearing
   * repeatedly every 5 seconds.
   */

  const knownNotificationIds =
    useRef(new Set());

  /*
   * Used to prevent the initial fetch from showing old
   * notifications as new popup notifications.
   */

  const initialLoadCompleted =
    useRef(false);

  /*
   * =========================================================
   * FETCH NOTIFICATIONS
   * =========================================================
   */

  const fetchNotifications = async (
    showToast = false
  ) => {
    if (!currentUser?.id) {
      setNotifications([]);
      setUnreadCount(0);
      setToastNotification(null);

      knownNotificationIds.current.clear();

      initialLoadCompleted.current = false;

      return;
    }

    try {
      if (!showToast) {
        setLoading(true);
      }

      const response = await fetch(
        `${API_URL}/notifications/user/${currentUser.id}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch notifications."
        );
      }

      const data = await response.json();

      const notificationList =
        Array.isArray(data) ? data : [];

      /*
       * =====================================================
       * DETECT NEW NOTIFICATIONS
       * =====================================================
       */

      if (
        showToast &&
        initialLoadCompleted.current
      ) {
        const newNotifications =
          notificationList.filter(
            (notification) =>
              notification?.id &&
              !knownNotificationIds.current.has(
                String(notification.id)
              )
          );

        /*
         * Show the newest notification only.
         */

        if (newNotifications.length > 0) {
          setToastNotification(
            newNotifications[0]
          );
        }
      }

      /*
       * =====================================================
       * UPDATE KNOWN IDS
       * =====================================================
       */

      notificationList.forEach(
        (notification) => {
          if (notification?.id) {
            knownNotificationIds.current.add(
              String(notification.id)
            );
          }
        }
      );

      /*
       * =====================================================
       * UPDATE STATE
       * =====================================================
       */

      setNotifications(
        notificationList
      );

      /*
       * Calculate unread count directly from
       * the returned notifications.
       */

      const unread =
        notificationList.filter(
          (notification) =>
            notification?.isRead !== true
        ).length;

      setUnreadCount(unread);

      initialLoadCompleted.current = true;

    } catch (error) {
      console.error(
        "Fetch notifications error:",
        error
      );

    } finally {
      if (!showToast) {
        setLoading(false);
      }
    }
  };

  /*
   * =========================================================
   * FETCH UNREAD COUNT
   * =========================================================
   */

  const fetchUnreadCount = async () => {
    if (!currentUser?.id) {
      setUnreadCount(0);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/notifications/user/${currentUser.id}/unread-count`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch unread count."
        );
      }

      const data = await response.json();

      setUnreadCount(
        Number(data) || 0
      );

    } catch (error) {
      console.error(
        "Fetch unread count error:",
        error
      );
    }
  };

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */

  useEffect(() => {
    if (!currentUser?.id) {
      setNotifications([]);
      setUnreadCount(0);
      setToastNotification(null);

      knownNotificationIds.current.clear();

      initialLoadCompleted.current = false;

      return;
    }

    /*
     * Initial notification load.
     * This does NOT display a toast.
     */

    fetchNotifications(false);
    fetchUnreadCount();
  }, [currentUser?.id]);

  /*
   * =========================================================
   * POLLING
   * =========================================================
   *
   * Check for new notifications every 5 seconds.
   *
   */

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }

    const intervalId = setInterval(() => {
      fetchNotifications(true);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentUser?.id]);

  /*
   * =========================================================
   * AUTO HIDE TOAST
   * =========================================================
   */

  useEffect(() => {
    if (!toastNotification) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setToastNotification(null);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toastNotification]);

  /*
   * =========================================================
   * CLOSE TOAST
   * =========================================================
   */

  const dismissToast = () => {
    setToastNotification(null);
  };

  /*
   * =========================================================
   * MARK ONE AS READ
   * =========================================================
   */

  const markAsRead = async (
    notificationId
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/${notificationId}/read`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to mark notification as read."
        );
      }

      setNotifications((current) =>
        current.map((notification) =>
          String(notification.id) ===
          String(notificationId)
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );

      setUnreadCount((current) =>
        Math.max(0, current - 1)
      );

      return true;

    } catch (error) {
      console.error(
        "Mark notification read error:",
        error
      );

      return false;
    }
  };

  /*
   * =========================================================
   * MARK ALL AS READ
   * =========================================================
   */

  const markAllAsRead = async () => {
    if (!currentUser?.id) {
      return false;
    }

    try {
      const response = await fetch(
        `${API_URL}/notifications/user/${currentUser.id}/read-all`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to mark all notifications as read."
        );
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);

      return true;

    } catch (error) {
      console.error(
        "Mark all notifications read error:",
        error
      );

      return false;
    }
  };

  /*
   * =========================================================
   * CONTEXT
   * =========================================================
   */

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,

        toastNotification,
        dismissToast,

        fetchNotifications,
        fetchUnreadCount,

        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}