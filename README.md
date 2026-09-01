# 🚀 UniSetuHub

### Unified Company, Project & Task Management Platform

**UniSetuHub** is a full-stack web application designed to manage companies, employees, projects, project members, and tasks through a centralized platform.

The system provides separate workflows for **Website Administrators, Company Heads, Project Leads, and Employees**, with role-based access and project-specific permissions.

The application is built with a **React + Vite frontend** and a **Java Spring Boot backend**, using **MySQL** for persistent data storage.

---

## 📌 Overview

Managing employees and software projects can become difficult when company information, project assignments, and tasks are maintained across multiple systems.

UniSetuHub provides a centralized solution where:

* Companies can be managed from one platform.
* Company Heads can manage their employees.
* Projects can be created and organized.
* Employees can be assigned to projects.
* Project Leads can manage project members and tasks.
* Tasks can be tracked through different project views.
* Employees can work only with projects assigned to them.
* Different users receive access according to their roles.

The application follows a **frontend–backend architecture**, with React communicating with REST APIs exposed by Spring Boot.

---

# ✨ Key Features

## 🔐 Authentication & Role-Based Access

UniSetuHub implements role-based application access using dedicated authentication and routing logic.

### Supported Roles

| Role               | Responsibility                                   |
| ------------------ | ------------------------------------------------ |
| 🛡️ Website Admin  | Manages companies and platform-level information |
| 🏢 Company Head    | Manages company employees and projects           |
| 👨‍💼 Project Lead | Manages project members and project tasks        |
| 👨‍💻 Employee     | Works with assigned projects and tasks           |

The frontend contains dedicated route guards such as:

* `ProtectedRoute.jsx`
* `RoleRoute.jsx`
* `ProjectAccessRoute.jsx`

These routes control authentication, role access, and project-level access.

---

# 🏢 Company Management

The company module provides functionality for managing companies within the platform.

### Main capabilities

* Company registration
* Company information management
* Company-related users
* Company-level project management
* Company administration

The backend provides a dedicated:

```text
CompanyController
CompanyService
CompanyRepository
Company
```

architecture for company-related operations.

---

# 👥 Employee Management

Company Heads can manage employees belonging to their company.

The frontend includes:

```text
Employees.jsx
EmployeeProject.jsx
```

The employee module supports viewing employees and accessing project information associated with employees.

Employees are managed within the company rather than through a separate public employee-registration approval workflow.

---

# 📁 Project Management

UniSetuHub contains a complete project-management section.

The project module includes:

```text
Projects.jsx
CreateProject.jsx
ProjectDetails.jsx
ProjectOverview.jsx
ProjectMembers.jsx
ProjectTasks.jsx
ProjectBoard.jsx
ProjectBacklog.jsx
CreateTaskModal.jsx
TaskDetailsModal.jsx
```

These pages separate project creation, project information, members, tasks, board management, backlog management, and task details.

### Project capabilities

* Create projects
* View projects
* View project details
* Manage project members
* Assign existing company employees to projects
* Manage project tasks
* View project overview
* Manage backlog
* Use project board
* View task details
* Create tasks

---

# ✅ Task Management

Tasks are a central part of UniSetuHub's project workflow.

The project section contains:

```text
CreateTaskModal.jsx
ProjectTasks.jsx
ProjectBacklog.jsx
ProjectBoard.jsx
TaskDetailsModal.jsx
```

There is also a dedicated task page:

```text
pages/tasks/Tasks.jsx
```

### Task workflow

```text
Project
   │
   ▼
Project Lead
   │
   ├── Create Task
   │
   ├── Assign Task
   │
   ├── Track Task
   │
   └── Review Completed Task
              │
              ▼
          Employee
              │
              └── Work on Assigned Task
```

The backend contains a dedicated `TaskController`, `TaskService`, `TaskRepository`, `Task` entity, and `TaskStatus` enum.

---

# 📊 Dashboard

The application contains a dedicated dashboard:

```text
pages/dashboard/Dashboard.jsx
```

The dashboard acts as the main workspace after authentication and provides role-dependent access to the application's modules.

---

# 🌐 Landing Pages

The public-facing section contains:

```text
pages/landing/
│
├── Home.jsx
├── About.jsx
├── Features.jsx
└── HowItWorks.jsx
```

These pages introduce UniSetuHub, its features, and how the platform works.

---

# 🔑 Authentication Pages

The authentication module contains:

```text
pages/auth/
│
├── Login.jsx
└── RegisterCompany.jsx
```

The application therefore provides dedicated login and company-registration interfaces.

---

# 🧩 Frontend Architecture

The frontend is organized into reusable React modules.

```text
unisetuhub-frontend/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   │
│   ├── constants/
│   │   └── roles.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CompanyContext.jsx
│   │   ├── MemberContext.jsx
│   │   ├── ProjectContext.jsx
│   │   ├── TaskContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   ├── ProjectLayout.jsx
│   │   └── PublicLayout.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── employees/
│   │   ├── landing/
│   │   ├── projects/
│   │   ├── settings/
│   │   ├── tasks/
│   │   └── teams/
│   │
│   ├── routes/
│   │   ├── ProtectedRoute.jsx
│   │   ├── RoleRoute.jsx
│   │   └── ProjectAccessRoute.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

The repository currently contains dedicated contexts for authentication, companies, members, projects, tasks, and theme state.

---

# 🧠 React Context Architecture

UniSetuHub uses React Context to manage application-wide state.

### `AuthContext.jsx`

Handles authentication-related application state and the current user's role.

### `CompanyContext.jsx`

Manages company-related state.

### `MemberContext.jsx`

Handles employee/member information used across the application.

### `ProjectContext.jsx`

Manages project-related state and project data.

### `TaskContext.jsx`

Handles task-related application state.

### `ThemeContext.jsx`

Provides theme-related state for the application.

This approach avoids passing the same data through multiple levels of React components.

---

# 🧭 Routing Architecture

UniSetuHub separates routing responsibilities into three major route guards.

### Protected Route

```text
ProtectedRoute.jsx
```

Restricts pages that require authentication.

### Role Route

```text
RoleRoute.jsx
```

Restricts pages based on the user's role.

### Project Access Route

```text
ProjectAccessRoute.jsx
```

Controls access to project-specific pages.

This creates multiple layers of access control:

```text
Authentication
      │
      ▼
Protected Route
      │
      ▼
Role Authorization
      │
      ▼
Project Authorization
      │
      ▼
Requested Page
```

---

# 🎨 Shared Components & Layouts

The frontend contains reusable components:

```text
components/
├── Navbar.jsx
└── Footer.jsx
```

and application layouts:

```text
layouts/
├── PublicLayout.jsx
├── DashboardLayout.jsx
└── ProjectLayout.jsx
```

This allows common navigation and page structures to be reused throughout the application.

---

# ☕ Backend Architecture

The backend is developed using **Java 17 and Spring Boot**.

The backend follows a layered architecture:

```text
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Database
```

The main backend packages are:

```text
com.unisetuhub
│
├── config/
├── controller/
├── entity/
├── repository/
├── service/
└── UnisetuhubBackendApplication.java
```

---

# 🌐 REST API Controllers

The backend currently contains:

```text
controller/
│
├── CompanyController.java
├── ProjectController.java
├── TaskController.java
└── UserController.java
```

These controllers expose the API endpoints used by the React frontend for company, project, task, and user operations.

---

# ⚙️ Service Layer

Business logic is separated into dedicated services:

```text
service/
│
├── CompanyService.java
├── ProjectService.java
├── TaskService.java
└── UserService.java
```

This keeps business logic separate from HTTP/API controller logic.

---

# 🗄️ Repository Layer

Database access is organized using Spring Data repositories:

```text
repository/
│
├── CompanyRepository.java
├── ProjectRepository.java
├── TaskRepository.java
└── UserRepository.java
```

---

# 📦 Entity Model

The backend contains the following core entities:

```text
entity/
│
├── Company.java
├── Project.java
├── Task.java
├── TaskStatus.java
└── User.java
```

The application therefore models the major business objects required for company, user, project, and task management.

---

# 🔗 Backend Configuration

The backend also contains:

```text
config/
└── CorsConfig.java
```

This configuration handles Cross-Origin Resource Sharing so that the React frontend can communicate with the Spring Boot backend during development.

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                |
| ------------ | ---------------------- |
| React 19     | User interface         |
| Vite         | Frontend build tool    |
| React Router | Application routing    |
| Axios        | HTTP/API communication |
| Tailwind CSS | Styling                |
| Lucide React | Icons                  |
| JavaScript   | Frontend development   |

These dependencies are defined in the current frontend `package.json`.

---

## Backend

| Technology        | Purpose                      |
| ----------------- | ---------------------------- |
| Java 17           | Backend programming language |
| Spring Boot       | Backend framework            |
| Spring Web MVC    | REST API                     |
| Spring Data JPA   | Database access              |
| Spring Validation | Request validation           |
| MySQL Connector/J | MySQL connectivity           |
| Lombok            | Boilerplate reduction        |
| Maven             | Dependency/build management  |

The backend `pom.xml` currently targets Java 17 and includes Spring Data JPA, validation, Web MVC, MySQL Connector/J, Lombok, DevTools, and testing dependencies.

---

# 🏗️ Complete System Architecture

```text
                    ┌───────────────────────┐
                    │       UniSetuHub      │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │    React Frontend     │
                    │       Vite            │
                    └───────────┬───────────┘
                                │
                         Axios / REST API
                                │
                    ┌───────────▼───────────┐
                    │    Spring Boot API    │
                    │                       │
                    │    Controllers        │
                    │         ↓             │
                    │      Services         │
                    │         ↓             │
                    │     Repositories      │
                    └───────────┬───────────┘
                                │
                         Spring Data JPA
                                │
                    ┌───────────▼───────────┐
                    │        MySQL          │
                    └───────────────────────┘
```

---

# 📂 Project Structure

```text
UniSetuHub/
│
├── unisetuhub-frontend/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── unisetuhub-backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/unisetuhub/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── entity/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       └── UnisetuhubBackendApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Java JDK 17
* Maven or Maven Wrapper
* MySQL
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/pawaprathamr593/UniSetuHub.git
```

```bash
cd UniSetuHub
```

---

# 💻 Frontend Setup

Navigate to the frontend:

```bash
cd unisetuhub-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend uses Vite for development and production builds. The available scripts include:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

# ☕ Backend Setup

Open another terminal.

Navigate to:

```bash
cd unisetuhub-backend
```

Run the Spring Boot application:

### macOS / Linux

```bash
./mvnw spring-boot:run
```

### Windows

```bash
mvnw.cmd spring-boot:run
```

The backend is configured to run on:

```text
http://localhost:8080
```

The current application configuration specifies port `8080`.

---

# 🗄️ MySQL Configuration

Create a MySQL database named:

```text
unisetuhub
```

Configure your local database credentials in:

```text
unisetuhub-backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/unisetuhub?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

> ⚠️ Never commit real database passwords, API keys, tokens, or other secrets to GitHub.

---

# 🔄 Application Workflow

```text
                  Website Admin
                       │
                       ▼
                Company Management
                       │
                       ▼
                  Company Head
                       │
              ┌────────┴────────┐
              ▼                 ▼
        Employees           Projects
                                │
                                ▼
                         Project Lead
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
              Project Members           Tasks
                                            │
                                            ▼
                                         Employee
```

---

# 📋 Main Modules

| Module         | Frontend                                    | Backend                               |
| -------------- | ------------------------------------------- | ------------------------------------- |
| Authentication | `Login.jsx`, `AuthContext.jsx`              | `UserController`, `UserService`       |
| Company        | `RegisterCompany.jsx`, `CompanyContext.jsx` | `CompanyController`, `CompanyService` |
| Employees      | `Employees.jsx`, `EmployeeProject.jsx`      | `UserController`, `UserService`       |
| Projects       | Project pages/context                       | `ProjectController`, `ProjectService` |
| Tasks          | Task/project pages/context                  | `TaskController`, `TaskService`       |
| Authorization  | Route guards                                | Backend API layer                     |
| Dashboard      | `Dashboard.jsx`                             | API data                              |
| Theme          | `ThemeContext.jsx`                          | —                                     |

---

# 🎯 Project Goals

UniSetuHub aims to provide:

* Centralized company management
* Structured employee management
* Project-based collaboration
* Task assignment and tracking
* Role-based access control
* Project-specific access
* Separation of frontend and backend responsibilities
* RESTful communication between client and server
* Scalable layered backend architecture

---

# 🔮 Future Improvements

Possible future enhancements include:

* 🔔 Real-time notifications
* 💬 Project/team chat
* 📧 Email notifications
* 📊 Advanced project analytics
* 📈 Employee performance reports
* 📎 File attachments for tasks
* 🔍 Advanced search and filtering
* 📅 Project calendar
* 🔐 JWT-based authentication
* ☁️ Cloud deployment
* 🐳 Docker support
* ⚙️ CI/CD pipeline
* 🧪 Expanded unit and integration testing

---

# 📸 Screenshots

Screenshots can be added here as the project UI evolves.

Suggested screenshots:

```text
1. Landing Page
2. Login Page
3. Dashboard
4. Employee Management
5. Projects
6. Project Overview
7. Project Board
8. Project Backlog
9. Project Members
10. Task Details
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

# 🧪 Testing

The Spring Boot project contains a test source directory and Spring Boot testing dependencies.

Backend tests can be executed using:

```bash
./mvnw test
```

or on Windows:

```bash
mvnw.cmd test
```

---

# 🤝 Contributing

Contributions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git add .
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

# 👨‍💻 Developer

### Pratham Pawar

Computer Engineering | Full Stack Developer

GitHub:
https://github.com/pawaprathamr593

---

# ⭐ Support

If you find **UniSetuHub** useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is currently intended for educational and portfolio purposes.
