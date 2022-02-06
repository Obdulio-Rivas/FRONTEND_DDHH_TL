import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import Navbar from "../Navbar/Navbar";
import Table from "../Table/Table";

const UsersList = () => {
  const [is_loading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await UserService.getUsers();
      setUsers(response.data);
      setIsLoading(false);
      if (response.is_successful) {
        AuthService.setCurrentUser(response);
      }
    }
    fetchUsers();
  }, []);

  //Craer un archivo de constantes.
  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "urlimage",
      },
      {
        Header: "Nombres",
        accessor: "name",
      },
      {
        Header: "Apellidos",
        accessor: "last_name",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Id",
        accessor: "id_user",
      },
    ],
    []
  );

  if (is_loading) {
    return (
      <>
        <Navbar />
        <div className="container flex flex-wrap flex-row px-6 py-2 mx-auto lg:space-x-4 justify-between">
          <span>Estamos cargando el contenido...</span>
        </div>
      </>
    );
  }

  if (users.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container flex flex-wrap flex-row px-6 py-2 mx-auto lg:space-x-4 justify-between">
          <span>No hay usuarios....</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="container flex flex-wrap flex-col px-6 py-2 mx-auto lg:space-x-4 justify-between">
          <div className="flex flex-wrap flex-row justify-between  w-max">
            <div className="flex">
              <h2>Users</h2>
            </div>
            <div className="flex">
              <Link to={"/newUser"}>Nuevo usuario</Link>
            </div>
          </div>
          <div className="mt-4">
            <Table columns={columns} data={users} options={null} />
          </div>
        </div>
      </>
    );
  }
};

export default UsersList;
