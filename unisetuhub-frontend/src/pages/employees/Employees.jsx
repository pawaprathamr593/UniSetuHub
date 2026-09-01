import {
  Mail,
  Plus,
  Search,
  Users,
  X,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useCompany } from "../../context/CompanyContext";

function Employees() {
  /*
   * =========================================================
   * CONTEXTS
   * =========================================================
   */

  const {
    currentUser,
    users,
    addUser,
    deleteUser,
  } = useAuth();

  const {
    getCompanyForUser,
  } = useCompany();

  /*
   * =========================================================
   * STATE
   * =========================================================
   */

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  /*
   * =========================================================
   * CURRENT COMPANY
   * =========================================================
   */

  const company = getCompanyForUser(currentUser);

  const companyId = currentUser?.companyId;

  /*
   * =========================================================
   * COMPANY USERS
   * =========================================================
   *
   * Company Head sees only users belonging
   * to their own company.
   */

  const companyUsers = users.filter((user) => {
    const userCompanyId =
      user.company?.id ||
      user.companyId ||
      null;

    return userCompanyId === companyId;
  });

  /*
   * =========================================================
   * SEARCH
   * =========================================================
   */

  const filteredUsers = companyUsers.filter((user) => {
    const fullName =
      `${user.firstName || ""} ${user.surname || ""}`;

    const searchText =
      search.toLowerCase().trim();

    return (
      fullName.toLowerCase().includes(searchText) ||
      (user.email || "")
        .toLowerCase()
        .includes(searchText) ||
      (user.id || "")
        .toLowerCase()
        .includes(searchText) ||
      (user.role || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  /*
   * =========================================================
   * FORM HANDLER
   * =========================================================
   */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * =========================================================
   * ADD EMPLOYEE
   * =========================================================
   */

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    setError("");

    /*
     * Validation
     */

    if (
      !formData.firstName.trim() ||
      !formData.surname.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError(
        "Please fill all required fields."
      );

      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (!companyId) {
      setError(
        "Company information is missing."
      );

      return;
    }

    /*
     * =====================================================
     * CREATE BACKEND USER
     * =====================================================
     */

    const result = await addUser({
      firstName: formData.firstName.trim(),
      surname: formData.surname.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      companyId,
    });

    /*
     * Backend error
     */

    if (!result?.success) {
      setError(
        result?.message ||
          "Failed to create employee."
      );

      return;
    }

    /*
     * =====================================================
     * SUCCESS
     * =====================================================
     */

    setFormData({
      firstName: "",
      surname: "",
      email: "",
      password: "",
      role: "EMPLOYEE",
    });

    setError("");

    setShowModal(false);

    setShowPassword(false);
  };

  /*
   * =========================================================
   * DELETE USER
   * =========================================================
   */

  const handleDelete = async (user) => {
    /*
     * Do not allow company head to delete themselves.
     */

    if (user.id === currentUser?.id) {
      return;
    }

    /*
     * Safety check:
     * Company Head can delete only users
     * from their own company.
     */

    const userCompanyId =
      user.company?.id ||
      user.companyId ||
      null;

    if (userCompanyId !== companyId) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to remove ${user.firstName} ${user.surname}?`
    );

    if (!confirmed) {
      return;
    }

    const result = await deleteUser(user.id);

    if (!result?.success) {
      alert(
        result?.message ||
          "Failed to delete employee."
      );
    }
  };

  /*
   * =========================================================
   * CLOSE MODAL
   * =========================================================
   */

  const closeModal = () => {
    setShowModal(false);

    setError("");

    setFormData({
      firstName: "",
      surname: "",
      email: "",
      password: "",
      role: "EMPLOYEE",
    });

    setShowPassword(false);
  };

  /*
   * =========================================================
   * ROLE LABEL
   * =========================================================
   */

  const getRoleLabel = (role) => {
    switch (role) {
      case "COMPANY_HEAD":
        return "Company Head";

      case "PROJECT_LEAD":
        return "Project Lead";

      case "EMPLOYEE":
        return "Employee";

      default:
        return role;
    }
  };

  /*
   * =========================================================
   * ROLE STYLE
   * =========================================================
   */

  const getRoleStyle = (role) => {
    switch (role) {
      case "COMPANY_HEAD":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";

      case "PROJECT_LEAD":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  /*
   * =========================================================
   * INITIALS
   * =========================================================
   */

  const getInitials = (user) => {
    const first =
      user.firstName?.charAt(0) || "";

    const last =
      user.surname?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Users size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Employees
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage employees in your company.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Employee
        </button>

      </div>

      {/* =====================================================
          COMPANY INFORMATION
      ===================================================== */}

      {company && (
        <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4 dark:border-indigo-500/10 dark:bg-indigo-500/5">

          <p className="text-xs font-medium uppercase tracking-wider text-indigo-500">
            Company
          </p>

          <p className="mt-1 text-sm font-semibold text-indigo-700 dark:text-indigo-400">
            {company.name}
          </p>

        </div>
      )}

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mb-6">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search employees..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-600"
          />

        </div>

      </div>

      {/* =====================================================
          EMPLOYEE TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        {/* Table Header */}

        <div className="hidden grid-cols-5 border-b border-slate-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800 md:grid">

          <span>Name</span>

          <span>Email</span>

          <span>Role</span>

          <span>Status</span>

          <span className="text-right">
            Action
          </span>

        </div>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {filteredUsers.length === 0 && (
          <div className="px-6 py-12 text-center">

            <Users
              size={35}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-medium text-slate-500">
              No employees found.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add an employee to your company.
            </p>

          </div>
        )}

        {/* =================================================
            USERS
        ================================================= */}

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="grid gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0 dark:border-slate-800 md:grid-cols-5 md:items-center"
          >

            {/* Name */}

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {getInitials(user)}
              </div>

              <div>

                <p className="text-sm font-medium">
                  {user.firstName}{" "}
                  {user.surname}
                </p>

                <p className="text-xs text-slate-400">
                  Employee ID: {user.id}
                </p>

              </div>

            </div>

            {/* Email */}

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

              <Mail size={15} />

              {user.email}

            </div>

            {/* Role */}

            <div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getRoleStyle(
                  user.role
                )}`}
              >
                {getRoleLabel(user.role)}
              </span>

            </div>

            {/* Status */}

            <div>

              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                Active
              </span>

            </div>

            {/* Action */}

            <div className="flex justify-start md:justify-end">

              {user.id !== currentUser?.id && (
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(user)
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                  title="Remove employee"
                >
                  <Trash2 size={16} />
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* =====================================================
          ADD EMPLOYEE MODAL
      ===================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">

              <div>

                <h2 className="text-lg font-bold">
                  Add Employee
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Create an account for a new team member.
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={19} />
              </button>

            </div>

            {/* Modal Body */}

            <form
              onSubmit={handleAddEmployee}
              className="space-y-5 p-6"
            >

              {/* First Name + Surname */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Surname
                  </label>

                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Surname"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="employee@company.com"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                />

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* Role */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                >

                  <option value="EMPLOYEE">
                    Employee
                  </option>

                  <option value="PROJECT_LEAD">
                    Project Lead
                  </option>

                </select>

              </div>

              {/* Company */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Company
                </label>

                <input
                  type="text"
                  value={
                    company?.name ||
                    "No company"
                  }
                  disabled
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400"
                />

              </div>

              {/* Error */}

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  <Plus size={17} />
                  Add Employee
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Employees;