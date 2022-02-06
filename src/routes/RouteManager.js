import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Generic from "../components/Generic/Generic";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import UserRoutes from "./User/UserRoutes";
import PrivateRoute from "./PrivateRoute";
import VictimRoutes from "./Victim/VictimRoutes";

const RouteManager = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/test"
            element={<PrivateRoute forRoles={[1, 2, 3]} children={<Generic />} />}
          />
          <Route
            exact
            path="/home"
            element={<PrivateRoute forRoles={[1, 2, 3]} children={<Home />} />}
          />
          <Route
            path="/users/*"
            element={
              <PrivateRoute forRoles={[1]} children={< UserRoutes />} />
            }
          />
          <Route
            exact
            path="/victim/*"
            element={
              <PrivateRoute forRoles={[3]} children={<VictimRoutes/>} />
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

export default RouteManager;
