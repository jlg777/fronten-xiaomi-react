import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";

const Nosotros = () => {
  return (
    <>
      <Navbar />

      <main className="container py-5">
        <section className="mb-5">
          <h1 className="fw-bold mb-3">Nosotros</h1>
          <p className="lead text-muted">
            Somos un equipo apasionado por la tecnología y la experiencia de
            compra. Nacimos como un proyecto académico y hoy evolucionamos en un
            e-commerce enfocado en productos Xiaomi, con una plataforma simple,
            rápida y segura.
          </p>
        </section>

        <section className="row g-4 mb-5">
          <div className="col-12 col-md-6">
            <div className="p-4 border rounded-3 h-100">
              <h3 className="h5 fw-semibold">Nuestra historia</h3>
              <p className="text-muted mb-0">
                El proyecto comenzó como un catalogo estático y, con el tiempo,
                sumamos autenticación, carrito y checkout. Hoy contamos con
                paneles para usuarios y administradores, y una base solida para
                seguir sumando funciones.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="p-4 border rounded-3 h-100">
              <h3 className="h5 fw-semibold">Mission</h3>
              <p className="text-muted mb-0">
                Ofrecer una experiencia de compra clara y confiable, con una
                navegación amigable, información precisa y un proceso de pago
                transparente.
              </p>
            </div>
          </div>
        </section>

        <section className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="p-4 bg-light rounded-3 h-100">
              <h3 className="h6 fw-semibold">Valores</h3>
              <ul className="mb-0 text-muted">
                <li>Transparencia y confianza</li>
                <li>Diseño centrado en el usuario</li>
                <li>Mejora continua</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-4 bg-light rounded-3 h-100">
              <h3 className="h6 fw-semibold">Tecnología</h3>
              <p className="text-muted mb-0">
                Construido con React, Vite y Bootstrap, e integraciones con APIs
                para autenticación, productos y ordenes.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-4 bg-light rounded-3 h-100">
              <h3 className="h6 fw-semibold">Compromiso</h3>
              <p className="text-muted mb-0">
                Priorizamos el rendimiento, la seguridad y la accesibilidad en
                cada iteración del proyecto.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="h4 fw-semibold mb-3">Linea de tiempo</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>2025:</strong> Primer catalogo y landing inicial.
            </li>
            <li className="list-group-item">
              <strong>2026:</strong> Autenticación, carrito, checkout y panel
              admin.
            </li>
            <li className="list-group-item">
              <strong>Hoy:</strong> Mejoras continuas en UX y nuevas
              integraciones.
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Nosotros;
