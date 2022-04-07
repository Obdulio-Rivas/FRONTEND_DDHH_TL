import React from "react";

const StatusPill = ({ value = 0 }) => {

  const getStatus = (value) => {
    switch (value) {
      case 0:
        return (
          <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
            Inactivo
          </span>
        );
      case 1:
        return (
          <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
            Activo
          </span>
        );
      case 2:
        return (
          <span className="bg-yellow-500 py-1 px-2 rounded text-white text-sm">
            Pendiente
          </span>
        );
      default:
        return <span></span>;
    }
  };

  return (
    <div className="flex w-full flex-row justify-center">
      {getStatus(value)}
    </div>
  );
};

export default StatusPill;
