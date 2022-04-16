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
  const [Incidents, setIncidents] = useState([]);
  const [Victims, setVictims] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIncident, setIsOpenIncident] = useState(false);
  const [is_loading, setIsLoading] = useState(true);
  const [incidentSelected, setincidentSelected] = useState(null);
  let arrayVictims = [];
  useEffect(() => {
    async function fetchIncidents() {
      const response = await CaseService.getIncidents();
      setIncidents(response.data);
      setIsLoading(false);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchIncidents();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenIncident(false);
  };

  const openModalVictim = (value) => {
    async function getIncidentData(id_incident) {
      const responseIncidentVictims = await IncidentVictimsService.getIncidentVictimByIdIncident(id_incident);
      for (let i = 0; i < responseIncidentVictims.data.length; i++) {
        const responseVictim = await VictimService.getVictim(responseIncidentVictims.data[i].id_victim);
        if(responseVictim.data[i].type_victim!=='denunciante')
        {
          arrayVictims.push(responseVictim.data[0].name + ' ' + responseVictim.data[0].last_name);
        }
      }
      setVictims(arrayVictims);
      setincidentSelected(responseIncidentVictims.data[0]);
      setIsOpenIncident(true);
    }
    getIncidentData(value);
  };

  const openModal = (value) => {
    async function getIncidentData(id_incident) {
      const response = await CaseService.getIncident(id_incident);
      /*const [{status}] = response.data;
      status = status+1;
      response.data[0].status = status;*/
      setincidentSelected(response.data[0]);
      setIsOpen(true);
    }
    getIncidentData(value);
  };

  const handlerActionOK = () => {
    async function deleteIncident() {
      const response = await CaseService.deleteIncident(incidentSelected.id_incident);
      setincidentSelected(response.data[0]);
      if (response.is_successful) {
        setIsOpen(false);
        AuthService.updateJwtUser(response);
        let remainingIncidents = [];
        remainingIncidents = Incidents.filter(
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

  const data = useMemo(() => Incidents, [Incidents]);

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

  if (Incidents.length === 0) {
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

                                          <button
                                          className={`text-xl mx-2 text-gray-600`}
                                            onClick={() => {
                                              openModalVictim(cell.value);
                                            }}
                                          >
                                            <MdListAlt />
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
                modaltype={'eliminar'}
                title={"Eliminar usuario"}
                children={`Realmente desea elminar el usuario "${incidentSelected?.expediente}"`}
                isOpen={isOpen}
                closeModal={closeModal}
                handlerActionOK={handlerActionOK}
                handlerActionAbort={handlerActionAbort}
              />
              <Modal
                modaltype={''}
                title={"Victimas asociadas al caso."}
                children={`${Victims.map((Nombre, index)=>{
                  let nombre = '';
                  nombre = nombre + Nombre+"\n";
                  return '-'+nombre;
                })}`}
                isOpen={isOpenIncident}
                closeModal={closeModal}
                handlerActionOK={handlerActionOKIncident}
              />
            </div>
          </main>
        </div>
      </>
    );
  }
};

export default IncidentList;
