import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step2 = ({ handlerStore }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step2: {
        title: "Step2",
        values: data,
      },
    });
    navigate("/incident/step3");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName2", { required: "Error" })} />
      <input {...register("lastName2")} />
      <input type="submit" />
    </form>
  );
};

export default Step2;
