import React, { useEffect, useState } from "react";
import "./ManageItems.css";
import ItemForm from "../../components/ManageItems/ItemForm/ItemForm";
import ItemList from "../../components/ManageItems/ItemList/ItemList";
import { fetchItems } from "../../service/ItemService";
import toast from "react-hot-toast";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetchItems();
        setItems(res.data);
      } catch (error) {
        console.error(error.message);
        toast.error("Unable to fetch items");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className='items-container text-light'>
      <div className='left-column'>
        <ItemForm />
      </div>
      <div className='right-column'>
        <ItemList />
      </div>
    </div>
  );
};

export default ManageItems;
