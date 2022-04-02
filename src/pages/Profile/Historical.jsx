import React, { useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineFolder } from "react-icons/ai";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Loaders/Skeleton";
import IncidentService from "../../services/Incident/Incident.Service";

const Historical = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);

  const getIncidentType = (id_type_incident) => {
    return "Incidente de tipo x.";
  };

  useEffect(() => {
    async function getIncidentsOfUser(id_user) {
      const response = await IncidentService.getIncidentsByUser(id_user);
      setIncidents(response.data);
      setIsLoading(false);
    }
    getIncidentsOfUser(user.id_user);
  }, []);

  if (isLoading) {
    return (
      <div className="flex bg-white p-6 border-gray-200 border-2 rounded-md">
        <div className="w-full">
          <div>
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
              <span clas="text-green-500">
                <AiOutlineFolder className={"text-2xl"} />
              </span>
              <span className="tracking-wide text-xl">Cargando contenido...</span>
            </div>
            <Skeleton elements={(Math.random() * (5 - 1) + 1)}/>
          </div>
        </div>
      </div>
    );
  }

  if (!incidents?.length) {
    return (
      <div className="bg-white p-6 border-gray-200 border-2 rounded-md">
        <div className="w-full">
          <div>
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
              <span clas="text-green-500">
                <AiOutlineFolder className={"text-2xl"} />
              </span>
              <span className="tracking-wide text-xl">Ultimos Incidentes</span>
            </div>
            <span>No se han encontrado incidentes registrados por este usuario.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 border-gray-200 border-2 rounded-md">
      <div className="w-full">
        <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
            <span clas="text-green-500">
              <AiOutlineFolder className={"text-2xl"} />
            </span>
            <span className="tracking-wide text-xl">Ultimos Casos</span>
          </div>
          <ul className="list-inside space-y-2 px-4 divide-y divide-slate-300 divide-dashed">
            {incidents.map(
              (
                { id_incident, id_type_incident, expediente, created_at },
                index
              ) => {
                if (index === 5) {
                  return null;
                }

                return (
                  <li key={index} className="pt-4 pb-2">
                    <div className="text-teal-600">
                      <div className="flex flex-row items-center">
                        <AiOutlineFileText className="mr-2 text-gray-700 text-xl" />
                        <Link
                          to={`/view/incident/${id_incident}`}
                          className="font-semibold text-slate-700 text-lg"
                        >{`${expediente} - ${getIncidentType(
                          id_type_incident
                        )}`}</Link>
                      </div>
                    </div>
                    <div className="text-gray-500 text-md">
                      {created_at.split("T")[0]}
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Historical;
