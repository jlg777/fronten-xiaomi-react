import React from 'react'

const Footer = () => {
  return (
     <footer className="footer-main">
      <div className="container footer-main-content">
        <div className="row">
          {/*-- Sección Social */}
          <div className="col-12 col-md-4 footer-section">
            <section className="footer-social">
              <h5 className="footer-title">Redes sociales</h5>
              <ul className="footer-list">
                <li>
                  <a href="#"><i className="bi bi-tiktok"></i> TikTok</a>
                </li>
                <li>
                  <a href="#"><i className="bi bi-instagram"></i> Instagram</a>
                </li>
                <li>
                  <a href="#"><i className="bi bi-linkedin"></i> LinkedIn</a>
                </li>
              </ul>
            </section>
          </div>

          {/* Sección Enlaces */}
          <div className="col-12 col-md-4 footer-section">
            <section className="footer-links">
              <h5 className="footer-title">Enlaces rápidos</h5>
              <ul className="footer-list">
                <li><a href="#">Productos</a></li>
                <li><a href="#">Ofertas</a></li>
                <li><a href="#">Nosotros</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </section>
          </div>

          {/* Sección Contacto */}
          <div className="col-12 col-md-4 footer-section">
            <section className="footer-contact">
              <h5 className="footer-title">Contacto</h5>
              <p><i className="bi bi-geo-alt me-2"></i>Buenos Aires, Argentina</p>
              <p><i className="bi bi-telephone me-2"></i>+54 11 1234-5678</p>
              <p><i className="bi bi-envelope me-2"></i>info@digitalersgames.com</p>
            </section>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; 2025 Digitalers Games. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer