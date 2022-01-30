import React, { useState, useEffect } from "react";
import UserService from "../../services/User/User.Service";

const UsersList = () => {
  const [is_loading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      // You can await here
      const response = await UserService.getUsers();
      console.log(response.data);
      setUsers(response.data);
      setIsLoading(false);
      // ...
    }
    fetchUsers();
  }, []);

  if (is_loading) {
    return <div className="container flex flex-wrap flex-row px-6 py-2 mx-auto lg:space-x-4 justify-between">
        <span>Estamos cargando el contenido...</span>
    </div>;
  }

  if (users.length === 0) {
    return <div className="container flex flex-wrap flex-row px-6 py-2 mx-auto lg:space-x-4 justify-between">
        <span>No hay usuarios....</span>
    </div>;
  } else {
    return (
      <div className="container flex flex-wrap flex-col px-6 py-2 mx-auto lg:space-x-4 justify-between">
        <div className="flex flex-wrap flex-row justify-between  w-max">
          <div className="flex">
            <h2>Users</h2>
          </div>
          <div className="flex">
            <a href="/newUser">Nuevo usuario</a>
          </div>
        </div>
        <div className="flex flex-wrap flex-col w-max">
          {users?.map(({id_user, name, last_name, status}) => (
            <div key={id_user}>{name} {last_name} {status === 1 ? 'Activo': 'Inactivo'}</div>
          ))}
        </div>
      </div>
    );
  }
};

export default UsersList;
