import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <section className="section-productos">
      <h2 className="section-productos-title">Productos destacados</h2>
      <section className="section-productos-cards row">
        <ProductCard />
      </section>
    </section>
  );
};

export default ProductList;
