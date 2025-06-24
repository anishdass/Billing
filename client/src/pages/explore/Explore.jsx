import "./Explore.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Categories from "../../components/Explore/Categories/Categories";
import Items from "../../components/Explore/Items/Items";
import CustomerForm from "../../components/Explore/CustomerForm/CustomerForm";
import CartSummary from "../../components/Explore/CartSummary/CartSummary";
import CartItems from "../../components/Explore/CartItems/CartItems";

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelecteCategory] = useState("");

  return (
    <div className='explore-container text-light'>
      <div className='left-column'>
        <div className='first-row' style={{ overflowY: "auto" }}>
          <Categories
            selectedCategory={selectedCategory}
            setSelecteCategory={setSelecteCategory}
            categories={categories}
          />
        </div>
        <hr className='horizontal-line' />
        <div className='second-row' style={{ overflowY: "auto" }}>
          <Items />
        </div>
      </div>
      <div className='right-column d-flex flex-column'>
        <div className='customer-form-container' style={{ height: "15%" }}>
          <CustomerForm />
        </div>
        <hr className='my-3 text-light' />
        <div
          className='cart-items-container'
          style={{ height: "55%", overflowY: "auto" }}>
          <CartItems />
        </div>
        <div className='cart-summary-container' style={{ height: "30%" }}>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Explore;
