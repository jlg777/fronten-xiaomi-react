import { useState } from "react";

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onSearch(searchTerm, value);
  };

  return (
    <>
      {/* Búsqueda de productos*/}
      <div className="row mb-3">
        <div className="col-12 col-lg-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            id="searchByName"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-12 col-lg-4 mt-2 mt-lg-0">
          <select
            className="form-select"
            id="searchByCategory"
            required
            value={category}
            onChange={handleCategoryChange}
          >
            <option disabled value="all">
              Elija una categoría...
            </option>
            <option value="Smartphones">Celulares</option>
            <option value="Wearables">Relojes Inteligentes</option>
            <option value="Accessories">Accesorios</option>
            <option value="Home Appliances">Artículos del hogar</option>
            <option value="Electronics">Electronica</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
