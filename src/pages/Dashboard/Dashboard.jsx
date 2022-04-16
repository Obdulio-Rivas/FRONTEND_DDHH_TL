import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import PlatformLogins from "./Charts/PlatformLogins";
import UsersStatus from "./Charts/UsersStatus";
import IncidentCreated from "./Charts/IncidentCreated";
import AuthService from "../../services/Auth/Auth.Service";
import LatestIncidents from "./Charts/LatestIncidents";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-12 mb-14">
        <div className="md:flex no-wrap md:-mx-2 flex-col w-full">
          <div className="mb-2">
            <h1 className="text-4xl font-bold text-slate-800">
              Hola, {AuthService.getCurrentUser()?.name + "!"}
            </h1>
          </div>
          <div className="mb-3">
            <h1 className="text-lg text-slate-800">
              Estas son las ultimas metricas de uso de la plataforma.
            </h1>
          </div>
          <div className="grid overflow-hidden grid-lines lg grid-cols-12 grid-rows-12 gap-4">
            <div className="box row-start-1 row-end-3 col-start-1 col-end-5 border border-solid border-gray-300 rounded-md justify-center items-center p-6">
              <UsersStatus />
            </div>
            <div className="box row-start-1 row-end-3 col-start-5 col-end-12 border border-solid border-gray-300 rounded-md justify-center items-center p-6">
              <PlatformLogins />
            </div>
            <div className="box row-start-3 row-end-6 col-start-1 col-end-9 border border-solid border-gray-300 rounded-md justify-center items-center p-6">
              <IncidentCreated/>
            </div>
            <div className="box row-start-3 row-end-6 col-start-9 col-end-12 border border-solid border-gray-300 rounded-md justify-center items-center p-6">
              <LatestIncidents/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
