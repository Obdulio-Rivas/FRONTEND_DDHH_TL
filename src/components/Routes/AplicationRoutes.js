import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Generic from "../Generic/Generic";
import Home from "../Home/Home";
import Login from "../Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import User from "../User/User";

const AplicationRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/home"
            element={<PrivateRoute forRoles={[1, 2, 3]} children={<Home />} />}
          />
          <Route
            exact
            path="/users"
            element={
              <PrivateRoute forRoles={[1]} children={< User />} />
            }
          />
          <Route
            exact
            path="/about"
            element={
              <PrivateRoute
                forRoles={[1, 2, 3]}
                children={<Generic />}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute
                forRoles={[1, 2, 3]}
                children={<Generic />}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AplicationRoutes;
