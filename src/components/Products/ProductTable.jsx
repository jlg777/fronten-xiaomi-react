import { formatDate } from "../../utils/localDate";

const ProductTable = ({ products = [], loading, error }) => {
  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" aria-label="Cargando productos">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center" role="alert">
        <strong>Error:</strong> {error.message || "No se pudo cargar la lista de productos."}
      </div>
    );

  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Imagen</th>
          <th scope="col">Precio</th>
          <th scope="col">Categoría</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id}>
            <th scope="row">{prod.id}</th>
            <td>{prod.name}</td>
            <td>
              <img
                src={prod.image}
                alt={`Imagen de ${prod.name}`}
                style={{ width: "10rem", height: "8rem", objectFit: "cover" }}
                className="rounded"
              />
            </td>
            <td>{prod.price}</td>
            <td>{prod.category}</td>
            <td>{prod.description}</td>
            <td>{formatDate(prod.createdAt)}</td>
            <td>
              <button type="button" className="btn btn-outline-primary me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-outline-danger">
                <i className="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
