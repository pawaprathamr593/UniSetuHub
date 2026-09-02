import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/logo.png";

import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const ThemeIcon = () => {
    if (theme === "dark") {
      return <Moon size={18} />;
    }

    if (theme === "system") {
      return <Monitor size={18} />;
    }

    return <Sun size={18} />;
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  /*
   * =========================================================
   * DESKTOP NAV LINK
   * =========================================================
   */

  const navClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-indigo-600 dark:text-indigo-400"
        : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
    }

    after:pointer-events-none
    after:absolute
    after:-bottom-1.5
    after:left-1/2
    after:h-0.5
    after:w-full
    after:-translate-x-1/2
    after:origin-center
    after:rounded-full
    after:bg-indigo-600
    after:transition-transform
    after:duration-300
    dark:after:bg-indigo-400
    ${
      isActive
        ? "after:scale-x-100"
        : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  /*
   * =========================================================
   * MOBILE NAV LINK
   * =========================================================
   */

  const mobileNavClass = ({ isActive }) =>
    `relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }

    after:pointer-events-none
    after:absolute
    after:bottom-0
    after:left-1/2
    after:h-0.5
    after:w-[calc(100%-2rem)]
    after:-translate-x-1/2
    after:origin-center
    after:rounded-full
    after:bg-indigo-600
    after:transition-transform
    after:duration-300
    dark:after:bg-indigo-400
    ${
      isActive
        ? "after:scale-x-100"
        : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">

      {/* =====================================================
          NAVBAR INNER
      ===================================================== */}

      <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex min-w-0 shrink-0 items-center gap-2"
        >
          <img
            src={logo}
            alt="UniSetuHub"
            className="h-9 w-9 shrink-0 rounded-lg object-contain"
          />

          <span className="truncate text-lg font-bold tracking-tight sm:text-xl">
            UniSetuHub
          </span>
        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center gap-7 md:flex lg:gap-9 xl:gap-10">

          <NavLink
            to="/"
            end
            className={navClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/features"
            className={navClass}
          >
            Features
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={navClass}
          >
            How It Works
          </NavLink>

          <NavLink
            to="/about"
            className={navClass}
          >
            About Us
          </NavLink>

        </nav>


        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="hidden shrink-0 items-center gap-2 md:flex lg:gap-3">

          {/* Theme */}

          <button
            type="button"
            onClick={changeTheme}
            title={`Theme: ${theme}`}
            aria-label={`Change theme. Current theme: ${theme}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ThemeIcon />
          </button>


          {/* Login */}

          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:px-4 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Login
          </Link>


          {/* Get Started */}

          <Link
            to="/register-company"
            className="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 sm:px-4"
          >
            Get Started

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => setMobileMenu((current) => !current)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white md:hidden"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenu}
        >
          {mobileMenu ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenu && (
        <div className="border-t border-slate-200 bg-white shadow-lg shadow-slate-200/20 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20 md:hidden">

          <div className="mx-auto w-full max-w-[1800px] px-4 py-4 sm:px-6 lg:px-10">

            {/* =================================================
                MOBILE NAVIGATION
            ================================================= */}

            <nav className="space-y-1">

              <NavLink
                to="/"
                end
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                <span>Home</span>

                <ChevronDown
                  size={15}
                  className="rotate-[-90deg] opacity-40"
                />
              </NavLink>


              <NavLink
                to="/features"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                <span>Features</span>

                <ChevronDown
                  size={15}
                  className="rotate-[-90deg] opacity-40"
                />
              </NavLink>


              <NavLink
                to="/how-it-works"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                <span>How It Works</span>

                <ChevronDown
                  size={15}
                  className="rotate-[-90deg] opacity-40"
                />
              </NavLink>


              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                <span>About Us</span>

                <ChevronDown
                  size={15}
                  className="rotate-[-90deg] opacity-40"
                />
              </NavLink>

            </nav>


            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="my-4 border-t border-slate-200 dark:border-slate-800" />


            {/* =================================================
                MOBILE ACTIONS
            ================================================= */}

            <div className="grid grid-cols-[auto_1fr_1fr] gap-2">

              {/* Theme */}

              <button
                type="button"
                onClick={changeTheme}
                title={`Theme: ${theme}`}
                aria-label={`Change theme. Current theme: ${theme}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <ThemeIcon />
              </button>


              {/* Login */}

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Login
              </Link>


              {/* Get Started */}

              <Link
                to="/register-company"
                onClick={closeMobileMenu}
                className="group flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Get Started

                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

            </div>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;