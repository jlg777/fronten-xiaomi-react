import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg header-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"
            ><i className="bi bi-phone-fill"></i>Digitalers Xiaomi
          </a>
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
                <a className="nav-link active" aria-current="page" href="#"
                  >Principal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Admin</a>
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
  )
}

export default Navbar