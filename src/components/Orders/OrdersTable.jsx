import { useState } from "react";
import OrderRow from "./OrderRow";
import OrderStatusModal from "./OrderStatusModal";

const OrdersTable = ({ orders = [], loading, error, refetch }) => {
const [selectedOrder, setSelectedOrder] = useState(null);

  const openStatusModal = (order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>Error al cargar pedidos</p>;
  return (
    <>
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Total</th>
          <th>Pago</th>
          <th>Estado</th>
          <th>Actualizar</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.length > 0 ? (
          orders.map((order) => <OrderRow key={order._id} order={order}  refetch={refetch} openStatusModal={openStatusModal}/>)
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No existen órdenes
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {selectedOrder && (
        <OrderStatusModal
          order={selectedOrder}
          onClose={closeModal}
          refetch={refetch}
        />
      )}
      </>
  );
};

export default OrdersTable;
