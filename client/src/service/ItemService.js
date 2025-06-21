import axios from "axios";

const addItem = async (item) => {
  return axios.post("http://localhost:8080/api/v1.0/admin/items", item, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const deleteItem = async (itemId) => {
  return axios.delete(`http://localhost:8080/api/v1.0/admin/items/${itemId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const fetchItems = async () => {
  return axios.get("http://localhost:8080/api/v1.0/items", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export { addItem, deleteItem, fetchItems };
