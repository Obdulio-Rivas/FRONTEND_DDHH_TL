import React, { useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineFolder } from "react-icons/ai";
import { Link } from "react-router-dom";
import Skeleton from "../../../components/Loaders/Skeleton";
import IncidentService from "../../../services/Incident/Incident.Service";

const LatestIncidents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function getLastIncidentsCreated() {
      const response = await IncidentService.getIncidents();
      setIncidents(response.data);
      setIsLoading(false);
    }
    getLastIncidentsCreated();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
            <span clas="text-green-500">
              <AiOutlineFolder className={"text-2xl"} />
            </span>
            <span className="tracking-wide text-xl">Cargando contenido...</span>
          </div>
          <Skeleton elements={Math.random() * (5 - 1) + 1} />
        </div>
      </div>
    );
  }

  if (!incidents?.length) {
    return (
      <div className="w-full">
        <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
            <span clas="text-green-500">
              <AiOutlineFolder className={"text-2xl"} />
            </span>
            <span className="tracking-wide text-xl">Ultimos Incidentes</span>
          </div>
          <span>
            No se han encontrado incidentes registrados por este usuario.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
          <span clas="text-green-500">
            <AiOutlineFolder className={"text-2xl"} />
          </span>
          <span className="tracking-wide text-xl">Ultimos Incidentes</span>
        </div>
        <ul className="list-inside space-y-2 px-4 divide-y divide-slate-300 divide-dashed">
          {incidents.map(
            (
              { id_incident, id_type_incident, expediente, created_at },
              index
            ) => {
              if (index > 5) {
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
                      >{expediente}</Link>
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
  );
};

export default LatestIncidents;
