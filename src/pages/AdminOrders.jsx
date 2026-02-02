import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";
import OrdersTable from "../components/Orders/OrdersTable";
import { useOrders } from "../hooks/useOrders";

const AdminOrders = () => {
  const { orders, loading, error, getAllOrders  } = useOrders();

  useEffect(() => {
  getAllOrders();
}, [getAllOrders]);

  return (
    <>
      <Navbar />
      <div className="layout">
        <main className="container-xxxl">
          <h1 className="main-title text-center">GESTIÓN DE PEDIDOS</h1>

          <OrdersTable orders={orders} loading={loading} error={error} />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminOrders;
