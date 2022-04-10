import React from "react";
import { Routes, Route } from "react-router-dom";
import Formats from "../../pages/Formats/Formats";

const FormatsRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Formats/>} />
      <Route path="*" element={<Formats />} />
    </Routes>
  );
};

export default FormatsRoutes;