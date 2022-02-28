import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step4 = ({handlerStore}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step4: {
        title: "Step4",
        values: data,
      },
    });
    navigate('/incident/step5');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName4", {required: 'Error'})} />
      <input {...register("lastName4")} />
      <input type="submit" />
    </form>
  );
};

export default Step4;