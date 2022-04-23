import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../components/Login/Login";
import UserRoutes from "./User/UserRoutes";
import PrivateRoute from "./PrivateRoute";
import FilesRoutes from "./Files/FilesRoutes";
import Profile from "../pages/Profile/Profile";
import About from "../pages/About/About";
import IncidentRoutes from "./Incident/IncidentRoutes";
import Page404 from "../pages/Page404/Page404";
import ViewRoutes from "./Views/ViewRoutes";
import DashboardRoutes from "./Dashboard/DashboardRoutes";
import Confirmation from "../pages/Confirmation/Confirmation";
import LogRoutes from "./Log/LogRoutes";
import FormatsRoutes from "./Formats/FormatsRoutes";
import RecoverPassword from "../pages/RecoverPassword/RecoverPassword";
import Directory from "../pages/Directory/Directory";

const RouteManager = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/recover_password" element={<RecoverPassword />} />
          <Route
            exact
            path="/home"
            element={<PrivateRoute forRoles={[0, 1, 2]} children={<Home />} />}
          />
          <Route
            path="/users/*"
            element={<PrivateRoute forRoles={[0]} children={<UserRoutes />} />}
          />
          <Route
            exact
            path="/files/*"
            element={<PrivateRoute forRoles={[0]} children={<FilesRoutes />} />}
          />
          <Route
            exact
            path="/incident/*"
            element={
              <PrivateRoute forRoles={[0, 1]} children={<IncidentRoutes />} />
            }
          />
          <Route
            exact
            path="/formats/*"
            element={
              <PrivateRoute forRoles={[0, 1]} children={<FormatsRoutes />} />
            }
          />
          <Route
            exact
            path="/view/*"
            element={
              <PrivateRoute forRoles={[0, 1, 2]} children={<ViewRoutes />} />
            }
          />
          <Route
            exact
            path="/dashboard/*"
            element={
              <PrivateRoute
                forRoles={[0]}
                children={<DashboardRoutes />}
              />
            }
          />
          <Route
            exact
            path="/log/*"
            element={
              <PrivateRoute
                forRoles={[0]}
                children={<LogRoutes />}
              />
            }
          />
          <Route
            exact
            path="/about"
            element={<PrivateRoute forRoles={[0, 1, 2]} children={<About />} />}
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute forRoles={[0, 1, 2]} children={<Profile />} />
            }
          />
          <Route
            exact
            path="/directory"
            element={
              <PrivateRoute forRoles={[0, 1, 2]} children={<Directory />} />
            }
          />
          <Route exact path="/confirmation/:email" element={<Confirmation/>} />
          <Route exact path="/*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RouteManager;
