import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import NewUser from "../../components/User/NewUser";
import UsersList from "../../components/User/UsersList";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/newUser" element={<NewUser />} />
    </Routes>
  );
};

export default UserRoutes;
