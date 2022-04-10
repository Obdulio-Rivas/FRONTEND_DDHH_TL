import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Dots from "../../components/Loaders/Dots";
import Navbar from "../../components/Navbar/Navbar";
import AuthService from "../../services/Auth/Auth.Service";
import { RiFileList3Line } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import LogService from "../../services/Log/Log.Service";

const ViewIncident = () => {
  let { id_log } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [log, setLog] = useState([]);

  useEffect(() => {
    async function getIncidentsOfUser(id_log) {
      const response = await LogService.getLog(id_log);
      setLog(!!response?.data ? response?.data[0] : null);
      setIsLoading(false);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    getIncidentsOfUser(id_log);
  }, [id_log]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Dots />
      </>
    );
  }

  if (!log) {
    return (
      <>
        <Navbar />
        <span>{`No se encotro un log con identificado #${id_log}.`}</span>
      </>
    );
  }

  const getMonthName = (monthNumber) => {
    return [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ][monthNumber];
  };

  return (
    <>
      <Navbar />
      <div className="bg-white border border-slate-300 m-auto rounded px-8 pt-8 mt-10 mb-2 flex flex-col md:w-2/3 sm:w-3/4 w-3/4 min-h-fit">
        <div className="flex flex-row items-center justify-start mb-5">
          <RiFileList3Line className="text-4xl" />
          <h1 className="ml-2 text-3xl font-semibold">{`Logs #${log?.id_log} - ${log?.type_log}.`}</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">{log?.title_log}.</h2>
          <p className="text-xl font-normal mb-2 text-gray-800">
            <span className="font-semibold text-gray-900">Descripción:</span>
            {` ${log?.description}`}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Dirección IP:</span>
            {` ${log?.ip_client}`}</p>
        </div>
        <div className={'flex flex-row justify-between py-4'}>
          <div>
            <Link
              to={`/users/profile/${log?.id_user}`}
              className={'flex flex-row justify-start items-center text-base bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white'}
            >
              <ImProfile/>
              <span className={'ml-2'}>{`Perfil del usuario`}</span>
            </Link>
          </div>
          <div className={'flex flex-row justify-center items-center transition duration-1000'}>
            <small>{`Registrado: ${log?.created_at.split('T')[0]}`}</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIncident;
