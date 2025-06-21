import axios from "axios";

const addUser = async (user) => {
  return axios.post("http://localhost:8080/api/v1.0/admin/register", user, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const deleteUser = async (userId) => {
  return axios.delete(`http://localhost:8080/api/v1.0/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const fetchUsers = async () => {
  return axios.get("http://localhost:8080/api/v1.0/admin/users", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export { addUser, deleteUser, fetchUsers };
