import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step5 = ({handlerStore}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step5: {
        title: "Step5",
        values: data,
      },
    });
    navigate('/incident/step6');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName5", {required: 'Error'})} />
      <input {...register("lastName5")} />
      <input type="submit" />
    </form>
  );
};

export default Step5;