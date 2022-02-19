import React, { useState, useEffect, useMemo } from "react";
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
        AuthService.updateJwtUser(response);
      }
    }
    fetchUsers();
  }, []);

  //Craer un archivo de constantes.
  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "url_image",
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
        Header: "Estado",
        accessor: "status",
      },
      {
        Header: "Acciones",
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
        <div className="container mx-auto my-4 min-h-full pt-4 text-gray-900">
          <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-4 pt-4">
            <div className="">
              <h1 className="text-xl font-semibold">
                User Tables
              </h1>
            </div>
            <div className="mt-4">
              <Table columns={columns} data={users} options={null} />
            </div>
          </main>
        </div>
      </>
    );
  }
};

export default UsersList;
