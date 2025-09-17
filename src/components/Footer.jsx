import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <footer
      className={`bg-${isDark ? "dark" : "light"} text-center text-${
        isDark ? "white" : "dark"
      } border-top border-body`}
      data-bs-theme={theme}
    >
      <div className="container py-4">
        <div className="row align-items-start">
          {/* Hızlı Menü */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <h6
              className={`fw-bold text-${
                isDark ? "light" : "dark"
              } mb-3 d-none d-md-block`}
            ></h6>
            <ul className="navbar-nav d-flex flex-column flex-md-row gap-2">
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/">
                  Anasayfa
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/movies">
                  Filmler
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/series">
                  Diziler
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/watchlist">
                  İzleme Listem
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/login">
                  Giriş Yap
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/register">
                  Kayıt Ol
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Sosyal Butonlar */}
          <div className="col-12 col-md-6 text-md-end text-center">
            <a
              className={`btn btn-outline-${
                isDark ? "light" : "dark"
              } btn-floating m-1`}
              href="#!"
              role="button"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              className={`btn btn-outline-${
                isDark ? "light" : "dark"
              } btn-floating m-1`}
              href="#!"
              role="button"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              className={`btn btn-outline-${
                isDark ? "light" : "dark"
              } btn-floating m-1`}
              href="#!"
              role="button"
            >
              <i className="bi bi-google"></i>
            </a>
            <a
              className={`btn btn-outline-${
                isDark ? "light" : "dark"
              } btn-floating m-1`}
              href="#!"
              role="button"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Alt Telif */}
      <div
        className={`text-center p-3 bg-${isDark ? "secondary" : "light"} text-${
          isDark ? "white" : "dark"
        }`}
      >
        © 2026 Copyright:
        <a className={`text-${isDark ? "light" : "dark"} ms-1`} href="#!">
          Movie App
        </a>
      </div>
    </footer>
  );
}
