import React from "react";

const StatusIncident = ({ value = 0 }) => {

  const getStatusIncident = (value) => {
    switch (value) {
      case 0:
        return (
          <span className="bg-yellow-500 py-1 px-2 rounded text-white text-sm">
            Pendiente 
          </span>
        );
      case 1:
        return (
          <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
            En Curso
          </span>
        );
      case 2:
        return (
          <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
            Finalizado
          </span>
        );
      default:
        return <span></span>;
    }
  };

  return (
    <div className="flex w-full flex-row justify-center">
      {getStatusIncident(value)}
    </div>
  );
};

export default StatusIncident;