import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

/*const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  age: yup.number().required().positive().integer(),
  website: yup.string().url(),
});*/

const Step1 = ({handlerStore}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();


  const onSubmit = (data) => {
    handlerStore(data);
    navigate('/incident/step2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", {required: 'Error'})} />
      <input {...register("lastName")} />
      <input type="submit" />
    </form>
  );
};

export default Step1;