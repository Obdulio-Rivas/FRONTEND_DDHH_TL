import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Generic_Component from "../Generic/Generic_Component";
import Home from "../Home/Home";
import Login from "../Login/Login";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AuthService from "../../services/Auth/Auth.Service.js";

const AplicationRoutes = () => {
  const getAuth = () => {
    return AuthService.getCurrentUser() ? true : false;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/home"
            element={<PrivateRoutes children={<Home />} auth={getAuth()} />}
          />
          <Route
            path="/:module"
            element={
              <PrivateRoutes
                children={<Generic_Component />}
                auth={getAuth()}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AplicationRoutes;
