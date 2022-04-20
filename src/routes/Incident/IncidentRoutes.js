import React from "react";
import { Routes, Route } from "react-router-dom";
import InicidentList from "../../pages/Incidents/IncidentList/IncidentList";
import NewIncident from "../../pages/Incidents/NewIncident/NewIncident";
import VerifyIncident from "../../pages/Incidents/VerifyIncident/VerifyIncident";
import Page404 from "../../pages/Page404/Page404";

const IncidentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NewIncident />} />
      <Route path="/step1" element={<NewIncident />} />
      <Route path="/step2" element={<NewIncident />} />
      <Route path="/step3" element={<NewIncident />} />
      <Route path="/step4" element={<NewIncident />} />
      <Route path="/step5" element={<NewIncident />} />
      <Route path="/step6" element={<NewIncident />} />
      <Route path="/step7" element={<NewIncident />} />
      <Route path="/step8" element={<NewIncident />} />
      <Route path="/verify/:id_incident" element={<VerifyIncident />} />
      <Route path="/incidents" element={<InicidentList />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default IncidentRoutes;
