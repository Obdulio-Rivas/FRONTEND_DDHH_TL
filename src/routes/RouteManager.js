import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import UserRoutes from "./User/UserRoutes";
import PrivateRoute from "./PrivateRoute";
import FilesRoutes from "./Files/FilesRoutes";
import Profile from "../pages/Profile/Profile";
import About from "../pages/About/About";
import NewIncident from "../pages/Incidents/NewIncident/NewIncident";
import IncidentRoutes from "./Incident/IncidentRoutes";
import Page404 from "../pages/Page404/Page404";
import ViewRoutes from "./Views/ViewRoutes";

const RouteManager = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/test"
            element={<PrivateRoute forRoles={[0, 1, 2]} children={<NewIncident />} />}
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
            path="/files/*"
            element={
              <PrivateRoute forRoles={[0]} children={<FilesRoutes/>} />
            }
          />
          <Route
            exact
            path="/incident/*"
            element={
              <PrivateRoute forRoles={[0]} children={<IncidentRoutes/>} />
            }
          />
          <Route
            exact
            path="/view/*"
            element={
              <PrivateRoute forRoles={[0,1,2]} children={<ViewRoutes/>} />
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
        
          <Route exact path="/*" element={<Page404/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default RouteManager;
