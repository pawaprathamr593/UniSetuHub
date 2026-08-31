import {
    CalendarDays,
    CircleUserRound,
    Flag,
    Pencil,
    Trash2,
    X,
} from "lucide-react";
import { useState } from "react";

function TaskDetailsModal({
    task,
    currentStatus,
    onClose,
    onUpdate,
    onDelete,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",
        assignee: task.assignee || "NA",
        dueDate: task.dueDate || "",
        status: task.status || currentStatus || "todo",
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

        onUpdate({
            ...task,
            ...form,
            title: form.title.trim(),
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

    const getAssigneeName = (assignee) => {
        const members = {
            PP: "Pratham Pawar",
            AS: "Amit Sharma",
            RK: "Rahul Kumar",
            SK: "Sneha Kulkarni",
            NA: "Unassigned",
        };

        return members[assignee] || assignee || "Unassigned";
    };

    const getStatusName = (status) => {
        const statuses = {
            todo: "TO DO",
            progress: "IN PROGRESS",
            review: "REVIEW",
            done: "DONE",
        };

        return statuses[status] || status;
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
                                        value={form.assignee}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                                    >
                                        <option value="NA">
                                            Unassigned
                                        </option>

                                        <option value="PP">
                                            Pratham Pawar
                                        </option>

                                        <option value="AS">
                                            Amit Sharma
                                        </option>

                                        <option value="RK">
                                            Rahul Kumar
                                        </option>

                                        <option value="SK">
                                            Sneha Kulkarni
                                        </option>
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
                                    value={form.status}
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
                                    value={form.dueDate}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                                />
                            </div>

                        </div>

                        {/* Edit Footer */}

                        <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
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
                                        {getAssigneeName(task.assignee)}
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
                                            task.status || currentStatus
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
                                        {task.dueDate || "No due date"}
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
                                onClick={() => setIsEditing(true)}
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