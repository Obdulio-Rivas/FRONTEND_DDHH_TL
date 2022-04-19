import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/Auth/Auth.Service";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-16 py-5">
        <div className="flex flex-wrap justify-between items-start w-full">
          <div className="flex flex-row item w-1/3 flex-auto justify-start items-start">
            <div>
              <h1 className="flex flex-row text-6xl m-auto mt-4 font-medium text-gray-700 leading-snug">
                Hola {AuthService.getCurrentUser()?.name},{" "}
                {`${
                  AuthService.getCurrentUser()?.genre
                    ? "bienvenido"
                    : "bienvenida"
                }`}{" "}
                a Legalística!
              </h1>
              <p className="text-2xl mt-3 font-normal text-gray-500 leading-tight">
                Sabemos lo importante que es tu tiempo, asi que aquí tienes
                algunas opciones rápidas.
              </p>
              <div className="mt-10">
                <Link
                  to={"/incident/step1"}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
                >
                  <span>Registrar Incidente</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="item w-2/3 flex-auto">
            <img
              className="object-contain h-full w-full max-w-xl m-auto"
              src="../PAPER_PET.png"
              alt="IMG PAPER PET"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
