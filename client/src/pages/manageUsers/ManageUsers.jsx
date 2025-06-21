import React, { useEffect, useState } from "react";
import "./ManageUsers.css";
import UserForm from "../../components/userForm/UserForm";
import UserList from "../../components/userList/UserList";
import toast from "react-hot-toast";
import { fetchUsers } from "../../service/UserService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetchUsers();
        setUsers(res.data);
      } catch (error) {
        console.error(error.message);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className='users-container text-light'>
      <div className='left-column'>
        <UserForm setUsers={setUsers} />
      </div>
      <div className='right-column'>
        <UserList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
