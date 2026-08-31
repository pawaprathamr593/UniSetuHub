import { ArrowLeft, FolderKanban } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useProjects } from "../../context/ProjectContext";

function CreateProject() {
  const navigate = useNavigate();

  const { projects, addProject } = useProjects();

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    type: "Software Development",
    visibility: "Company members",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectCode = form.code.trim().toUpperCase();

    // Check duplicate project key
    const alreadyExists = projects.some(
      (project) => project.code === projectCode
    );

    if (alreadyExists) {
      alert("Project key already exists.");
      return;
    }

    addProject({
      ...form,
      code: projectCode,
    });

    navigate("/projects");
  };

  return (
    <div className="mx-auto max-w-3xl">

      {/* Back */}
      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <FolderKanban size={20} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Create Project
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create a new project for your company.
          </p>
        </div>

      </div>

      {/* Form */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <div className="border-b border-slate-200 p-6 dark:border-slate-800">

            <h2 className="font-semibold">
              Project Information
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enter the basic details of your project.
            </p>

            <div className="mt-6 space-y-5">

              {/* Project Name */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Project name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Website Redesign"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                />

              </div>

              {/* Project Key */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Project key
                </label>

                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  placeholder="WEB"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm uppercase outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  A short identifier used for tasks, e.g. WEB-101.
                </p>

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
                  placeholder="Describe what this project is about..."
                  className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                />

              </div>

            </div>

          </div>

          {/* Project Settings */}
          <div className="border-b border-slate-200 p-6 dark:border-slate-800">

            <h2 className="font-semibold">
              Project Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure how this project will work.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* Project Type */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Project type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                >
                  <option>Software Development</option>
                  <option>Marketing</option>
                  <option>Business</option>
                  <option>Operations</option>
                  <option>Other</option>
                </select>

              </div>

              {/* Visibility */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Visibility
                </label>

                <select
                  name="visibility"
                  value={form.visibility}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                >
                  <option>Company members</option>
                  <option>Project members only</option>
                </select>

              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 p-6">

            <Link
              to="/projects"
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Create Project
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateProject;