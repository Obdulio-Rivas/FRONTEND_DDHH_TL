import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Confirmation from "../../pages/Confirmation/Confirmation";
import Page404 from "../../pages/Page404/Page404";
import AuthService from "../../services/Auth/Auth.Service";

const EmailRoutes = ({user}) => {

  useEffect(() => {
    if (!user?.id_user) {
      AuthService.logout();
      //AuthService.getCurrentUser()
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Confirmation />} />
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
};

export default EmailRoutes;
