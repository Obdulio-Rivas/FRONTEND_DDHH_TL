import React from "react";
import { Routes, Route } from "react-router-dom";
import InicidentList from "../../pages/Incidents/IncidentList/IncidentList";
import NewIncident from "../../pages/Incidents/NewIncident/NewIncident";
import Page404 from "../../pages/Page404/Page404";

const IncidentRoutes = () => {

  return (
    <Routes>
      /**
        Rutas para crear el incidente.
       */
      <Route path="/" element={<NewIncident />} />
      <Route path="/step1" element={<NewIncident />} />
      <Route path="/step2" element={<NewIncident />} />
      <Route path="/step3" element={<NewIncident />} />
      <Route path="/step4" element={<NewIncident />} />
      <Route path="/step5" element={<NewIncident />} />
      <Route path="/step6" element={<NewIncident />} />
      <Route path="/step7" element={<NewIncident />} />
      <Route path="/step8" element={<NewIncident />} />
      <Route path="/step9" element={<NewIncident />} />
      /**
        Rutas para ver el listado de incidentes.
       */
        <Route path="/incidentes" element={<InicidentList />} />
      /**
        Ruta por si la ruta solicitada no existe.
       */
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
};

export default IncidentRoutes;
