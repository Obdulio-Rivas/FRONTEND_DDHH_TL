import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/Forms/Inputs/Input";
import AuthService from "../../services/Auth/Auth.Service.js";

const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("-");

  const onSubmit = async (data) => {
    const response = await AuthService.recoverUserPassword(data);
    if (response.is_successful) {
      reset();
      AuthService.updateJwtUser(response);
      setMsg("Hemos enviado un mensaje a tu correo, con los pasos a seguir.");
    } else {
      setMsg(
        "Uuuuups, no ha sido posible restablecer tu contraseña, contacta al administrador."
      );
    }
  };

  const handlerClick = () => {
    navigate("/");
  };

  if (AuthService.getCurrentUser()) {
    return <Navigate to="/home" />;
  } else {
    return (
      <>
        <div
          className={
            "flex flex-row flex-wrap justify-center items-center bg-slate-100 h-screen"
          }
        >
          <form
            className="bg-white border border-slate-300 m-auto rounded px-8 py-8 flex flex-col w-6/6 sm:w-5/6 md:w-2/6 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center justify-start mb-4">
              <h2 className="text-4xl font-semibold">Hey, no te preocupes.</h2>
            </div>
            <div className="flex flex-row items-center justify-start mb-4">
              <p className="text-xl font-normal">
                Estamos aquí para ayudarte a recuperar tu contraseña. Ingrese la
                dirección de correo electrónico que utilizó cuando se unió y tu
                DUI, le enviaremos instrucciones para restablecer su contraseña.
              </p>
            </div>
            <div className="-mx-3 md:flex">
              <div className="md:w-full px-3 md:mb-0">
                <Input
                  label={"Ingresa tu correo"}
                  name={"email"}
                  type={"text"}
                  placeholder={"usuario@mail.com"}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="md:w-full px-3 md:mb-0">
                <Input
                  label={"Ingresa tu DUI"}
                  name={"dui"}
                  type={"text"}
                  placeholder={"Numero de DUI"}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3 mb-6 md:mb-0">
                <span className={'text-sm text-slate-400'}>{msg}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between -mx-0.5 md:flex mb-2">
              <div onClick={() => handlerClick()}>
                <div className="flex flex-row items-center bg-slate-200 border border-slate-300 rounded-md px-4 py-3 text-lg cursor-pointer">
                  <span className="text-slate-600 h-full">Regresar</span>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
                type="submit"
                value={"Enviar"}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default RecoverPassword;
