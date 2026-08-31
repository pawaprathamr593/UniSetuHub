import { Monitor, Moon, Settings as SettingsIcon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function Settings() {
  const { theme, setTheme } = useTheme();

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

  return (
    <div className="max-w-4xl">

      {/* Header */}
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

      {/* Appearance */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

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
                onClick={() => setTheme(item.value)}
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

    </div>
  );
}

export default Settings;