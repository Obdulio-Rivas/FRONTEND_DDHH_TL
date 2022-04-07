import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../../../services/Auth/Auth.Service.js";
import Button from "../../Forms/Button/Button";
import Input from "../../Forms/Input/Input";

const LoginForm = () => {
  let navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const {email, status} = await AuthService.login(values);
    if (status === 1) {
      navigate("/home");
    }else if (status === 2){
      console.log(status);
      navigate(`/confirmation/${email}`);
    }else{
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  if (AuthService.getCurrentUser()) {
    return <Navigate to="/home" />;
  } else {
    return (
      <>
        <div className=" block w-full h-fit mb-10">
          <h2 className="text-left xl:text-5xl lg:text-4xl capitalize font-bold">
            Inicia sesion.
          </h2>
        </div>
        <form className="block w-full" action="#" onSubmit={handlerSubmit}>
          <Input
            label={"Email"}
            name={"email"}
            type={"text"}
            value={values.email}
            placeholder={"Ingresa tu email"}
            handlerChange={handleChange}
            message={"El correo es requerido."}
          />
          <Input
            label={"Contraseña"}
            name={"password"}
            type={"password"}
            value={values.password}
            placeholder={"Ingresa tu contraseña"}
            handlerChange={handleChange}
          />
          <Button
            value={"Ingresar"}
            type={"submit"}
            btnType={"success"}
            btn_full={true}
          />
        </form>
      </>
    );
  }
};

export default LoginForm;
