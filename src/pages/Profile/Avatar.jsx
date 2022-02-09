import React, { useState } from "react";
import { FiImage, FiSave } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import uploadFile from "../../services/Firebase/Firebase.Service";

const Avatar = ({id_user}) => {
  const [image, setImage] = useState(AuthService.getCurrentUser().url_image);
  const [file, setFile] = useState({
    metadata: null,
    type: null,
    isValid: false,
    isUploading: false,
  });

  const isUploadingImage = (file) => {
    const { isUploading, isValid } = file;
    const currentIdUser = AuthService.getCurrentUser().id_user;

    //Validamos si es el usuario logeado el que intenta ver su perfil.
    if(id_user !== currentIdUser){
        return null;
    }

    if (isUploading) {
      return (
        <div class="flex items-center justify-center space-x-2 animate-pulse cursor-progress w-full h-full absolute bg-slate-400 bg-opacity-60">
          <div class="w-8 h-8 bg-white rounded-full"></div>
          <div class="w-8 h-8 bg-white rounded-full"></div>
          <div class="w-8 h-8 bg-white rounded-full"></div>
        </div>
      );
    } else {
      if (isValid) {
        return (
          <button
            className="p-2 m-0 border-0 absolute z-10 bottom-0 right-0 bg-slate-800 opacity-80 text-white cursor-pointer"
            type="submit"
          >
            <FiSave className="text-4xl" />
          </button>
        );
      } else {
        return (
          <>
            <label
              className="absolute z-10 bottom-0 right-0 bg-slate-800 opacity-80 p-2 text-white cursor-pointer"
              htmlFor="avatar"
            >
              <FiImage className="text-4xl" />
            </label>
            <input
              className="hidden"
              type="file"
              name="avatar"
              id="avatar"
              onChange={handlerFile}
            />
          </>
        );
      }
    }
  };

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
      const response = await uploadFile("images/users/", metadata, { type });
      const currentUser = await AuthService.getCurrentUser();
      const userUpdated = await UserService.putUsers({
        ...currentUser,
        url_image: response?.url,
      });
      console.log(userUpdated + "Submit");
      if (userUpdated.is_successful) {
        //Actualizar metodo a que reciba y haga spread de las props...
        AuthService.updateCuerrentUser(userUpdated?.data);
        setImage(userUpdated?.data?.url_image);
        setFile({
          metadata: null,
          type: null,
          isValid: false,
          isUploading: false,
        });
        console.log(file);
        toast.success("Imagen de perfil cambiada con exito!", {
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
      <div className="image overflow-hidden relative">
        <form action="#" onSubmit={handlerSubmit}>
          {isUploadingImage(file)}
        </form>
        <img
          className="max-h-96 h-auto w-full mx-auto object-cover"
          src={image}
          alt="avatar"
        />
      </div>

      <Toaster
        containerStyle={{
          position: "absolute",
        }}
      />
    </>
  );
};

export default Avatar;
