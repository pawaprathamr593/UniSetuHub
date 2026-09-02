import {
  Building2,
  FolderPlus,
  CheckSquare,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  LayoutDashboard,
  Sparkles,
  Rocket,
} from "lucide-react";

import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Building2 />,
      title: "Create your company workspace",
      text: "Register your company and create a centralized workspace where your organization can manage everything from one place.",
      tag: "Workspace",
    },
    {
      number: "02",
      icon: <Users />,
      title: "Add employees and teams",
      text: "Bring your employees into the workspace and organize them around projects and responsibilities.",
      tag: "People",
    },
    {
      number: "03",
      icon: <FolderPlus />,
      title: "Create projects",
      text: "Create projects, define project details, assign project leads, and bring the right people together.",
      tag: "Projects",
    },
    {
      number: "04",
      icon: <CheckSquare />,
      title: "Create and assign tasks",
      text: "Break projects into manageable tasks, set priorities, and assign work to the employees responsible for completing it.",
      tag: "Tasks",
    },
    {
      number: "05",
      icon: <BarChart3 />,
      title: "Track progress and deliver",
      text: "Monitor task activity, review progress, and keep your entire team aligned until the work is completed.",
      tag: "Delivery",
    },
  ];

  const benefits = [
    {
      icon: <LayoutDashboard />,
      title: "One connected workspace",
      text: "Projects, tasks, teams, and employees stay connected instead of being scattered across different tools.",
    },
    {
      icon: <UserCheck />,
      title: "Clear ownership",
      text: "Everyone knows who is responsible for a project, task, or piece of work.",
    },
    {
      icon: <ShieldCheck />,
      title: "Structured access",
      text: "Different roles get the right workspace experience based on their responsibilities.",
    },
  ];

  const roles = [
    {
      title: "Company Head",
      text: "Manage employees, projects, teams, and overall company activity.",
    },
    {
      title: "Project Lead",
      text: "Manage project members, tasks, progress, and submitted work.",
    },
    {
      title: "Employee",
      text: "Focus on assigned projects and complete the tasks that matter.",
    },
  ];

  return (
    <div className="min-w-0 overflow-x-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16 2xl:py-32 dark:from-indigo-950/30 dark:via-slate-950 dark:to-slate-950">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-[-180px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl sm:h-[450px] sm:w-[650px] lg:h-[500px] lg:w-[800px] 2xl:h-[650px] 2xl:w-[1000px]" />

          <div className="absolute right-[-160px] top-[120px] h-[260px] w-[260px] rounded-full bg-purple-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

          <div className="absolute left-[-160px] top-[350px] h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

        </div>


        {/* Large-screen container */}

        <div className="relative mx-auto w-full max-w-[1800px]">

          <div className="mx-auto w-full max-w-5xl text-center xl:max-w-6xl">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 shadow-sm sm:px-4 sm:text-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">

              <Sparkles size={15} />

              How UniSetuHub works

            </div>


            {/* Heading */}

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl dark:text-white">

              From idea to completion,

              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text pb-2 text-transparent">

                everything stays connected.

              </span>

            </h1>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:text-lg xl:max-w-3xl xl:text-xl xl:leading-9 dark:text-slate-400">

              UniSetuHub gives your organization a structured workflow
              for turning projects into completed work — from creating
              your workspace to tracking the final delivery.

            </p>


            {/* Quick flow */}

            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-xs sm:gap-3 sm:text-sm xl:mt-10">

              {[
                "Workspace",
                "People",
                "Projects",
                "Tasks",
                "Delivery",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 shadow-sm sm:px-4 sm:py-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">

                    {item}

                  </span>

                  {index < 4 && (
                    <ArrowRight
                      size={14}
                      className="text-slate-300 dark:text-slate-700"
                    />
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS TIMELINE
      ===================================================== */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16">

        <div className="mx-auto w-full max-w-[1800px]">

          {/* Heading */}

          <div className="mx-auto max-w-2xl text-center xl:max-w-3xl">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              THE PROCESS
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Five simple steps to get work moving
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              A clear workflow helps every team member understand
              what happens next and who owns the work.
            </p>

          </div>


          {/* Timeline */}

          <div className="relative mx-auto mt-12 w-full max-w-[1400px] sm:mt-16 xl:mt-20">

            {/* Desktop timeline */}

            <div className="absolute left-8 top-8 hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-indigo-200 via-indigo-300 to-indigo-100 sm:block dark:from-indigo-900 dark:via-indigo-700 dark:to-indigo-900" />

            <div className="space-y-5 sm:space-y-7 xl:space-y-8">

              {steps.map((step) => (

                <div
                  key={step.number}
                  className="relative flex gap-4 sm:gap-6 xl:gap-8"
                >

                  {/* Number */}

                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm xl:h-20 xl:w-20 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">

                    <span className="text-sm font-bold xl:text-base">
                      {step.number}
                    </span>

                  </div>


                  {/* Card */}

                  <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg sm:p-6 xl:p-8 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div className="flex min-w-0 gap-4 xl:gap-5">

                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 sm:flex xl:h-12 xl:w-12 dark:bg-indigo-500/10 dark:text-indigo-400">

                          {step.icon}

                        </div>

                        <div className="min-w-0">

                          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">

                            {step.tag}

                          </span>

                          <h3 className="mt-2 text-base font-semibold sm:text-lg xl:text-xl">

                            {step.title}

                          </h3>

                          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">

                            {step.text}

                          </p>

                        </div>

                      </div>

                      <CheckCircle2
                        size={20}
                        className="shrink-0 text-indigo-500 xl:h-6 xl:w-6"
                      />

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ROLE FLOW
      ===================================================== */}

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16 dark:bg-slate-900/40">

        <div className="mx-auto w-full max-w-[1800px]">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">

            {/* Left */}

            <div className="min-w-0 max-w-3xl">

              <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
                BUILT AROUND YOUR TEAM
              </span>

              <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
                Everyone sees what matters to them.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
                UniSetuHub creates a structured experience around
                responsibilities, so company leaders, project leads,
                and employees can focus on their own work.
              </p>


              <div className="mt-7 space-y-3 xl:mt-9 xl:space-y-4">

                {roles.map((role) => (

                  <div
                    key={role.title}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm xl:p-5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30"
                  >

                    <p className="text-sm font-semibold xl:text-base">
                      {role.title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">
                      {role.text}
                    </p>

                  </div>

                ))}

              </div>

            </div>


            {/* Right visual */}

            <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">

              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6 xl:p-8 dark:border-slate-800 dark:bg-slate-900">

                {/* Mock header */}

                <div className="flex items-center justify-between border-b border-slate-100 pb-4 xl:pb-5 dark:border-slate-800">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 xl:h-12 xl:w-12 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <LayoutDashboard size={19} className="xl:h-5 xl:w-5" />
                    </div>

                    <div className="min-w-0">

                      <div className="truncate text-sm font-semibold xl:text-base">
                        Project Overview
                      </div>

                      <div className="truncate text-xs text-slate-400 xl:text-sm">
                        Website Development
                      </div>

                    </div>

                  </div>

                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700 xl:px-3 xl:text-xs dark:bg-green-500/10 dark:text-green-400">
                    Active
                  </span>

                </div>


                {/* Progress */}

                <div className="mt-6 xl:mt-8">

                  <div className="flex items-center justify-between text-sm xl:text-base">

                    <span className="font-medium">
                      Project progress
                    </span>

                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      76%
                    </span>

                  </div>

                  <div className="mt-3 h-3 rounded-full bg-slate-100 dark:bg-slate-800">

                    <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />

                  </div>

                </div>


                {/* Work items */}

                <div className="mt-6 space-y-3 xl:mt-8 xl:space-y-4">

                  {[
                    ["Database setup", "Completed", true],
                    ["Authentication API", "In Progress", false],
                    ["Dashboard UI", "In Progress", false],
                    ["Responsive testing", "To Do", false],
                  ].map(([title, status, completed]) => (

                    <div
                      key={title}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 xl:p-4 dark:border-slate-800"
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg xl:h-10 xl:w-10 ${
                            completed
                              ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                              : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <ClockIcon />
                          )}
                        </div>

                        <span className="truncate text-sm font-medium xl:text-base">
                          {title}
                        </span>

                      </div>

                      <span
                        className={`shrink-0 text-[10px] font-medium sm:text-xs xl:text-sm ${
                          completed
                            ? "text-green-600 dark:text-green-400"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12 2xl:px-16">

        <div className="mx-auto w-full max-w-[1800px]">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              WHY IT WORKS
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
              Less confusion. More visibility.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base xl:text-lg dark:text-slate-400">
              A connected workflow gives teams a clearer understanding
              of what is happening and what needs to happen next.
            </p>

          </div>


          <div className="mx-auto mt-10 grid max-w-[1500px] gap-4 md:grid-cols-3 xl:mt-14 xl:gap-6">

            {benefits.map((benefit) => (

              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg xl:p-7 dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 xl:h-12 xl:w-12 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {benefit.icon}
                </div>

                <h3 className="mt-5 text-lg font-semibold xl:text-xl">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">
                  {benefit.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-28 xl:px-12 2xl:px-16">

        <div className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 px-5 py-12 text-center text-white shadow-2xl shadow-indigo-600/20 sm:rounded-3xl sm:px-10 sm:py-16 xl:px-16 xl:py-20">

          <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl xl:h-[400px] xl:w-[400px]" />

          <div className="relative">

            <Rocket className="mx-auto mb-4 h-7 w-7 text-indigo-200 xl:h-8 xl:w-8" />

            <h2 className="text-2xl font-bold leading-tight sm:text-4xl xl:text-5xl">
              Ready to bring your workflow together?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base sm:leading-7 xl:text-lg xl:leading-8">
              Create your company workspace and start managing
              projects, teams, employees, and tasks in one place.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row xl:mt-9">

              <Link
                to="/register-company"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 xl:px-8 xl:py-4"
              >

                Create Workspace

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15 xl:px-8 xl:py-4"
              >
                Explore Features
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   CLOCK ICON
========================================================= */

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

export default HowItWorks;