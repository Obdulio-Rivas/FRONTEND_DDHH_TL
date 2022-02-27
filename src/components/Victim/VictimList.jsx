import React, { useState, useEffect, useMemo, Children } from "react";
import toast, { Toaster } from "react-hot-toast";
import AuthService from "../../services/Auth/Auth.Service";
import VictimService from "../../services/Victim/Victim.Service";
import Navbar from "../Navbar/Navbar";
import List from "./List";

import { useTable, usePagination, useSortBy } from "react-table";
import { MdRemoveCircle } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import Modal from "../Modal/Modal";

const VictimList = () => {
  const [victims, setVictims] = useState([]);
  const [modal, setModal] = useState({
    title: "",
    children: "",
    isOpen: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [victimSelected, setVictimSelected] = useState(null);
  const [listSelected, setListSelected] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await VictimService.getVictims();
      setVictims(response.data);
      setIsLoading(false);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchUsers();
  }, []);

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handlerModal = (value, title, children) => {
    async function getVictimData(id_victim) {
      const response = await VictimService.getVictim(id_victim);
      setVictimSelected(response.data[0]);
      setModal({ ...modal, isOpen: true , title: title, children: children});
    }
    getVictimData(value, title, children);
  };

  const handlerActionOK = () => {
    setListSelected((prevState) => [...prevState, victimSelected]);
  };

  const handlerActionAbort = () => {
    toast.success("Se cancelo correctamente la accion.", {
      icon: "💣",
      position: "bottom-center",
    });
    setModal({ ...modal, isOpen: false });
  };

  //Craer un archivo de constantes.
  const columns = useMemo(
    () => [
      {
        Header: "Apellido",
        accessor: "last_name",
        align: "left",
      },
      {
        Header: "Nombre",
        accessor: "name",
        align: "left",
      },
      {
        Header: "Acciones",
        accessor: "id_victim",
        align: "center",
      },
    ],
    []
  );

  const data = useMemo(() => victims, [victims]);

  const useTableProps = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  const actionsVictimsList = [
    {
      tooltip: "Agregar a la lista",
      icon: <BiAddToQueue className="m-auto" />,
      handler: handlerModal,
    },
  ];

  const actionsSelectedVictims = [
    {
      tooltip: "Quitar de la lista",
      icon: <MdRemoveCircle className="m-auto" />,
      handler: handlerModal,
    },
  ];

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container flex flex-wrap flex-row px-6 py-2 mx-auto lg:space-x-4 justify-between">
          <span>Estamos cargando el contenido...</span>
        </div>
      </>
    );
  }

  if (victims.length === 0) {
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
        <div className="container mx-auto my-4 min-h-full pt-4 text-gray-900">
          <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-4 pt-4">
            <div className="px-5">
              <h1 className="text-xl font-semibold">Selecciona Victima/s</h1>
            </div>
            <div className="container flex flex-row flex-wrap mx-auto mt-5 mb-10 p-5">
              <div className="w-full lg:w-5/12 md:w-12/12 sm:w-11/12 mx-auto h-64">
                <List
                  title={"Listado de Victimas"}
                  columns={columns}
                  data={victims}
                  useTableProps={{ ...useTableProps }}
                  actions={actionsVictimsList}
                />
              </div>
              <div className="w-full lg:w-5/12 md:w-12/12 sm:w-11/12 mx-auto h-64">
                <List
                  title={"Victimas seleccionadas"}
                  columns={columns}
                  data={listSelected}
                  useTableProps={{ ...useTableProps }}
                  actions={actionsSelectedVictims}
                />
              </div>
            </div>
          </main>
          <Modal
            title={modal.title}
            children={modal.children}
            isOpen={modal.isOpen}
            closeModal={closeModal}
            handlerActionOK={handlerActionOK}
            handlerActionAbort={handlerActionAbort}
          />
        </div>
      </>
    );
  }
};

export default VictimList;
