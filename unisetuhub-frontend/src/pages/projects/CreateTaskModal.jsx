import { X } from "lucide-react";
import { useState } from "react";

function CreateTaskModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    onCreate(form);

    setForm({
      title: "",
      description: "",
      priority: "Medium",
      assignee: "",
      dueDate: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">

          <div>
            <h2 className="text-lg font-semibold">
              Create Task
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Add a new task to this project.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X size={19} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

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
                placeholder="Create login page"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
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
                rows="3"
                placeholder="Describe the task..."
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
              />

            </div>

            {/* Priority + Assignee */}
            <div className="grid gap-4 sm:grid-cols-2">

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
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

              </div>

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
                  <option value="">Unassigned</option>
                  <option value="PP">Pratham Pawar</option>
                  <option value="AS">Amit Sharma</option>
                  <option value="RK">Rahul Kumar</option>
                  <option value="SK">Sneha Kulkarni</option>
                </select>

              </div>

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

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-800">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Create Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateTaskModal;