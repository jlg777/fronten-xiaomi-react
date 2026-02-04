const OrderRow = ({ order, openStatusModal }) => {
  const statusColors = {
    pending: "secondary",
    paid: "info",
    shipped: "primary",
    delivered: "success",
    cancelled: "danger",
  };

  const isFinal = order.status === "delivered" || order.status === "cancelled";

  return (
    <tr>
      <td>{order._id.slice(-6)}</td>
      <td>{order.user?.name}</td>
      <td>${order.total}</td>
      <td>{order.paymentMethod}</td>

      <td className="text-center align-middle">
        <span
          role="button"
          className={`badge bg-${statusColors[order.status]} px-3 py-2 text-capitalize`}
          onClick={!isFinal ? () => openStatusModal(order) : undefined}
          title={isFinal ? "La orden ya está finalizada" : "Cambiar estado"}
          style={{
            opacity: isFinal ? 0.5 : 1,
            cursor: isFinal ? "not-allowed" : "pointer",
          }}
        >
          {order.status}
        </span>
      </td>

      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
    </tr>
  );
};

export default OrderRow;
