import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/Auth/Auth.Service";
import Unauthorized from "../Unauthorized/Unauthorized";

const PrivateRoute = ({ forRoles, children }) => {
  let authed = AuthService.check_JWT();
  let userRole = AuthService.getCurrentUser() ? AuthService.getCurrentUser().role : 0;


  if (authed) {
    if (forRoles?.includes(userRole)) {
      return children;
    }else{
      return <Unauthorized/>
    }
  } else {
    AuthService.logout();
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
