import React, { useState, useEffect, useMemo } from "react";
import toast, {Toaster} from "react-hot-toast";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import Navbar from "../Navbar/Navbar";

import { useTable, usePagination, useSortBy } from "react-table";
import { MdRemoveCircle } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import RolePill from "../Table/RolePill/RolePill";
import StatusPill from "../Table/StatusPill/StatusPill";
import Pagination from "../Table/Pagination/Pagination";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import Dots from "../Loaders/Dots";

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
      <Toaster/>
        <Navbar />
        <div className="container mx-auto my-4 min-h-full pt-4 text-gray-900">
          <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-4 pt-4">
            <div className="">
              <h1 className="text-xl font-semibold">User Tables</h1>
            </div>
            <div className="mt-4 mb-4 flex flex-col">
              <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                title={"Eliminar usuario"}
                children={`Realmente desea elminar el usuario "${userSelected?.name}"`}
                isOpen={isOpen}
                closeModal={closeModal}
                handlerActionOK={handlerActionOK}
                handlerActionAbort={handlerActionAbort}
              />
            </div>
          </main>
        </div>
      </>
    );
  }
};

export default UsersList;
