import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.message);
        return;
      }

      /*
       * Successfully logged in.
       *
       * Current behavior:
       * All users go to dashboard.
       *
       * Later we can redirect based on role.
       */

      navigate("/dashboard");

    } catch (error) {

      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Make sure Spring Boot is running."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      {/* =================================================
          LOGIN SECTION
      ================================================= */}

      <main className="relative overflow-hidden">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        </div>

        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="hidden lg:block">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">

              <Sparkles size={15} />

              Welcome back to UniSetuHub

            </div>

            <h1 className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight">

              Manage your work.

              <span className="block text-indigo-600 dark:text-indigo-400">
                Grow together.
              </span>

            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-400">

              Sign in to your UniSetuHub workspace and keep
              your projects, tasks, teams, and progress organized
              in one place.

            </p>

            {/* Benefits */}

            <div className="mt-10 space-y-5">

              <Feature
                title="Everything in one workspace"
                text="Manage projects, tasks and teams from a single platform."
              />

              <Feature
                title="Stay aligned with your team"
                text="Know who is working on what and track progress easily."
              />

              <Feature
                title="Built for modern teams"
                text="A simple and focused workspace without unnecessary complexity."
              />

            </div>

          </div>

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <div className="mx-auto w-full max-w-md">

            {/* Mobile heading */}

            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-600/20">
                U
              </div>

              <h1 className="text-3xl font-bold">
                UniSetuHub
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Connect teams. Manage work. Build together.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8">

              {/* Card Header */}

              <div className="mb-7">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                  <ShieldCheck size={21} />

                </div>

                <h2 className="text-2xl font-bold">
                  Welcome back 👋
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Sign in to continue to your workspace.
                </p>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Email address
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />

                </div>

                {/* Password */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-sm font-medium">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                    >

                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}

                    </button>

                  </div>

                </div>

                {/* Remember */}

                <div className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700"
                  />

                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Remember me
                  </span>

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
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? "Signing in..." : "Sign In"}

                  {!loading && (
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}

                </button>

              </form>

              {/* Register */}

              <div className="mt-7 border-t border-slate-200 pt-6 text-center dark:border-slate-800">

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Don't have a company account?
                </p>

                <Link
                  to="/register-company"
                  className="mt-1 inline-block text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
                >
                  Register your company
                </Link>

              </div>

            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              Secure workspace access powered by UniSetuHub
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

/*
 * =========================================================
 * FEATURE
 * =========================================================
 */

function Feature({ title, text }) {
  return (
    <div className="flex gap-4">

      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

        <ShieldCheck size={17} />

      </div>

      <div>

        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {text}
        </p>

      </div>

    </div>
  );
}

export default Login;