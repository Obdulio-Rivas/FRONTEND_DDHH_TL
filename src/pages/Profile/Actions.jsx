import React, { useState } from "react";
import {
  AiOutlinePrinter,
  AiOutlineLock,
  AiOutlineUnlock,
} from "react-icons/ai";
import toast from "react-hot-toast";
import AuthService from "../../services/Auth/Auth.Service";
import UserService from "../../services/User/User.Service";
import Profile from "../../templates/pdfs/profile/Profile";
import PDFDownload from "../../templates/pdfs/PDFDownload";

const Actions = ({ user }) => {
  const { id_user } = user;

  const [form, setForm] = useState({
    isHidden: true,
    isSubmit: false,
  });

  const [values, setValues] = useState({
    id_user: AuthService.getCurrentUser().id_user,
    password: "",
    new_password: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const response = await UserService.putNewPasswordUser(values);
    if (response.is_successful) {
      AuthService.updateJwtUser(response);
      setForm({
        ...form,
        isHidden: !form.isHidden,
      });
      toast.success("Contraseña actualizada con exito!", {
        position: "bottom-center",
      });
    } else {
      toast.error("No fue posible actualizar la contraseña!", {
        position: "bottom-center",
      });
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const isCurrentUser = (id_user) => {
    const currentIdUser = AuthService.getCurrentUser().id_user;
    if (id_user !== currentIdUser) {
      return null;
    }

    if (form.isHidden) {
      return (
        <AiOutlineLock
          className="text-4xl mx-1 cursor-pointer"
          onClick={() => handlerClick()}
        />
      );
    } else {
      return (
        <AiOutlineUnlock
          className="text-4xl mx-1 cursor-pointer"
          onClick={() => handlerClick()}
        />
      );
    }
  };

  const handlerClick = () => {
    setForm({
      ...form,
      isHidden: !form.isHidden,
    });
  };

  if (form.isHidden) {
    return (
      <>
        <li className="flex flex-row justify-around items-center py-3">
          <PDFDownload
            document={<Profile user={user} />}
            filename={`${user?.name} ${user?.last_name} - ${Date.now()}`}
          >
            <AiOutlinePrinter className="text-4xl mx-1 cursor-pointer" />
          </PDFDownload>
          {isCurrentUser(id_user)}
        </li>
      </>
    );
  }

  return (
    <>
      <li className="flex flex-row justify-around items-center py-3">
        <form className="flex flex-col w-full" onSubmit={handlerSubmit}>
          <label className="text-base px-4" htmlFor="password">
            Contraseña Actual:
          </label>
          <input
            className="w-11/12 m-auto mb-2 p-2 rounded-md border-2"
            name="password"
            id="password"
            type="password"
            placeholder="Contraseña Actual"
            onChange={handleChange}
          />
          <label className="text-base px-4" htmlFor="new_password">
            Nueva Contraseña:
          </label>
          <input
            className="w-11/12 m-auto p-2 rounded-md border-2"
            name="new_password"
            id="new_password"
            type="password"
            placeholder="Nueva Contraseña"
            onChange={handleChange}
          />
          <input
            className="w-11/12 m-auto mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
            value="Actualizar"
          />
        </form>
      </li>
      <li className="flex flex-row justify-around items-center py-3">
        <PDFDownload
          document={<Profile user={user} />}
          filename={`${user?.name} ${user?.lastname} - ${Date.now()}`}
        >
          <AiOutlinePrinter className="text-4xl mx-1 cursor-pointer" />
        </PDFDownload>
        {isCurrentUser(id_user)}
      </li>
    </>
  );
};

export default Actions;
