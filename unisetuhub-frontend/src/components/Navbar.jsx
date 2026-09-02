import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  ArrowRight,
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

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive
      ? "text-indigo-600 dark:text-indigo-400"
      : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileMenu(false)}
        >
          <img
            src={logo}
            alt="UniSetuHub"
            className="h-9 w-9 rounded-lg object-contain"
          />

          <span className="text-xl font-bold tracking-tight">
            UniSetuHub
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

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

        {/* Desktop Actions */}

        <div className="hidden items-center gap-3 md:flex">

          {/* Theme */}

          <button
            type="button"
            onClick={changeTheme}
            title={`Theme: ${theme}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ThemeIcon />
          </button>

          {/* Login */}

          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Login
          </Link>

          {/* Register */}

          <Link
            to="/register-company"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
        >
          {mobileMenu ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileMenu && (
        <div className="border-t border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-950 md:hidden">

          <nav className="flex flex-col gap-1">

            <NavLink
              to="/"
              end
              onClick={() => setMobileMenu(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Home
            </NavLink>

            <NavLink
              to="/features"
              onClick={() => setMobileMenu(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Features
            </NavLink>

            <NavLink
              to="/how-it-works"
              onClick={() => setMobileMenu(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              How It Works
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMobileMenu(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              About Us
            </NavLink>

          </nav>

          {/* Mobile Actions */}

          <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">

            <button
              type="button"
              onClick={changeTheme}
              title={`Theme: ${theme}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              <ThemeIcon />
            </button>

            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="flex flex-1 items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold dark:border-slate-700"
            >
              Login
            </Link>

            <Link
              to="/register-company"
              onClick={() => setMobileMenu(false)}
              className="flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;