import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step8 = ({store, handlerStore}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step6: {
        title: "Step8",
        values: data,
      },
    });
    //navigate('/incident/step7');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName8", {required: 'Error'})} />
      <input {...register("lastName8")} />
      <input type="submit" />
    </form>
  );
};

export default Step8;