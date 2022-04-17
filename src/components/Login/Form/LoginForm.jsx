import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthService from "../../../services/Auth/Auth.Service.js";
import Button from "../../Forms/Button/Button";
import Input from "../../Forms/Input/Input";

const LoginForm = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { email, status } = await AuthService.login(values);
    if (status === 1) {
      navigate("/home");
    } else if (status === 2) {
      console.log(status);
      navigate(`/confirmation/${email}`);
    } else {
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
            Inicia sesión.
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
            type={showPassword ? "text" : "password"}
            value={values.password}
            placeholder={"Ingresa tu contraseña"}
            handlerChange={handleChange}
          />
          <div className={'flex flex-row flex-wrap justify-start items-center'}>
            <input className={'mr-2'} type="checkbox" name="showPassword" id="showPassword" onChange={()=> setShowPassword(!showPassword)}/>
            <label htmlFor="showPassword">Mostrar contraseña</label>
          </div>
          <Button
            value={"Ingresar"}
            type={"submit"}
            btnType={"success"}
            btn_full={true}
          />
          <Link className="font-normal text-center text-slate-600" to={"/recover_password/"}>
            ¿Olvidaste tu contraseña?
          </Link>
        </form>
      </>
    );
  }
};

export default LoginForm;
