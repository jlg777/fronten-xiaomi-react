const ProductTable = () => {
  return (
    <>
    {/* Tabla de productos */}
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
              <tbody></tbody>
            </table>
    </>
  )
}

export default ProductTable