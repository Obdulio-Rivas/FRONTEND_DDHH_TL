import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step3 = ({handlerStore}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step3: {
        title: "Step3",
        values: data,
      },
    });
    navigate('/incident/step4');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName3", {required: 'Error'})} />
      <input {...register("lastName3")} />
      <input type="submit" />
    </form>
  );
};

export default Step3;