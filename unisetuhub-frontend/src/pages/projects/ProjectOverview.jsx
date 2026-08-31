import {
  Activity,
  CheckCircle2,
  Circle,
  Clock3,
  Users,
} from "lucide-react";

import {
  NavLink,
  useParams,
} from "react-router-dom";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

function ProjectOverview() {
  const { projectId } = useParams();

  const { tasks } = useTasks();
  const { projects } = useProjects();

  const currentProjectId = projectId?.toUpperCase();

  /*
   * =========================================================
   * CURRENT PROJECT
   * =========================================================
   */

  const project = projects.find(
    (item) => item.code === currentProjectId
  );

  /*
   * =========================================================
   * PROJECT TASKS
   * =========================================================
   */

  const projectTasks = tasks.filter(
    (task) => task.projectId === currentProjectId
  );

  /*
   * =========================================================
   * TASK STATISTICS
   * =========================================================
   */

  const stats = {
    total: projectTasks.length,

    todo: projectTasks.filter(
      (task) => task.status === "todo"
    ).length,

    progress: projectTasks.filter(
      (task) => task.status === "progress"
    ).length,

    review: projectTasks.filter(
      (task) => task.status === "review"
    ).length,

    done: projectTasks.filter(
      (task) => task.status === "done"
    ).length,
  };

  /*
   * =========================================================
   * COMPLETION PERCENTAGE
   * =========================================================
   */

  const progress =
    stats.total > 0
      ? Math.round(
          (stats.done / stats.total) * 100
        )
      : 0;

  /*
   * =========================================================
   * PROJECT NOT FOUND
   * =========================================================
   */

  if (!project) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">
        <h1 className="text-xl font-semibold">
          Project Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The project "{currentProjectId}" does not exist.
        </p>
      </div>
    );
  }

  /*
   * =========================================================
   * MEMBERS
   * =========================================================
   */

  const members = [
    {
      initials: "PP",
      name: "Pratham Pawar",
      role: "Project Admin",
    },
    {
      initials: "AS",
      name: "Amit Sharma",
      role: "Frontend Developer",
    },
    {
      initials: "RK",
      name: "Rahul Kumar",
      role: "Backend Developer",
    },
    {
      initials: "SK",
      name: "Sneha Kulkarni",
      role: "UI/UX Designer",
    },
  ];

  /*
   * =========================================================
   * RECENT ACTIVITY
   * =========================================================
   */

  const activities = [
    {
      text: "Dashboard UI moved to In Progress",
      time: "10 minutes ago",
    },
    {
      text: "Authentication API assigned to Rahul Kumar",
      time: "1 hour ago",
    },
    {
      text: "Responsive design testing moved to Review",
      time: "3 hours ago",
    },
    {
      text: "Database setup completed",
      time: "Yesterday",
    },
  ];

  /*
   * =========================================================
   * PROJECT NAVIGATION
   * =========================================================
   */

  const projectNavClass = ({ isActive }) =>
    `whitespace-nowrap px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400"
        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
    }`;

  return (
    <div className="space-y-6">


      {/* =================================================
          PROJECT PROGRESS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-base font-semibold">
              Project Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {stats.done} of {stats.total} tasks completed
            </p>

          </div>

          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress}%
          </span>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* =================================================
          TASK STATISTICS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

        <StatCard
          icon={<Circle size={18} />}
          label="Total Tasks"
          value={stats.total}
        />

        <StatCard
          icon={<Circle size={18} />}
          label="To Do"
          value={stats.todo}
        />

        <StatCard
          icon={<Clock3 size={18} />}
          label="In Progress"
          value={stats.progress}
        />

        <StatCard
          icon={<Activity size={18} />}
          label="Review"
          value={stats.review}
        />

        <StatCard
          icon={<CheckCircle2 size={18} />}
          label="Completed"
          value={stats.done}
        />

      </div>

      {/* =================================================
          MEMBERS + ACTIVITY
      ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =================================================
            TEAM MEMBERS
        ================================================= */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

          <div className="flex items-center gap-2">

            <Users
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="font-semibold">
              Team Members
            </h2>

          </div>

          <div className="mt-5 space-y-4">

            {members.map((member) => (

              <div
                key={member.initials}
                className="flex items-center gap-3"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {member.initials}
                </div>

                <div>

                  <p className="text-sm font-medium">
                    {member.name}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {member.role}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* =================================================
            RECENT ACTIVITY
        ================================================= */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

          <div className="flex items-center gap-2">

            <Activity
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="font-semibold">
              Recent Activity
            </h2>

          </div>

          <div className="mt-5 space-y-5">

            {activities.map((activity, index) => (

              <div
                key={index}
                className="flex gap-3"
              >

                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                <div>

                  <p className="text-sm">
                    {activity.text}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {activity.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

/*
 * =========================================================
 * STAT CARD
 * =========================================================
 */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">

      <div className="flex items-center justify-between">

        <span className="text-slate-400">
          {icon}
        </span>

        <span className="text-2xl font-bold">
          {value}
        </span>

      </div>

      <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

    </div>
  );
}

export default ProjectOverview;