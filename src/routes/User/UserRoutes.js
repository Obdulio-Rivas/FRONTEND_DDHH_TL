import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import NewUser from "../../components/User/NewUser";
import UsersList from "../../components/User/UsersList";
import UpdateUser from "../../components/User/UpdateUser"; 

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/newUser" element={<NewUser />} />
      <Route path="/updateUser" element={<UpdateUser id_userUpdate={1}/>} />
    </Routes>
  );
};

export default UserRoutes;