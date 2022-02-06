import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AuthService from "../../services/Auth/Auth.Service";
import About from "./About";
import Historical from "./Historical";
import Side from "./Side";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  if (!user) {
    return (
        <>
          <Navbar />
          <div className="container mx-auto my-16 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              Cargando informacion de perfil...
            </div>
          </div>
        </>
      );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-16 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <Side user={user}/>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <About user={user}/>

            <div className="my-10"></div>

            <Historical user={user}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
