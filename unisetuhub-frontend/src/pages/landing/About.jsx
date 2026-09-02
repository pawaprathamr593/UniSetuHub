import {
  Target,
  Users,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  LayoutDashboard,
  Rocket,
} from "lucide-react";

import { Link } from "react-router-dom";

function About() {
  const values = [
    {
      icon: <Target />,
      title: "Focus",
      text: "Keep teams focused on the work that matters most.",
    },
    {
      icon: <Users />,
      title: "Collaboration",
      text: "Make teamwork clearer by keeping people and responsibilities connected.",
    },
    {
      icon: <Lightbulb />,
      title: "Simplicity",
      text: "Remove unnecessary complexity from everyday work management.",
    },
    {
      icon: <ShieldCheck />,
      title: "Reliability",
      text: "Keep important work organized, visible, and accessible.",
    },
  ];

  const principles = [
    "Clear ownership across projects and tasks",
    "A connected workspace for teams and employees",
    "Simple workflows that are easy to understand",
    "Better visibility from planning to completion",
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

          <div className="absolute right-[-160px] top-[180px] h-[280px] w-[280px] rounded-full bg-purple-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

          <div className="absolute left-[-160px] top-[420px] h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

        </div>


        {/* Large-screen container */}

        <div className="relative mx-auto w-full max-w-[1800px]">

          <div className="mx-auto w-full max-w-5xl text-center xl:max-w-6xl">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 shadow-sm sm:px-4 sm:text-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">

              <Sparkles size={15} />

              About UniSetuHub

            </div>


            {/* Heading */}

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl dark:text-white">

              Helping teams

              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text pb-2 text-transparent">

                work better together.

              </span>

            </h1>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:text-lg xl:max-w-3xl xl:text-xl xl:leading-9 dark:text-slate-400">

              UniSetuHub is built to give organizations a simple,
              connected way to manage projects, tasks, employees,
              and progress from one workspace.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION
      ===================================================== */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16">

        <div className="mx-auto grid w-full max-w-[1800px] items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Story */}

          <div className="min-w-0 max-w-3xl">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              OUR MISSION
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Make work management simple.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              Teams often rely on multiple tools to manage projects,
              employees, tasks, and progress. That can make it harder
              to understand what needs to happen next and who is
              responsible for it.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              UniSetuHub brings those essential pieces together into
              one organized workspace, giving teams a clearer view of
              their work from planning through completion.
            </p>


            {/* Mission points */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:mt-9 xl:gap-4">

              {principles.map((principle) => (

                <div
                  key={principle}
                  className="flex items-start gap-2.5 xl:gap-3"
                >

                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-indigo-500 xl:h-[19px] xl:w-[19px]"
                  />

                  <span className="text-sm leading-6 text-slate-600 xl:text-base xl:leading-7 dark:text-slate-400">
                    {principle}
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* Mission visual */}

          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">

            {/* Glow */}

            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-indigo-500/10 blur-2xl xl:-inset-6" />

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6 xl:p-8 dark:border-slate-800 dark:bg-slate-900">

              {/* Mock dashboard header */}

              <div className="flex items-center justify-between border-b border-slate-100 pb-4 xl:pb-5 dark:border-slate-800">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 xl:h-12 xl:w-12 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <LayoutDashboard size={19} className="xl:h-5 xl:w-5" />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold xl:text-base">
                      Team Workspace
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-400 xl:text-sm">
                      Everything connected
                    </p>

                  </div>

                </div>

                <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700 xl:px-3 xl:text-xs dark:bg-green-500/10 dark:text-green-400">
                  Active
                </span>

              </div>


              {/* Workspace blocks */}

              <div className="mt-5 grid grid-cols-2 gap-3 xl:mt-7 xl:gap-4">

                <MiniMetric
                  label="Projects"
                  value="12"
                />

                <MiniMetric
                  label="Tasks"
                  value="48"
                />

                <MiniMetric
                  label="Employees"
                  value="24"
                />

                <MiniMetric
                  label="Completion"
                  value="76%"
                />

              </div>


              {/* Progress */}

              <div className="mt-5 rounded-2xl border border-slate-100 p-4 xl:mt-7 xl:p-5 dark:border-slate-800">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-medium xl:text-sm">
                    Project progress
                  </span>

                  <span className="text-xs font-semibold text-indigo-600 xl:text-sm dark:text-indigo-400">
                    76%
                  </span>

                </div>

                <div className="mt-3 h-2.5 rounded-full bg-slate-100 xl:h-3 dark:bg-slate-800">

                  <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />

                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">

                  <div className="h-2 rounded-full bg-green-400/70" />

                  <div className="h-2 rounded-full bg-indigo-400/70" />

                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700" />

                </div>

              </div>


              {/* Bottom message */}

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-indigo-50 p-4 xl:mt-5 xl:p-5 dark:bg-indigo-500/10">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 xl:h-10 xl:w-10 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <HeartHandshake size={17} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-semibold xl:text-sm">
                    Work stays connected
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-slate-500 xl:text-xs xl:leading-6 dark:text-slate-400">
                    People, projects and tasks move together.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16 dark:bg-slate-900/40">

        <div className="mx-auto w-full max-w-[1800px]">

          {/* Section heading */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              WHAT WE VALUE
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Built around better ways of working
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              UniSetuHub is designed around the things that make
              collaboration easier and work more predictable.
            </p>

          </div>


          {/* Value cards */}

          <div className="mx-auto mt-10 grid max-w-[1600px] gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-4 xl:gap-6">

            {values.map((value) => (

              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                text={value.text}
              />

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          VISION
      ===================================================== */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 xl:px-12 2xl:px-16">

        <div className="mx-auto grid w-full max-w-[1800px] items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Visual */}

          <div className="order-2 mx-auto w-full max-w-2xl lg:order-1 lg:max-w-none">

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7 xl:p-8 dark:border-slate-800 dark:bg-slate-900">

              <div className="absolute right-[-70px] top-[-70px] h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl xl:h-56 xl:w-56" />

              <div className="relative">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white xl:h-12 xl:w-12">
                    <Rocket size={19} className="xl:h-5 xl:w-5" />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold xl:text-base">
                      Better project visibility
                    </p>

                    <p className="text-xs text-slate-400 xl:text-sm">
                      From planning to delivery
                    </p>

                  </div>

                </div>


                <div className="mt-7 space-y-3 xl:mt-9 xl:space-y-4">

                  {[
                    ["Plan", "Projects and responsibilities"],
                    ["Execute", "Tasks and collaboration"],
                    ["Track", "Progress and completion"],
                  ].map(([title, text], index) => (

                    <div
                      key={title}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 xl:p-4 dark:border-slate-800"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-[10px] font-bold text-indigo-600 xl:h-10 xl:w-10 xl:text-xs dark:bg-indigo-500/10 dark:text-indigo-400">
                        0{index + 1}
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold xl:text-sm">
                          {title}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] text-slate-400 xl:text-xs">
                          {text}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>


          {/* Text */}

          <div className="order-1 min-w-0 max-w-3xl lg:order-2">

            <span className="text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm dark:text-indigo-400">
              OUR VISION
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Make organized work feel natural.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              Good project management should not feel complicated.
              Our vision is to provide teams with a workspace where
              planning, execution, and progress are easy to understand.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base xl:text-lg xl:leading-8 dark:text-slate-400">
              By keeping work connected and responsibilities visible,
              UniSetuHub helps teams spend less time searching for
              information and more time getting work done.
            </p>

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
              Ready to bring your team together?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base sm:leading-7 xl:text-lg xl:leading-8">
              Create your workspace and give your team a simpler
              way to plan, collaborate, and deliver projects.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row xl:mt-9">

              <Link
                to="/register-company"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 xl:px-8 xl:py-4"
              >
                Get Started

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
   VALUE CARD
========================================================= */

function ValueCard({ icon, title, text }) {
  return (
    <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 sm:p-6 xl:p-7 2xl:p-8 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/20">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white xl:h-14 xl:w-14 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">

        {icon}

      </div>

      <h3 className="mt-5 text-base font-semibold sm:text-lg xl:text-xl">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 xl:text-base xl:leading-7 dark:text-slate-400">
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 xl:p-4 dark:border-slate-800 dark:bg-slate-950">

      <p className="text-[10px] text-slate-400 xl:text-xs">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold xl:text-xl">
        {value}
      </p>

    </div>
  );
}


export default About;