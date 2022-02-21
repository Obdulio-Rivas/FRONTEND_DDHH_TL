import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Content from "./Content/Content";
import FirebaseService from "../../services/Firebase/Firebase.Service";

const Files = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function getRootFiles() {
      const response = await FirebaseService.listFiles("/");
      setContent(response);
    }
    getRootFiles();
  }, []);

  const changeFolder = (value) => {
    async function getContentFolder(value) {
      const response = await FirebaseService.listFiles(value);
      setContent(response);
    }
    getContentFolder(value);
  };

  if (!content) {
    return (
      <>
        <Navbar />
        <div className="container flex mx-auto my-16 p-5 h-full w-full justify-center">
          <div className="md:flex no-wrap md:-mx-2 ">
            <span>Cargando informacion de los archivos...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
        <div className="w-full md:w-12/12 mx-auto h-64">
          <Breadcrumb changeFolder={changeFolder} />

          <Content content={content} changeFolder={changeFolder} />
        </div>
      </div>
    </>
  );
};

export default Files;
