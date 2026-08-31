import {
    Circle,
    Clock3,
    MoreHorizontal,
    Plus,
    Search,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useTasks } from "../../context/TaskContext";

import CreateTaskModal from "./CreateTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";

function ProjectBacklog() {
    const { projectId } = useParams();

    const {
        tasks,
        addTask,
        updateTask,
        deleteTask,
    } = useTasks();

    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    /*
     * =========================================================
     * CURRENT PROJECT BACKLOG
     * =========================================================
     *
     * Only tasks belonging to the current project
     * AND having "todo" status are shown.
     */
    const projectTasks = tasks.filter(
        (task) =>
            task.projectId === projectId?.toUpperCase() &&
            task.status === "todo"
    );

    /*
     * =========================================================
     * PRIORITY STYLE
     * =========================================================
     */
    const priorityClass = (priority) => {
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
     * SEARCH + PRIORITY FILTER
     * =========================================================
     */
    const filteredTasks = projectTasks.filter((task) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            task.id?.toLowerCase().includes(searchText) ||
            task.title?.toLowerCase().includes(searchText) ||
            task.assignee?.toLowerCase().includes(searchText);

        const matchesPriority =
            priorityFilter === "all" ||
            task.priority === priorityFilter;

        return matchesSearch && matchesPriority;
    });

    /*
     * =========================================================
     * CREATE TASK
     * =========================================================
     */
    const handleCreateTask = (taskData) => {
        addTask(
            {
                ...taskData,
                status: "todo",
            },
            projectId
        );

        setShowCreateTask(false);
    };

    /*
     * =========================================================
     * UPDATE TASK
     * =========================================================
     */
    const handleUpdateTask = (updatedTask) => {
        updateTask(updatedTask);
        setSelectedTask(null);
    };

    /*
     * =========================================================
     * DELETE TASK
     * =========================================================
     */
    const handleDeleteTask = (taskId) => {
        deleteTask(taskId);
        setSelectedTask(null);
    };

    return (
        <div className="space-y-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <div className="flex items-center gap-3">

                        <h1 className="text-2xl font-bold">
                            Backlog
                        </h1>

                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            {projectId?.toUpperCase()}
                        </span>

                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Tasks waiting to be started.
                    </p>

                </div>

                <button
                    onClick={() => setShowCreateTask(true)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                    <Plus size={18} />
                    Create Task
                </button>

            </div>

            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="grid gap-4 sm:grid-cols-3">

                {/* Backlog Tasks */}

                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">

                            <Circle
                                size={20}
                                className="text-slate-500"
                            />

                        </div>

                        <div>

                            <p className="text-xs text-slate-400">
                                Backlog Tasks
                            </p>

                            <p className="text-xl font-bold">
                                {projectTasks.length}
                            </p>

                        </div>

                    </div>

                </div>

                {/* High Priority */}

                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10">

                            <Clock3
                                size={20}
                                className="text-red-500"
                            />

                        </div>

                        <div>

                            <p className="text-xs text-slate-400">
                                High Priority
                            </p>

                            <p className="text-xl font-bold">

                                {
                                    projectTasks.filter(
                                        (task) =>
                                            task.priority === "High"
                                    ).length
                                }

                            </p>

                        </div>

                    </div>

                </div>

                {/* Showing */}

                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10">

                            <Circle
                                size={20}
                                className="text-indigo-500"
                            />

                        </div>

                        <div>

                            <p className="text-xs text-slate-400">
                                Showing
                            </p>

                            <p className="text-xl font-bold">
                                {filteredTasks.length}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* =================================================
                FILTERS
            ================================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">

                <div className="flex flex-col gap-3 sm:flex-row">

                    {/* Search */}

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search backlog..."
                            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                        />

                    </div>

                    {/* Priority */}

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(e.target.value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                    >

                        <option value="all">
                            All Priority
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Low">
                            Low
                        </option>

                    </select>

                </div>

            </div>

            {/* =================================================
                BACKLOG LIST
            ================================================= */}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

                <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">

                    <h2 className="font-semibold">
                        Backlog Tasks
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Tasks that have not been started yet.
                    </p>

                </div>

                <div>

                    {filteredTasks.length > 0 ? (

                        filteredTasks.map((task) => (

                            <div
                                key={task.id}
                                onClick={() =>
                                    setSelectedTask({
                                        task,
                                        status: task.status,
                                    })
                                }
                                className="flex cursor-pointer items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
                            >

                                {/* Task Information */}

                                <div className="flex min-w-0 items-center gap-4">

                                    <Circle
                                        size={18}
                                        className="shrink-0 text-slate-400"
                                    />

                                    <div className="min-w-0">

                                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                            {task.id}
                                        </p>

                                        <p className="mt-1 truncate text-sm font-medium">
                                            {task.title}
                                        </p>

                                    </div>

                                </div>

                                {/* Task Actions */}

                                <div className="flex shrink-0 items-center gap-6">

                                    {/* Priority */}

                                    <span
                                        className={`hidden text-sm font-medium sm:block ${priorityClass(
                                            task.priority
                                        )}`}
                                    >
                                        {task.priority}
                                    </span>

                                    {/* Assignee */}

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                        {task.assignee}
                                    </div>

                                    {/* More */}

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setSelectedTask({
                                                task,
                                                status: task.status,
                                            });

                                        }}
                                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >

                                        <MoreHorizontal
                                            size={18}
                                        />

                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="px-5 py-12 text-center">

                            <p className="text-sm font-medium">
                                No backlog tasks found
                            </p>

                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Try changing your search or priority filter.
                            </p>

                        </div>

                    )}

                </div>

            </div>

            {/* =================================================
                CREATE TASK MODAL
            ================================================= */}

            {showCreateTask && (
                <CreateTaskModal
                    onClose={() =>
                        setShowCreateTask(false)
                    }
                    onCreate={handleCreateTask}
                />
            )}

            {/* =================================================
                TASK DETAILS MODAL
            ================================================= */}

            {selectedTask && (
                <TaskDetailsModal
                    task={selectedTask.task}
                    currentStatus={selectedTask.status}
                    onClose={() =>
                        setSelectedTask(null)
                    }
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                />
            )}

        </div>
    );
}

export default ProjectBacklog;