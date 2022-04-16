import React, { useEffect } from "react";
import IPHelper from "../../helpers/IP.Helper";
import AuthService from "../../services/Auth/Auth.Service";
import LogService from "../../services/Log/Log.Service";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";

const Unauthorized = () => {

  const params = useLocation();

  useEffect(() => {
    async function registerLogUnauthorizedAccess() {
      //Registramos el resultado del intento de incio de sesion.
      const response = await LogService.postLog({
        id_user: AuthService.getCurrentUser().id_user,
        role_user: AuthService.getCurrentUser().role,
        type_log: "Acceso a modulo",
        title_log: "Intento de acceso a modulo no permitido",
        description: `El usuario ${AuthService.getCurrentUser().email} intento acceder al modulo '${params.pathname}', al cual no tiene acceso por no poseer los privilegios suficientes, por el rol de usuario con el que esta definido.`,
        ip_client: await IPHelper.getPublicIP(),
      });
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    registerLogUnauthorizedAccess();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={
          "bg-white m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4 justify-center items-center h-auto"
        }
      >
        <img
          className={"w-2/3 mb-4"}
          src={"../../not_allowed.png"}
          alt={"No permitido"}
        />
        <h2 className={"text-3xl text-center"}>
          Uppps lo sentimos, parece que no tienes permiso para ver este módulo,
          póngase en contacto con el administrador.
        </h2>
      </div>
    </>
  );
};

export default Unauthorized;
