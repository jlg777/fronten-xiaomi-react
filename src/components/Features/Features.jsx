import React from 'react'

const Features = () => {
  return (
        <section class="section-caracteristicas">
        <h2 class="section-caracteristicas-title">En que nos destacamos</h2>
        <div class="section-caracteristicas-container row">
          <div class="section-caracteristicas-item col-12 col-md-4">
            <i class="bi bi-truck"></i>
            <p>Envío gratis compras mayores a $100</p>
          </div>
          <div class="section-caracteristicas-item col-12 col-md-4">
            <i class="bi bi-archive"></i>
            <p>Devoluciones gratis dentro de los 30 días</p>
          </div>
          <div class="section-caracteristicas-item col-12 col-md-4">
            <i class="bi bi-headset"></i>
            <p>Atención personalizada 24/7</p>
          </div>
        </div>
      </section>
  )
}

export default Features