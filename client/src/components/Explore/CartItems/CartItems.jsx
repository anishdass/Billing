import React, { useContext } from "react";
import "./CartItems.css";
import { AppContext } from "../../../context/AppContext";

const CartItems = () => {
  const { cartItems, deleteFromCart, updateQuantity } = useContext(AppContext);

  console.log(!cartItems);
  return (
    <div className='p-3 h-100 overflow-y-auto'>
      {cartItems?.length === 0 && (
        <p className='text-light'>Your cart is empty</p>
      )}

      <div className='cart-items-list'>
        {cartItems.map((cartItem, index) => (
          <div key={index} className='cart-item mb-3 p-3 bg-dark rounded'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <h6 className='mb-0 text-light'>{cartItem.name}</h6>
              <p className='mb-0 text-light'>
                {cartItem.price * cartItem.quantity}
              </p>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items center gap-2'>
                {/* remove cart item */}

                <button
                  className='btn btn-danger btn-sm'
                  onClick={() =>
                    updateQuantity(cartItem.itemId, cartItem.quantity - 1)
                  }
                  disabled={cartItem.quantity === 1}>
                  <i className='bi bi-dash'></i>
                </button>

                <span className='text-light'>{cartItem.quantity}</span>

                {/* Add item */}
                <button
                  className='btn btn-primary btn-sm'
                  onClick={() =>
                    updateQuantity(cartItem.itemId, cartItem.quantity + 1)
                  }>
                  <i className='bi bi-plus'></i>
                </button>
              </div>

              {/* Delete button */}
              <button
                className='btn btn-danger btn-sm'
                style={{ width: "auto" }}
                onClick={() => deleteFromCart(cartItem.itemId)}>
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
