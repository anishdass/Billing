import React, { useContext } from "react";
import "./CartItems.css";
import { AppContext } from "../../../context/AppContext";

const CartItems = () => {
  const { cartItems } = useContext(AppContext);
  console.log(cartItems);

  return (
    <div className='p-3 h-100 overflow-y-auto'>
      {!cartItems && <p className='text-light'>Your cart is exmpty</p>}
      <div className='cart-items-list'>
        {cartItems.map((cartItem) => (
          <div key='a' className='cart-item mb-3 p-3 bg-dark rounded'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <h6 className='mb-0 text-light'>{cartItem.name}</h6>
              <p className='mb-0 text-light'>{cartItem.price}</p>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items center gap-2'>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={(e) => e}
                  disabled>
                  <i className='bi bi-dash'></i>
                </button>
                <span className='text-light'>{cartItem.quantity}</span>
                <button className='btn btn-primary btn-sm' onClick={(e) => e}>
                  <i className='bi bi-plus'></i>
                </button>
              </div>
              <button
                className='btn btn-danger btn-sm'
                style={{ width: "auto" }}>
                <i className='bi bi-trash' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;
