import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Pagination({
  currentPage,
  totalPages,
  setSearchParams,
  query,
}) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <nav className="py-4 d-flex justify-content-center">
      <ul
        className={`pagination pagination-lg rounded-4 shadow-sm px-3 py-2 ${
          isDark ? "bg-dark" : "bg-light"
        }`}
        style={{ backgroundColor: isDark ? "#23272b" : "#f8f9fa" }}
      >
        <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
          <button
            className={`page-link border-0 ${
              isDark ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            disabled={currentPage <= 1}
            onClick={() => {
              setSearchParams({ q: query, page: Number(currentPage) - 1 });
            }}
            aria-label="Önceki Sayfa"
            style={{ backgroundColor: isDark ? "#343a40" : "#fff" }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>
        <li className="page-item disabled">
          <span
            className={`page-link border-0 ${
              isDark ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            style={{ backgroundColor: isDark ? "#23272b" : "#f8f9fa" }}
          >
            Sayfa <strong>{currentPage}</strong> / {totalPages}
          </span>
        </li>
        <li
          className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
        >
          <button
            className={`page-link border-0 ${
              isDark ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            disabled={currentPage >= totalPages}
            onClick={() => {
              setSearchParams({ q: query, page: Number(currentPage) + 1 });
            }}
            aria-label="Sonraki Sayfa"
            style={{ backgroundColor: isDark ? "#343a40" : "#fff" }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
