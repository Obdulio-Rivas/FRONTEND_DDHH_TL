import React, { useState, useEffect, useMemo } from "react";
import toast, {Toaster} from "react-hot-toast";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import Navbar from "../../components/Navbar/Navbar";

import { useTable, usePagination, useSortBy } from "react-table";
import { MdRemoveCircle } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import RolePill from "../../components/Table/RolePill/RolePill";
import StatusPill from "../../components/Table/StatusPill/StatusPill";
import Pagination from "../../components/Table/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import Dots from "../../components/Loaders/Dots";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [is_loading, setIsLoading] = useState(true);
  const [userSelected, setUserSelected] = useState(null);

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

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (value) => {
    async function getUserData(id_user) {
      const response = await UserService.getUser(id_user);
      setUserSelected(response.data[0]);
      setIsOpen(true);
    }
    getUserData(value);
  };

  const handlerActionOK = () => {
    async function deleteUser() {
      const response = await UserService.deleteUser(userSelected.id_user);
      setUserSelected(response.data[0]);
      if (response.is_successful) {
        setIsOpen(false);
        AuthService.updateJwtUser(response);
        let remainingUsers = [];
        remainingUsers = users.filter(
          (element) => element.id_user !== userSelected.id_user
        );
        setUsers(remainingUsers);
        toast.success(`Usuario removido con exito!`, {
          position: "bottom-center",
        });
      } else {
        toast.error(`No fue posible remover al usuario!`, {
          position: "bottom-center",
        });
      }
    }
    deleteUser();
  };

  const handlerActionAbort = () => {
    toast.success('Se cancelo correctamente la accion.', {
      icon: '',
      position: "bottom-center",
    });
    setIsOpen(false);
  };

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

  const data = useMemo(() => users, [users]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  if (is_loading) {
    return (
      <>
        <Navbar />
        <Dots />
      </>
    );
  }

  if (users.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container flex mx-auto my-16 p-5 h-full w-full justify-center">
          <div className="md:flex no-wrap md:-mx-2 ">
            <span>Uppps no hemos encontrado resultados...</span>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Toaster />
        <Navbar />
        <div className="bg-white border border-slate-300 m-auto rounded px-8 pt-8 mt-14 mb-2 flex flex-col md:w-2/3 sm:w-3/4 w-3/4">
          <div className="flex flex-row items-center justify-start mb-5">
            <FiUsers className="text-4xl" />
            <h2 className="ml-2 text-3xl">Usuarios en el sistema.</h2>
          </div>
          <main className="max-w-full">
            <div className="mb-2 flex flex-col">
              <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-4">
                <table
                      {...getTableProps()}
                      className="min-w-full divide-y divide-gray-200"
                    >
                      <thead className="bg-gray-50">
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th
                                scope="col"
                                className="mx-auto py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                )}
                              >
                                {column.render("Header")}
                                <span>
                                  {column.isSorted
                                    ? column.isSortedDesc
                                      ? " ▼"
                                      : " ▲"
                                    : ""}
                                </span>
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody
                        className="bg-white divide-y divide-gray-200"
                        {...getTableBodyProps()}
                      >
                        {page.map((page, i) => {
                          prepareRow(page);
                          return (
                            <tr {...page.getRowProps()}>
                              {page.cells.map((cell) => {
                                switch (cell.column.id) {
                                  case "url_image":
                                    return (
                                      <td {...cell.getCellProps()}>
                                        <img
                                          className="rounded-full w-8 h-8 max-h-8 border-2 border-slate-200 object-cover m-auto"
                                          src={cell.value}
                                          alt="user avatar"
                                        />
                                      </td>
                                    );
                                  case "role":
                                    return (
                                      <td {...cell.getCellProps()}>
                                        <RolePill value={cell.value} />
                                      </td>
                                    );
                                  case "status":
                                    return (
                                      <td {...cell.getCellProps()}>
                                        <StatusPill value={cell.value} />
                                      </td>
                                    );
                                  case "id_user":
                                    return (
                                      <td {...cell.getCellProps()}>
                                        <div className="flex w-full flex-row justify-center">
                                          <Link
                                            className={`text-xl mx-2 text-gray-600`}
                                            to={`profile/${cell.value}`}
                                          >
                                            <ImProfile />
                                          </Link>
                                          <Link
                                            className={`text-xl mx-2 text-gray-600`}
                                            to={`updateUser/${cell.value}`}
                                          >
                                            <BiEdit />
                                          </Link>
                                          <button
                                            onClick={() => {
                                              openModal(cell.value);
                                            }}
                                          >
                                            <MdRemoveCircle />
                                          </button>
                                        </div>
                                      </td>
                                    );

                                  default:
                                    return (
                                      <td
                                        className="mx-auto py-4 text-center whitespace-nowrap"
                                        {...cell.getCellProps()}
                                      >
                                        {cell.render("Cell")}
                                      </td>
                                    );
                                }
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  {/* Paginacion */}
                  <Pagination
                    previousPage={previousPage}
                    nextPage={nextPage}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    state={state}
                    pageOptions={pageOptions}
                    setPageSize={setPageSize}
                    gotoPage={gotoPage}
                    pageCount={pageCount}
                  />
                </div>
              </div>
            </div>
            <Modal
                modaltype={"eliminar"}
                title={"Eliminar usuario"}
                children={`Realmente desea elminar el usuario "${userSelected?.name}"`}
                isOpen={isOpen}
                closeModal={closeModal}
                handlerActionOK={handlerActionOK}
                handlerActionAbort={handlerActionAbort}
              />
          </main>
        </div>
      </>
    );
  }
};

export default UsersList;
