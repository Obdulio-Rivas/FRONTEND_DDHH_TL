import React from "react";

const RolePill = ({ value = 0 }) => {
  function getRoleName(value) {
    let role = "";
    switch (value) {
      case 0:
        role = "Administrador";
        break;
      case 1:
        role = "Abogado";
        break;
      case 2:
        role = "Asistente";
        break;
      default:
        role = "Unknown";
        break;
    }
    return role;
  }

  return (
    <div className="flex w-full flex-row justify-center">
      <span className="m-auto px-3 py-1 text-base">
        {getRoleName(value)}
      </span>
    </div>
  );
};

export default RolePill;
