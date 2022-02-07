import React, { useState } from "react";
import moment from "moment";
import { AiOutlinePrinter, AiOutlineLock } from "react-icons/ai";
import { FiImage, FiSave } from "react-icons/fi";
import AuthService from "../../services/Auth/Auth.Service";
import uploadFile from "../../services/Firebase/Firebase.Service";
import UserService from "../../services/User/User.Service";

const Side = ({ user }) => {
  const [image, setImage] = useState({
    avatar: null,
    type: null,
    isValid: false,
    isReady: false,
    isUpload: false,
  });
  const { id_user, name, last_name, role, status, created_at } = user;

  const isCurrentUser = (id_user) => {
    const currentIdUser = AuthService.getCurrentUser().id_user;
    return id_user === currentIdUser ? (
      <AiOutlineLock
        className="text-4xl mx-1 cursor-pointer"
        onClick={() => handlerClick(1)}
      />
    ) : null;
  };

  const getStatus = (status) => {
    return status === 1 ? (
      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
        Active
      </span>
    ) : (
      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
        Inactivo
      </span>
    );
  };

  const getTypeUser = (role) => {
    let typeUser = "";
    switch (role) {
      case 0:
        typeUser = "Administrador";
        break;
      case 1:
        typeUser = "Abogado";
        break;
      case 2:
        typeUser = "Asistente";
        break;
      default:
        typeUser = "-";
        break;
    }
    return typeUser;
  };

  const handlerClick = (action) => {
    switch (action) {
      case 0:
        alert("Imprimiendo vista");
        break;
      case 1:
        alert("Formulario de cambio de contraseña.");
        break;
      default:
        alert("Caso por default");
        break;
    }
  };

  const fileHandler = async (e) => {
    const image = e.target.files[0];
    if (image) {
      const extension = image.type?.split("/")[1];
      const isValid = ["png", "jpg", "jpeg"].some(
        (fileExtesion) => fileExtesion === extension
      );
      if (isValid) {
        setImage({
          avatar: image,
          extension: extension,
          isValid: true,
          isReady: true,
          isUpload: false,
        });
      } else {
        setImage({
          avatar: null,
          extension: null,
          isValid: false,
          isReady: false,
          isUpload: false,
        });
      }
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { avatar = null, extension = null } = image;
    if (avatar) {
      const metadata = await uploadFile("images/users/", avatar, { extension });
      setImage({
        avatar: null,
        type: null,
        isValid: false,
        isReady: false,
        isUpload: false,
      });
      const currentUser = await AuthService.getCurrentUser();
      const userUpdated = await UserService.putUsers({
        ...currentUser,
        url_image: metadata?.url,
      });
      AuthService.setCurrentUser(userUpdated);
    }
  };

  return (
    <div className="w-full md:w-3/12 md:mx-2 mby-3">
      <div className="bg-white p-3 border-t-4 border-blue-400">
        <div className="image overflow-hidden relative">
          <form action="#" onSubmit={handlerSubmit}>
            <label
              className="absolute z-10 bottom-0 right-0 bg-slate-800 opacity-80 p-2 text-white cursor-pointer"
              htmlFor="avatar"
            >
              {image.isReady ? (
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
            src={
              AuthService.getCurrentUser()?.url_image
                ? AuthService.getCurrentUser().url_image
                : "../../profile.jpg"
            }
            alt="avatar"
          />
        </div>
        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
          {name + " " + last_name}
        </h1>
        <h3 className="text-gray-600 font-lg text-semibold leading-6">
          {getTypeUser(role)}
        </h3>
        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt
        </p>
        <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 py-2 px-3 mt-3 divide-y border-gray-200 border-2 rounded-md">
          <li className="flex items-center py-3">
            <span>Status</span>
            <span className="ml-auto">{getStatus(status)}</span>
          </li>
          <li className="flex items-center py-3">
            <span>Miembro desde</span>
            <span className="ml-auto">
              {moment(created_at).format("DD-MM-YYYY")}
            </span>
          </li>
          <li className="flex flex-row justify-around items-center py-3">
            <AiOutlinePrinter
              className="text-4xl mx-1 cursor-pointer"
              onClick={() => handlerClick(0)}
            />
            {isCurrentUser(id_user)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Side;
