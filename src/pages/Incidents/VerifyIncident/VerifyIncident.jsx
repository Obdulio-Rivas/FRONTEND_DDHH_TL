import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../../components/Forms/FileUpload/FileUpload";
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
import Navbar from "../../../components/Navbar/Navbar";

const VerifyIncident = () => {
  let { id_incident } = useParams();
  const [incident, setIncident] = useState({});
  const [victims, setVictims] = useState([]);
  const [denunciante, setDenunciante] = useState({});
  const [file, setFile] = useState({
    metadata: null,
    type: null,
    isValid: false,
    isUploading: false,
  });

  useEffect(() => {
    async function getIncident() {
      let arrayIncidenteVictim = [];
      let arrayVictims = [];
      let response = await IncidentService.getIncident(id_incident);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
        setIncident(response?.data[0]);
        /**Trayendo el id de las victimas relacionadas */
        const incidentVictimResponse =
          await IncidentVictimsService.getIncidentVictimByIdIncident(
            id_incident
          );

        console.log(incidentVictimResponse);
        incidentVictimResponse?.data?.map(({ id_victim }) => {
          return arrayIncidenteVictim.push(id_victim);
        });
        /**Mostrando las victimas relacionadas al caso */
        for (let i = 0; i < arrayIncidenteVictim?.length; i++) {
          let victimResponse = await VictimService.getVictim(
            arrayIncidenteVictim[i]
          );
          if (victimResponse.data[0].type_victim !== "victima") {
            setDenunciante(victimResponse.data[0]);
            console.log(denunciante);
          }
          if (victimResponse.data[0].type_victim === "victima") {
            arrayVictims.push(victimResponse.data[0]);
            console.log(arrayVictims);
          }
        }
        setVictims(arrayVictims);
      } else {
      }
    }
    getIncident();
  }, []);

  const handlerFile = async (e) => {
    let type = null;
    const newImage = e.target.files[0];
    if (!!newImage) {
      type = newImage.type?.split("/")[1];
      file.isValid = ["png", "jpg", "jpeg"].some(
        (typeFile) => typeFile === type
      );
      setFile({
        ...file,
        metadata: newImage,
        type: type,
      });
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { metadata, type } = file;
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
        toast.success("Incidente cargado con exito!", {
          position: "bottom-center",
        });
      } else {
        toast.error("Uppppppps ocurrio un error, intenta de nuevo!", {
          position: "bottom-center",
        });
      }
    }
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
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center -mx-0.5 md:flex mb-2">
          <PDFDownload
            document={<Incident incident={incident} />}
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
            className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
            type="submit"
            value={"Subir ficha"}
          >
            Subir ficha
          </button>
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
