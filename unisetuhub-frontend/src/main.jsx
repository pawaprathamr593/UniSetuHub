import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { TaskProvider } from "./context/TaskContext";
import { ProjectProvider } from "./context/ProjectContext";
import { MemberProvider } from "./context/MemberContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ProjectProvider>
        <TaskProvider>
          <MemberProvider>
            <App />
          </MemberProvider>
        </TaskProvider>
      </ProjectProvider>
    </ThemeProvider>
  </StrictMode>
);