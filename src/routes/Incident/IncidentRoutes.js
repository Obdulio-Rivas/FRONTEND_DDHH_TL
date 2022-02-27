import React from "react";
import { Routes, Route } from "react-router-dom";
import NewIncident from "../../pages/Incidents/NewIncident/NewIncident";

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
      <Route path="*" element={<span>Pagina 404 - Content not found!</span>} />
    </Routes>
  );
};

export default IncidentRoutes;
