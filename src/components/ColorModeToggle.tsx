import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ColorModeToggle = () => {
  const [theme, setThemeState] = useState<"theme-light" | "dark" | "system">(
    "theme-light",
  );

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        aria-label="Toggle theme"
        className="btn btn-ghost btn-sm btn-square pointer-events-auto"
      >
        <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-10 mt-2 w-36 bg-base-100 p-1.5 shadow-lg"
      >
        <li>
          <button type="button" onClick={() => setThemeState("theme-light")}>
            Light
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setThemeState("dark")}>
            Dark
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setThemeState("system")}>
            System
          </button>
        </li>
      </ul>
    </div>
  );
};
