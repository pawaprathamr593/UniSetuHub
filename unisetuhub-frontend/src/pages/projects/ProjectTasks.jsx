
import {
    CheckCircle2,
    Circle,
    Clock3,
    MoreHorizontal,
    Plus,
    Search,
} from "lucide-react";

import {
    useMemo,
    useState,
    useEffect,
} from "react";

import { useParams } from "react-router-dom";

import CreateTaskModal from "./CreateTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

function ProjectTasks() {
    const { projectId } = useParams();

    const {
        tasks = [],
        addTask,
        updateTask,
        deleteTask,
        fetchTasksByProject,
    } = useTasks();

    /*
     * =========================================================
     * PROJECT CONTEXT
     * =========================================================
     */

    const {
        getProjectById,
    } = useProjects();

    /*
     * =========================================================
     * CURRENT PROJECT
     * =========================================================
     */

    const currentProject =
        getProjectById(projectId);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    /*
     * =========================================================
     * FETCH PROJECT TASKS
     * =========================================================
     */

    useEffect(() => {
        if (projectId) {
            fetchTasksByProject(projectId);
        }
    }, [projectId]);

    /*
     * =========================================================
     * DEBUG
     * =========================================================
     */

    console.log("========== PROJECT TASKS ==========");
    console.log("URL PROJECT ID:", projectId);
    console.log("CURRENT PROJECT:", currentProject);
    console.log("PROJECT MEMBERS:", currentProject?.members);
    console.log("ALL TASKS:", tasks);

    /*
     * =========================================================
     * NORMALIZE PROJECT ID
     * =========================================================
     */

    const normalizedProjectId =
        String(projectId || "").trim();

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
     * Frontend:
     *
     * todo
     * progress
     * review
     * done
     */

    const getFrontendStatus = (status) => {
        const normalized =
            String(status || "")
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
     * GET ASSIGNEE NAME
     * =========================================================
     */

    const getAssigneeName = (assignee) => {
        if (!assignee) {
            return "Unassigned";
        }

        const fullName =
            `${assignee?.firstName || ""} ${assignee?.surname || ""
                }`.trim();

        return (
            fullName ||
            assignee?.name ||
            assignee?.email ||
            "Unassigned"
        );
    };

    /*
     * =========================================================
     * GET ASSIGNEE INITIAL
     * =========================================================
     */

    const getAssigneeInitial = (assignee) => {
        const name =
            getAssigneeName(assignee);

        if (!name || name === "Unassigned") {
            return "?";
        }

        return name.charAt(0).toUpperCase();
    };

    /*
     * =========================================================
     * PROJECT TASKS
     * =========================================================
     *
     * IMPORTANT:
     *
     * Backend Task entity:
     *
     * private Project project;
     *
     * Therefore:
     *
     * task.project.id
     *
     * NOT:
     *
     * task.projectId
     */

    const projectTasks = useMemo(() => {
        const filtered = tasks.filter((task) => {

            const taskProjectId =
                String(
                    task?.project?.id || ""
                ).trim();

            const taskProjectCode =
                String(
                    task?.project?.code || ""
                )
                    .trim()
                    .toUpperCase();

            const currentId =
                normalizedProjectId.toUpperCase();

            return (
                taskProjectId ===
                normalizedProjectId ||
                taskProjectCode ===
                currentId
            );
        });

        console.log(
            "PROJECT TASKS:",
            filtered
        );

        return filtered;
    }, [tasks, normalizedProjectId]);

    /*
     * =========================================================
     * FILTERED TASKS
     * =========================================================
     */

    const filteredTasks = useMemo(() => {

        const searchText =
            search
                .toLowerCase()
                .trim();

        return projectTasks.filter(
            (task) => {

                const taskId =
                    String(
                        task?.id || ""
                    ).toLowerCase();

                const title =
                    String(
                        task?.title || ""
                    ).toLowerCase();

                const description =
                    String(
                        task?.description || ""
                    ).toLowerCase();

                const assigneeName =
                    getAssigneeName(
                        task?.assignee
                    ).toLowerCase();

                const frontendStatus =
                    getFrontendStatus(
                        task?.status
                    );

                const matchesSearch =
                    taskId.includes(
                        searchText
                    ) ||
                    title.includes(
                        searchText
                    ) ||
                    description.includes(
                        searchText
                    ) ||
                    assigneeName.includes(
                        searchText
                    );

                const matchesStatus =
                    statusFilter ===
                    "all" ||
                    frontendStatus ===
                    statusFilter;

                const matchesPriority =
                    priorityFilter ===
                    "all" ||
                    String(
                        task?.priority || ""
                    ).toLowerCase() ===
                    priorityFilter.toLowerCase();

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesPriority
                );
            }
        );
    }, [
        projectTasks,
        search,
        statusFilter,
        priorityFilter,
    ]);

    /*
     * =========================================================
     * STATUS LABEL
     * =========================================================
     */

    const statusLabel = {
        todo: "TO DO",
        progress: "IN PROGRESS",
        review: "REVIEW",
        done: "DONE",
    };

    /*
     * =========================================================
     * PRIORITY STYLE
     * =========================================================
     */

    const priorityClass = (priority) => {

        const normalized =
            String(
                priority || ""
            ).toLowerCase();

        if (normalized === "high") {
            return "text-red-600 dark:text-red-400";
        }

        if (normalized === "medium") {
            return "text-orange-600 dark:text-orange-400";
        }

        return "text-slate-500 dark:text-slate-400";
    };

    /*
     * =========================================================
     * STATUS STYLE
     * =========================================================
     */

    const statusClass = (status) => {

        if (status === "done") {
            return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        }

        if (status === "progress") {
            return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
        }

        if (status === "review") {
            return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
        }

        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    };

    /*
     * =========================================================
     * CREATE TASK
     * =========================================================
     */

    const handleCreateTask = async (taskData) => {

        console.log(
            "Creating task:",
            taskData
        );

        console.log(
            "Project ID:",
            projectId
        );

        const result =
            await addTask(
                taskData,
                projectId
            );

        console.log(
            "Create task result:",
            result
        );

        if (result?.success) {
            setShowCreateTask(false);
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
            await updateTask(
                updatedTask
            );

        if (result?.success) {
            setSelectedTask(null);
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
            await deleteTask(
                taskId
            );

        if (result?.success) {
            setSelectedTask(null);
        }
    };

    /*
     * =========================================================
     * OPEN TASK DETAILS
     * =========================================================
     */

    const handleTaskClick = (task) => {

        setSelectedTask({
            task,
            status:
                getFrontendStatus(
                    task?.status
                ),
        });
    };

    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <div className="space-y-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <div className="flex items-center gap-3">

                        <h1 className="text-2xl font-bold">
                            Project Tasks
                        </h1>

                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            {projectId}
                        </span>

                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        View and manage all tasks in this project.
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
                FILTERS
            ================================================= */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">

                <div className="flex flex-col gap-3 lg:flex-row">

                    {/* Search */}

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search by task ID, title or assignee..."
                            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                        />

                    </div>

                    {/* Status */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                    >

                        <option value="all">
                            All Status
                        </option>

                        <option value="todo">
                            TO DO
                        </option>

                        <option value="progress">
                            IN PROGRESS
                        </option>

                        <option value="review">
                            REVIEW
                        </option>

                        <option value="done">
                            DONE
                        </option>

                    </select>

                    {/* Priority */}

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(
                                e.target.value
                            )
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
                TASKS TABLE
            ================================================= */}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

                <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">

                    <h2 className="font-semibold">
                        All Tasks
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Showing{" "}
                        {filteredTasks.length}{" "}
                        of{" "}
                        {projectTasks.length}{" "}
                        tasks
                    </p>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[800px]">

                        <thead>

                            <tr className="border-b border-slate-200 text-left dark:border-slate-800">

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Task
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Priority
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Assignee
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredTasks.length >
                                0 ? (

                                filteredTasks.map(
                                    (task) => {

                                        const frontendStatus =
                                            getFrontendStatus(
                                                task?.status
                                            );

                                        const assigneeName =
                                            getAssigneeName(
                                                task?.assignee
                                            );

                                        return (
                                            <tr
                                                key={
                                                    task?.id
                                                }
                                                onClick={() =>
                                                    handleTaskClick(
                                                        task
                                                    )
                                                }
                                                className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
                                            >

                                                {/* =================================================
                                                    TASK
                                                ================================================= */}

                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-3">

                                                        {frontendStatus ===
                                                            "done" ? (
                                                            <CheckCircle2
                                                                size={
                                                                    18
                                                                }
                                                                className="text-green-500"
                                                            />
                                                        ) : frontendStatus ===
                                                            "progress" ? (
                                                            <Clock3
                                                                size={
                                                                    18
                                                                }
                                                                className="text-blue-500"
                                                            />
                                                        ) : (
                                                            <Circle
                                                                size={
                                                                    18
                                                                }
                                                                className="text-slate-400"
                                                            />
                                                        )}

                                                        <div>

                                                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                                                {
                                                                    task?.id
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-sm font-medium">
                                                                {
                                                                    task?.title
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* =================================================
                                                    STATUS
                                                ================================================= */}

                                                <td className="px-5 py-4">

                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                                            frontendStatus
                                                        )}`}
                                                    >
                                                        {
                                                            statusLabel[
                                                            frontendStatus
                                                            ]
                                                        }
                                                    </span>

                                                </td>

                                                {/* =================================================
                                                    PRIORITY
                                                ================================================= */}

                                                <td className="px-5 py-4">

                                                    <span
                                                        className={`text-sm font-medium ${priorityClass(
                                                            task?.priority
                                                        )}`}
                                                    >
                                                        {
                                                            task?.priority ||
                                                            "Medium"
                                                        }
                                                    </span>

                                                </td>

                                                {/* =================================================
                                                    ASSIGNEE
                                                ================================================= */}

                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-2">

                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                                                            {getAssigneeInitial(
                                                                task?.assignee
                                                            )}

                                                        </div>

                                                        <span className="max-w-[150px] truncate text-sm text-slate-600 dark:text-slate-300">

                                                            {
                                                                assigneeName
                                                            }

                                                        </span>

                                                    </div>

                                                </td>

                                                {/* =================================================
                                                    ACTION
                                                ================================================= */}

                                                <td className="px-5 py-4">

                                                    <button
                                                        type="button"
                                                        onClick={(e) => {

                                                            e.stopPropagation();

                                                            handleTaskClick(
                                                                task
                                                            );

                                                        }}
                                                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                                    >

                                                        <MoreHorizontal
                                                            size={
                                                                18
                                                            }
                                                        />

                                                    </button>

                                                </td>

                                            </tr>
                                        );
                                    }
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-5 py-12 text-center"
                                    >

                                        <p className="text-sm font-medium">
                                            No tasks found
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            This project currently has no tasks, or the tasks do not belong to this project.
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

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
                    task={
                        selectedTask.task
                    }
                    currentStatus={
                        selectedTask.status
                    }
                    onClose={() =>
                        setSelectedTask(
                            null
                        )
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

export default ProjectTasks;

