import React, { useEffect, useState } from "react";
import "./ManageCategories.css";
import CategoryForm from "../../components/ManageCategories/CategoryForm/CategoryForm";
import CategoryList from "../../components/ManageCategories/CategoryList/CategoryList";
import { fetchCategories } from "../../service/CategoryService";
import toast from "react-hot-toast";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetchCategories();
        setCategories(res.data);
      } catch (error) {
        console.error(error.message);
        toast.error("Unable to fetch categories");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);
  
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
