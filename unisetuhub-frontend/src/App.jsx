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
// ROUTE PROTECTION
// ===============================
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import ProjectAccessRoute from "./routes/ProjectAccessRoute";

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

import EmployeeProjects from "./pages/employees/EmployeeProjects";
import EmployeeProjectView from "./pages/employees/EmployeeProjectView";

import Tasks from "./pages/tasks/Tasks";
import EmployeeTasks from "./pages/employees/EmployeeTasks";

import Employees from "./pages/employees/Employees";
import Teams from "./pages/teams/Teams";
import Settings from "./pages/settings/Settings";

// ===============================
// COMPANIES
// ===============================
import Companies from "./pages/companies/Companies";

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

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/features"
            element={<Features />}
          />

          <Route
            path="/how-it-works"
            element={<HowItWorks />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register-company"
            element={<RegisterCompany />}
          />

        </Route>


        {/* =================================================
            PROTECTED APPLICATION
        ================================================= */}

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            {/* =================================================
                COMMON DASHBOARD
            ================================================= */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />


            {/* =================================================
                WEBSITE ADMIN ONLY
            ================================================= */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "WEBSITE_ADMIN",
                  ]}
                />
              }
            >

              <Route
                path="/companies"
                element={<Companies />}
              />

            </Route>


            {/* =================================================
                PROJECTS
            ================================================= */}

            <Route
              path="/projects"
              element={<Projects />}
            />


            {/* =================================================
                COMPANY HEAD ONLY
            ================================================= */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "COMPANY_HEAD",
                  ]}
                />
              }
            >

              <Route
                path="/projects/create"
                element={<CreateProject />}
              />

              <Route
                path="/employees"
                element={<Employees />}
              />

              <Route
                path="/teams"
                element={<Teams />}
              />

            </Route>


            {/* =================================================
                COMPANY HEAD + PROJECT LEAD
            ================================================= */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "COMPANY_HEAD",
                    "PROJECT_LEAD",
                  ]}
                />
              }
            >

              <Route
                path="/tasks"
                element={<Tasks />}
              />

            </Route>


            {/* =================================================
                EMPLOYEE ONLY
            ================================================= */}

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "EMPLOYEE",
                  ]}
                />
              }
            >

              <Route
                path="/my-projects"
                element={<EmployeeProjects />}
              />

              <Route
                path="/my-projects/:projectId"
                element={<EmployeeProjectView />}
              />

              <Route
                path="/my-tasks"
                element={<EmployeeTasks />}
              />

            </Route>


            {/* =================================================
                PROJECT ROUTES
            ================================================= */}

            <Route
              path="/projects/:projectId"
              element={<ProjectLayout />}
            >

              <Route
                index
                element={<ProjectOverview />}
              />

              <Route
                path="board"
                element={<ProjectBoard />}
              />

              <Route
                path="tasks"
                element={<ProjectTasks />}
              />

              <Route
                path="backlog"
                element={<ProjectBacklog />}
              />

              <Route
                path="members"
                element={<ProjectMembers />}
              />

            </Route>


            {/* =================================================
                SETTINGS
            ================================================= */}

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;