import React, { useState, useEffect } from "react";
import Dots from "../../components/Loaders/Dots";
import Navbar from "../../components/Navbar/Navbar";
import AuthService from "../../services/Auth/Auth.Service";
import { AiFillFilePdf } from "react-icons/ai";
import LogService from "../../services/Log/Log.Service";
import FirebaseService from "../../services/Firebase/Firebase.Service";
import { saveAs } from "file-saver";
import Content from "./Content/Content";

const Formats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [contentFiltro,setContentFiltro] = useState(null);

  useEffect(() => {
    async function getRootFiles() {
      setIsLoading(true);
      const response = await FirebaseService.listFiles("/formats");
      setContent(response);
      setContentFiltro(response);
      setIsLoading(false);
    }
    getRootFiles();
  }, []);

  const changeFolder = (value) => {
    async function getContentFolder(value) {
      setIsLoading(true);
      const response = await FirebaseService.listFiles(value);
      setContent(response);
      setContentFiltro(response);
      setIsLoading(false);
    }
    getContentFolder(value);
  };

  const filter = (busquedaObjeto)=>{
    var resultadoBusqueda = contentFiltro.filter((element)=>{
      if(element.name.toString().toLowerCase().includes(busquedaObjeto.toLowerCase())){
        return element;
      }
    })
    setContent(resultadoBusqueda);
  }

  if (!content) {
    return (
      <>
        <Navbar />
        <Dots />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row item flex-auto justify-between items-start w-full mt-4">
        <h4 className="text-2xl font-bold text-center w-full text-gray-700 mt-6">
          Formatos Legales.
        </h4>
      </div>
      <div className="container mx-auto my-10 p-5">
        <div className="w-full md:w-12/12 mx-auto h-64">

          <Content isLoading={isLoading} content={content} filter={filter} changeFolder={changeFolder} handlerLoading = {setIsLoading}/>
        </div>
      </div>
    </>
  );
};

export default Formats;
