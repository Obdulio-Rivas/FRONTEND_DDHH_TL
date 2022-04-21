import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { MdAttachFile } from "react-icons/md";
import { AiOutlinePrinter } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import FirebaseService from "../../../services/Firebase/Firebase.Service";
import PDFDownload from "../../../templates/pdfs/PDFDownload";
import AuthService from "../../../services/Auth/Auth.Service";
import IncidentService from "../../../services/Incident/Incident.Service";
import Incident from "../../../templates/pdfs/incident/Incident";
import IncidentVictimsService from "../../../services/IncidentVictims/IncidentVictims.Service";
import VictimService from "../../../services/Victim/Victim.Service";
import CaseService from "../../../services/Incident/Incident.Service";
import Navbar from "../../../components/Navbar/Navbar";

const VerifyIncident = () => {
  let { id_incident } = useParams();
  const [incident, setIncident] = useState({});
  const [victims, setVictims] = useState([]);
  const [complainant, setComplainant] = useState({});
  const [file, setFile] = useState({
    metadata: null,
    type: null,
    isValid: false,
    isUploading: false,
  });
  let objectIncident = {};

  const navigate = useNavigate();

  useEffect(() => {
    async function getIncident() {
      let arrayIncidenteVictim = [];
      let arrayVictims = [];
      let response = await IncidentService.getIncident(id_incident);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
        setIncident(response?.data[0]);
        if (response?.data[0]?.status === 0) {
          /**Trayendo el id de las victimas relacionadas */
          const incidentVictimResponse =
            await IncidentVictimsService.getIncidentVictimByIdIncident(
              id_incident
            );
          incidentVictimResponse?.data?.map(({ id_victim }) => {
            return arrayIncidenteVictim.push(id_victim);
          });
          /**Mostrando las victimas relacionadas al caso */
          for (let i = 0; i < arrayIncidenteVictim?.length; i++) {
            let victimResponse = await VictimService.getVictim(
              arrayIncidenteVictim[i]
            );
            if (victimResponse.data[0].type_victim !== "victima") {
              setComplainant(victimResponse.data[0]);
            }
            if (victimResponse.data[0].type_victim === "victima") {
              arrayVictims.push(victimResponse.data[0]);
            }
          }
          setVictims(arrayVictims);
          toast.success("Informacion del incidente cargada correctamente.", {
            position: "bottom-center",
          });
        } else {
          toast.error(
            "No puedes validar un incidente, que ya ha sido validado!",
            {
              position: "bottom-center",
            }
          );
        }
      } else {
        toast.error("No fue posible cargar la informacion del incidente!", {
          position: "bottom-center",
        });
      }
    }
    getIncident();
  }, []);

  const handlerFile = async (e) => {
    let type = "pdf";
    const newFormat = e.target.files[0];
    console.log(newFormat);
    if (!!newFormat) {
      if (newFormat.type === "application/pdf") {
        setFile({
          ...file,
          metadata: newFormat,
          type: type,
          isValid: true,
        });
      } else {
        setFile({
          ...file,
          metadata: null,
          type: null,
          isValid: false,
        });
        toast.error("El tipo de archivo seleccionado no es valido!", {
          position: "bottom-center",
        });
      }
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { metadata, type } = file;
    console.log(type);
    setFile({
      ...file,
      isUploading: true,
    });
    if (!!metadata) {
      let extension = type;
      const response = await FirebaseService.uploadFile(
        `cases/${incident?.expediente}/`,
        metadata,
        { filename: incident?.expediente, extension }
      );
      if (!!response) {
        setFile({
          metadata: null,
          type: null,
          isValid: false,
          isUploading: false,
        });
        objectIncident = incident;
        objectIncident.status = 1
        const responseIncident = await CaseService.putIncident(objectIncident);
        console.log(responseIncident);
        toast.success("Incidente verificado y cargado con exito!", {
          position: "bottom-center",
        });
        navigate(`/incident/incidents`);
      } else {
        toast.error("Uppppppps ocurrio un error, intenta de nuevo!", {
          position: "bottom-center",
        });
      }
    }
  };

  const isIncidentPending = () => {
    return (
      <>
        <PDFDownload
          document={
            <Incident
              incident={incident}
              victims={victims}
              complainant={complainant}
            />
          }
          filename={`${AuthService.getCurrentUser()?.name} ${
            AuthService.getCurrentUser()?.last_name
          } - ${Date.now()}`}
        >
          <div className={"flex flex-row justify-start items-center"}>
            <AiOutlinePrinter className="text-4xl mx-1 cursor-pointer" />{" "}
            <span>Descargar ficha</span>
          </div>
        </PDFDownload>
        <button
          className={`${
            file.isValid
              ? " bg-blue-500 hover:bg-blue-600 cursor-pointer"
              : "bg-slate-500 hover:bg-slate-600 cursor-not-allowed"
          } text-white font-bold rounded-md px-7 py-3 transition duration-1000`}
          type="submit"
          value={"Subir ficha"}
        >
          Subir ficha
        </button>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <form
        className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
        action="#"
        onSubmit={handlerSubmit}
      >
        <div className="flex flex-row items-center justify-start mb-4">
          <MdAttachFile className="text-4xl" />
          <h2 className="ml-2 text-3xl">Adjunta ficha ya firmada.</h2>
        </div>
        <div className="-mx-3 md:flex mb-6 mt-6">
          <div className="md:w-full md:h-min px-3 mb-6 md:mb-0">
            <div className="w-full border border-dashed border-gray-300 bg-white p-4 rounded-md">
              <label
                htmlFor={"file"}
                className="block w-full border border-dashed bg-slate-100 border-gray-300 pb-6 pt-10 rounded-md"
              >
                <div className="flex flex-row justify-center items-center relative">
                  <MdAttachFile className="text-8xl text-gray-400" />
                </div>
                <div className="flex flex-row justify-center items-center relative">
                  <span className="mt-4">Adjunta la ficha ya firmada!</span>
                </div>
                <input
                  className="hidden"
                  type="file"
                  name="file"
                  id="file"
                  onChange={handlerFile}
                  disabled={incident?.status === 0 ? false : true}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center -mx-0.5 md:flex mb-2">
          {incident?.status === 0
            ? isIncidentPending()
            : `Este incidente ya fue validado, puedes consultarlo en la lista de incidentes!`}
        </div>
      </form>
      <Toaster
        containerStyle={{
          position: "absolute",
        }}
      />
    </>
  );
};

export default VerifyIncident;
