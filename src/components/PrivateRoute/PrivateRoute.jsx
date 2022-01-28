import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/Auth/Auth.Service";

const PrivateRoute = ({a, children }) => {
  let authed = AuthService.check_JWT();

  return authed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
