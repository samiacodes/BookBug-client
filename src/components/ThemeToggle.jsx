import { useState, useEffect } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply theme to HTML element
    document.documentElement.setAttribute("data-theme", theme);
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost hover:bg-base-300 transition-all duration-300"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <HiMoon className="w-6 h-6 text-primary" />
      ) : (
        <HiSun className="w-6 h-6 text-accent" />
      )}
    </button>
  );
};

export default ThemeToggle;
