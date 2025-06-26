import React, { useContext } from "react";
import "./Item.css";
import { AppContext } from "../../context/AppContext";

const Item = ({ id, name, price, image }) => {
  const { addToCart } = useContext(AppContext);

  const handleAddToCart = () => {
    addToCart({
      name: name,
      price: price,
      quantity: 1,
      itemId: id,
    });
  };

  return (
    <div className='p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card'>
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img src={image} alt={name} className='item-image' />
      </div>
      <div className='flex-grow-1 ms-2'>
        <h6 className='mb-1 text-light'>{name}</h6>
        <p className='mb-0 fw-bold text-light'>{price}</p>
      </div>
      <div
        className='d-flex flex-column justify-content-between align-items-center ms-3'
        style={{ height: "100%" }}>
        <i className='bi bi-cart-plus fs-4 text-warning'></i>
        <button className='btn btn-success btn-sm' onClick={handleAddToCart}>
          <i className='bi bi-plus'></i>
        </button>
      </div>
    </div>
  );
};

export default Item;
