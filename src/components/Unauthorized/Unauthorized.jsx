import React from "react";
import Navbar from "../Navbar/Navbar";

const Unauthorized = () => {
  return (
    <>
      <Navbar />
      <div
        className={
          "bg-white m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4 justify-center items-center h-auto"
        }
      >
        <img
          className={"w-2/3 mb-4"}
          src={"../../not_allowed.png"}
          alt={"No permitido"}
        />
        <h2 className={"text-3xl text-center"}>
          Uppps lo sentimos, parece que no tienes permiso para ver este módulo,
          póngase en contacto con el administrador.
        </h2>
      </div>
    </>
  );
};

export default Unauthorized;
