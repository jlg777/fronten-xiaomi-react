import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  console.log(formData)
  return (
    <>
      {/* Formulario de ingreso */}
      <div className="col-12 col-lg-2">
        <form id="xiaomiForm" name="name" className="xiaomiForm">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              name="name"
              required
              placeholder="Producto Xiaomi"
              spellCheck={true}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Imagen del Producto
            </label>
            <input
              type="url"
              className="form-control"
              id="productImage"
              name="image"
              placeholder="Link de la imagen"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Precio del Producto
            </label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              name="price"
              required
              placeholder="$"
              min="0"
              max="9999999"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Categoría
            </label>
            <select
              className="form-select"
              name="category"
              id="productCategory"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <option disabled value="">
                Elija una categoría
              </option>
              <option value="Smartphones">Celulares</option>
              <option value="Wearables">Relojes Inteligentes</option>
              <option value="Accessories">Accesorios</option>
              <option value="Home Appliances">Artículos del hogar</option>
              <option value="Electronics">Electronica</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="productDescription"
              rows="3"
              name="description"
              value={formData.description}
            onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Agregar producto
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
