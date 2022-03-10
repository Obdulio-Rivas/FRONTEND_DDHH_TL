import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Content from "./Content/Content";
import FirebaseService from "../../services/Firebase/Firebase.Service";
import Dots from "../../components/Loaders/Dots";

const Files = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function getRootFiles() {
      setIsLoading(true);
      const response = await FirebaseService.listFiles("/");
      setContent(response);
      setIsLoading(false);
    }
    getRootFiles();
  }, []);

  const changeFolder = (value) => {
    async function getContentFolder(value) {
      setIsLoading(true);
      const response = await FirebaseService.listFiles(value);
      setContent(response);
      setIsLoading(false);
    }
    getContentFolder(value);
  };

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

          <Content isLoading={isLoading} content={content} changeFolder={changeFolder} handlerLoading = {setIsLoading}/>
        </div>
      </div>
    </>
  );
};

export default Files;
