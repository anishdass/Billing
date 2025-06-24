import React from "react";
import { useState } from "react";
import { addUser } from "../../../service/UserService";
import toast from "react-hot-toast";

const UserForm = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addUser(data);
      setUsers((prevUsers) => [...prevUsers, res.data]);
      toast.success("User Added");
      setData({ name: "", email: "", password: "", role: "ROLE_USER" });
    } catch (e) {
      toast.error("Error Adding user");
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-2 mt-2'>
      <div className='row'>
        <div className='card col-md-12 form-container'>
          <div className='card-body'>
            <form onSubmit={onSubmitHandler}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='form-control'
                  placeholder='John Doe'
                  value={data.name}
                  onChange={onChangeHandler}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <br />
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='form-control'
                  placeholder='yourname@example.com'
                  value={data.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Password
                </label>
                <br />
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='form-control'
                  placeholder='****'
                  value={data.password}
                  onChange={onChangeHandler}
                />
              </div>
              <button
                type='submit'
                className='btn btn-warning w-100'
                disabled={loading}>
                {loading ? "Loading..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
