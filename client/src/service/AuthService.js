import axios from "axios";

const login = async (data) => {
  const res = await axios.post("http://localhost:8080/api/v1.0/login", data);
  return res;
};

export default login;
