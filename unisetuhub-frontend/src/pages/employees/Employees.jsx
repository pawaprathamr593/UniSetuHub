import { Mail, Plus, Search, Users } from "lucide-react";

function Employees() {
  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Users size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Employees
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage employees in your company.
            </p>
          </div>

        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
          <Plus size={18} />
          Add Employee
        </button>

      </div>

      {/* Search */}
      <div className="mb-6">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search employees..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-600"
          />

        </div>

      </div>

      {/* Employees */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="grid grid-cols-4 border-b border-slate-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800">

          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>

        </div>

        {/* Employee */}
        <div className="grid grid-cols-4 items-center px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              PP
            </div>

            <div>
              <p className="text-sm font-medium">
                Pratham Pawar
              </p>

              <p className="text-xs text-slate-400">
                Employee ID: EMP001
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Mail size={15} />
            pratham@acme.com
          </div>

          <div className="text-sm text-slate-600 dark:text-slate-400">
            Admin
          </div>

          <div>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
              Active
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Employees;