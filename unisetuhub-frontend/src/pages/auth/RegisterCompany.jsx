import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

     

      {/* Login Section */}
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">

          {/* Logo / Heading */}
          <div className="mb-8 text-center">

            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-600/20">
                U
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to UniSetuHub
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Connect teams. Manage work. Build together.
            </p>

          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">

            <div className="mb-7">

              <h2 className="text-xl font-semibold">
                Welcome back 👋
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Sign in to your workspace
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
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
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Remember me
                </span>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.99]"
              >
                Sign In
              </button>

            </form>

            {/* Register */}
            <div className="mt-7 border-t border-slate-200 pt-6 text-center dark:border-slate-800">

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don't have a company account?
              </p>

              <Link
                to="/register-company"
                className="mt-1 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Register your company
              </Link>

            </div>

          </div>

        </div>

      </main>

      

    </div>
  );
}

export default Login;