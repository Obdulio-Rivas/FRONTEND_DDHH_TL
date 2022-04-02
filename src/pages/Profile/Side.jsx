import React from "react";
import moment from "moment";
import Avatar from "./Avatar";
import Actions from "./Actions";

const Side = ({ user }) => {

  const { id_user, name, last_name, role, status, created_at, url_image } = user;

  const getStatus = (status) => {
    return status === 1 ? (
      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
        Active
      </span>
    ) : (
      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
        Inactivo
      </span>
    );
  };

  const getTypeUser = (role) => {
    let typeUser = "";
    switch (role) {
      case 0:
        typeUser = "Administrador";
        break;
      case 1:
        typeUser = "Abogado";
        break;
      case 2:
        typeUser = "Asistente";
        break;
      default:
        typeUser = "-";
        break;
    }
    return typeUser;
  };

  return (
    <div className="w-full md:w-3/12 md:mx-2 mby-3">
      <div className="bg-white p-3 border-t-4 border-blue-400">
        <Avatar user={user}/>
        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
          {name + " " + last_name}
        </h1>
        <h3 className="text-gray-600 font-lg text-semibold leading-6">
          {getTypeUser(role)}
        </h3>
        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
          -
        </p>
        <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 py-2 px-3 mt-3 divide-y border-gray-200 border-2 rounded-md">
          <li className="flex items-center py-3">
            <span>Status</span>
            <span className="ml-auto">{getStatus(status)}</span>
          </li>
          <li className="flex items-center py-3">
            <span>Miembro desde</span>
            <span className="ml-auto">
              {moment(created_at).format("DD-MM-YYYY")}
            </span>
          </li>
          <Actions user={user}/>
        </ul>
      </div>
    </div>
  );
};

export default Side;
