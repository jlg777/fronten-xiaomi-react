import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg header-nav shadow-sm">
      <div className="container-fluid">
        {/* Marca / Logo */}
        <Link className="navbar-brand fw-semibold" to="/">
          <i className="bi bi-phone-fill me-2"></i> Digitalers Xiaomi
        </Link>

        {/* Botón hamburguesa responsive */}
        <button
          className="navbar-toggler border-0 text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links principales */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Principal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/nosotros"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Nosotros
              </NavLink>
            </li>

            {user?.roleAdmin === "admin" && (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
            {user?.roleAdmin === "user" || user?.roleAdmin === "admin" && (
              <li className="nav-item">
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Usuario
                </NavLink>
              </li>
            )}
          </ul>

          {/* Botones a la derecha */}
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <div>
                <NavLink to="/ShoppingCart" className="ms-3">
                  <button
                    id="userToggleBtn"
                    className="btn btn-outline-light ms-3"
                    title="Shopping cart"
                    aria-label="Shopping cart"
                  >
                    <i className="bi bi-cart"></i>
                  </button>
                </NavLink>
                <button
                  onClick={handleLogout}
                  id="userToggleBtn"
                  className="btn btn-outline-light ms-3"
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="ms-3">
                <button
                  id="userToggleBtn"
                  className="btn btn-outline-light"
                  title="Iniciar sesión"
                  aria-label="Iniciar sesión"
                >
                  <i className="bi bi-person-circle"></i>
                </button>
              </NavLink>
            )}

            {/* BOTÓN DE CAMBIO DE TEMA */}
            <button
              onClick={toggleTheme}
              id="themeToggleBtn"
              className="btn btn-outline-light ms-3 btn-theme-toggle"
              title="Cambiar tema"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-fill"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
