import React from "react";
import {Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import NewUser from "../../components/User/NewUser";
import UsersList from "../../components/User/UsersList";
import UpdateUser from "../../components/User/UpdateUser";
import UpdateUser from "../../components/User/UpdateUser"; 
import Profile from "../../pages/Profile/Profile";

const UserRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/newUser" element={<NewUser />} />
      <Route path="/updateUser" element={<UpdateUser id_userUpdate={27}/>} />
      <Route path="/profile/:id_user" element={<Profile />} />
      <Route path="/updateUser" element={<UpdateUser id_userUpdate={3}/>}>
        <Route path=":updateUserId" element={<UpdateUser id_userUpdate={3}/>}/>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
