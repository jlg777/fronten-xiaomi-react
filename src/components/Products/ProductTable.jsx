import Swal from "sweetalert2";
import { formatDate } from "../../utils/localDate";
import axios from "axios";

const ProductTable = ({ products = [], loading, error, refetch, onEdit }) => {
  const apiUrl = import.meta.env.VITE_API_MONGO;
  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Cargando productos"
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center" role="alert">
        <strong>Error:</strong>{" "}
        {error.message || "No se pudo cargar la lista de productos."}
      </div>
    );

  const onDelete = async(id) => {
    console.log(id)
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        Swal.fire(
          "Eliminado",
          "El producto fue eliminado correctamente",
          "success"
        );
        await refetch();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
        console.error("Error al eliminar producto:", error);
      }
    }
  };

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
          <tr key={prod._id}>
            <th scope="row">{prod._id}</th>
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
              <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={() => onEdit(prod)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDelete(prod._id)}
              >
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
