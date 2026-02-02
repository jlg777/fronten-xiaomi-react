import { useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

const transitions = {
  pending: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

const OrderStatusModal = ({ order, onClose, refetch }) => {
  const [newStatus, setNewStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/orders/${order._id}`, { status: newStatus });
      toast.success("Estado actualizado");
      refetch();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  const allowed = transitions[order.status];

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cambiar estado del pedido</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p><strong>ID:</strong> {order._id.slice(-6)}</p>
            <p><strong>Cliente:</strong> {order.user?.name}</p>
            <p><strong>Estado actual:</strong> {order.status}</p>

            {allowed.length > 0 ? (
              <select
                className="form-select mt-3"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value={order.status}>{order.status}</option>
                {allowed.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <p className="text-muted">Esta orden ya está finalizada.</p>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            {allowed.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={loading || newStatus === order.status}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
