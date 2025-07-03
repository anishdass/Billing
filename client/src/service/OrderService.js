import axios from "axios";

const getOrders = async () => {
  return await axios.get("http://localhost:8080/api/v1.0/orders", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const createOrder = async (order) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/admin/orders",
    order,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

const deleteOrder = async (orderId) => {
  return await axios.delete(
    `http://localhost:8080/api/v1.0/admin/orders/${orderId}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

export { getOrders, createOrder, deleteOrder };
