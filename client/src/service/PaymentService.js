import axios from "axios";

const createStripeOrder = async () => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/admin/create-payment-order",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

const verifyPayment = async (verificationData) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/admin/verify-payment",
    verificationData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

export default { createStripeOrder, verifyPayment };
