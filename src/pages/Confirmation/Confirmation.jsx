import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Login/Footer/Footer";

const Confirmation = () => {
  
  let { email } = useParams();

  return (
    <div className="container mx-auto my-16 py-5">
      <div className="flex flex-wrap justify-between items-start w-full mt-10">
        <div className="flex flex-row item w-1/3 flex-auto justify-start items-start">
          <div>
            <h1 className="flex flex-row text-6xl m-auto mt-4 font-medium text-gray-700 leading-snug">
            Upppppps, parece que aun no has confirmado tu correo!
            </h1>
            <p className="text-2xl mt-3 font-normal text-gray-500 leading-tight">
              Confirma tu correo dando click al enlace que te hemos enviado a la direccion <b>{email}</b>, para poder continuar.
            </p>
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
      <div className="mt-10"><Footer/></div>
    </div>
  );
};

export default Confirmation;
