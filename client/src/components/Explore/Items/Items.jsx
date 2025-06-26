import React, { useContext, useState } from "react";
import "./Items.css";
import { AppContext } from "../../../context/AppContext";
import Item from "../../Item/Item";
import SearchBox from "../../ManageItems/SearchBox/SearchBox";

const Items = ({ selectedCategory }) => {
  const { items } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const filteredItems = items
    // Category filter
    .filter((item) => !selectedCategory || item.categoryId === selectedCategory)
    // Search term filter
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className='p-3'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div></div>
        <div>
          <SearchBox onSearch={setSearchText} />
        </div>
      </div>
      <div className='row g-3'>
        {filteredItems.map((item, index) => (
          <div key={index} className='col-md-4 col-sm-6'>
            <Item
              id={item.itemId}
              name={item.name}
              price={item.price}
              image={item.imgUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
