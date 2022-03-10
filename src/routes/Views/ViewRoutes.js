import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewIncident from "../../pages/Incidents/ViewIncident/ViewIncident";
import Page404 from "../../pages/Page404/Page404";
import PrivateRoute from "../PrivateRoute";

const ViewRoutes = () => {

  return (
    <Routes>
      <Route path="/incident/:id_incident" element={<PrivateRoute forRoles={[0, 1, 2]} children={<ViewIncident />}/>} />
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
};

export default ViewRoutes;