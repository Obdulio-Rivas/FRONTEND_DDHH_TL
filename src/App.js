import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import  PrivateRoutes  from "./components/PrivateRoutes/PrivateRoutes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route exact path="/" element={<Login/>}/>
           {/*<Route exact path="/navbar" element={<Navbar/>}/>*/}
           {/*<PrivateRoutes exact path="/navbar" element={<Navbar/>}/>*/}
        </Routes>
      </div>
    </Router>
    //Navbar
    
    //
  );
}

export default App;
