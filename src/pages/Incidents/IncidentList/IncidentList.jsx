import React, { useState, useEffect, useMemo } from "react";
import toast, {Toaster} from "react-hot-toast";
import AuthService from "../../../services/Auth/Auth.Service";
import Navbar from "../../../components/Navbar/Navbar";

import { useTable, usePagination, useSortBy } from "react-table";
import { MdRemoveCircle,MdListAlt } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import RolePill from "../../../components/Table/RolePill/RolePill";
import Pagination from "../../../components/Table/Pagination/Pagination";
import Modal from "../../../components/Modal/Modal";
import { Link } from "react-router-dom";
import Dots from "../../../components/Loaders/Dots";
import CaseService from "../../../services/Incident/Incident.Service";
import IncidentVictimsService from "../../../services/IncidentVictims/IncidentVictims.Service";
import StatusIncident from "../../../components/Table/StatusPill/StatusIncident";
import VictimService from "../../../services/Victim/Victim.Service";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [victims, setVictims] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIncident, setIsOpenIncident] = useState(false);
  const [is_loading, setIsLoading] = useState(true);
  const [incidentSelected, setincidentSelected] = useState(null);

  useEffect(() => {
    async function fetchIncidents() {
      const response = await CaseService.getIncidents();
      setIncidents(!response?.data ? [] : response?.data);
      setIsLoading(false);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchIncidents();
  }, []);

  const handlerActionOK = () => {
    async function deleteIncident() {
      const response = await CaseService.deleteIncident(incidentSelected.id_incident);
      setincidentSelected(response.data[0]);
      if (response.is_successful) {
        setIsOpen(false);
        AuthService.updateJwtUser(response);
        let remainingIncidents = [];
        remainingIncidents = incidents.filter(
          (element) => element.id_incident !== incidentSelected.id_incident
        );
        setincidentSelected(remainingIncidents);
        toast.success(`Caso removido con exito!`, {
          position: "bottom-center",
        });
      } else {
        toast.error(`No fue posible remover el caso!`, {
          position: "bottom-center",
        });
      }
    }
    deleteIncident();
  };
  const handlerActionOKIncident = () => {
        setIsOpenIncident(false);
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
        Header: "Expedientes",
        accessor: "expediente",
      },
      {
        Header: "Fecha del caso",
        accessor: "incident_date",
      },
      {
        Header: "Estado",
        accessor: "status",
      },
      {
        Header: "Acciones",
        accessor: "id_incident",
      },
    ],
    []
  );

  const data = useMemo(() => incidents, [incidents]);

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

  if (incidents.length === 0) {
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
              <h1 className="text-xl font-semibold">Incident Tables</h1>
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
                        {headerGroups?.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers?.map((column) => (
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
                        {page?.map((page, i) => {
                          prepareRow(page);
                          return (
                            <tr {...page.getRowProps()}>
                              {page.cells?.map((cell) => {
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
                                        <StatusIncident value={cell.value} />
                                      </td>
                                    );
                                  case "id_incident":
                                    return (
                                      <td {...cell.getCellProps()}>
                                        <div className="flex w-full flex-row justify-center">
                                          <Link
                                            className={`text-xl mx-2 text-gray-600`}
                                            to={`/view/incident/${cell.value}`}
                                          >
                                            <ImProfile />
                                          </Link>
                                          <Link
                                            className={`text-xl mx-2 text-gray-600`}
                                            to={`/incident/verify/${cell.value}`}
                                          >
                                            <MdListAlt />
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
            </div>
          </main>
        </div>
      </>
    );
  }
};

export default IncidentList;
