import React from "react";

const StatusPill = ({ value = 0 }) => {

  function getStatusName(value) {
    let status = "";
    switch (value) {
      case 0:
        status = "Inactivo";
        break;
      case 1:
        status = "Activo";
        break;
      default:
        status = "Unknown";
        break;
    }
    return status;
  }

  return <div className="flex w-full flex-row justify-center">
    <span className={`m-auto px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm text-white bg-${value ? 'green' : 'red'}-500`}>{getStatusName(value)}</span>
  </div>;
};

export default StatusPill;
