import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/navbar" exact element={<Navbar/>}/>
        </Routes>
      </div>
    </Router>
    //Navbar
    
    //
  );
}

export default App;
