import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step6 = ({handlerStore}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step6: {
        title: "Step6",
        values: data,
      },
    });
    navigate('/incident/step7');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName6", {required: 'Error'})} />
      <input {...register("lastName6")} />
      <input type="submit" />
    </form>
  );
};

export default Step6;