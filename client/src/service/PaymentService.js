import axios from "axios";

const createStripeOrder = async (orderData) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/create-payment-order",
    orderData,

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

export { createStripeOrder, verifyPayment };
