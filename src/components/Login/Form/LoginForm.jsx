import React, {useState} from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import postLogin from "../../../services/POST/postLogin";
import Button from "../../Forms/Button/Button";
import Checkbox from "../../Forms/Checkbox/Checkbox";
import Input from "../../Forms/Input/Input";
import Navbar from "../../Navbar/Navbar";
const LoginForm = () => {

  const [values, setValues] = useState({email: '', password: ''});

  const handlerSubmit = (e) => {
    e.preventDefault();
    //console.log(values)
    postLogin(values);
    return (
      <Navigate to="/navbar"/>
    );
  }

  const handlerChange = (e) => {
    const {value, name} = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }

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
          handlerChange = {handlerChange}
        />
        <Input
          label={"Contraseña"}
          name={"password"}
          type={"password"}
          value={values.password}
          placeholder={"Ingresa tu contraseña"}
          handlerChange = {handlerChange}
        />
        <Checkbox
          id={"show_password"}
          name={"show_password"}
          value={"show_password"}
          label={"Mostrar contraseña."}
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
};

export default LoginForm;
