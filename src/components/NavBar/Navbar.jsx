import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg header-nav">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-phone-fill"></i> Digitalers Xiaomi
        </Link>
        <button
          className="navbar-toggler border-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                aria-current="page"
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Principal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/productos"
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/nosotros"
              >
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              {user?.roleAdmin ? (<NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/admin"
              >
                Admin
              </NavLink>): ''}
              
            </li>
          </ul>
        </div>

        {isAuthenticated ? (
          
            <button
             onClick={handleLogout}
              id="userToggleBtn"
              className="btn btn-outline-light ms-3"
              title="Cerrar sesión"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
        
        ) : (
          <NavLink to="/login">
            <button
              id="userToggleBtn"
              className="btn btn-outline-light ms-3"
              title="Login de usuario"
            >
              <i className="bi bi-person-circle"></i>
            </button>
          </NavLink>
        )}

        <button
          id="themeToggleBtn"
          className="btn btn-outline-light ms-3 btn-theme-toggle"
          title="Cambiar tema"
        >
          <i className="bi bi-moon-fill"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
