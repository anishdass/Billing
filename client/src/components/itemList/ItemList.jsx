import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../service/ItemService";
import toast from "react-hot-toast";

const ItemList = () => {
  const { items, setItems } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const deleteByItemId = async (id) => {
    try {
      const res = await deleteItem(id);
      if (res.status === 204) {
        toast.success("Item Deleted");
        const updatedItems = items.filter((item) => item.itemId !== id);
        setItems(updatedItems);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Unable to delete item");
    }
  };

  return (
    <div
      className='category-list-container'
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
      <div className='row pe-2'>
        <div className='input-group mb-3'>
          <input
            type='text'
            name='keyword'
            id='keyword'
            placeholder='Search by keyword'
            className='form-control'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className='input-group-text bg-warning'>
            <i className='bi bi-search'></i>
          </span>
        </div>
      </div>
      <div className='row g-3 pe-2'>
        {filteredItems.map((item, index) => (
          <div key={index} className='col-12'>
            <div className='card p-3'>
              <div className='d-flex align-items-center'>
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className='category-image'
                  />
                </div>
              </div>
              <div className='flex-grow-1'>
                <h5 className='mb-1'>{item.name}</h5>
                <p className='mb-0'>{item.categoryName}</p>
                <span className='mb-0 text-block badge rounded-pill text-bg-warning mb-2'>
                  &#8377;{item.price}
                </span>
              </div>
              <div>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => deleteByItemId(item.itemId)}>
                  <i className='bi bi-trash'></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
