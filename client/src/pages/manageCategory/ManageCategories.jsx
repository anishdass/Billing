import React from "react";
import "./ManageCategories.css";
import CategoryForm from "../../components/ManageCategories/CategoryForm/CategoryForm";
import CategoryList from "../../components/ManageCategories/CategoryList/CategoryList";

const ManageCategories = () => {
  return (
    <div className='category-container text-light'>
      <div className='left-column'>
        <CategoryForm />
      </div>
      <div className='right-column'>
        <CategoryList />
      </div>
    </div>
  );
};

export default ManageCategories;
