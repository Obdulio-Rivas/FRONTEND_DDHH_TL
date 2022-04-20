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
          <span className="bg-blue-500 py-1 px-2 rounded text-white text-sm">
            Verificado
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