import React from "react";

const Features = () => {
  return (
    <section className="section-caracteristicas">
      <h2 className="section-caracteristicas-title">En que nos destacamos</h2>
      <div className="section-caracteristicas-container row">
        <div className="section-caracteristicas-item col-12 col-md-4">
          <i className="bi bi-truck"></i>
          <p>Envío gratis compras mayores a $100</p>
        </div>
        <div className="section-caracteristicas-item col-12 col-md-4">
          <i className="bi bi-archive"></i>
          <p>Devoluciones gratis dentro de los 30 días</p>
        </div>
        <div className="section-caracteristicas-item col-12 col-md-4">
          <i className="bi bi-headset"></i>
          <p>Atención personalizada 24/7</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
