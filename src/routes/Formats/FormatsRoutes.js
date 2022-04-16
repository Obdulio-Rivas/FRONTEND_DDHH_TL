import React from "react";
import { Routes, Route } from "react-router-dom";
import Formats from "../../pages/Formats/Formats";
import PrivateRoute from "../PrivateRoute";

const FormatsRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Formats/>} />
      <Route path="/upload" element={<PrivateRoute forRoles={[0]} children={<Formats/>}/>} />
      <Route path="*" element={<Formats />} />
    </Routes>
  );
};

export default FormatsRoutes;