import React, { useContext } from "react";
import "./CartSummary.css";
import { AppContext } from "../../../context/AppContext";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems } = useContext(AppContext);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;

  return (
    <div className='mt-2'>
      <div className='cart-summary-details'>
        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Item Price: </span>
          <span className='text-light'>&pound;{totalAmount.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Tax (1%)</span>
          <span className='text-light'>&pound;{tax.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Total: </span>
          <span className='text-light'>&pound;{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className='d-flex gap-3 mb-2'>
        <button className='btn btn-success btn-sm flex-grow-1'>Cash</button>
        <button className='btn btn-primary btn-sm flex-grow-1'>UPI</button>
      </div>
      <div className='d-flex gap-3'>
        <button className='btn btn-warning btn-sm flex-grow-1'>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
