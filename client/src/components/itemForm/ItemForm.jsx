import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { addItem } from "../../service/ItemService";

const ItemForm = () => {
  const { categories, items, setItems, setCategories } = useContext(AppContext);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Select image");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);
    try {
      const res = await addItem(formData);
      console.log(res);

      if (res.status == 201) {
        setItems([...items, res.data]);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.categoryId === data.categoryId
              ? { ...category, items: category.items + 1 }
              : category
          )
        );
        toast.success("Item added");
        setData({
          name: "",
          categoryId: "",
          price: "",
          description: "",
        });
        setImage(false);
      } else {
        toast.error("Unable to add item");
        console.error(res);
      }
    } catch (error) {
      toast.error("Unable to add item");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='item-form-container'
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
      <div className='mx-2 mt-2'>
        <div className='row'>
          <div className='card col-md-8 form-container'>
            <div className='card-body'>
              <form onSubmit={onSubmitHandler}>
                <div className='mb-3'>
                  <label htmlFor='image' className='form-label'>
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=''
                      width={48}
                    />
                  </label>
                  <input
                    type='file'
                    name='image'
                    id='image'
                    className='form-control'
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-control'
                    onChange={onChangeHandler}
                    value={data.name}
                    placeholder='Item Name'
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='category' className='form-label'>
                    Category
                  </label>
                  <select
                    name='categoryId'
                    id='category'
                    className='form-control'
                    onChange={onChangeHandler}>
                    <option value=''>Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mb-3'>
                  <label htmlFor='price' className='form-label'>
                    Price
                  </label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    className='form-control'
                    onChange={onChangeHandler}
                    value={data.price}
                    placeholder='&#163;1'
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description
                  </label>
                  <textarea
                    rows={5}
                    name='description'
                    id='description'
                    className='form-control'
                    placeholder='Write Content here'
                    onChange={onChangeHandler}
                    value={data.description}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary w-100'
                  disabled={loading}>
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
