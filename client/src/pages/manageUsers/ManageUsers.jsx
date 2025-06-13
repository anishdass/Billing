import React from "react";
import "./ManageUsers.css";
import UserForm from "../../components/userForm/UserForm";
import UserList from "../../components/userList/UserList";

const ManageUsers = () => {
  return (
    <div className='users-container text-light'>
      <div className='left-column'>
        <UserForm />
      </div>
      <div className='right-column'>
        <UserList />
      </div>
    </div>
  );
};

export default ManageUsers;
