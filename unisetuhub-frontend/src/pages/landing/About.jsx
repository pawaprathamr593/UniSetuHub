import {
  Target,
  Users,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

function About() {
  return (
    <div>

      {/* Header */}

      <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/40 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            About Us
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Helping teams work better together
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
            WorkFlow is designed to make project and team
            management simpler, clearer, and more efficient.
          </p>

        </div>

      </section>

      {/* Story */}

      <section className="px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              OUR MISSION
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Make work management simple.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Teams often use multiple tools to manage projects,
              employees, tasks, and communication. WorkFlow brings
              the essential pieces together into one organized
              workspace.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Our goal is to give teams a clear view of what needs
              to be done, who is responsible, and how projects are
              progressing.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="grid grid-cols-2 gap-4">

              <ValueCard
                icon={<Target />}
                title="Focus"
                text="Keep teams focused on important work."
              />

              <ValueCard
                icon={<Users />}
                title="Collaboration"
                text="Make teamwork easier and clearer."
              />

              <ValueCard
                icon={<Lightbulb />}
                title="Simplicity"
                text="Remove unnecessary complexity."
              />

              <ValueCard
                icon={<ShieldCheck />}
                title="Reliability"
                text="Keep work organized and accessible."
              />

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-6 py-14 text-center text-white dark:bg-indigo-600">

          <h2 className="text-3xl font-bold">
            Build better workflows with WorkFlow.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 dark:text-indigo-100">
            Give your team a central place to plan, collaborate,
            and deliver projects.
          </p>

          <Link
            to="/register-company"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 dark:text-indigo-600"
          >
            Get Started
          </Link>

        </div>

      </section>

    </div>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {text}
      </p>

    </div>
  );
}

export default About;