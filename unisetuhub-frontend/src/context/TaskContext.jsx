import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const TaskContext = createContext();

const API_URL = "http://localhost:8080";

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================================================
  // GET ALL TASKS
  // =========================================================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks.");
      }

      const data = await response.json();

      const taskList = Array.isArray(data) ? data : [];

      setTasks(taskList);

      return taskList;
    } catch (error) {
      console.error("Fetch tasks error:", error);

      return [];
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GET TASKS BY PROJECT
  // =========================================================

  const fetchTasksByProject = async (projectId) => {
    if (!projectId) {
      return [];
    }

    try {
      const response = await fetch(
        `${API_URL}/tasks/project/${encodeURIComponent(projectId)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch project tasks.");
      }

      const data = await response.json();

      const projectTasks = Array.isArray(data) ? data : [];

      setTasks((current) => {
        const otherTasks = current.filter(
          (task) =>
            String(task?.project?.id || "") !==
            String(projectId)
        );

        return [...otherTasks, ...projectTasks];
      });

      return projectTasks;
    } catch (error) {
      console.error(
        "Fetch project tasks error:",
        error
      );

      return [];
    }
  };

  // =========================================================
  // GET TASK BY ID
  // =========================================================

  const getTaskById = async (taskId) => {
    if (!taskId) {
      return null;
    }

    try {
      const response = await fetch(
        `${API_URL}/tasks/${encodeURIComponent(taskId)}`
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch task.");
      }

      return await response.json();
    } catch (error) {
      console.error(
        "Get task by ID error:",
        error
      );

      return null;
    }
  };

  // =========================================================
  // CREATE TASK
  // =========================================================

  const addTask = async (
    taskData,
    projectId
  ) => {
    try {
      if (!projectId) {
        return {
          success: false,
          message: "Project ID is required.",
        };
      }

      if (!taskData?.title?.trim()) {
        return {
          success: false,
          message: "Task title is required.",
        };
      }

      const params = new URLSearchParams();

      params.append(
        "projectId",
        projectId
      );

      // =====================================================
      // ASSIGNEE
      // =====================================================

      const assigneeId =
        taskData?.assigneeId ||
        taskData?.assignee?.id ||
        (
          typeof taskData?.assignee === "string"
            ? taskData.assignee
            : null
        );

      if (
        assigneeId &&
        String(assigneeId).toUpperCase() !== "NA"
      ) {
        params.append(
          "assigneeId",
          assigneeId
        );
      }

      // =====================================================
      // CREATOR
      // =====================================================

      if (currentUser?.id) {
        params.append(
          "createdById",
          currentUser.id
        );
      }

      const taskBody = {
        id: crypto.randomUUID(),

        title: taskData.title.trim(),

        description:
          taskData.description?.trim() || "",

        priority:
          taskData.priority || "Medium",

        dueDate:
          taskData.dueDate || null,
      };

      const response = await fetch(
        `${API_URL}/tasks?${params.toString()}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(taskBody),
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        let message =
          "Failed to create task.";

        try {
          const errorData =
            JSON.parse(responseText);

          message =
            errorData?.message ||
            errorData?.error ||
            responseText ||
            message;
        } catch {
          if (responseText) {
            message = responseText;
          }
        }

        return {
          success: false,
          message,
        };
      }

      const createdTask =
        JSON.parse(responseText);

      setTasks((current) => [
        ...current,
        createdTask,
      ]);

      return {
        success: true,
        task: createdTask,
      };
    } catch (error) {
      console.error(
        "Create task error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  // =========================================================
// UPDATE TASK
// =========================================================

const updateTask = async (updatedTask) => {
  try {
    if (!updatedTask?.id) {
      return {
        success: false,
        message: "Task ID is required.",
      };
    }

    /*
     * ---------------------------------------------------------
     * ASSIGNEE ID
     * ---------------------------------------------------------
     *
     * Support all possible frontend/backend structures:
     *
     * task.assignee.id
     * task.assigneeId
     * task.assignee
     */

    let assigneeId = null;

    if (updatedTask?.assignee?.id) {
      assigneeId = updatedTask.assignee.id;
    } else if (updatedTask?.assigneeId) {
      assigneeId = updatedTask.assigneeId;
    } else if (
      typeof updatedTask?.assignee === "string" &&
      updatedTask.assignee !== "NA"
    ) {
      assigneeId = updatedTask.assignee;
    }

    /*
     * ---------------------------------------------------------
     * REQUEST BODY
     * ---------------------------------------------------------
     *
     * Send every editable field.
     */

    const taskBody = {
      title: updatedTask.title?.trim() || "",

      description:
        updatedTask.description?.trim() || "",

      priority:
        updatedTask.priority || "Medium",

      status:
        updatedTask.status || "TODO",

      dueDate:
        updatedTask.dueDate || null,
    };

    /*
     * ---------------------------------------------------------
     * ASSIGNEE
     * ---------------------------------------------------------
     */

    if (assigneeId) {
      taskBody.assignee = {
        id: assigneeId,
      };
    }

    console.log(
      "Updating task:",
      updatedTask.id
    );

    console.log(
      "Update request body:",
      taskBody
    );

    /*
     * ---------------------------------------------------------
     * API REQUEST
     * ---------------------------------------------------------
     */

    const response = await fetch(
      `${API_URL}/tasks/${encodeURIComponent(
        updatedTask.id
      )}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(taskBody),
      }
    );

    const responseText =
      await response.text();

    /*
     * ---------------------------------------------------------
     * ERROR
     * ---------------------------------------------------------
     */

    if (!response.ok) {
      let message =
        "Failed to update task.";

      try {
        const errorData =
          JSON.parse(responseText);

        message =
          errorData?.message ||
          errorData?.error ||
          responseText ||
          message;
      } catch {
        if (responseText) {
          message = responseText;
        }
      }

      console.error(
        "Update task failed:",
        message
      );

      return {
        success: false,
        message,
      };
    }

    /*
     * ---------------------------------------------------------
     * BACKEND RESPONSE
     * ---------------------------------------------------------
     */

    const savedTask =
      JSON.parse(responseText);

    console.log(
      "Updated task from backend:",
      savedTask
    );

    /*
     * ---------------------------------------------------------
     * UPDATE LOCAL TASK STATE
     * ---------------------------------------------------------
     */

    setTasks((current) =>
      current.map((task) =>
        String(task.id) ===
        String(savedTask.id)
          ? savedTask
          : task
      )
    );

    return {
      success: true,
      task: savedTask,
    };
  } catch (error) {
    console.error(
      "Update task error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to connect to the server.",
    };
  }
};

  // =========================================================
  // DELETE TASK
  // =========================================================

  const deleteTask = async (
    taskId
  ) => {
    try {
      if (!taskId) {
        return {
          success: false,
          message: "Task ID is required.",
        };
      }

      const response = await fetch(
        `${API_URL}/tasks/${encodeURIComponent(
          taskId
        )}`,
        {
          method: "DELETE",
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        let message =
          "Failed to delete task.";

        try {
          const errorData =
            JSON.parse(responseText);

          message =
            errorData?.message ||
            errorData?.error ||
            responseText ||
            message;
        } catch {
          if (responseText) {
            message = responseText;
          }
        }

        return {
          success: false,
          message,
        };
      }

      setTasks((current) =>
        current.filter(
          (task) =>
            task.id !== taskId
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Delete task error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  // =========================================================
  // START TASK
  // =========================================================

  const startTask = async (
    taskId,
    userId
  ) => {
    try {
      const actualUserId =
        userId || currentUser?.id;

      if (!actualUserId) {
        return {
          success: false,
          message: "User ID is required.",
        };
      }

      const response = await fetch(
        `${API_URL}/tasks/${encodeURIComponent(
          taskId
        )}/start?userId=${encodeURIComponent(
          actualUserId
        )}`,
        {
          method: "PUT",
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        return {
          success: false,
          message:
            responseText ||
            "Failed to start task.",
        };
      }

      const savedTask =
        JSON.parse(responseText);

      setTasks((current) =>
        current.map((task) =>
          task.id === savedTask.id
            ? savedTask
            : task
        )
      );

      return {
        success: true,
        task: savedTask,
      };
    } catch (error) {
      console.error(
        "Start task error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  // =========================================================
  // SUBMIT TASK
  // =========================================================

  const submitTask = async (
    taskId,
    userId
  ) => {
    try {
      const actualUserId =
        userId || currentUser?.id;

      if (!actualUserId) {
        return {
          success: false,
          message: "User ID is required.",
        };
      }

      const response = await fetch(
        `${API_URL}/tasks/${encodeURIComponent(
          taskId
        )}/submit?userId=${encodeURIComponent(
          actualUserId
        )}`,
        {
          method: "PUT",
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        return {
          success: false,
          message:
            responseText ||
            "Failed to submit task.",
        };
      }

      const savedTask =
        JSON.parse(responseText);

      setTasks((current) =>
        current.map((task) =>
          task.id === savedTask.id
            ? savedTask
            : task
        )
      );

      return {
        success: true,
        task: savedTask,
      };
    } catch (error) {
      console.error(
        "Submit task error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  // =========================================================
  // ACCEPT TASK
  // =========================================================

  const acceptTask = async (
    taskId,
    reviewerId,
    comment = ""
  ) => {
    try {
      const actualReviewerId =
        reviewerId || currentUser?.id;

      if (!actualReviewerId) {
        return {
          success: false,
          message:
            "Reviewer ID is required.",
        };
      }

      const params =
        new URLSearchParams();

      params.append(
        "reviewerId",
        actualReviewerId
      );

      if (comment?.trim()) {
        params.append(
          "comment",
          comment.trim()
        );
      }

      const response = await fetch(
        `${API_URL}/tasks/${encodeURIComponent(
          taskId
        )}/accept?${params.toString()}`,
        {
          method: "PUT",
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        return {
          success: false,
          message:
            responseText ||
            "Failed to accept task.",
        };
      }

      const savedTask =
        JSON.parse(responseText);

      setTasks((current) =>
        current.map((task) =>
          task.id === savedTask.id
            ? savedTask
            : task
        )
      );

      return {
        success: true,
        task: savedTask,
      };
    } catch (error) {
      console.error(
        "Accept task error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  // =========================================================
  // REJECT TASK
  // =========================================================

  const rejectTask = async (
    taskId,
    reviewerId,
    comment = ""
  ) => {
    try {
      const actualReviewerId =
        reviewerId || currentUser?.id;

      if (!actualReviewerId) {
        return {
          success: false,
          message:
            "Reviewer ID is required.",
        };
      }

      const params =
        new URLSearchParams();

      params.append(
        "reviewerId",
        actualReviewerId
      );

      if (comment?.trim()) {
        params.append(
          "comment",
          comment.trim()
        );
      }

      const response = await fetch(
        `${API_URL}/tasks/${encodeURIComponent(
          taskId
        )}/reject?${params.toString()}`,
        {
          method: "PUT",
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        return {
          success: false,
          message:
            responseText ||
            "Failed to reject task.",
        };
      }

      const savedTask =
        JSON.parse(responseText);

      setTasks((current) =>
        current.map((task) =>
          task.id === savedTask.id
            ? savedTask
            : task
        )
      );

      return {
        success: true,
        task: savedTask,
      };
    } catch (error) {
      console.error(
        "Reject task error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================================================
  // CONTEXT
  // =========================================================

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,

        fetchTasks,
        fetchTasksByProject,
        getTaskById,

        addTask,
        updateTask,
        deleteTask,

        startTask,
        submitTask,
        acceptTask,
        rejectTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// =========================================================
// USE TASKS
// =========================================================

export function useTasks() {
  return useContext(TaskContext);
}