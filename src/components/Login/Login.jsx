import React from "react";
import { BiCopyright } from "react-icons/bi";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import Button from "../Forms/Button/Button";
import Checkbox from "../Forms/Checkbox/Checkbox";
import Input from "../Forms/Input/Input";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const Login = () => {
  return (
    <Router>
      <div className="lg:h-screen lg:w-screen flex flex-wrap lg:flex-nowrap">
        <div className="flex justify-center w-screen h-max lg:h-screen p-4">
          <div className="flex flex-row flex-wrap self-center h-5/6 w-10/12 max-w-full">
            <img
              className="sm:h-16 md:h-20 lg:h-28 self-center"
              src="./legalistica_logo.png"
              alt="logo"
            />
            <div className="hidden lg:flex">
              <h1 className="text-left xl:text-7xl lg:text-6xl uppercase font-bold">
                <span>Gestiona tus documentos</span>
                <br />
                <span style={{ color: "#4975E9" }}>legales</span>
              </h1>
            </div>
            <p className="hidden lg:flex self-start text-2xl">
              Almacena todos tus recursos dentro de un sistema que te permita
              llevarlos a todos lados, respaldando tus documentos en la nube.
            </p>
            <div className="hidden lg:flex justify-center justify-items-center">
              <span className="flex flex-row text-center self-center">
                <BiCopyright className="self-center text-lg mr-2" />
                <p className="text-sm">
                  2022 Derechos Reservados | Redes sociales
                </p>
                <Link to="/" className="cursor-pointer self-center text-lg mx-2">
                  <BsFacebook />
                </Link>
                <Link to="/" className="cursor-pointer self-center text-lg mx-2">
                  <BsInstagram />
                </Link>
                <Link to="/" className="cursor-pointer self-center text-lg mx-2">
                  <BsLinkedin />
                </Link>
                <Link to="/" className="cursor-pointer self-center text-lg mx-2">
                  <BsTwitter />
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap w-screen h-screen p-4">
          <div className="block m-auto h-4/6 w-6/12 max-w-full">
            <div className=" block w-full h-fit mb-10">
              <h2 className="text-left xl:text-5xl lg:text-4xl capitalize font-bold">
                Inicia sesion.
              </h2>
            </div>
            <form className="block w-full" action="">
              <Input
                label={"Email"}
                name={"email"}
                type={"text"}
                placeholder={"Ingresa tu email"}
              />
              <Input
                label={"Contraseña"}
                name={"password"}
                type={"password"}
                placeholder={"Ingresa tu contraseña"}
              />
              <Checkbox />
              <Button value={"Ingresar"} type={"submit"} btnType={"success"} btn_full={true}/>
            </form>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Login;
