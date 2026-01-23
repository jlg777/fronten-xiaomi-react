import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import useProducts from "../../hooks/useProducts";
import { Link, useLocation, useParams } from "react-router-dom";

const ProductCard = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 6);
  const [isFavorite, SetIsFavorite] = useState(false);
  const location = useLocation();
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p className="loader-text">Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="loader-container">
          <p className="loader-text">Error al cargar productos...</p>
        </div>
      )}
      {location.pathname === "/"
        ? featuredProducts.map((product) => (
            <article
              key={product._id}
              className="section-productos-card col-12 col-md-6 col-lg-3"
            >
              <header className="section-productos-card-header position-relative">
                <img src={product.image} alt={product.name} />
                <button
                  className="btn btn-outline-warning position-absolute top-0 end-0 m-2 p-1"
                  /*onClick={() => toggleFavorite(product)}*/
                >
                  <i
                    className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"}`}
                  ></i>
                </button>
              </header>
              <div className="section-productos-card-body">
                <h3 className="section-productos-card-title">{product.name}</h3>
                <p className="section-productos-card-descripcion">
                  {product.description}
                </p>
                <p className="section-productos-card-price">${product.price}</p>
                <footer>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => addToCart(product)}
                  >
                    Comprar
                  </button>
                  <Link className="btn btn-dark" to={`/product/${product._id}`}>
                    <i className="bi bi-eye"></i>
                  </Link>
                </footer>
              </div>
            </article>
          ))
        : !loading &&
          !error &&
          products.map((product) => (
            <article
              key={product._id}
              className="section-productos-card col-12 col-md-6 col-lg-3"
            >
              <header className="section-productos-card-header position-relative">
                <img src={product.image} alt={product.name} />
                <button
                  className="btn btn-outline-warning position-absolute top-0 end-0 m-2 p-1"
                  /*onClick={() => toggleFavorite(product)}*/
                >
                  <i
                    className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"}`}
                  ></i>
                </button>
              </header>
              <div className="section-productos-card-body">
                <h3 className="section-productos-card-title">{product.name}</h3>
                <p className="section-productos-card-descripcion">
                  {product.description}
                </p>
                <p className="section-productos-card-price">${product.price}</p>
                <footer>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => addToCart(product)}
                  >
                    Comprar
                  </button>
                  <Link className="btn btn-dark" to={`/product/${product._id}`}>
                    <i className="bi bi-eye"></i>
                  </Link>
                </footer>
              </div>
            </article>
          ))}
    </>
  );
};

export default ProductCard;
