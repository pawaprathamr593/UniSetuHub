import {
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart3,
  FolderKanban,
  ListTodo,
  ShieldCheck,
  Zap,
  Sparkles,
  Clock3,
  UserCheck,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative">

        {/* Background decoration */}

        <div className="absolute inset-0 -z-10 overflow-hidden">

          <div className="absolute left-1/2 top-[-200px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />

          <div className="absolute right-[-150px] top-[250px] h-[350px] w-[350px] rounded-full bg-purple-500/10 blur-3xl" />

          <div className="absolute left-[-150px] top-[450px] h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-3xl" />

        </div>


        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">

          {/* Hero Content */}

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">

              <Sparkles size={15} />

              Built for modern teams

              <ChevronRight size={15} />

            </div>


            {/* Heading */}

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">

              One workspace.

              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">

                Every project under control.

              </span>

            </h1>


            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">

              UniSetuHub brings projects, tasks, employees, teams, and
              progress tracking together in one powerful workspace.
              Plan better, collaborate faster, and get work done.

            </p>


            {/* Buttons */}

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/register-company"
                className="group flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-500"
              >

                Get Started Free

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </Link>


              <Link
                to="/how-it-works"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >

                See How It Works

              </Link>

            </div>


            {/* Trust text */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-slate-400">

              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green-500" />
                Easy to use
              </span>

              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-indigo-500" />
                Secure workspace
              </span>

              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-yellow-500" />
                Built for productivity
              </span>

            </div>

          </div>


          {/* =================================================
              DASHBOARD MOCKUP
          ================================================= */}

          <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">

            {/* Glow */}

            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-indigo-500/10 blur-2xl" />


            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">


                {/* Fake browser header */}

                <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900">

                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />

                  <div className="mx-auto hidden h-7 w-72 rounded-md bg-slate-100 sm:block dark:bg-slate-800" />

                </div>


                <div className="flex min-h-[430px]">


                  {/* Sidebar */}

                  <div className="hidden w-52 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:block">

                    <div className="mb-7 flex items-center gap-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">

                        <LayoutDashboard size={16} />

                      </div>

                      <span className="text-sm font-bold">
                        UniSetuHub
                      </span>

                    </div>


                    <div className="space-y-2">

                      {[
                        "Dashboard",
                        "Projects",
                        "Tasks",
                        "Employees",
                        "Teams",
                      ].map((item, index) => (

                        <div
                          key={item}
                          className={`rounded-lg px-3 py-2 text-xs font-medium ${
                            index === 0
                              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {item}
                        </div>

                      ))}

                    </div>

                  </div>


                  {/* Dashboard */}

                  <div className="flex-1 p-5 sm:p-7">

                    <div className="flex items-center justify-between">

                      <div>

                        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-2 h-2.5 w-48 rounded bg-slate-100 dark:bg-slate-900" />

                      </div>

                      <div className="h-9 w-24 rounded-lg bg-indigo-600" />

                    </div>


                    {/* Stats */}

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                      {[
                        ["Projects", "12"],
                        ["Tasks", "48"],
                        ["Employees", "24"],
                        ["Completed", "76%"],
                      ].map(([label, value]) => (

                        <div
                          key={label}
                          className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                        >

                          <div className="text-[10px] text-slate-400">
                            {label}
                          </div>

                          <div className="mt-2 text-xl font-bold">
                            {value}
                          </div>

                          <div className="mt-3 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">

                            <div
                              className="h-full rounded-full bg-indigo-500"
                              style={{
                                width:
                                  label === "Completed"
                                    ? "76%"
                                    : "60%",
                              }}
                            />

                          </div>

                        </div>

                      ))}

                    </div>


                    {/* Lower dashboard */}

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">

                      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">

                        <div className="flex items-center justify-between">

                          <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800" />

                          <div className="h-2 w-16 rounded bg-slate-100 dark:bg-slate-800" />

                        </div>


                        <div className="mt-7 flex h-32 items-end gap-3">

                          {[45, 65, 50, 78, 60, 90, 72, 85, 68, 95].map(
                            (height, index) => (

                              <div
                                key={index}
                                className="flex-1 rounded-t-md bg-indigo-500/80"
                                style={{
                                  height: `${height}%`,
                                }}
                              />

                            )
                          )}

                        </div>

                      </div>


                      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-6 space-y-4">

                          {[1, 2, 3, 4].map((item) => (

                            <div
                              key={item}
                              className="flex items-center gap-3"
                            >

                              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-500/10" />

                              <div className="flex-1">

                                <div className="h-2 w-20 rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="mt-2 h-1.5 w-14 rounded bg-slate-100 dark:bg-slate-800" />

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="border-y border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/30">

        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">

          <Stat
            value="1"
            label="Unified workspace"
          />

          <Stat
            value="5+"
            label="Core management tools"
          />

          <Stat
            value="24/7"
            label="Project visibility"
          />

          <Stat
            value="100%"
            label="Team focused"
          />

        </div>

      </section>


      {/* =====================================================
          FEATURES PREVIEW
      ===================================================== */}

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              EVERYTHING IN ONE PLACE
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your team needs to stay organized
            </h2>

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              UniSetuHub keeps your entire workflow connected,
              organized, and easy to manage.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            <FeatureCard
              icon={<FolderKanban />}
              title="Project Management"
              text="Create projects, track progress, manage deadlines, and keep every project organized."
            />

            <FeatureCard
              icon={<ListTodo />}
              title="Task Management"
              text="Create tasks, assign team members, set priorities, and monitor task progress."
            />

            <FeatureCard
              icon={<Users />}
              title="Team Collaboration"
              text="Organize employees into teams and make ownership and responsibilities clear."
            />

            <FeatureCard
              icon={<BarChart3 />}
              title="Progress Tracking"
              text="Get a clear view of project completion and understand what needs attention."
            />

            <FeatureCard
              icon={<UserCheck />}
              title="Employee Management"
              text="Manage employees and connect them with teams and projects."
            />

            <FeatureCard
              icon={<ShieldCheck />}
              title="Centralized Workspace"
              text="Keep important project information in one secure and accessible place."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          WORKFLOW SECTION
      ===================================================== */}

      <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/40 sm:px-6 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            <div>

              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                SIMPLE WORKFLOW
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                From planning to completion, everything stays connected.
              </h2>

              <p className="mt-5 leading-7 text-slate-500 dark:text-slate-400">
                UniSetuHub gives your team a structured workflow so
                everyone knows what needs to be done, who owns it,
                and how the project is progressing.
              </p>


              <div className="mt-8 space-y-6">

                <Step
                  number="01"
                  title="Create your workspace"
                  text="Set up your company and bring your employees together."
                />

                <Step
                  number="02"
                  title="Create projects and teams"
                  text="Organize your work and assign the right people to every project."
                />

                <Step
                  number="03"
                  title="Track tasks and progress"
                  text="Manage tasks from creation to completion with clear visibility."
                />

              </div>

            </div>


            {/* Workflow visual */}

            <div className="relative">

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-slate-400">
                      PROJECT
                    </p>

                    <h3 className="mt-1 font-semibold">
                      Website Development
                    </h3>

                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    Active
                  </span>

                </div>


                <div className="mt-8">

                  <div className="flex justify-between text-sm">

                    <span className="font-medium">
                      Project Progress
                    </span>

                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      76%
                    </span>

                  </div>

                  <div className="mt-3 h-3 rounded-full bg-slate-100 dark:bg-slate-800">

                    <div className="h-full w-[76%] rounded-full bg-indigo-600" />

                  </div>

                </div>


                <div className="mt-8 space-y-3">

                  <WorkflowItem
                    icon={<CheckCircle2 />}
                    title="Database setup"
                    status="Completed"
                    completed
                  />

                  <WorkflowItem
                    icon={<Clock3 />}
                    title="Authentication API"
                    status="In Progress"
                  />

                  <WorkflowItem
                    icon={<Clock3 />}
                    title="Dashboard UI"
                    status="In Progress"
                  />

                  <WorkflowItem
                    icon={<ListTodo />}
                    title="Responsive testing"
                    status="To Do"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 px-6 py-16 text-center text-white shadow-2xl shadow-indigo-600/20 sm:px-10">

          <div className="absolute left-1/2 top-[-180px] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">

            <Sparkles className="mx-auto mb-5 h-7 w-7 text-indigo-200" />

            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Bring your entire team together.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
              Start managing projects, teams, employees, and tasks
              with a workspace built to keep everyone aligned.
            </p>

            <Link
              to="/register-company"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >

              Create Your Workspace

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   STAT
========================================================= */

function Stat({ value, label }) {
  return (
    <div className="border-r border-slate-200 px-4 text-center last:border-r-0 dark:border-slate-800">

      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-3xl">
        {value}
      </div>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
        {label}
      </p>

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/20">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">

        {icon}

      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   STEP
========================================================= */

function Step({ number, title, text }) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
        {number}
      </div>

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {text}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   WORKFLOW ITEM
========================================================= */

function WorkflowItem({
  icon,
  title,
  status,
  completed,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            completed
              ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
              : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
          }`}
        >
          {icon}
        </div>

        <span className="text-sm font-medium">
          {title}
        </span>

      </div>

      <span
        className={`text-xs font-medium ${
          completed
            ? "text-green-600 dark:text-green-400"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {status}
      </span>

    </div>
  );
}


export default Home;