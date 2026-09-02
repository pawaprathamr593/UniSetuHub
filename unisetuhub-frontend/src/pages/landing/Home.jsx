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
    <div className="min-w-0 overflow-x-hidden">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

          <div className="absolute left-1/2 top-[-180px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl sm:top-[-200px] sm:h-[450px] sm:w-[650px] lg:h-[500px] lg:w-[800px] 2xl:h-[600px] 2xl:w-[1000px]" />

          <div className="absolute right-[-180px] top-[280px] h-[280px] w-[280px] rounded-full bg-purple-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:right-[-120px] lg:h-[450px] lg:w-[450px]" />

          <div className="absolute left-[-180px] top-[500px] h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:left-[-120px] lg:h-[450px] lg:w-[450px]" />

        </div>


        {/* =================================================
            LARGE RESPONSIVE CONTAINER
        ================================================= */}

        <div className="mx-auto w-full max-w-[1800px] px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-28 lg:pt-24 xl:px-12 2xl:px-16 2xl:pb-32 2xl:pt-28">

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="mx-auto w-full max-w-5xl text-center">

            {/* Badge */}

            <div className="mb-6 inline-flex max-w-full items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-600 shadow-sm sm:mb-7 sm:gap-2 sm:px-4 sm:text-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">

              <Sparkles
                size={14}
                className="shrink-0 sm:h-[15px] sm:w-[15px]"
              />

              <span>Built for modern teams</span>

              <ChevronRight
                size={14}
                className="shrink-0 sm:h-[15px] sm:w-[15px]"
              />

            </div>


            {/* Heading */}

            <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] 2xl:text-[6rem] dark:text-white">

              One workspace.

              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text pb-1 text-transparent">

                Every project under control.

              </span>

            </h1>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-7 sm:text-base sm:leading-8 md:text-lg lg:max-w-3xl lg:text-xl lg:leading-9 dark:text-slate-400">

              UniSetuHub brings projects, tasks, employees, teams, and
              progress tracking together in one powerful workspace.
              Plan better, collaborate faster, and get work done.

            </p>


            {/* Buttons */}

            <div className="mx-auto mt-7 flex w-full max-w-md flex-col justify-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row">

              <Link
                to="/register-company"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 sm:w-auto sm:px-7 lg:px-8 lg:py-4"
              >

                Get Started Free

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </Link>


              <Link
                to="/how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto sm:px-7 lg:px-8 lg:py-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >

                See How It Works

              </Link>

            </div>


            {/* Trust text */}

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[11px] text-slate-500 sm:mt-8 sm:gap-x-6 sm:text-xs lg:mt-10 lg:text-sm dark:text-slate-400">

              <span className="flex items-center gap-1.5">
                <CheckCircle2
                  size={14}
                  className="shrink-0 text-green-500 sm:h-[15px] sm:w-[15px]"
                />
                Easy to use
              </span>

              <span className="flex items-center gap-1.5">
                <ShieldCheck
                  size={14}
                  className="shrink-0 text-indigo-500 sm:h-[15px] sm:w-[15px]"
                />
                Secure workspace
              </span>

              <span className="flex items-center gap-1.5">
                <Zap
                  size={14}
                  className="shrink-0 text-yellow-500 sm:h-[15px] sm:w-[15px]"
                />
                Built for productivity
              </span>

            </div>

          </div>


          {/* =================================================
              DASHBOARD MOCKUP
          ================================================= */}

          <div className="relative mx-auto mt-12 w-full max-w-[1500px] sm:mt-16 lg:mt-20 xl:mt-24">

            {/* Glow */}

            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.5rem] bg-indigo-500/10 blur-2xl sm:-inset-4 sm:rounded-[2rem] lg:-inset-6" />


            {/* Outer frame */}

            <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-xl shadow-slate-300/30 sm:rounded-2xl sm:p-2 sm:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">

              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">

                {/* Fake browser header */}

                <div className="flex h-10 items-center gap-1.5 border-b border-slate-200 bg-white px-3 sm:h-12 sm:gap-2 sm:px-5 lg:h-14 dark:border-slate-800 dark:bg-slate-900">

                  <div className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />

                  <div className="h-2 w-2 rounded-full bg-yellow-400 sm:h-2.5 sm:w-2.5" />

                  <div className="h-2 w-2 rounded-full bg-green-400 sm:h-2.5 sm:w-2.5" />

                  <div className="mx-auto hidden h-6 w-40 rounded-md bg-slate-100 sm:block md:w-64 lg:w-72 xl:w-96 dark:bg-slate-800" />

                </div>


                <div className="flex min-h-0 lg:min-h-[430px] xl:min-h-[500px] 2xl:min-h-[560px]">


                  {/* Sidebar */}

                  <div className="hidden w-44 shrink-0 border-r border-slate-200 bg-white p-3 sm:block md:w-48 md:p-4 lg:w-52 xl:w-60 xl:p-5 dark:border-slate-800 dark:bg-slate-900">

                    <div className="mb-5 flex items-center gap-2 md:mb-7 xl:mb-8">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white md:h-8 md:w-8 xl:h-9 xl:w-9">

                        <LayoutDashboard
                          size={15}
                          className="xl:h-[17px] xl:w-[17px]"
                        />

                      </div>

                      <span className="truncate text-xs font-bold md:text-sm xl:text-base">
                        UniSetuHub
                      </span>

                    </div>


                    <div className="space-y-1.5 md:space-y-2">

                      {[
                        "Dashboard",
                        "Projects",
                        "Tasks",
                        "Employees",
                        "Teams",
                      ].map((item, index) => (

                        <div
                          key={item}
                          className={`rounded-lg px-2.5 py-2 text-[10px] font-medium md:px-3 md:text-xs xl:px-4 xl:py-2.5 xl:text-sm ${
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

                  <div className="min-w-0 flex-1 p-3 sm:p-5 md:p-6 lg:p-7 xl:p-9">

                    {/* Dashboard header */}

                    <div className="flex items-center justify-between gap-3">

                      <div className="min-w-0">

                        <div className="h-3.5 w-24 rounded bg-slate-200 sm:h-4 sm:w-32 xl:h-5 xl:w-40 dark:bg-slate-800" />

                        <div className="mt-2 h-2 w-32 rounded bg-slate-100 sm:w-48 xl:w-60 dark:bg-slate-900" />

                      </div>

                      <div className="h-8 w-16 shrink-0 rounded-lg bg-indigo-600 sm:h-9 sm:w-20 md:w-24 xl:h-11 xl:w-32" />

                    </div>


                    {/* Stats */}

                    <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3 md:grid-cols-4 xl:mt-9 xl:gap-4">

                      {[
                        ["Projects", "12"],
                        ["Tasks", "48"],
                        ["Employees", "24"],
                        ["Completed", "76%"],
                      ].map(([label, value]) => (

                        <div
                          key={label}
                          className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 sm:rounded-xl sm:p-4 xl:p-5 dark:border-slate-800 dark:bg-slate-900"
                        >

                          <div className="truncate text-[9px] text-slate-400 sm:text-[10px] xl:text-xs">
                            {label}
                          </div>

                          <div className="mt-1.5 text-lg font-bold sm:mt-2 sm:text-xl xl:text-2xl">
                            {value}
                          </div>

                          <div className="mt-2 h-1.5 rounded-full bg-slate-100 sm:mt-3 xl:mt-4 dark:bg-slate-800">

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

                    <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3 xl:mt-5">

                      <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-5 lg:col-span-2 xl:p-6 dark:border-slate-800 dark:bg-slate-900">

                        <div className="flex items-center justify-between gap-3">

                          <div className="h-2.5 w-20 rounded bg-slate-200 sm:h-3 sm:w-28 xl:w-36 dark:bg-slate-800" />

                          <div className="h-1.5 w-10 rounded bg-slate-100 sm:w-16 xl:w-20 dark:bg-slate-800" />

                        </div>


                        <div className="mt-5 flex h-24 items-end gap-1.5 sm:mt-7 sm:h-32 sm:gap-3 xl:mt-9 xl:h-44">

                          {[45, 65, 50, 78, 60, 90, 72, 85, 68, 95].map(
                            (height, index) => (

                              <div
                                key={index}
                                className="min-w-0 flex-1 rounded-t-md bg-indigo-500/80"
                                style={{
                                  height: `${height}%`,
                                }}
                              />

                            )
                          )}

                        </div>

                      </div>


                      <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-5 xl:p-6 dark:border-slate-800 dark:bg-slate-900">

                        <div className="h-2.5 w-20 rounded bg-slate-200 sm:h-3 sm:w-24 xl:w-32 dark:bg-slate-800" />

                        <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4 xl:mt-7">

                          {[1, 2, 3, 4].map((item) => (

                            <div
                              key={item}
                              className="flex items-center gap-2 sm:gap-3"
                            >

                              <div className="h-7 w-7 shrink-0 rounded-full bg-indigo-100 sm:h-8 sm:w-8 xl:h-10 xl:w-10 dark:bg-indigo-500/10" />

                              <div className="min-w-0 flex-1">

                                <div className="h-1.5 w-16 rounded bg-slate-200 sm:h-2 sm:w-20 xl:w-28 dark:bg-slate-800" />

                                <div className="mt-1.5 h-1 w-11 rounded bg-slate-100 sm:mt-2 sm:h-1.5 sm:w-14 xl:w-20 dark:bg-slate-800" />

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

        <div className="mx-auto grid w-full max-w-[1800px] grid-cols-2 sm:grid-cols-4">

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

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16">

        <div className="mx-auto w-full max-w-[1800px]">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              EVERYTHING IN ONE PLACE
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl xl:text-5xl">
              Everything your team needs to stay organized
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              UniSetuHub keeps your entire workflow connected,
              organized, and easy to manage.
            </p>

          </div>


          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 2xl:gap-7">

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

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16 dark:bg-slate-900/40">

        <div className="mx-auto w-full max-w-[1800px]">

          <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">

            <div className="min-w-0 max-w-3xl">

              <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
                SIMPLE WORKFLOW
              </span>

              <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl xl:text-5xl">
                From planning to completion, everything stays connected.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:mt-5 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
                UniSetuHub gives your team a structured workflow so
                everyone knows what needs to be done, who owns it,
                and how the project is progressing.
              </p>


              <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">

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

            <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:rounded-3xl sm:p-6 xl:p-8 dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-[10px] text-slate-400 sm:text-xs">
                      PROJECT
                    </p>

                    <h3 className="mt-1 truncate text-sm font-semibold sm:text-base xl:text-lg">
                      Website Development
                    </h3>

                  </div>

                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700 sm:px-3 sm:text-xs dark:bg-green-500/10 dark:text-green-400">
                    Active
                  </span>

                </div>


                <div className="mt-6 sm:mt-8 xl:mt-10">

                  <div className="flex justify-between gap-3 text-xs sm:text-sm xl:text-base">

                    <span className="font-medium">
                      Project Progress
                    </span>

                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      76%
                    </span>

                  </div>

                  <div className="mt-2.5 h-2.5 rounded-full bg-slate-100 sm:mt-3 sm:h-3 dark:bg-slate-800">

                    <div className="h-full w-[76%] rounded-full bg-indigo-600" />

                  </div>

                </div>


                <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3 xl:mt-10">

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

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16">

        <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 px-5 py-12 text-center text-white shadow-2xl shadow-indigo-600/20 sm:rounded-3xl sm:px-10 sm:py-16 xl:px-16 xl:py-20">

          <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl sm:top-[-180px] sm:h-[350px] sm:w-[350px]" />

          <div className="relative">

            <Sparkles className="mx-auto mb-4 h-6 w-6 text-indigo-200 sm:mb-5 sm:h-7 sm:w-7" />

            <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl xl:text-5xl">
              Bring your entire team together.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-indigo-100 sm:mt-5 sm:text-base sm:leading-7 xl:text-lg">
              Start managing projects, teams, employees, and tasks
              with a workspace built to keep everyone aligned.
            </p>

            <Link
              to="/register-company"
              className="group mt-7 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:mt-8 sm:w-auto sm:max-w-none sm:px-7 xl:px-9 xl:py-4"
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
    <div className="border-r border-b border-slate-200 px-3 py-7 text-center last:border-r-0 even:border-r-0 sm:border-b-0 sm:px-4 sm:py-12 sm:even:border-r sm:last:border-r-0 lg:py-14 xl:py-16 2xl:py-20 dark:border-slate-800">

      <div className="text-2xl font-bold text-indigo-600 sm:text-3xl xl:text-4xl dark:text-indigo-400">
        {value}
      </div>

      <p className="mt-1 text-[11px] text-slate-500 sm:text-sm xl:text-base dark:text-slate-400">
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
    <div className="group h-full rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 sm:rounded-2xl sm:p-6 xl:p-7 2xl:p-8 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/20">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white sm:h-12 sm:w-12 xl:h-14 xl:w-14 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">

        {icon}

      </div>

      <h3 className="mt-4 text-base font-semibold sm:mt-5 sm:text-lg xl:text-xl">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">
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
    <div className="flex gap-3.5 sm:gap-4 xl:gap-5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white sm:h-10 sm:w-10 sm:text-xs xl:h-11 xl:w-11">
        {number}
      </div>

      <div className="min-w-0">

        <h3 className="text-sm font-semibold sm:text-base xl:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">
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
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-2.5 sm:rounded-xl sm:p-3 xl:p-4 dark:border-slate-800">

      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 xl:h-10 xl:w-10 ${
            completed
              ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
              : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
          }`}
        >
          {icon}
        </div>

        <span className="truncate text-xs font-medium sm:text-sm xl:text-base">
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
  );
}


export default Home;