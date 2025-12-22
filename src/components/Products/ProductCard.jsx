import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import useProducts from "../../hooks/useProducts";

const ProductCard = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 6);
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
      {featuredProducts.map((product) => (
        <article
          key={product._id}
          className="section-productos-card col-12 col-md-6 col-lg-3"
        >
          <header className="section-productos-card-header">
            <img src={product.image} alt={product.name} />
          </header>
          <div className="section-productos-card-body">
            <h3 className="section-productos-card-title">{product.name}</h3>
            <p className="section-productos-card-descripcion">
              {product.description}
            </p>
            <p className="section-productos-card-price">${product.price}</p>
            <footer>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                Comprar
              </button>
              <button
                className="btn btn-dark"
                onClick={() => removeFromCart(product._id)}
              >
                fav
              </button>
            </footer>
          </div>
        </article>
      ))}
    </>
  );
};

export default ProductCard;
