import React, { useState } from "react";
import { FiImage, FiSave } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import uploadFile from "../../services/Firebase/Firebase.Service";

const Avatar = () => {
  const [image, setImage] = useState(AuthService.getCurrentUser().url_image);
  const [file, setFile] = useState({
    metadata: null,
    type: null,
    isValid: false,
    isUploaded: false,
  });

  const fileHandler = async (e) => {
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
        type: type
      });
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { metadata , type } = file;
    if (!!metadata) {
      const response = await uploadFile("images/users/", metadata, { type });
      const currentUser = await AuthService.getCurrentUser();
      const userUpdated = await UserService.putUsers({
        ...currentUser,
        url_image: response?.url,
      });
      console.log(userUpdated+'Submit');
      if (userUpdated.is_successful) {
        //Actualizar metodo a que reciba y haga spread de las props...
        AuthService.updateCuerrentUser(userUpdated?.data);
        setImage(userUpdated?.data?.url_image);
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
          <label
            className="absolute z-10 bottom-0 right-0 bg-slate-800 opacity-80 p-2 text-white cursor-pointer"
            htmlFor="avatar"
          >
            {file.isValid ? (
              <button className="p-0 m-0 border-0" type="submit">
                <FiSave className="text-4xl" />
              </button>
            ) : (
              <FiImage className="text-4xl" />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            name="avatar"
            id="avatar"
            onChange={fileHandler}
          ></input>
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
