import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";
import OrdersTable from "../components/Orders/OrdersTable";
import { useOrders } from "../hooks/useOrders";

const AdminOrders = () => {
  const { loading, error } = useOrders();

const orders = [
  {
    "_id": "65b401a2c9e4d91f3c1a9901",
    "user": {
      "_id": "65a1d2f7c4e8b9213f445aa1",
      "name": "Juan Pérez",
      "email": "juanperez@email.com"
    },
    "items": [
      {
        "product": {
          "_id": "p001",
          "name": "Samsung Galaxy S23",
          "image": "https://example.com/s23.jpg",
          "price": 900
        },
        "quantity": 1,
        "priceAtPurchase": 900
      }
    ],
    "total": 900,
    "status": "pending",
    "paymentMethod": "transfer",
    "shippingAddress": {
      "street": "Av. San Martín 123",
      "city": "Mendoza",
      "zip": "5500",
      "country": "Argentina"
    },
    "createdAt": "2026-01-29T10:15:00.000Z",
    "__v": 0
  },
  {
    "_id": "65b401a2c9e4d91f3c1a9902",
    "user": {
      "_id": "65b2a77fc4e8b9213f44bbbb",
      "name": "María Gómez",
      "email": "maria@email.com"
    },
    "items": [
      {
        "product": {
          "_id": "p002",
          "name": "Apple Watch Series 9",
          "image": "https://example.com/watch9.jpg",
          "price": 450
        },
        "quantity": 2,
        "priceAtPurchase": 450
      }
    ],
    "total": 900,
    "status": "shipped",
    "paymentMethod": "credit_card",
    "shippingAddress": {
      "street": "Calle Las Heras 456",
      "city": "Córdoba",
      "zip": "5000",
      "country": "Argentina"
    },
    "createdAt": "2026-01-28T18:40:00.000Z",
    "__v": 0
  },
  {
    "_id": "65b401a2c9e4d91f3c1a9903",
    "user": {
      "_id": "65c5f88ac4e8b9213f44cccc",
      "name": "Carlos Rodríguez",
      "email": "carlos@email.com"
    },
    "items": [
      {
        "product": {
          "_id": "p003",
          "name": "Auriculares Sony WH-1000XM5",
          "image": "https://example.com/sony.jpg",
          "price": 300
        },
        "quantity": 1,
        "priceAtPurchase": 300
      },
      {
        "product": {
          "_id": "p004",
          "name": "Cargador USB-C",
          "image": "https://example.com/charger.jpg",
          "price": 50
        },
        "quantity": 2,
        "priceAtPurchase": 50
      }
    ],
    "total": 400,
    "status": "delivered",
    "paymentMethod": "paypal",
    "shippingAddress": {
      "street": "Belgrano 789",
      "city": "Buenos Aires",
      "zip": "C1000",
      "country": "Argentina"
    },
    "createdAt": "2026-01-27T12:05:00.000Z",
    "__v": 0
  }
]

  return (
    <>
      <Navbar />
      <div className="layout">
        <main className="container-xxxl">
          <h1 className="main-title text-center">GESTIÓN DE PEDIDOS</h1>

          <OrdersTable
            orders={orders}
            loading={loading}
            error={error}
        
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminOrders;
