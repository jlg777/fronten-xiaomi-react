import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
              <Link className="nav-link active" aria-current="page" to="/">
                Principal
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
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
