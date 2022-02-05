import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Table from "../Table/Table";

const countries = [
  {
    id: 1,
    name: "Poland",
    language: "Polish",
    capital: "Warsaw",
  },
  {
    id: 2,
    name: "Bulgaria",
    language: "Bulgarian",
    capital: "Sofia",
  },
  {
    id: 3,
    name: "Hungary",
    language: "Hungarian",
    capital: "Budapest",
  },
  {
    id: 4,
    name: "Moldova",
    language: "Moldovan",
    capital: "Chișinău",
  },
  {
    id: 5,
    name: "Austria",
    language: "German",
    capital: "Vienna",
  },
  {
    id: 6,
    name: "Lithuania",
    language: "Lithuanian",
    capital: "Vilnius",
  },
];

const GenericComponent = () => {
  let { module } = useParams();
 
  return (
    <>
      <Navbar/>
      <div>
        <Table data={countries} rowsPerPage={4} />
      </div>
    </>
  );
};

export default GenericComponent;
