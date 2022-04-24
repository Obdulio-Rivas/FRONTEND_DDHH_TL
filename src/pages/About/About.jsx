import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import FirebaseService from "../../services/Firebase/Firebase.Service";
import { saveAs } from "file-saver";
import { AiFillFilePdf } from "react-icons/ai";

const About = () => {
  const handlerDownloadFile = (bucket, fullPath, name) => {
    async function getDownloadURL(bucket, fullPath, name) {
      const public_url = await FirebaseService.downloadFile(bucket, fullPath);
      saveAs(public_url, name);
    }
    getDownloadURL(bucket, fullPath, name);
  };

  return (
    <>
      <Navbar />
      <div className="pb-16">
        <div>
          <div className="container mx-auto pt-16">
            <div className="w-11/12 xl:w-2/3 lg:w-2/3 md:w-2/3 mx-auto sm:mb-10 mb-16">
              <h1 className="focus:outline-none xl:text-7xl md:text-3xl text-2xl text-center text-gray-800 font-extrabold mb-10 pt-4">
                Legalistica
              </h1>
              <p className="focus:outline-none xl:text-3xl md:text-lg lg:text-xl text-center text-gray-600 font-normal xl:w-10/12 xl:mx-auto">
                Almacena todos tus recursos dentro de un sistema que te permita
                llevarlos a todos lados, respaldando tus documentos en la nube.
              </p>
            </div>
            <div className="flex flex-row item flex-auto justify-between items-start w-full">
              <div className="item w-1/2 flex-auto p-4">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                  Mision
                </h2>
                <p className="text-xl text-gray-600 text-justify mt-5">
                  "Innovar los recursos legales de la institución a través de la
                  tecnología que aportan a la empresa agilidad y facilidad en
                  los procesos de casos para mejorar el servicio de sus clientes
                  y de su personal"
                </p>
              </div>
              <div className="item w-1/2 flex-auto p-4">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                  Vision
                </h2>
                <p className="text-xl text-gray-600 text-justify mt-5">
                  "Ofrecer un sistema productivo y rápido en la resolución de
                  casos legales, ayudar al personal institucional a resguardar
                  con seguridad y mantener un control organizado de sus
                  documentos almacenados"
                </p>
              </div>
            </div>
            <div className="flex flex-row item flex-auto justify-between items-start w-full mt-4">
              <h4 className="text-2xl font-bold text-center w-full text-gray-700 mt-6">
                Informacion de la Plataforma
              </h4>
            </div>
            <div className="flex flex-row item flex-auto justify-between items-start w-full mt-4">
              <div
                className="item w-1/3 flex-auto p-4"
                onClick={() =>
                  handlerDownloadFile(
                    "legalistica.appspot.com",
                    "documentos/MANUAL DE USUARIO.pdf",
                    "MANUAL DE USUARIO.pdf"
                  )
                }
              >
                <div className="flex flex-wrap flex-col justify-center items-center max-w-max m-auto p-4 cursor-pointer">
                  <AiFillFilePdf className="text-red-600 text-8xl m-auto" />
                  <span className="text-center">Manual de Uso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
