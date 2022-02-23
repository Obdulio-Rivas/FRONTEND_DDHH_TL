import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Generic from "../components/Generic/Generic";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import UserRoutes from "./User/UserRoutes";
import PrivateRoute from "./PrivateRoute";
import VictimRoutes from "./Victim/VictimRoutes";
import FilesRoutes from "./Files/FilesRoutes";
import Profile from "../pages/Profile/Profile";
import About from "../pages/About/About";

const RouteManager = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/test"
            element={<PrivateRoute forRoles={[0, 1, 2]} children={<Generic />} />}
          />

          <Route
            exact
            path="/home"
            element={<PrivateRoute forRoles={[0, 1, 2]} children={<Home />} />}
          />
          <Route
            path="/users/*"
            element={
              <PrivateRoute forRoles={[0]} children={< UserRoutes />} />
            }
          />
          <Route
            exact
            path="/victim/*"
            element={
              <PrivateRoute forRoles={[0,2]} children={<VictimRoutes/>} />
            }
          />
          <Route
            exact
            path="/files/*"
            element={
              <PrivateRoute forRoles={[0]} children={<FilesRoutes/>} />
            }
          />
          <Route
            exact
            path="/about"
            element={
              <PrivateRoute
                forRoles={[0, 1, 2]} 
                children={<About />}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute
                forRoles={[0, 1, 2]}
                children={<Profile />}
              />
            }
          />
           
        </Routes>
      </Router>
    </div>
  );
};

export default RouteManager;
