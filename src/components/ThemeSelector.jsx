import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className="theme-selector-switch"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        width: "60px",
        height: "30px",
        borderRadius: "30px",
        background: isDark ? "#222" : "#f1f1f1",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6px",
        marginLeft: "50px",
      }}
    >
      {/* Sol ikon (moon) */}
      <i
        className={`bi bi-moon-stars-fill ${
          isDark ? "text-primary" : "text-muted"
        }`}
        style={{ fontSize: "1rem" }}
      ></i>

      {/* Sağ ikon (sun) */}
      <i
        className={`bi bi-sun-fill ${!isDark ? "text-warning" : "text-muted"}`}
        style={{ fontSize: "1rem" }}
      ></i>

      {/* Kaydırmalı top */}
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: isDark ? "3px" : "calc(100% - 27px)",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: isDark ? "#0d6efd" : "#f39c12",
          transition: "left 0.3s ease",
        }}
      ></div>
    </div>
  );
}
