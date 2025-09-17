import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  function handleSubmit(event) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchQuery("");
    }
  }

  return (
    <form
      className="d-flex mb-2 mb-lg-0"
      onSubmit={handleSubmit}
      id="searchForm"
    >
      <input
        type="search"
        className={`form-control me-1 ${
          isDark ? "bg-dark text-light border-secondary" : "bg-light text-dark"
        }`}
        placeholder="Ara"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="btn btn-outline-light" type="submit">
        <i className="bi bi-search" id="searchIcon"></i>
      </button>
    </form>
  );
}
