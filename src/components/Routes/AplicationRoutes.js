import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Generic_Component from "../Generic/Generic_Component";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const AplicationRoutes = () => {

  //Session storage.

  return (
      <div>
          <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/navbar" element={<PrivateRoutes children={<Navbar/>} auth={true}/>} />
                <Route exact path="/:module" element={<Generic_Component/>}/>
            </Routes>
        </Router>
      </div>
  );
};


export default AplicationRoutes;