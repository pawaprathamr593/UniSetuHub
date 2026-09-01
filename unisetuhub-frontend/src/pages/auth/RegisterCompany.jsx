import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  ShieldCheck,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RegisterCompany() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const result = await register({
      companyName: form.companyName,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      password: form.password,
      role: "COMPANY_HEAD",
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <main className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* LEFT CONTENT */}
          <div className="hidden lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Building2 size={15} />
              Create your company workspace
            </div>

            <h1 className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight">
              Bring your team.
              <span className="block text-indigo-600 dark:text-indigo-400">
                Build together.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-400">
              Create your UniSetuHub company workspace and manage your
              projects, employees, tasks and collaboration from one place.
            </p>

            <div className="mt-10 space-y-5">
              <Feature
                title="Centralized workspace"
                text="Keep your company's projects, tasks and teams organized."
              />

              <Feature
                title="Manage your team"
                text="Add employees and project leads to your workspace."
              />

              <Feature
                title="Track work efficiently"
                text="Assign tasks, manage projects and monitor progress."
              />
            </div>
          </div>

          {/* REGISTER CARD */}
          <div className="mx-auto w-full max-w-md">
            {/* Mobile heading */}
            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-600/20">
                U
              </div>

              <h1 className="text-3xl font-bold">UniSetuHub</h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Connect teams. Manage work. Build together.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8">
              {/* Header */}
              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Building2 size={21} />
                </div>

                <h2 className="text-2xl font-bold">
                  Register your company
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Create your company workspace to get started.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Company name
                  </label>

                  <input
                    type="text"
                    name="companyName"
                    required
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Your Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Your name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Company email
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Company address
                  </label>

                  <textarea
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter company address"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.99]"
                >
                  Create Company

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>

              {/* Login */}
              <div className="mt-7 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Already have a company account?
                </p>

                <Link
                  to="/login"
                  className="mt-1 inline-block text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
                >
                  Sign in
                </Link>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              Secure company registration powered by UniSetuHub
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <ShieldCheck size={17} />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default RegisterCompany;