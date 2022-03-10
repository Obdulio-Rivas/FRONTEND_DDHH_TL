import React from "react";
import { Routes, Route } from "react-router-dom";
import NewUser from "../../components/User/NewUser";
import UsersList from "../../components/User/UsersList";
import UpdateUser from "../../components/User/UpdateUser";
import Profile from "../../pages/Profile/Profile";
import Page404 from "../../pages/Page404/Page404";

const UserRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/newUser" element={<NewUser />} />
      <Route path="/profile/:id_user" element={<Profile />} />
      <Route path="/updateUser/:id_user" element={<UpdateUser />} />
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
};

export default UserRoutes;