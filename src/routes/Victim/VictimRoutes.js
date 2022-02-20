import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import UsersList from "../../components/User/UsersList";
import NewVictim from "../../components/Case/Victim/NewVictim";

const VictimRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/newVictim" element={<NewVictim />} />
    </Routes>
  );
};

export default VictimRoutes;
