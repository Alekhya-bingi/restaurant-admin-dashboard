import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders(); // refresh
    } catch {
      alert("Status update failed");
    }
  };

  if (loading) return <h2>Loading orders...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Orders Dashboard</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <select
            value={order.status}
            onChange={(e) =>
              handleStatusChange(order._id, e.target.value)
            }
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
