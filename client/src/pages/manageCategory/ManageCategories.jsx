import React from "react";
import "./ManageCategories.css";
import CategoryForm from "../../components/categoryForm/CategoryForm";
import CategoryList from "../../components/categoryList/CategoryList";

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
