import React from "react";
import { BrowserRouter as Router,HashRouter,Link, NavLink, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const AplicationRoutes = () => {
  return (
      <div>
          <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/navbar" element={<PrivateRoutes children={<Navbar/>} auth={false}/>} />
            </Routes>
        </Router>
      </div>
  );
};


export default AplicationRoutes;