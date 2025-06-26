import React from "react";
import "./Categories.css";
import Category from "../../Category/Category";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className='row gap-3' style={{ width: "100%", margin: "0" }}>
      {categories.map((category) => (
        <div
          key={category.categoryId}
          className='col-md-3 col-sm-6'
          style={{ padding: "0, 10px" }}>
          <Category
            categoryName={category.name}
            imgUrl={category.imgUrl}
            itemsCount={category.items}
            bgColor={category.bgColor}
            isSelected={selectedCategory === category.categoryId}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.categoryId
                  ? null
                  : category.categoryId
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Categories;
