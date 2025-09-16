const ProductCard = ({ title, description, price, image }) => (
  <article className="section-productos-card col-12 col-md-6 col-lg-3">
    <header className="section-productos-card-header">
      <img src={image} alt={title} />
    </header>
    <div className="section-productos-card-body">
      <h3 className="section-productos-card-title">{title}</h3>
      <p className="section-productos-card-descripcion">{description}</p>
      <p className="section-productos-card-price">${price}</p>
      <footer>
        <button className="btn btn-primary">Comprar</button>
        <button className="btn btn-dark">fav</button>
      </footer>
    </div>
  </article>
);

export default ProductCard;
