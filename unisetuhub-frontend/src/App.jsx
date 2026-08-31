import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===============================
// AUTH
// ===============================
import Login from "./pages/auth/Login";
import RegisterCompany from "./pages/auth/RegisterCompany";

// ===============================
// LANDING PAGES
// ===============================
import Home from "./pages/landing/Home";
import Features from "./pages/landing/Features";
import HowItWorks from "./pages/landing/HowItWorks";
import About from "./pages/landing/About";

// ===============================
// LAYOUTS
// ===============================
import DashboardLayout from "./layouts/DashboardLayout";
import ProjectLayout from "./layouts/ProjectLayout";
import PublicLayout from "./layouts/PublicLayout";

// ===============================
// DASHBOARD
// ===============================
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import CreateProject from "./pages/projects/CreateProject";

import Tasks from "./pages/tasks/Tasks";
import Employees from "./pages/employees/Employees";
import Teams from "./pages/teams/Teams";
import Settings from "./pages/settings/Settings";

// ===============================
// PROJECT PAGES
// ===============================
import ProjectOverview from "./pages/projects/ProjectOverview";
import ProjectBoard from "./pages/projects/ProjectBoard";
import ProjectMembers from "./pages/projects/ProjectMembers";
import ProjectTasks from "./pages/projects/ProjectTasks";
import ProjectBacklog from "./pages/projects/ProjectBacklog";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC WEBSITE
        ================================================= */}

        <Route element={<PublicLayout />}>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Features */}
          <Route
            path="/features"
            element={<Features />}
          />

          {/* How It Works */}
          <Route
            path="/how-it-works"
            element={<HowItWorks />}
          />

          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Register */}
          <Route
            path="/register-company"
            element={<RegisterCompany />}
          />

        </Route>


        {/* =================================================
            DASHBOARD LAYOUT
        ================================================= */}

        <Route element={<DashboardLayout />}>

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* =================================================
              PROJECTS
          ================================================= */}

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/create"
            element={<CreateProject />}
          />


          {/* =================================================
              PROJECT LAYOUT
          ================================================= */}

          <Route
            path="/projects/:projectId"
            element={<ProjectLayout />}
          >

            {/* Overview */}

            <Route
              index
              element={<ProjectOverview />}
            />

            <Route
              path="board"
              element={<ProjectBoard />}
            />

            {/* Tasks */}

            <Route
              path="tasks"
              element={<ProjectTasks />}
            />

            {/* Backlog */}

            <Route
              path="backlog"
              element={<ProjectBacklog />}
            />

            {/* Members */}

            <Route
              path="members"
              element={<ProjectMembers />}
            />



          </Route>



          {/* =================================================
              OTHER WORKSPACE PAGES
          ================================================= */}

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/employees"
            element={<Employees />}
          />

          <Route
            path="/teams"
            element={<Teams />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;