import {
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}

          <div className="md:col-span-2">

            <Link
              to="/"
              className="flex items-center gap-2"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                W
              </div>

              <span className="text-xl font-bold">
                UniSetuHub
              </span>

            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              A modern project management platform that helps
              teams plan projects, manage tasks, collaborate,
              and deliver work efficiently.
            </p>

            <div className="mt-5 flex gap-3">

            
              <a
                href="mailto:contact@workflow.com"
                className="rounded-lg border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
              >
                <Mail size={17} />
              </a>

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <Link
                to="/features"
                className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Features
              </Link>

              <Link
                to="/how-it-works"
                className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                How It Works
              </Link>

              <Link
                to="/register-company"
                className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Get Started
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <Link
                to="/about"
                className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                About Us
              </Link>

              <Link
                to="/login"
                className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Login
              </Link>

              <Link
                to="/register-company"
                className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Register
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} WorkFlow. All rights reserved.
          </p>

          <p>
            Built for modern teams.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;