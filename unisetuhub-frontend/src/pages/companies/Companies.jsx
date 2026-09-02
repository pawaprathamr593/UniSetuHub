import {
  Building2,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  Users,
  XCircle,
  MoreVertical,
  RefreshCw,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useCompanies } from "../../context/CompanyContext";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";

function Companies() {
  const { currentUser } = useAuth();

  const {
    companies = [],
    loading,
    error,
    fetchCompanies,
  } = useCompanies();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [openMenu, setOpenMenu] =
    useState(null);

  /*
   * =========================================================
   * ACCESS
   * =========================================================
   */

  if (
    currentUser?.role !==
    ROLES.WEBSITE_ADMIN
  ) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <ShieldCheck
          size={36}
          className="mx-auto text-slate-400"
        />

        <h2 className="mt-3 text-lg font-semibold">
          Access Denied
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Only the Website Admin can manage
          companies.
        </p>
      </div>
    );
  }

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  const normalizeStatus = (status) => {
    return String(
      status || "ACTIVE"
    ).toUpperCase();
  };

  const getStatusLabel = (status) => {
    const normalized =
      normalizeStatus(status);

    switch (normalized) {
      case "ACTIVE":
        return "Active";

      case "PENDING":
        return "Pending";

      case "REJECTED":
        return "Rejected";

      case "SUSPENDED":
        return "Suspended";

      default:
        return normalized;
    }
  };

  const getCompanyInitials = (
    name = ""
  ) => {
    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length >= 2) {
      return `${words[0][0]}${
        words[words.length - 1][0]
      }`.toUpperCase();
    }

    return (
      words[0]
        ?.slice(0, 2)
        .toUpperCase() || "CO"
    );
  };

  const getHeadName = (company) => {
    const head =
      company?.companyHead ||
      company?.head ||
      company?.owner ||
      null;

    if (!head) {
      return "Not assigned";
    }

    if (head?.name) {
      return head.name;
    }

    return `${head?.firstName || ""} ${
      head?.surname || ""
    }`.trim() || "Not assigned";
  };

  const getMemberCount = (company) => {
    return (
      company?.memberCount ??
      company?.employeesCount ??
      company?.employees?.length ??
      company?.users?.length ??
      company?.members?.length ??
      0
    );
  };

  const getProjectCount = (company) => {
    return (
      company?.projectCount ??
      company?.projects?.length ??
      0
    );
  };

  /*
   * =========================================================
   * FILTERED COMPANIES
   * =========================================================
   */

  const filteredCompanies =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return companies.filter(
        (company) => {
          const companyName =
            String(
              company?.name || ""
            ).toLowerCase();

          const companyEmail =
            String(
              company?.email || ""
            ).toLowerCase();

          const companyId =
            String(
              company?.id || ""
            ).toLowerCase();

          const matchesSearch =
            !query ||
            companyName.includes(query) ||
            companyEmail.includes(query) ||
            companyId.includes(query);

          const companyStatus =
            normalizeStatus(
              company?.status
            );

          const matchesStatus =
            statusFilter === "ALL" ||
            companyStatus ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      companies,
      search,
      statusFilter,
    ]);

  /*
   * =========================================================
   * STATISTICS
   * =========================================================
   */

  const totalCompanies =
    companies.length;

  const activeCompanies =
    companies.filter(
      (company) =>
        normalizeStatus(
          company?.status
        ) === "ACTIVE"
    ).length;

  const pendingCompanies =
    companies.filter(
      (company) =>
        normalizeStatus(
          company?.status
        ) === "PENDING"
    ).length;

  const rejectedCompanies =
    companies.filter(
      (company) =>
        normalizeStatus(
          company?.status
        ) === "REJECTED"
    ).length;

  /*
   * =========================================================
   * STAT CARD
   * =========================================================
   */

  const StatCard = ({
    icon: Icon,
    title,
    value,
    description,
  }) => {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {title}
            </p>

            <p className="mt-2 text-2xl font-bold">
              {value}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Icon size={19} />
          </div>

        </div>

      </div>
    );
  };

  /*
   * =========================================================
   * STATUS BADGE
   * =========================================================
   */

  const StatusBadge = ({
    status,
  }) => {
    const normalized =
      normalizeStatus(status);

    if (normalized === "PENDING") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          <Clock3 size={12} />
          Pending
        </span>
      );
    }

    if (normalized === "REJECTED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
          <XCircle size={12} />
          Rejected
        </span>
      );
    }

    if (normalized === "SUSPENDED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
          <XCircle size={12} />
          Suspended
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
        <CheckCircle2 size={12} />
        Active
      </span>
    );
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Building2 size={22} />
            </div>

            <div>

              <h1 className="text-2xl font-bold">
                Companies
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage all companies registered
                on UniSetuHub.
              </p>

            </div>

          </div>

        </div>

        <button
          type="button"
          onClick={fetchCompanies}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <RefreshCw
            size={16}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={Building2}
          title="Total Companies"
          value={totalCompanies}
          description="All registered companies"
        />

        <StatCard
          icon={CheckCircle2}
          title="Active"
          value={activeCompanies}
          description="Currently active"
        />

        <StatCard
          icon={Clock3}
          title="Pending"
          value={pendingCompanies}
          description="Awaiting review"
        />

        <StatCard
          icon={XCircle}
          title="Rejected"
          value={rejectedCompanies}
          description="Registration rejected"
        />

      </div>

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="border-b border-slate-200 p-4 dark:border-slate-800">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search companies..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950"
              />

            </div>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            >
              <option value="ALL">
                All Status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="REJECTED">
                Rejected
              </option>

              <option value="SUSPENDED">
                Suspended
              </option>
            </select>

          </div>

        </div>

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <div className="flex items-center justify-center px-6 py-16">

            <RefreshCw
              size={24}
              className="animate-spin text-indigo-500"
            />

          </div>
        )}

        {/* ===================================================
            EMPTY
        =================================================== */}

        {!loading &&
          filteredCompanies.length ===
            0 && (
            <div className="px-6 py-16 text-center">

              <Building2
                size={36}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-3 text-base font-semibold">
                No companies found
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or
                status filter.
              </p>

            </div>
          )}

        {/* ===================================================
            TABLE
        =================================================== */}

        {!loading &&
          filteredCompanies.length >
            0 && (
            <div className="overflow-x-auto">

              <table className="min-w-full text-left">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Company
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Company Head
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Members
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Projects
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredCompanies.map(
                    (company) => {

                      const companyName =
                        company?.name ||
                        "Unnamed Company";

                      const memberCount =
                        getMemberCount(
                          company
                        );

                      const projectCount =
                        getProjectCount(
                          company
                        );

                      const headName =
                        getHeadName(
                          company
                        );

                      const companyInitials =
                        getCompanyInitials(
                          companyName
                        );

                      const isMenuOpen =
                        openMenu ===
                        company?.id;

                      return (
                        <tr
                          key={
                            company?.id
                          }
                          className="border-b border-slate-100 transition hover:bg-slate-50 last:border-b-0 dark:border-slate-800 dark:hover:bg-slate-800/40"
                        >

                          {/* Company */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                {
                                  companyInitials
                                }
                              </div>

                              <div className="min-w-0">

                                <p className="truncate text-sm font-semibold">
                                  {
                                    companyName
                                  }
                                </p>

                                <p className="truncate text-xs text-slate-400">
                                  ID:{" "}
                                  {
                                    company?.id ||
                                    "—"
                                  }
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* Company Head */}

                          <td className="px-5 py-4">

                            <div>

                              <p className="text-sm font-medium">
                                {headName}
                              </p>

                              {company?.email && (
                                <p className="text-xs text-slate-400">
                                  {
                                    company.email
                                  }
                                </p>
                              )}

                            </div>

                          </td>

                          {/* Members */}

                          <td className="px-5 py-4 text-center">

                            <div className="inline-flex items-center gap-1.5 text-sm font-medium">

                              <Users
                                size={15}
                                className="text-slate-400"
                              />

                              {memberCount}

                            </div>

                          </td>

                          {/* Projects */}

                          <td className="px-5 py-4 text-center">

                            <span className="text-sm font-medium">
                              {
                                projectCount
                              }
                            </span>

                          </td>

                          {/* Status */}

                          <td className="px-5 py-4">

                            <StatusBadge
                              status={
                                company?.status
                              }
                            />

                          </td>

                          {/* Action */}

                          <td className="relative px-5 py-4 text-right">

                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenu(
                                  isMenuOpen
                                    ? null
                                    : company?.id
                                )
                              }
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            >
                              <MoreVertical
                                size={18}
                              />
                            </button>

                            {isMenuOpen && (
                              <div className="absolute right-5 top-14 z-20 w-44 rounded-lg border border-slate-200 bg-white p-1 text-left shadow-lg dark:border-slate-700 dark:bg-slate-900">

                                <button
                                  type="button"
                                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                                  onClick={() =>
                                    setOpenMenu(
                                      null
                                    )
                                  }
                                >
                                  View Company
                                </button>

                                <button
                                  type="button"
                                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                                  onClick={() =>
                                    setOpenMenu(
                                      null
                                    )
                                  }
                                >
                                  View Employees
                                </button>

                                <button
                                  type="button"
                                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                                  onClick={() =>
                                    setOpenMenu(
                                      null
                                    )
                                  }
                                >
                                  View Projects
                                </button>

                              </div>
                            )}

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

      </div>

    </div>
  );
}

export default Companies;

