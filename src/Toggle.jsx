// App.js

import React, { useState } from "react";
import "./App.css"; // Your main CSS file

function Toggle() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Optionally, persist the theme preference
  };

  // Apply theme styles based on the current theme
  const themeClass = theme === "light" ? "" : "dark-theme";

  return (
    <div className={`app ${themeClass}`}>
      <button onClick={toggleTheme}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

export default Toggle;
