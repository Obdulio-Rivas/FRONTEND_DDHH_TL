import React from "react";
import { Routes, Route } from "react-router-dom";
import Files from "../../pages/Files/Files";

const UserRoutes = () => {

  

  return (
    <Routes>
      <Route path="/" element={<Files/>} />
      <Route path="/:fullPath" element={<Files />} />
      <Route path="*" element={'Null'} />
    </Routes>
  );
};

export default UserRoutes;