import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Generic_Component = () => {
  let { module } = useParams();

  return (
    <>
      <Navbar/>
      <div>{module}</div>
    </>
  );
};

export default Generic_Component;
