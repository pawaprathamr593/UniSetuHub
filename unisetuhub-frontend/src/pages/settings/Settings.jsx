
import {
  Monitor,
  Moon,
  Settings as SettingsIcon,
  Sun,
  Lock,
} from "lucide-react";

import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function Settings() {
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuth();

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const themes = [
    {
      value: "light",
      label: "Light",
      description: "Use the light appearance",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Use the dark appearance",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "Follow your device settings",
      icon: Monitor,
    },
  ];

  /*
   * =========================================================
   * PASSWORD HANDLER
   * =========================================================
   */

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * =========================================================
   * CHANGE PASSWORD
   * =========================================================
   */

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (!currentUser?.id) {
      setPasswordError(
        "Current user information is missing."
      );
      return;
    }

    if (
      !passwordData.password ||
      !passwordData.confirmPassword
    ) {
      setPasswordError(
        "Please enter and confirm your new password."
      );
      return;
    }

    if (passwordData.password.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      passwordData.password !==
      passwordData.confirmPassword
    ) {
      setPasswordError(
        "Passwords do not match."
      );
      return;
    }

    setSavingPassword(true);

    try {
      const requestBody = {
        id: currentUser.id,

        firstName:
          currentUser.firstName || "",

        surname:
          currentUser.surname || "",

        email:
          currentUser.email || "",

        role:
          currentUser.role,

        password:
          passwordData.password,

        company:
          currentUser.company
            ? {
                id: currentUser.company.id,
              }
            : currentUser.companyId
              ? {
                  id: currentUser.companyId,
                }
              : null,
      };

      const response = await fetch(
        `http://localhost:8080/users/${encodeURIComponent(
          currentUser.id
        )}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(requestBody),
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        let message =
          "Failed to change password.";

        try {
          const data =
            JSON.parse(responseText);

          message =
            data?.message ||
            data?.error ||
            responseText ||
            message;
        } catch {
          if (responseText) {
            message = responseText;
          }
        }

        setPasswordError(message);
        return;
      }

      setPasswordData({
        password: "",
        confirmPassword: "",
      });

      setPasswordSuccess(
        "Password changed successfully."
      );

    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      setPasswordError(
        "Unable to connect to the server."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <SettingsIcon size={20} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Settings
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your workspace preferences.
          </p>
        </div>

      </div>

      {/* =====================================================
          APPEARANCE
      ===================================================== */}

      <div className="mb-6 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        <div className="border-b border-slate-200 p-6 dark:border-slate-800">

          <h2 className="font-semibold">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Choose how UniSetuHub should look.
          </p>

        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">

          {themes.map((item) => {
            const Icon = item.icon;
            const selected = theme === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  setTheme(item.value)
                }
                className={`rounded-xl border p-5 text-left transition ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                }`}
              >

                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${
                    selected
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  <Icon size={19} />
                </div>

                <p className="font-medium">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>

                {selected && (
                  <p className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Currently selected
                  </p>
                )}

              </button>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          CHANGE PASSWORD
      ===================================================== */}

      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        <div className="flex items-center gap-3 border-b border-slate-200 p-6 dark:border-slate-800">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Lock size={19} />
          </div>

          <div>
            <h2 className="font-semibold">
              Change Password
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Change your account password.
            </p>
          </div>

        </div>

        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-5 p-6"
        >

          {/* New Password */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              placeholder="Minimum 6 characters"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
            />

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
            />

          </div>

          {/* Error */}

          {passwordError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              {passwordError}
            </div>
          )}

          {/* Success */}

          {passwordSuccess && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
              {passwordSuccess}
            </div>
          )}

          {/* Save */}

          <div className="flex justify-end border-t border-slate-200 pt-5 dark:border-slate-800">

            <button
              type="submit"
              disabled={savingPassword}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Lock size={17} />

              {savingPassword
                ? "Updating..."
                : "Change Password"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Settings;

