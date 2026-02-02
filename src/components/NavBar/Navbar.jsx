import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

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
                  Administrador de Productos
                </NavLink>
              </li>
            )}
              {user?.roleAdmin === "admin" && (
              <li className="nav-item">
                <NavLink
                  to="/adminorders"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Administrador de Ordenes
                </NavLink>
              </li>
            )}
            {(user?.roleAdmin === "user" || user?.roleAdmin === "admin") && (
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
            <NavLink to="/ShoppingCart" className="ms-3">
              <button
                id="userToggleBtn"
                className="btn btn-outline-light ms-3 position-relative"
                title="Shopping cart"
                aria-label="Shopping cart"
              >
                <i className="bi bi-cart"></i>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
            </NavLink>
            {isAuthenticated ? (
              <div>
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
