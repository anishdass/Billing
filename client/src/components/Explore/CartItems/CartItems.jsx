import React, { useContext } from "react";
import "./CartItems.css";
import { AppContext } from "../../../context/AppContext";

const CartItems = () => {
  const { cartItems } = useContext(AppContext);
  return <div>CartItems</div>;
};

export default CartItems;
