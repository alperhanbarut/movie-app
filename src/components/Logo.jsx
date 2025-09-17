import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Logo() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <a href="/" className="navbar-brand">
      <img
        src="/img/logo.png"
        className="img-fluid"
        alt="Logo"
        style={{
          filter: isDark ? "invert(0)" : "invert(1)",
        }}
      />
    </a>
  );
}
