import React, { useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineAudit, AiOutlineLine, AiOutlineFileSearch } from "react-icons/ai";

import { useTable, usePagination, useSortBy } from "react-table";

import Pagination from "../../components/Table/Pagination/Pagination";
import { Link } from "react-router-dom";
import Dots from "../../components/Loaders/Dots";
import LogService from "../../services/Log/Log.Service";

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [is_loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const response = await LogService.getLogs();
      setLogs(response.data);
      setIsLoading(false);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchLogs();
  }, []);

  //Craer un archivo de constantes.
  const columns = useMemo(
    () => [
      {
        Header: "Evento",
        accessor: "type_log",
      },
      {
        Header: "Descripcion",
        accessor: "description",
      },
      {
        Header: "Registrado",
        accessor: "created_at",
      },
      {
        Header: "Acciones",
        accessor: "id_log",
      },
    ],
    []
  );

  const data = useMemo(() => logs, [logs]);

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

  if (logs?.length === 0) {
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

        <div className="bg-white border border-slate-300 m-auto rounded px-8 pt-8 mt-10 mb-2 flex flex-col md:w-2/3 sm:w-3/4 w-3/4">
          <div className="flex flex-row items-center justify-start mb-5">
            <AiOutlineAudit className="text-4xl" />
            <h2 className="ml-2 text-3xl">Logs del sistema.</h2>
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
                      className="bg-white divide-y divide-gray-200  text-sm"
                      {...getTableBodyProps()}
                    >
                      {page?.map((page, i) => {
                        prepareRow(page);
                        return (
                          <tr {...page.getRowProps()}>
                            {page.cells.map((cell) => {
                              switch (cell.column.id) {
                                case "type_log":
                                  return (
                                    <td {...cell.getCellProps()}>
                                      <div className="flex w-full flex-row justify-center items-center">
                                        <AiOutlineLine />
                                        <span className="ml-2">{cell.value}</span>
                                      </div>
                                    </td>
                                  );
                                case "description":
                                  return (
                                    <td className="text-center text-ellipsis" {...cell.getCellProps()}>
                                      {cell.value}
                                    </td>
                                  );
                                case "id_log":
                                  return (
                                    <td {...cell.getCellProps()}>
                                      <div className="flex w-full flex-row justify-center items-center">
                                        <Link
                                          className={`text-xl mx-2 text-gray-600`}
                                          to={`/log/${cell.value}`}
                                        >
                                          <AiOutlineFileSearch/>
                                        </Link>
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
          </main>
        </div>
      </>
    );
  }
};

export default LogList;
