import React from "react";
import Menubar from "./components/Menubar/Menubar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageCategory from "./pages/manageCategory/ManageCategories";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import ManageItems from "./pages/manageItems/ManageItems";
import Explore from "./pages/explore/Explore";

const App = () => {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/categories' element={<ManageCategory />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/items' element={<ManageItems />} />
        <Route path='/explore' element={<Explore />} />
      </Routes>
    </div>
  );
};

export default App;
