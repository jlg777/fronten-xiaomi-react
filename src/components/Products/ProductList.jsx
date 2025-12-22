import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

const products = [
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
];

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
