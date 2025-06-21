import React, { useContext, useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import login from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthData } = useContext(AppContext);
  const [data, setData] = useState({
    name: "",
    password: "",
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
      const res = await login(data);
      console.log(res);

      if (res.status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        setAuthData(res.data);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-light d-flex align-items-cente justify-content-center vh-100 login-background'>
      <div className='card shadow-lg w-100' style={{ maxWidth: "480px" }}>
        <div className='card-body'>
          <div className='text-center'>
            <h1 className='card-title'>Sign in</h1>
            <p className='card-text text-mutes'>
              Sign in below to access your account
            </p>
          </div>
          <div className='mt-4'>
            <form onSubmit={onSubmitHandler}>
              <div className='mb-4'>
                <label htmlFor='email' className='form-label text-mutes'>
                  Email Address
                </label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  placeholder='yourname@example.com'
                  className='form-control'
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='form-label text-mutes'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='*************'
                  className='form-control'
                  onChange={onChangeHandler}
                  value={data.password}
                />
              </div>
              <div className='d-grid'>
                <button
                  type='submit'
                  className='btn btn-dark btn-lg'
                  disabled={loading}>
                  {loading ? "Logging in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
