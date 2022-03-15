import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Content from "./Content/Content";
import FirebaseService from "../../services/Firebase/Firebase.Service";
import Dots from "../../components/Loaders/Dots";

const Files = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [contentFiltro,setContentFiltro] = useState(null);

  useEffect(() => {
    async function getRootFiles() {
      setIsLoading(true);
      const response = await FirebaseService.listFiles("/");
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
      <div className="container mx-auto my-10 p-5">
        <div className="w-full md:w-12/12 mx-auto h-64">
          <Breadcrumb changeFolder={changeFolder} />

          <Content isLoading={isLoading} content={content} filter={filter} changeFolder={changeFolder} handlerLoading = {setIsLoading}/>
        </div>
      </div>
    </>
  );
};

export default Files;
