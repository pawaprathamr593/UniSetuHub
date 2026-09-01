
import {
    CalendarDays,
    CircleUserRound,
    Flag,
    Pencil,
    Trash2,
    X,
} from "lucide-react";
import { useState } from "react";

import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

function TaskDetailsModal({
    task,
    currentStatus,
    onClose,
    onUpdate,
    onDelete,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const { projects = [] } = useProjects();
    const { users = [] } = useAuth();

    /*
     * =========================================================
     * FIND CURRENT PROJECT
     * =========================================================
     */

    const currentProject = projects.find((project) => {
        const taskProjectId = String(
            task?.project?.id ||
                task?.projectId ||
                ""
        )
            .trim()
            .toUpperCase();

        const projectId = String(
            project?.id || ""
        )
            .trim()
            .toUpperCase();

        const projectCode = String(
            project?.code || ""
        )
            .trim()
            .toUpperCase();

        return (
            taskProjectId === projectId ||
            taskProjectId === projectCode
        );
    });

    /*
     * =========================================================
     * PROJECT MEMBERS
     * =========================================================
     */

    const projectMembers = Array.isArray(
        currentProject?.members
    )
        ? currentProject.members
        : [];

    /*
     * =========================================================
     * RESOLVE PROJECT MEMBERS
     * =========================================================
     *
     * project.members may contain:
     *
     * 1. Complete user objects
     * 2. User IDs
     *
     * If only an ID is available, we find the
     * complete user from AuthContext.
     *
     */

    const members = projectMembers
        .map((member) => {
            const memberId =
                typeof member === "object"
                    ? member?.id
                    : member;

            if (
                typeof member === "object" &&
                (
                    member?.firstName ||
                    member?.surname ||
                    member?.name ||
                    member?.email
                )
            ) {
                return member;
            }

            return (
                users.find(
                    (user) =>
                        String(user?.id) ===
                        String(memberId)
                ) || member
            );
        })
        .filter(Boolean);

    /*
     * =========================================================
     * PROJECT LEADER
     * =========================================================
     */

    const projectLeader =
        currentProject?.projectLeader ||
        null;

    /*
     * =========================================================
     * ADD PROJECT LEADER IF NOT ALREADY A MEMBER
     * =========================================================
     */

    if (
        projectLeader?.id &&
        !members.some(
            (member) =>
                String(member?.id) ===
                String(projectLeader.id)
        )
    ) {
        members.push(projectLeader);
    }

    /*
     * =========================================================
     * EXISTING ASSIGNEE ID
     * =========================================================
     *
     * Backend may return:
     *
     * task.assignee = { id: "..." }
     *
     * OR:
     *
     * task.assigneeId = "..."
     *
     */

    const existingAssigneeId =
        task?.assignee?.id ||
        task?.assigneeId ||
        (
            typeof task?.assignee === "string"
                ? task.assignee
                : ""
        ) ||
        "NA";

    const [form, setForm] = useState({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",

        assignee: existingAssigneeId,

        dueDate: task.dueDate || "",

        status:
            task.status ||
            currentStatus ||
            "todo",
    });

    const handleChange = (e) => {
        setForm((current) => ({
            ...current,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            return;
        }

        /*
         * Convert frontend status to backend status
         * before sending the update.
         */

        let backendStatus = form.status;

        const normalizedStatus =
            String(
                form.status || ""
            )
                .trim()
                .toLowerCase();

        if (normalizedStatus === "todo") {
            backendStatus = "TODO";
        } else if (
            normalizedStatus === "progress"
        ) {
            backendStatus = "IN_PROGRESS";
        } else if (
            normalizedStatus === "review"
        ) {
            backendStatus = "SUBMITTED";
        } else if (
            normalizedStatus === "done"
        ) {
            backendStatus = "DONE";
        }

        /*
         * Send the edited task.
         *
         * Keep the original task data and overwrite
         * only the fields being edited.
         */

        onUpdate({
            ...task,

            title:
                form.title.trim(),

            description:
                form.description.trim(),

            priority:
                form.priority,

            assigneeId:
                form.assignee !== "NA"
                    ? form.assignee
                    : null,

            dueDate:
                form.dueDate || null,

            status:
                backendStatus,
        });

        setIsEditing(false);
    };

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (confirmed) {
            onDelete(task.id);
        }
    };

    /*
     * =========================================================
     * GET ASSIGNEE NAME
     * =========================================================
     */

    const getAssigneeName = (assignee) => {
        if (
            !assignee ||
            assignee === "NA"
        ) {
            return "Unassigned";
        }

        const assigneeId =
            typeof assignee === "object"
                ? assignee?.id
                : assignee;

        const member = members.find(
            (item) =>
                String(item?.id) ===
                String(assigneeId)
        );

        if (member) {
            return (
                member?.name ||
                `${member?.firstName || ""} ${
                    member?.surname || ""
                }`.trim() ||
                member?.email ||
                "Unassigned"
            );
        }

        /*
         * If the task already contains a complete
         * assignee object, use its details.
         */

        if (
            typeof assignee === "object"
        ) {
            return (
                assignee?.name ||
                `${assignee?.firstName || ""} ${
                    assignee?.surname || ""
                }`.trim() ||
                assignee?.email ||
                "Unassigned"
            );
        }

        /*
         * Fallback to the stored assignee value.
         */

        return (
            assignee ||
            "Unassigned"
        );
    };

    const getStatusName = (status) => {
        const normalizedStatus =
            String(
                status || ""
            )
                .trim()
                .toLowerCase();

        const statuses = {
            todo: "TO DO",
            progress: "IN PROGRESS",
            review: "REVIEW",
            done: "DONE",

            TODO: "TO DO",
            IN_PROGRESS: "IN PROGRESS",
            SUBMITTED: "REVIEW",
            REJECTED: "IN PROGRESS",
            DONE: "DONE",
        };

        return (
            statuses[normalizedStatus] ||
            statuses[status] ||
            status
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">

                    <div>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {task.id}
                        </span>

                        <h2 className="mt-1 text-lg font-semibold">
                            Task Details
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                        <X size={19} />
                    </button>

                </div>

                {isEditing ? (

                    /* =================================================
                       EDIT MODE
                    ================================================= */

                    <form onSubmit={handleUpdate}>

                        <div className="space-y-5 p-5">

                            {/* Title */}

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Task title
                                </label>

                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                                />
                            </div>

                            {/* Description */}

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                                />
                            </div>

                            {/* Priority + Assignee */}

                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* Priority */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Priority
                                    </label>

                                    <select
                                        name="priority"
                                        value={form.priority}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                                    >
                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>
                                    </select>
                                </div>

                                {/* Assignee */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Assignee
                                    </label>

                                    <select
                                        name="assignee"
                                        value={
                                            form.assignee ||
                                            "NA"
                                        }
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                                    >
                                        <option value="NA">
                                            Unassigned
                                        </option>

                                        {members.map(
                                            (member) => {
                                                const memberId =
                                                    String(
                                                        member?.id ||
                                                            ""
                                                    );

                                                const memberName =
                                                    member?.name ||
                                                    `${member?.firstName || ""} ${
                                                        member?.surname || ""
                                                    }`.trim() ||
                                                    member?.email ||
                                                    "User";

                                                return (
                                                    <option
                                                        key={
                                                            memberId
                                                        }
                                                        value={
                                                            memberId
                                                        }
                                                    >
                                                        {
                                                            memberName
                                                        }
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>

                            </div>

                            {/* Status */}

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        String(
                                            form.status || ""
                                        ).toLowerCase()
                                    }
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                                >
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
                            </div>

                            {/* Due Date */}

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Due date
                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    value={
                                        form.dueDate
                                            ? String(
                                                  form.dueDate
                                              ).slice(
                                                  0,
                                                  10
                                              )
                                            : ""
                                    }
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                                />
                            </div>

                        </div>

                        {/* Edit Footer */}

                        <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

                            <button
                                type="button"
                                onClick={() =>
                                    setIsEditing(
                                        false
                                    )
                                }
                                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                ) : (

                    /* =================================================
                       VIEW MODE
                    ================================================= */

                    <>

                        <div className="space-y-6 p-5">

                            {/* Title */}

                            <div>
                                <h3 className="text-xl font-semibold">
                                    {task.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {task.description ||
                                        "No description has been added for this task."}
                                </p>
                            </div>

                            {/* Details */}

                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* Priority */}

                                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">

                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <Flag size={15} />
                                        Priority
                                    </div>

                                    <p className="mt-2 text-sm font-semibold">
                                        {task.priority}
                                    </p>

                                </div>

                                {/* Assignee */}

                                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">

                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <CircleUserRound size={15} />
                                        Assignee
                                    </div>

                                    <p className="mt-2 text-sm font-semibold">
                                        {getAssigneeName(
                                            task.assignee
                                        )}
                                    </p>

                                </div>

                                {/* Status */}

                                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">

                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <CircleUserRound size={15} />
                                        Status
                                    </div>

                                    <p className="mt-2 text-sm font-semibold">
                                        {getStatusName(
                                            task.status ||
                                                currentStatus
                                        )}
                                    </p>

                                </div>

                                {/* Due Date */}

                                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">

                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <CalendarDays size={15} />
                                        Due Date
                                    </div>

                                    <p className="mt-2 text-sm font-semibold">
                                        {task.dueDate
                                            ? String(
                                                  task.dueDate
                                              ).slice(
                                                  0,
                                                  10
                                              )
                                            : "No due date"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="flex items-center justify-between border-t border-slate-200 p-5 dark:border-slate-800">

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsEditing(true)
                                }
                                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
                            >
                                <Pencil size={16} />
                                Edit Task
                            </button>

                        </div>

                    </>

                )}

            </div>

        </div>
    );
}

export default TaskDetailsModal;
