import {
  Mail,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

      {/* =====================================================
          FOOTER CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16 xl:px-12 2xl:px-16">

        {/* =================================================
            MAIN FOOTER
        ================================================= */}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14 xl:gap-20">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="sm:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <img
                src={logo}
                alt="UniSetuHub"
                className="h-9 w-9 shrink-0 rounded-lg object-contain"
              />

              <span className="text-xl font-bold tracking-tight sm:text-2xl">
                UniSetuHub
              </span>
            </Link>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 lg:text-base dark:text-slate-400">
              A modern project management platform that helps
              teams plan projects, manage tasks, collaborate,
              and deliver work efficiently from one connected
              workspace.
            </p>

            {/* Contact */}

            <a
              href="mailto:contact@unisetuhub.com"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            >
              <Mail size={16} />

              contact@unisetuhub.com
            </a>

          </div>


          {/* =================================================
              PRODUCT
          ================================================= */}

          <div>

            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Product
            </h3>

            <nav className="mt-4 flex flex-col gap-3">

              <Link
                to="/features"
                className="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Features
              </Link>

              <Link
                to="/how-it-works"
                className="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                How It Works
              </Link>

              <Link
                to="/register-company"
                className="group inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Get Started

                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

            </nav>

          </div>


          {/* =================================================
              COMPANY
          ================================================= */}

          <div>

            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Company
            </h3>

            <nav className="mt-4 flex flex-col gap-3">

              <Link
                to="/about"
                className="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                About Us
              </Link>

              <Link
                to="/login"
                className="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Login
              </Link>

              <Link
                to="/register-company"
                className="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                Register
              </Link>

            </nav>

          </div>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm dark:text-slate-400">
            © {currentYear} UniSetuHub. All rights reserved.
          </p>

          <p className="text-center text-xs text-slate-400 sm:text-right sm:text-sm">
            Built for modern teams.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;