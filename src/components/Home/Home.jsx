import React from "react";
import Navbar from "../Navbar/Navbar";

const Home = () => {

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-16 p-5">
        <div className="flex flex-col no-wrap md:-mx-2 ">
          <img className="sm:w-3/4 md:h-5/6 lg:w-4/12 m-auto" src="../PAPER_PET.png" alt="IMG PAPER PET" />
          <h1 className="text-4xl m-auto mt-4 font-medium text-gray-700">Bienvenido a Legalistica!</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
