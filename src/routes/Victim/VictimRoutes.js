import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import UsersList from "../../components/User/UsersList";
import NewVictim from "../../components/Case/Victim/NewVictim";
import NewIncident from "../../components/Case/Incident/NewIncident";

const VictimRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/newVictim" element={<NewVictim />} />
      <Route path="/newIncident" element={<NewIncident />} />
    </Routes>
  );
};

export default VictimRoutes;
