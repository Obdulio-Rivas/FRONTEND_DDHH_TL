import React from "react";
import { Routes, Route } from "react-router-dom";
import LogList from "../../pages/Log/LogList";
import ViewLog from "../../pages/Log/ViewLog";

const LogRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<LogList/>} />
      <Route path="/:id_log" element={<ViewLog/>} />
      <Route path="*" element={<LogList />} />
    </Routes>
  );
};

export default LogRoutes;