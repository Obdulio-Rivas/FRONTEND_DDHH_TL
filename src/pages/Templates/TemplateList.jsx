import React, { useState, useEffect } from "react";
import Dots from "../../components/Loaders/Dots";
import Navbar from "../../components/Navbar/Navbar";
import AuthService from "../../services/Auth/Auth.Service";
import { AiFillFilePdf } from "react-icons/ri";
import LogService from "../../services/Log/Log.Service";
import FirebaseService from "../../services/Firebase/Firebase.Service";
import { saveAs } from "file-saver";

const TemplateList = () => {
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
    </>
  );
};

export default TemplateList;