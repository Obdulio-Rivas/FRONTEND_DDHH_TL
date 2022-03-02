import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step6 = ({ handlerStore }) => {
  const [victims, setVictims] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const addVictimToIncident = (data) => {
    let listOfVictims = victims;
    listOfVictims.push({...data}) 
    setVictims(listOfVictims);
    console.log(victims)
    //navigate("/incident/step7");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(addVictimToIncident)}>
          
          <input className="border border-gray-500" {...register("name", { required: "Error" })} />
          <input type="submit" />
        </form>
      </div>
      <div>
        {victims.map((victim) => {
          return <span>{JSON.stringify(victim)}</span>;
        })}
      </div>
    </div>
  );
};

export default Step6;
