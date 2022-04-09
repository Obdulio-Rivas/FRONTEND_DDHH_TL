import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dots from "../../components/Loaders/Dots";
import Navbar from "../../components/Navbar/Navbar";
import AuthService from "../../services/Auth/Auth.Service";
import { AiOutlineAudit } from "react-icons/ai";
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
      <div className="bg-white border border-slate-300 m-auto rounded px-8 pt-8 mt-10 mb-2 flex flex-col md:w-2/3 sm:w-3/4 w-3/4">
        <div className="flex flex-row items-center justify-start mb-5">
          <AiOutlineAudit className="text-4xl" />
          <h2 className="ml-2 text-3xl">{`Logs #${id_log} - ${log?.title_log}.`}</h2>
        </div>
      </div>
    </>
  );
};

export default ViewIncident;
