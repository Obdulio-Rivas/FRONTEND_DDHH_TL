import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const GenericComponent = () => {
  let { module } = useParams();
 
  return (
    <>
      <Navbar/>
      <div>{module}</div>
    </>
  );
};

export default GenericComponent;
