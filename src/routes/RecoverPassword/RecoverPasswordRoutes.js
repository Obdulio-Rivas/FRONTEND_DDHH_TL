import React from "react";
import { Routes, Route } from "react-router-dom";
import LogList from "../../pages/Log/LogList";
import ViewLog from "../../pages/Log/ViewLog";

const RecoverPasswordRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<LogList/>} />
    </Routes>
  );
};

export default RecoverPasswordRoutes;