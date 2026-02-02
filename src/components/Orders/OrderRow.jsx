const OrderRow = ({ order, openStatusModal  }) => {
  
    const statusColors = {
      pending: "secondary",
      paid: "info",
      shipped: "primary",
      delivered: "success",
      cancelled: "danger",
    };
 

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
          onClick={() => openStatusModal(order)}
          style={{ cursor: "pointer" }}
        >
          {order.status}
        </span>
      </td>

      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
    </tr>
  );
};

export default OrderRow;
