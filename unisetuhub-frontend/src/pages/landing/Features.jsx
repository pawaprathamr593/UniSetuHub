import {
  CheckSquare,
  Users,
  FolderKanban,
  BarChart3,
  ShieldCheck,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      icon: <FolderKanban />,
      title: "Project Management",
      text: "Create and organize projects while keeping important project information in one place.",
    },
    {
      icon: <CheckSquare />,
      title: "Task Management",
      text: "Create tasks, assign employees, set priorities, track statuses, and manage deadlines.",
    },
    {
      icon: <Users />,
      title: "Team Management",
      text: "Organize employees into teams and make responsibilities clear across projects.",
    },
    {
      icon: <BarChart3 />,
      title: "Progress Tracking",
      text: "Monitor task completion and quickly understand how your projects are progressing.",
    },
    {
      icon: <ShieldCheck />,
      title: "Controlled Access",
      text: "Keep company and project information organized with role-based access.",
    },
    {
      icon: <Settings />,
      title: "Workspace Management",
      text: "Manage employees, teams, projects, and workspace settings from one application.",
    },
  ];

  return (
    <div>

      {/* Header */}

      <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/40 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Features
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything your team needs to stay organized
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
            WorkFlow brings project management, task tracking,
            team collaboration, and progress monitoring together.
          </p>

        </div>

      </section>

      {/* Features */}

      <section className="px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {feature.icon}
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {feature.text}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl rounded-2xl bg-slate-900 px-6 py-12 text-center text-white dark:bg-indigo-600">

          <h2 className="text-3xl font-bold">
            Make your team's work more organized.
          </h2>

          <p className="mt-3 text-sm text-slate-300 dark:text-indigo-100">
            Start building your workspace today.
          </p>

          <Link
            to="/register-company"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Get Started
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Features;