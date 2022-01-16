import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import  PrivateRoutes  from "./components/PrivateRoutes/PrivateRoutes";
import AplicationRoutes from "./components/Routes/AplicationRoutes";
function App() {
  return (

    <AplicationRoutes/>

  );
}

export default App;
