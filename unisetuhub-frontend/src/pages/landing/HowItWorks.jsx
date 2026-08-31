import {
  Building2,
  FolderPlus,
  CheckSquare,
  Users,
  BarChart3,
} from "lucide-react";

import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Building2 />,
      title: "Create your company workspace",
      text: "Register your company and create a centralized workspace for your organization.",
    },
    {
      number: "02",
      icon: <Users />,
      title: "Add your employees and teams",
      text: "Bring your employees into the workspace and organize them into teams.",
    },
    {
      number: "03",
      icon: <FolderPlus />,
      title: "Create projects",
      text: "Create projects, define their information, and add the people responsible for them.",
    },
    {
      number: "04",
      icon: <CheckSquare />,
      title: "Create and assign tasks",
      text: "Break projects into manageable tasks and assign them to the right employees.",
    },
    {
      number: "05",
      icon: <BarChart3 />,
      title: "Track and deliver",
      text: "Monitor task status, project progress, and keep everyone aligned until completion.",
    },
  ];

  return (
    <div>

      {/* Header */}

      <section className="bg-gradient-to-b from-indigo-50 to-white px-4 py-20 dark:from-indigo-950/30 dark:to-slate-950 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            How It Works
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            From idea to completion, in one place
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
            WorkFlow gives your organization a simple process
            for turning projects into completed work.
          </p>

        </div>

      </section>

      {/* Steps */}

      <section className="px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl">

          <div className="space-y-6">

            {steps.map((step) => (

              <div
                key={step.number}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="hidden text-3xl font-bold text-indigo-200 dark:text-indigo-900 sm:block">
                  {step.number}
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {step.icon}
                </div>

                <div>

                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 sm:hidden">
                    STEP {step.number}
                  </div>

                  <h2 className="mt-1 text-lg font-semibold">
                    {step.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {step.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl rounded-2xl bg-indigo-600 px-6 py-12 text-center text-white">

          <h2 className="text-3xl font-bold">
            Ready to get started?
          </h2>

          <p className="mt-3 text-sm text-indigo-100">
            Create your workspace and start managing your projects.
          </p>

          <Link
            to="/register-company"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Create Workspace
          </Link>

        </div>

      </section>

    </div>
  );
}

export default HowItWorks;