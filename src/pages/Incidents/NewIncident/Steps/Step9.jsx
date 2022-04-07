import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../../../components/Forms/FileUpload/FileUpload";
import { MdAttachFile } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import FirebaseService from "../../../../services/Firebase/Firebase.Service";

const Step9 = ({ store, handlerStore }) => {
  const [file, setFile] = useState({
    metadata: null,
    type: null,
    isValid: false,
    isUploading: false,
  });

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
        `cases/${store?.step1?.values?.expediente}/`,
        metadata,
        { filename: store?.step1?.values?.expediente, extension }
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
        <div className="flex flex-row justify-end -mx-0.5 md:flex mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
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

export default Step9;
