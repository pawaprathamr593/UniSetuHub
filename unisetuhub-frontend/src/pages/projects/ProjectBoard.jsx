import {
  CheckCircle2,
  Circle,
  Clock3,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { useState } from "react";
import { useParams } from "react-router-dom";

import CreateTaskModal from "./CreateTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

function ProjectBoard() {
  const { projectId } = useParams();

  const {
    tasks = [],
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const { projects = [] } = useProjects();

  const [draggedTask, setDraggedTask] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);



  /*
   * =========================================================
   * CURRENT PROJECT
   * =========================================================
   *
   * Projects.jsx sends:
   *
   * /projects/{project.id}
   *
   * Therefore find project by database ID.
   */

  const project = projects.find(
    (item) =>
      String(item?.id) === String(projectId)
  );

 

  /*
   * =========================================================
   * PROJECT TASKS
   * =========================================================
   *
   * Backend Task entity:
   *
   * private Project project;
   *
   * Therefore task JSON contains:
   *
   * task.project.id
   */

  const projectTasks = tasks.filter(
    (task) =>
      String(task?.project?.id) ===
      String(projectId)
  );

  /*
   * =========================================================
   * STATUS CONVERTER
   * =========================================================
   *
   * Backend:
   *
   * TODO
   * IN_PROGRESS
   * SUBMITTED
   * REJECTED
   * DONE
   *
   * Frontend board:
   *
   * todo
   * progress
   * review
   * done
   */

  const getBoardStatus = (status) => {
    const normalized =
      status
        ?.toString()
        .trim()
        .toUpperCase();

    switch (normalized) {
      case "TODO":
        return "todo";

      case "IN_PROGRESS":
        return "progress";

      case "SUBMITTED":
        return "review";

      case "REJECTED":
        return "progress";

      case "DONE":
        return "done";

      default:
        return "todo";
    }
  };

  /*
   * =========================================================
   * BOARD COLUMNS
   * =========================================================
   */

  const columns = {
    todo: {
      title: "TO DO",
      color: "text-slate-500",

      tasks: projectTasks.filter(
        (task) =>
          getBoardStatus(task.status) ===
          "todo"
      ),
    },

    progress: {
      title: "IN PROGRESS",
      color: "text-blue-500",

      tasks: projectTasks.filter(
        (task) =>
          getBoardStatus(task.status) ===
          "progress"
      ),
    },

    review: {
      title: "REVIEW",
      color: "text-orange-500",

      tasks: projectTasks.filter(
        (task) =>
          getBoardStatus(task.status) ===
          "review"
      ),
    },

    done: {
      title: "DONE",
      color: "text-green-500",

      tasks: projectTasks.filter(
        (task) =>
          getBoardStatus(task.status) ===
          "done"
      ),
    },
  };

  /*
   * =========================================================
   * DRAG START
   * =========================================================
   */

  const handleDragStart = (
    task,
    sourceColumn
  ) => {
    setDraggedTask({
      task,
      sourceColumn,
    });
  };

  /*
   * =========================================================
   * DROP TASK
   * =========================================================
   *
   * IMPORTANT:
   *
   * The backend expects uppercase statuses.
   */

  const handleDrop = async (
    targetColumn
  ) => {
    if (!draggedTask) {
      return;
    }

    const { task } = draggedTask;

    const currentColumn =
      getBoardStatus(task.status);

    if (
      currentColumn === targetColumn
    ) {
      setDraggedTask(null);
      return;
    }

    /*
     * Do not directly change status using
     * "progress", "review", etc.
     *
     * Backend uses uppercase status.
     */

    const statusMap = {
      todo: "TODO",
      progress: "IN_PROGRESS",
      review: "SUBMITTED",
      done: "DONE",
    };

    const backendStatus =
      statusMap[targetColumn];

    /*
     * NOTE:
     *
     * Your current TaskService.updateTask()
     * does NOT update status.
     *
     * Therefore drag-and-drop status updates
     * should not be sent through updateTask()
     * until backend status update logic is added.
     */

  

    setDraggedTask(null);
  };

  /*
   * =========================================================
   * PRIORITY STYLE
   * =========================================================
   */

  const priorityClass = (
    priority
  ) => {
    if (priority === "High") {
      return "text-red-600 dark:text-red-400";
    }

    if (priority === "Medium") {
      return "text-orange-600 dark:text-orange-400";
    }

    return "text-slate-500 dark:text-slate-400";
  };

  /*
   * =========================================================
   * CREATE TASK
   * =========================================================
   */

  const handleCreateTask = async (
    taskData
  ) => {
    

    if (result?.success) {
      setShowCreateTask(false);
    }
  };

  /*
   * =========================================================
   * DELETE TASK
   * =========================================================
   */

  const handleDeleteTask = async (
    taskId
  ) => {
    const result =
      await deleteTask(taskId);

    if (result?.success) {
      setSelectedTask(null);
    }
  };

  /*
   * =========================================================
   * UPDATE TASK
   * =========================================================
   */

  const handleUpdateTask = async (
    updatedTask
  ) => {
    const result =
      await updateTask(updatedTask);

    if (result?.success) {
      setSelectedTask(null);
    }
  };

  /*
   * =========================================================
   * OPEN TASK DETAILS
   * =========================================================
   */

  const handleTaskClick = (
    task,
    columnId
  ) => {
    setSelectedTask({
      task,
      status: columnId,
    });
  };

  /*
   * =========================================================
   * PROJECT NOT FOUND
   * =========================================================
   */

  if (!project) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">

        <h2 className="text-xl font-semibold">
          Project Not Found
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The project with ID "{projectId}"
          does not exist.
        </p>

        <p className="mt-3 text-xs text-slate-400">
          Check the browser console for
          PROJECTS and URL PROJECT ID.
        </p>

      </div>
    );
  }

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="flex min-h-0 flex-col">

      {/* =================================================
          BOARD HEADER
      ================================================= */}

      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>

          <div className="flex items-center gap-3">

            <h2 className="text-xl font-bold">
              Project Board
            </h2>

            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {project.code ||
                project.id}
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {project.name} ·{" "}
            {projectTasks.length} tasks
            across the project workflow.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            setShowCreateTask(true)
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />

          Create Task
        </button>

      </div>

      {/* =================================================
          BOARD
      ================================================= */}

      <div className="flex-1 overflow-x-auto pb-4">

        <div className="grid min-w-[1100px] grid-cols-4 gap-4">

          {Object.entries(columns).map(
            ([columnId, column]) => (

              <div
                key={columnId}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={() =>
                  handleDrop(columnId)
                }
                className="flex min-h-[550px] flex-col rounded-xl bg-slate-100/70 p-3 dark:bg-slate-900/60"
              >

                {/* Column Header */}

                <div className="mb-3 flex items-center justify-between px-2">

                  <div className="flex items-center gap-2">

                    {columnId === "done" ? (
                      <CheckCircle2
                        size={17}
                        className={
                          column.color
                        }
                      />
                    ) : columnId ===
                      "progress" ? (
                      <Clock3
                        size={17}
                        className={
                          column.color
                        }
                      />
                    ) : (
                      <Circle
                        size={17}
                        className={
                          column.color
                        }
                      />
                    )}

                    <h3 className="text-xs font-bold tracking-wider text-slate-600 dark:text-slate-300">
                      {column.title}
                    </h3>

                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-400">
                      {
                        column.tasks
                          .length
                      }
                    </span>

                  </div>

                  <button
                    type="button"
                    className="rounded p-1 text-slate-400 hover:bg-white hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <MoreHorizontal
                      size={17}
                    />
                  </button>

                </div>

                {/* Tasks */}

                <div className="flex flex-1 flex-col gap-3">

                  {column.tasks.map(
                    (task) => (

                      <div
                        key={task.id}
                        draggable
                        onDragStart={() =>
                          handleDragStart(
                            task,
                            columnId
                          )
                        }
                        onClick={() =>
                          handleTaskClick(
                            task,
                            columnId
                          )
                        }
                        className="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing dark:border-slate-800 dark:bg-slate-950"
                      >

                        {/* Task ID */}

                        <div className="flex items-center justify-between">

                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            {task.id}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              handleTaskClick(
                                task,
                                columnId
                              );
                            }}
                            className="rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500 dark:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-400"
                          >
                            <MoreHorizontal
                              size={16}
                            />
                          </button>

                        </div>

                        {/* Task Title */}

                        <p className="mt-3 text-sm font-medium leading-5">
                          {task.title}
                        </p>

                        {/* Description */}

                        {task.description && (
                          <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                            {
                              task.description
                            }
                          </p>
                        )}

                        {/* Task Footer */}

                        <div className="mt-4 flex items-center justify-between">

                          <span
                            className={`text-xs font-medium ${priorityClass(
                              task.priority
                            )}`}
                          >
                            {
                              task.priority
                            }
                          </span>

                          {/* Assignee */}

                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                            {task.assignee
                              ?.firstName
                              ? task.assignee.firstName.charAt(
                                0
                              )
                              : task.assignee
                                ?.name
                                ? task.assignee.name.charAt(
                                  0
                                )
                                : task.assignee
                                  ?.email
                                  ? task.assignee.email.charAt(
                                    0
                                  )
                                  : "?"}

                          </div>

                        </div>

                      </div>

                    )
                  )}

                  {/* Add Task */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowCreateTask(
                        true
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-xs font-medium text-slate-400 transition hover:border-indigo-400 hover:text-indigo-500 dark:border-slate-700 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                  >
                    <Plus size={15} />

                    Add task
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* =================================================
          CREATE TASK MODAL
      ================================================= */}

      {showCreateTask && (
        <CreateTaskModal
          projectId={projectId}
          onClose={() =>
            setShowCreateTask(false)
          }
          onCreate={
            handleCreateTask
          }
        />
      )}

      {/* =================================================
          TASK DETAILS MODAL
      ================================================= */}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask.task}
          currentStatus={
            selectedTask.status
          }
          onClose={() =>
            setSelectedTask(null)
          }
          onUpdate={
            handleUpdateTask
          }
          onDelete={
            handleDeleteTask
          }
        />
      )}

    </div>
  );
}

export default ProjectBoard;