import React from "react";
import Menubar from "./components/Menubar/Menubar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageCategory from "./pages/manageCategory/ManageCategories";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import ManageItems from "./pages/manageItems/ManageItems";
import Explore from "./pages/explore/Explore";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <div>
      <Menubar />
      <Toaster />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/categories' element={<ManageCategory />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/items' element={<ManageItems />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
