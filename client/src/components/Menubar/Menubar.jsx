import React, { useContext } from "react";
import "./Menubar.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Menubar = () => {
  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthData({ token: null, role: null });
    navigate("/login");
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-2'>
      <a className='navbar-brand' href='#'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='40'
          fill='currentColor'
          className='bi bi-pc-display-horizontal'
          viewBox='0 0 16 16'>
          <path d='M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5M12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0M1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25' />
        </svg>
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse p-2' id='navbarNav'>
        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
          <li className='nav-item'>
            <Link className='nav-link active' to='/dashboard'>
              Dashboard
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/explore'>
              Explore
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/items'>
              Manage Items
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/categories'>
              Manage Categories
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/users'>
              Manage Users
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ms-auto ms-md-0 me-3 me-lg-4'>
          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              href='#'
              id='navbarDropdown'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <img src={assets.profile} alt='Profile' height={32} width={32} />
            </a>
            <ul
              className='dropdown-menu dropdown-menu-end'
              aria-labelledby='navbarDropdown'>
              <li>
                <a href='#' className='dropdown-item'>
                  Settings
                </a>
              </li>
              <li>
                <a href='#' className='dropdown-item'>
                  Activity Log
                </a>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <a href='#' className='dropdown-item' onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menubar;
