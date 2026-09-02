import {
  CheckSquare,
  Users,
  FolderKanban,
  BarChart3,
  ShieldCheck,
  Settings,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  UserCheck,
  LayoutDashboard,
} from "lucide-react";

import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      icon: <FolderKanban />,
      title: "Project Management",
      text: "Create and organize projects while keeping important project information in one place.",
      points: [
        "Create and manage projects",
        "Assign project leads",
        "Track project progress",
      ],
    },
    {
      icon: <CheckSquare />,
      title: "Task Management",
      text: "Create tasks, assign employees, set priorities, track statuses, and manage deadlines.",
      points: [
        "Assign tasks to employees",
        "Set priorities and status",
        "Track task completion",
      ],
    },
    {
      icon: <Users />,
      title: "Team Management",
      text: "Organize employees around projects and make responsibilities clear across your organization.",
      points: [
        "Manage project members",
        "Organize responsibilities",
        "Keep teams aligned",
      ],
    },
    {
      icon: <BarChart3 />,
      title: "Progress Tracking",
      text: "Monitor task completion and quickly understand how your projects are progressing.",
      points: [
        "Track project progress",
        "Monitor task activity",
        "See what needs attention",
      ],
    },
    {
      icon: <ShieldCheck />,
      title: "Controlled Access",
      text: "Keep company and project information organized with role-based access.",
      points: [
        "Role-based workspace access",
        "Separate responsibilities",
        "Keep information organized",
      ],
    },
    {
      icon: <Settings />,
      title: "Workspace Management",
      text: "Manage employees, projects, teams, and workspace settings from one application.",
      points: [
        "Centralized management",
        "Workspace configuration",
        "Everything in one place",
      ],
    },
  ];

  const highlights = [
    {
      icon: <LayoutDashboard />,
      title: "One workspace",
      text: "Keep projects, tasks, people, and progress connected.",
    },
    {
      icon: <UserCheck />,
      title: "Clear ownership",
      text: "Make responsibility visible across every project and task.",
    },
    {
      icon: <Zap />,
      title: "Faster execution",
      text: "Reduce confusion and keep work moving with a structured workflow.",
    },
  ];

  const workflowItems = [
    {
      number: "01",
      title: "Projects",
      text: "Create projects and assign responsible people.",
    },
    {
      number: "02",
      title: "Tasks",
      text: "Turn project goals into manageable work.",
    },
    {
      number: "03",
      title: "People",
      text: "Assign work and keep ownership clear.",
    },
    {
      number: "04",
      title: "Progress",
      text: "See how work is moving toward completion.",
    },
  ];

  const roles = [
    {
      title: "Company Heads",
      text: "Get a clear view of employees, projects, teams, and company activity.",
    },
    {
      title: "Project Leads",
      text: "Focus on project members, task management, progress, and delivery.",
    },
    {
      title: "Employees",
      text: "See assigned projects and tasks without unnecessary complexity.",
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

          <div className="absolute right-[-150px] top-[200px] h-[280px] w-[280px] rounded-full bg-purple-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

          <div className="absolute left-[-150px] top-[420px] h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

        </div>


        {/* Large-screen container */}

        <div className="relative mx-auto w-full max-w-[1800px]">

          <div className="mx-auto w-full max-w-5xl text-center xl:max-w-6xl">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 shadow-sm sm:px-4 sm:text-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">

              <Sparkles size={15} />

              Everything your team needs

            </div>


            {/* Heading */}

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl dark:text-white">

              Powerful tools.

              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text pb-2 text-transparent">

                One connected workspace.

              </span>

            </h1>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:text-lg xl:max-w-3xl xl:text-xl xl:leading-9 dark:text-slate-400">

              UniSetuHub brings project management, task tracking,
              team collaboration, employee management, and progress
              monitoring together in one simple workspace.

            </p>


            {/* Hero buttons */}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row xl:mt-10">

              <Link
                to="/register-company"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:-translate-y-0.5 hover:bg-indigo-500 sm:px-7 xl:px-8 xl:py-4"
              >
                Get Started Free

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:px-7 xl:px-8 xl:py-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                See How It Works
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HIGHLIGHTS
      ===================================================== */}

      <section className="border-y border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 dark:border-slate-800 dark:bg-slate-950">

        <div className="mx-auto grid w-full max-w-[1800px] gap-4 md:grid-cols-3 xl:gap-6">

          {highlights.map((item) => (

            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 xl:p-5 dark:border-slate-800 dark:bg-slate-900/50"
            >

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 xl:h-11 xl:w-11 dark:bg-indigo-500/10 dark:text-indigo-400">
                {item.icon}
              </div>

              <div className="min-w-0">

                <h3 className="text-sm font-semibold xl:text-base">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500 xl:text-sm xl:leading-6 dark:text-slate-400">
                  {item.text}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16">

        <div className="mx-auto w-full max-w-[1800px]">

          {/* Section header */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              PLATFORM FEATURES
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Everything you need to manage work
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              Designed to make everyday project and team management
              simpler, clearer, and more organized.
            </p>

          </div>


          {/* Feature grid */}

          <div className="mx-auto mt-10 grid w-full max-w-[1700px] gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 2xl:gap-7">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 sm:p-6 xl:p-7 2xl:p-8 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/20"
              >

                {/* Icon */}

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition duration-200 group-hover:bg-indigo-600 group-hover:text-white xl:h-14 xl:w-14 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">

                  {feature.icon}

                </div>


                {/* Title */}

                <h3 className="mt-5 text-lg font-semibold xl:text-xl">
                  {feature.title}
                </h3>


                {/* Description */}

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">
                  {feature.text}
                </p>


                {/* Points */}

                <div className="mt-5 space-y-2.5 xl:mt-6 xl:space-y-3">

                  {feature.points.map((point) => (

                    <div
                      key={point}
                      className="flex items-start gap-2"
                    >

                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-indigo-500 xl:h-4 xl:w-4"
                      />

                      <span className="text-xs leading-5 text-slate-600 xl:text-sm xl:leading-6 dark:text-slate-400">
                        {point}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          VISUAL WORKFLOW
      ===================================================== */}

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16 dark:bg-slate-900/40">

        <div className="mx-auto grid w-full max-w-[1800px] items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="min-w-0 max-w-3xl">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              CONNECTED WORKFLOW
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Everything works together.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              Projects connect people. People complete tasks.
              Tasks contribute to project progress. UniSetuHub
              keeps those relationships visible in one place.
            </p>


            {/* Workflow steps */}

            <div className="mt-7 space-y-4 xl:mt-9 xl:space-y-5">

              {workflowItems.map((item) => (

                <div
                  key={item.title}
                  className="flex items-start gap-3 xl:gap-4"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white xl:h-9 xl:w-9">
                    {item.number}
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-semibold xl:text-base">
                      {item.title}
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-slate-500 xl:text-sm xl:leading-6 dark:text-slate-400">
                      {item.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* =================================================
              RIGHT VISUAL
          ================================================= */}

          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">

            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-indigo-500/10 blur-2xl xl:-inset-6" />

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6 xl:p-8 dark:border-slate-800 dark:bg-slate-900">

              {/* Window header */}

              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 xl:pb-5 dark:border-slate-800">

                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />

                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />

                <div className="ml-3 h-6 flex-1 rounded-md bg-slate-100 xl:h-7 dark:bg-slate-800" />

              </div>


              {/* Project card */}

              <div className="mt-5 rounded-2xl border border-slate-200 p-4 sm:p-5 xl:mt-7 xl:p-6 dark:border-slate-800">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 xl:h-12 xl:w-12 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <FolderKanban size={19} className="xl:h-5 xl:w-5" />
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold xl:text-base">
                        Website Development
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400 xl:text-sm">
                        12 tasks • 6 members
                      </p>

                    </div>

                  </div>

                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700 xl:px-3 xl:text-xs dark:bg-green-500/10 dark:text-green-400">
                    Active
                  </span>

                </div>


                {/* Progress */}

                <div className="mt-6 xl:mt-8">

                  <div className="flex items-center justify-between text-xs xl:text-sm">

                    <span className="font-medium">
                      Progress
                    </span>

                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      76%
                    </span>

                  </div>

                  <div className="mt-2 h-2.5 rounded-full bg-slate-100 xl:mt-3 xl:h-3 dark:bg-slate-800">

                    <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />

                  </div>

                </div>


                {/* Task rows */}

                <div className="mt-5 space-y-2.5 xl:mt-7 xl:space-y-3">

                  {[
                    ["Database setup", "Done", true],
                    ["Authentication API", "In Progress", false],
                    ["Dashboard UI", "In Progress", false],
                    ["Responsive testing", "To Do", false],
                  ].map(([title, status, done]) => (

                    <div
                      key={title}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 xl:p-4 dark:border-slate-800"
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg xl:h-10 xl:w-10 ${
                            done
                              ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                              : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 size={15} />
                          ) : (
                            <CheckSquare size={15} />
                          )}
                        </div>

                        <span className="truncate text-xs font-medium sm:text-sm xl:text-base">
                          {title}
                        </span>

                      </div>

                      <span
                        className={`shrink-0 text-[10px] font-medium sm:text-xs xl:text-sm ${
                          done
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
          ROLE BENEFITS
      ===================================================== */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12 2xl:px-16">

        <div className="mx-auto w-full max-w-[1800px]">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              MADE FOR YOUR TEAM
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
              A workspace that adapts to responsibilities
            </h2>

          </div>


          <div className="mx-auto mt-10 grid max-w-[1500px] gap-4 md:grid-cols-3 xl:mt-14 xl:gap-6">

            {roles.map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg xl:p-7 dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 xl:h-12 xl:w-12 dark:bg-indigo-500/10 dark:text-indigo-400">

                  <Users size={19} />

                </div>

                <h3 className="text-base font-semibold xl:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">
                  {item.text}
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

          <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl xl:top-[-200px] xl:h-[400px] xl:w-[400px]" />

          <div className="relative">

            <Sparkles className="mx-auto mb-4 h-7 w-7 text-indigo-200" />

            <h2 className="text-2xl font-bold leading-tight sm:text-4xl xl:text-5xl">
              Give your team a better way to work.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base sm:leading-7 xl:text-lg xl:leading-8">
              Bring your projects, tasks, employees, and progress
              together with UniSetuHub.
            </p>

            <Link
              to="/register-company"
              className="group mt-7 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:w-auto sm:max-w-none sm:px-7 xl:px-9 xl:py-4"
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

export default Features;