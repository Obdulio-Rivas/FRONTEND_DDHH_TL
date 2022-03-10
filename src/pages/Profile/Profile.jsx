import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Dots from "../../components/Loaders/Dots";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import About from "./About";
import Historical from "./Historical";
import Side from "./Side";

const Profile = () => {
  let { id_user } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id_user) {
      setUser(AuthService.getCurrentUser());
    } else {
      async function getUserData(id_user) {
        const response = await UserService.getUser(id_user);
        setUser(response.data[0]);
      }
      getUserData(id_user);
    }
  }, [id_user]);

  if (!user) {
    return (
      <>
        <Navbar />
        <Dots />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-16 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <Side user={user} />

          <div className="w-full md:w-9/12 mx-2 h-64">
            <About user={user} />

            <div className="my-10"></div>

            <Historical user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
