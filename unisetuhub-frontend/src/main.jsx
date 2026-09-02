import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CompanyProvider } from "./context/CompanyContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { MemberProvider } from "./context/MemberContext";
import { NotificationProvider } from "./context/NotificationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CompanyProvider>
          <MemberProvider>
            <ProjectProvider>
              <NotificationProvider>
                <TaskProvider>
                  <App />
                </TaskProvider>
              </NotificationProvider>
            </ProjectProvider>
          </MemberProvider>
        </CompanyProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);