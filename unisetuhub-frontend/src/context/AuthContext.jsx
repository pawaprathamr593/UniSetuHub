import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ROLES } from "../constants/roles";

const AuthContext = createContext();



const API_URL = "http://localhost:8080";



/*
 * =========================================================
 * WEBSITE ADMIN
 * =========================================================
 */

const initialAdmin = {
  id: "ADMIN001",
  firstName: "System",
  surname: "Admin",
  name: "System Admin",
  email: "admin@unisetuhub.com",
  password: "admin123",
  role: ROLES.WEBSITE_ADMIN,
  companyId: null,
  company: null,
  projectIds: [],
};

/*
 * =========================================================
 * AUTH PROVIDER
 * =========================================================
 */

export function AuthProvider({ children }) {
  /*
   * =======================================================
   * USERS FROM BACKEND
   * =======================================================
   */

  const [users, setUsers] = useState([]);

  /*
   * =======================================================
   * CURRENT USER
   * =======================================================
   */

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(
      "unisetuhub-current-user"
    );

    if (!savedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      return {
        ...parsedUser,
        role: String(parsedUser?.role || "")
          .trim()
          .toUpperCase(),
      };
    } catch (error) {
      console.error(
        "Failed to restore logged-in user:",
        error
      );

      localStorage.removeItem(
        "unisetuhub-current-user"
      );

      return null;
    }
  });

  /*
   * =========================================================
   * GET ALL USERS FROM BACKEND
   * =========================================================
   */

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${API_URL}/users`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch users."
        );
      }

      const data = await response.json();

      setUsers(
        Array.isArray(data)
          ? data
          : []
      );

      return Array.isArray(data)
        ? data
        : [];
    } catch (error) {
      console.error(
        "Fetch users error:",
        error
      );

      return [];
    }
  };

  /*
   * =========================================================
   * FETCH USERS WHEN AUTH PROVIDER LOADS
   * =========================================================
   */

  useEffect(() => {
    fetchUsers();
  }, []);

  /*
   * =========================================================
   * GET USER NAME
   * =========================================================
   */

  const getFullName = (user) => {
    if (!user) {
      return "";
    }

    if (user.name) {
      return user.name;
    }

    return `${user.firstName || ""} ${user.surname || ""
      }`.trim();
  };

  /*
   * =========================================================
   * GET USER PROJECT IDS
   * =========================================================
   *
   * Backend may return projects in different forms:
   *
   * user.projectIds
   *
   * OR
   *
   * user.projects
   *
   * This handles both.
   */

  const getProjectIdsFromUser = (user) => {
    if (!user) {
      return [];
    }

    /*
     * Existing projectIds
     */

    if (
      Array.isArray(user.projectIds) &&
      user.projectIds.length > 0
    ) {
      return user.projectIds
        .map((project) => {
          if (
            typeof project === "string"
          ) {
            return project;
          }

          return (
            project?.id ||
            project?.code ||
            null
          );
        })
        .filter(Boolean);
    }

    /*
     * Backend projects relationship
     */

    if (
      Array.isArray(user.projects)
    ) {
      return user.projects
        .map((project) => {
          if (
            typeof project === "string"
          ) {
            return project;
          }

          return (
            project?.id ||
            project?.code ||
            null
          );
        })
        .filter(Boolean);
    }

    return [];
  };

  /*
   * =========================================================
   * SAVE CURRENT USER SESSION
   * =========================================================
   */

  const saveUserSession = (user) => {
    const projectIds =
      getProjectIdsFromUser(user);

    const company =
      user.company ||
      null;

    const companyId =
      company?.id ||
      user.companyId ||
      null;

    const authenticatedUser = {
      id: user.id,

      firstName:
        user.firstName || "",

      surname:
        user.surname || "",

      name:
        getFullName(user),

      email:
        user.email || "",

      role:
        String(user.role || "")
          .trim()
          .toUpperCase(),

      /*
       * Keep complete company object.
       */

      company,

      /*
       * Keep company ID separately.
       */

      companyId,

      /*
       * Keep project IDs.
       */

      projectIds,

      /*
       * Keep backend projects too.
       *
       * Useful if Spring Boot returns them.
       */

      projects:
        Array.isArray(user.projects)
          ? user.projects
          : [],
    };

    console.log(
      "========== SAVING USER SESSION =========="
    );

    console.log(
      "Authenticated User:",
      authenticatedUser
    );

    console.log(
      "User ID:",
      authenticatedUser.id
    );

    console.log(
      "User Role:",
      authenticatedUser.role
    );

    console.log(
      "Company ID:",
      authenticatedUser.companyId
    );

    console.log(
      "Project IDs:",
      authenticatedUser.projectIds
    );

    setCurrentUser(
      authenticatedUser
    );

    localStorage.setItem(
      "unisetuhub-current-user",
      JSON.stringify(
        authenticatedUser
      )
    );

    return authenticatedUser;
  };

  /*
   * =========================================================
   * REGISTER COMPANY
   * =========================================================
   */

  const register = async ({
    companyName,
    name,
    email,
    phone,
    address,
    password,
    role,
  }) => {
    try {
      /*
       * Generate IDs
       */

      const companyId =
        crypto.randomUUID();

      const userId =
        crypto.randomUUID();

      /*
       * =================================================
       * STEP 1: CREATE COMPANY
       * =================================================
       */

      const companyResponse =
        await fetch(
          `${API_URL}/companies`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: companyId,

              name: companyName,

              email,

              phone,

              address,

              status: "ACTIVE",
            }),
          }
        );

      if (!companyResponse.ok) {
        let message =
          "Failed to create company.";

        try {
          const data =
            await companyResponse.json();

          if (
            typeof data ===
            "string"
          ) {
            message = data;
          }

          if (data?.message) {
            message =
              data.message;
          }
        } catch {
          // Ignore invalid response
        }

        return {
          success: false,
          message,
        };
      }

      const createdCompany =
        await companyResponse.json();

      const actualCompanyId =
        createdCompany?.id ||
        companyId;

      /*
       * =================================================
       * STEP 2: SPLIT USER NAME
       * =================================================
       */

      const nameParts =
        name
          .trim()
          .split(/\s+/);

      const firstName =
        nameParts.shift() || "";

      const surname =
        nameParts.join(" ");

      /*
       * =================================================
       * STEP 3: CREATE COMPANY HEAD
       * =================================================
       */

      const userResponse =
        await fetch(
          `${API_URL}/users`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: userId,

              firstName,

              surname,

              email,

              password,

              phone,

              address,

              role:
                role ||
                ROLES.COMPANY_HEAD,

              company: {
                id: actualCompanyId,
              },
            }),
          }
        );

      if (!userResponse.ok) {
        let message =
          "Company was created, but user registration failed.";

        try {
          const data =
            await userResponse.json();

          if (
            typeof data ===
            "string"
          ) {
            message = data;
          }

          if (data?.message) {
            message =
              data.message;
          }
        } catch {
          // Ignore invalid response
        }

        return {
          success: false,
          message,
        };
      }

      const createdUser =
        await userResponse.json();

      /*
       * Refresh backend users
       */

      await fetchUsers();

      /*
       * =================================================
       * STEP 4: LOGIN AUTOMATICALLY
       * =================================================
       */

      const authenticatedUser =
        saveUserSession(
          createdUser
        );

      return {
        success: true,
        user: authenticatedUser,
      };
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      return {
        success: false,

        message:
          "Unable to connect to the server. Make sure Spring Boot is running.",
      };
    }
  };

  /*
   * =========================================================
   * ADD USER
   * =========================================================
   */

  const addUser = async ({
    firstName,
    surname,
    email,
    password,
    phone = "",
    address = "",
    role = ROLES.EMPLOYEE,
    companyId,
  }) => {
    try {
      /*
       * Validation
       */

      if (
        !firstName?.trim() ||
        !surname?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !companyId
      ) {
        return {
          success: false,

          message:
            "Please fill all required fields.",
        };
      }

      /*
       * =================================================
       * CREATE USER
       * =================================================
       */

      const response =
        await fetch(
          `${API_URL}/users`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id:
                crypto.randomUUID(),

              firstName:
                firstName.trim(),

              surname:
                surname.trim(),

              email:
                email
                  .trim()
                  .toLowerCase(),

              password,

              phone,

              address,

              role,

              company: {
                id: companyId,
              },
            }),
          }
        );

      /*
       * Backend error
       */

      if (!response.ok) {
        let message =
          "Failed to create user.";

        try {
          const data =
            await response.json();

          if (
            typeof data ===
            "string"
          ) {
            message = data;
          }

          if (data?.message) {
            message =
              data.message;
          }
        } catch {
          // Ignore invalid response
        }

        return {
          success: false,
          message,
        };
      }

      /*
       * Backend created user
       */

      const createdUser =
        await response.json();

      /*
       * Refresh users
       */

      await fetchUsers();

      return {
        success: true,
        user: createdUser,
      };
    } catch (error) {
      console.error(
        "Add user error:",
        error
      );

      return {
        success: false,

        message:
          "Unable to connect to the server.",
      };
    }
  };

  /*
   * =========================================================
   * DELETE USER
   * =========================================================
   */

  const deleteUser = async (id) => {
    try {
      const response =
        await fetch(
          `${API_URL}/users/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        let message =
          "Failed to delete user.";

        try {
          const data =
            await response.json();

          message =
            data?.message ||
            data?.error ||
            message;
        } catch {
          // Ignore invalid response
        }

        return {
          success: false,
          message,
        };
      }

      /*
       * Remove from frontend state
       */

      setUsers((prev) =>
        prev.filter(
          (user) =>
            String(user.id) !==
            String(id)
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );

      return {
        success: false,

        message:
          "Unable to connect to the server.",
      };
    }
  };

  /*
   * =========================================================
   * LOGIN
   * =========================================================
   */

  const login = async (
    email,
    password
  ) => {
    try {
      const cleanEmail =
        email
          ?.trim()
          .toLowerCase();

      console.log(
        "========== LOGIN =========="
      );

      console.log(
        "Email:",
        cleanEmail
      );

      /*
       * =================================================
       * VALIDATION
       * =================================================
       */

      if (
        !cleanEmail ||
        !password
      ) {
        return {
          success: false,

          message:
            "Email and password are required.",
        };
      }

      /*
       * =================================================
       * WEBSITE ADMIN
       * =================================================
       */

      if (
        initialAdmin.email.toLowerCase() ===
        cleanEmail &&
        initialAdmin.password ===
        password
      ) {
        const authenticatedUser = {
          id:
            initialAdmin.id,

          firstName:
            initialAdmin.firstName,

          surname:
            initialAdmin.surname,

          name:
            initialAdmin.name,

          email:
            initialAdmin.email,

          role:
            initialAdmin.role,

          company:
            null,

          companyId:
            null,

          projectIds:
            [],
        };

        setCurrentUser(
          authenticatedUser
        );

        localStorage.setItem(
          "unisetuhub-current-user",
          JSON.stringify(
            authenticatedUser
          )
        );

        console.log(
          "Website Admin login successful."
        );

        return {
          success: true,
          user: authenticatedUser,
        };
      }

      /*
       * =================================================
       * BACKEND LOGIN
       * =================================================
       */

      console.log(
        "Calling:",
        `${API_URL}/users/login`
      );

      const response =
        await fetch(
          `${API_URL}/users/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email: cleanEmail,

              password,
            }),
          }
        );

      /*
       * =================================================
       * READ RESPONSE
       * =================================================
       *
       * Read as text first so that both JSON
       * and plain-text Spring Boot errors work.
       */

      const responseText =
        await response.text();

      console.log(
        "Login HTTP status:",
        response.status
      );

      console.log(
        "Login backend response:",
        responseText
      );

      /*
       * =================================================
       * LOGIN FAILED
       * =================================================
       */

      if (!response.ok) {
        let message =
          "Invalid email or password.";

        try {
          const errorData =
            JSON.parse(
              responseText
            );

          message =
            errorData?.message ||
            errorData?.error ||
            responseText ||
            message;
        } catch {
          if (responseText) {
            message =
              responseText;
          }
        }

        console.error(
          "Backend login failed:",
          message
        );

        return {
          success: false,
          message,
        };
      }

      /*
       * =================================================
       * PARSE USER
       * =================================================
       */

      let user;

      try {
        user =
          JSON.parse(
            responseText
          );
      } catch (error) {
        console.error(
          "Invalid login response:",
          error
        );

        return {
          success: false,

          message:
            "Backend returned an invalid user response.",
        };
      }

      console.log(
        "LOGIN USER FROM BACKEND:",
        user
      );

      /*
       * =================================================
       * SAVE SESSION
       * =================================================
       */

      const authenticatedUser =
        saveUserSession(
          user
        );

      /*
       * =================================================
       * REFRESH USERS
       * =================================================
       */

      await fetchUsers();

      return {
        success: true,

        user:
          authenticatedUser,
      };
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      return {
        success: false,

        message:
          "Unable to connect to the server. Make sure Spring Boot is running.",
      };
    }
  };

  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */

  const logout = () => {
    setCurrentUser(null);

    localStorage.removeItem(
      "unisetuhub-current-user"
    );
  };

  /*
   * =========================================================
   * ROLE HELPERS
   * =========================================================
   */

  const isWebsiteAdmin =
    currentUser?.role ===
    ROLES.WEBSITE_ADMIN;

  const isCompanyHead =
    currentUser?.role ===
    ROLES.COMPANY_HEAD;

  const isProjectLead =
    currentUser?.role ===
    ROLES.PROJECT_LEAD;

  const isEmployee =
    currentUser?.role ===
    ROLES.EMPLOYEE;

  /*
   * =========================================================
   * PROJECT ACCESS
   * =========================================================
   */

  const hasProjectAccess = (
    projectId,
    projectCompanyId = null
  ) => {
    if (
      !currentUser ||
      !projectId
    ) {
      return false;
    }

    const normalizedProjectId =
      String(projectId)
        .trim()
        .toUpperCase();

    /*
     * =======================================================
     * WEBSITE ADMIN
     * =======================================================
     */

    if (isWebsiteAdmin) {
      return true;
    }

    /*
     * =======================================================
     * COMPANY HEAD
     * =======================================================
     */

    if (isCompanyHead) {
      if (!projectCompanyId) {
        return true;
      }

      return (
        String(
          currentUser.companyId
        ).toUpperCase() ===
        String(
          projectCompanyId
        ).toUpperCase()
      );
    }

    /*
     * =======================================================
     * PROJECT LEAD / EMPLOYEE
     * =======================================================
     */

    if (
      isProjectLead ||
      isEmployee
    ) {
      const projectIds =
        Array.isArray(
          currentUser.projectIds
        )
          ? currentUser.projectIds
          : [];

      return projectIds.some(
        (id) =>
          String(id)
            .trim()
            .toUpperCase() ===
          normalizedProjectId
      );
    }

    return false;
  };

  /*
   * =========================================================
   * USER COMPANY
   * =========================================================
   */

  const getUserCompanyId = () => {
    return (
      currentUser?.companyId ||
      currentUser?.company?.id ||
      null
    );
  };

  /*
   * =========================================================
   * USER PROJECTS
   * =========================================================
   */

  const getUserProjectIds = () => {
    return Array.isArray(
      currentUser?.projectIds
    )
      ? currentUser.projectIds
      : [];
  };

  /*
   * =========================================================
   * CURRENT USER NAME
   * =========================================================
   */

  const getCurrentUserFullName = () => {
    if (!currentUser) {
      return "";
    }

    return (
      currentUser.name ||
      `${currentUser.firstName || ""} ${currentUser.surname || ""
        }`.trim()
    );
  };

  /*
   * =========================================================
   * CONTEXT
   * =========================================================
   */

  return (
    <AuthContext.Provider
      value={{
        /*
         * Admin
         */

        admin:
          initialAdmin,

        /*
         * REAL BACKEND USERS
         */

        users,

        fetchUsers,

        /*
         * Current session
         */

        currentUser,

        isAuthenticated:
          !!currentUser,

        /*
         * Authentication
         */

        register,

        login,

        logout,

        /*
         * User management
         */

        addUser,

        deleteUser,

        /*
         * Roles
         */

        isWebsiteAdmin,

        isCompanyHead,

        isProjectLead,

        isEmployee,

        /*
         * Access helpers
         */

        hasProjectAccess,

        getUserCompanyId,

        getUserProjectIds,

        getCurrentUserFullName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
 * =========================================================
 * USE AUTH HOOK
 * =========================================================
 */

export function useAuth() {
  return useContext(
    AuthContext
  );
}