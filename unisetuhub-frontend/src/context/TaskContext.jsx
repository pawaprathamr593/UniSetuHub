import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

/*
 * =========================================================
 * INITIAL TASKS
 * =========================================================
 */

const initialTasks = [
  {
    id: "WEB-101",
    projectId: "WEB",
    title: "Database setup",
    description: "",
    priority: "Low",
    assigneeId: "EMP003",
    dueDate: "",
    status: "done",
  },

  {
    id: "WEB-102",
    projectId: "WEB",
    title: "Create login page",
    description: "",
    priority: "High",
    assigneeId: "EMP001",
    dueDate: "",
    status: "todo",
  },

  {
    id: "WEB-103",
    projectId: "WEB",
    title: "Create navigation bar",
    description: "",
    priority: "Medium",
    assigneeId: "EMP002",
    dueDate: "",
    status: "todo",
  },

  {
    id: "WEB-104",
    projectId: "WEB",
    title: "Project configuration",
    description: "",
    priority: "Low",
    assigneeId: "EMP001",
    dueDate: "",
    status: "done",
  },

  {
    id: "WEB-105",
    projectId: "WEB",
    title: "Authentication API",
    description: "",
    priority: "High",
    assigneeId: "EMP003",
    dueDate: "",
    status: "progress",
  },

  {
    id: "WEB-106",
    projectId: "WEB",
    title: "Dashboard UI",
    description: "",
    priority: "Medium",
    assigneeId: "EMP001",
    dueDate: "",
    status: "progress",
  },

  {
    id: "WEB-107",
    projectId: "WEB",
    title: "Responsive design testing",
    description: "",
    priority: "Medium",
    assigneeId: "EMP002",
    dueDate: "",
    status: "review",
  },

  {
    id: "WEB-108",
    projectId: "WEB",
    title: "Design forgot password page",
    description: "",
    priority: "High",
    assigneeId: "EMP001",
    dueDate: "",
    status: "todo",
  },

  {
    id: "WEB-109",
    projectId: "WEB",
    title: "Create user profile API",
    description: "",
    priority: "Medium",
    assigneeId: "EMP003",
    dueDate: "",
    status: "todo",
  },
];

/*
 * =========================================================
 * TASK PROVIDER
 * =========================================================
 */

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  /*
   * =========================================================
   * ADD TASK
   * =========================================================
   */

  const addTask = (taskData, projectId) => {
    const projectCode = projectId?.toUpperCase();

    if (!projectCode) {
      return;
    }

    setTasks((current) => {

      /*
       * Find highest task number
       */

      const projectTasks = current.filter(
        (task) => task.projectId === projectCode
      );

      const taskNumbers = projectTasks
        .map((task) => {
          const parts = task.id.split("-");
          return Number(parts[parts.length - 1]);
        })
        .filter((number) => !Number.isNaN(number));

      const highestNumber =
        taskNumbers.length > 0
          ? Math.max(...taskNumbers)
          : 100;

      /*
       * Create new task
       */

      const newTask = {
        id: `${projectCode}-${highestNumber + 1}`,

        projectId: projectCode,

        title: taskData.title.trim(),

        description:
          taskData.description?.trim() || "",

        priority:
          taskData.priority || "Medium",

        assigneeId:
          taskData.assigneeId || null,

        dueDate:
          taskData.dueDate || "",

        status:
          taskData.status || "todo",
      };

      return [
        ...current,
        newTask,
      ];
    });
  };

  /*
   * =========================================================
   * UPDATE TASK
   * =========================================================
   */

  const updateTask = (updatedTask) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === updatedTask.id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    );
  };

  /*
   * =========================================================
   * DELETE TASK
   * =========================================================
   */

  const deleteTask = (taskId) => {
    setTasks((current) =>
      current.filter(
        (task) => task.id !== taskId
      )
    );
  };

  /*
   * =========================================================
   * CONTEXT VALUE
   * =========================================================
   */

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

/*
 * =========================================================
 * USE TASKS HOOK
 * =========================================================
 */

export function useTasks() {
  return useContext(TaskContext);
}