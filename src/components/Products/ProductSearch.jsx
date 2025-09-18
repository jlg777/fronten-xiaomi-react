const ProductSearch = () => {
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
                />
              </div>
              <div className="col-12 col-lg-4 mt-2 mt-lg-0">
                <select className="form-select" id="searchByCategory" defaultValue="all" required>
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
  )
}

export default ProductSearch