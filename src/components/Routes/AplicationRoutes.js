import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Generic_Component from "../Generic/Generic_Component";
import Home from "../Home/Home";
import Login from "../Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const AplicationRoutes = () => {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute
                children={<Home />}
              />
            }
          />
          <Route
            exact
            path="/about"
            element={
              <PrivateRoute
                children={<Generic_Component />}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute
                children={<Generic_Component />}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AplicationRoutes;
