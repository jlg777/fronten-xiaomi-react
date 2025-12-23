import React from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/Pagination/Pagination";

const Products = () => {
  /*const products = [
    {
      title: "Producto 1",
      description: "Descripción",
      price: 1000,
      image: "/images/products-cel.jpeg",
    },
    {
      title: "Producto 2",
      description: "Descripción",
      price: 1000,
      image: "/images/PRODUCTS-CARD4.jpeg",
    },
    {
      title: "Producto 3",
      description: "Descripción",
      price: 1000,
      image: "/images/PRODUCTS-CARD.jpeg",
    },
    {
      title: "Producto 4",
      description: "Descripción",
      price: 1000,
      image: "/images/PRODUCTS-CARD1.jpeg",
    },
    {
      title: "Producto 5",
      description: "Descripción",
      price: 1000,
      image: "/images/PRODUCTS-CARD2.jpeg",
    },
    {
      title: "Producto 6",
      description: "Descripción",
      price: 1000,
      image: "/images/PRODUCTS-CARD3.jpeg",
    },
  ];*/
  return (
    <>
      <Navbar />
      <section className="section-productos">
        <h2 className="section-productos-title">Productos</h2>
        <section className="section-productos-cards row">
          <ProductCard />
        </section>
        <div className="d-flex justify-content-center my-3">
          <Pagination />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Products;
