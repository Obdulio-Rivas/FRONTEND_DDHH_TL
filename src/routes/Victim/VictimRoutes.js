import React from "react";
import { Routes, Route } from "react-router-dom";
import VictimList from "../../components/Victim/VictimList";
import NewVictim from "../../components/Case/Victim/NewVictim";
import NewIncident from "../../components/Case/Incident/NewIncident";
import Page404 from "../../pages/Page404/Page404";

const VictimRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<VictimList />} />
      <Route path="/newVictim" element={<NewVictim />} />
      <Route path="/newIncident" element={<NewIncident />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

export default VictimRoutes;
