import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { AiOutlineUserAdd } from "react-icons/ai";
import UserService from "../../services/User/User.Service";
import AuthService from "../../services/Auth/Auth.Service";
import toast, { Toaster } from "react-hot-toast";
import Input from "../Forms/Inputs/Input";
import RadioButtons from "../Forms/RadioButtons/RadioButtons";
import Select from "../Forms/Select/Select";
import { useForm } from "react-hook-form";
const NewUser = () => {
  const url_image_default = "https://firebasestorage.googleapis.com/v0/b/legalistica.appspot.com/o/images%2Fusers%2Fbb44cf-d7e-d27-7502-bf1ea077b6e.undefined?alt=media&token=aaaf32b3-e744-4bdb-ad72-b84705d19c6c";
  const [radioValues, setRadioValues] = useState({
    incident_institution: 1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handlerRadioButton = ({ name, value }) => {
    setRadioValues({ ...radioValues, [name]: value });
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const new_user = {...data, url_image: url_image_default}
    const response = await UserService.postUsers(new_user);
    console.log(response);
    if (response.is_successful) {
      AuthService.updateJwtUser(response);
      toast.success("El usuario a sido agregado correctamente.", {
        position: "bottom-center",
      });
    } else {
      toast.error("No fue posible agregar el usuario!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Navbar />
      <form
        className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center justify-start mb-10">
          <AiOutlineUserAdd className="text-4xl" />
          <h2 className="ml-2 text-3xl">Registar Usuario.</h2>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"Nombres"}
              name={"name"}
              type={"text"}
              placeholder={"Nombres"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"Apellidos"}
              name={"last_name"}
              type={"text"}
              placeholder={"Apellidos"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"Fecha de Nacimiento"}
              name={"birth_date"}
              type={"date"}
              placeholder={"Fecha de Nacimiento"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"DUI"}
              name={"dui"}
              type={"text"}
              placeholder={"DUI"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
              pattern={/^\d{8}-\d{1}$/g}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"Telefono"}
              name={"phone"}
              type={"text"}
              placeholder={"Telefono"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <RadioButtons
              label={"Genero"}
              name={"gender"}
              options={[
                { option: "Masculino", value: 1 },
                { option: "Femenino", value: 0 },
              ]}
              register={register}
              errors={errors}
              handlerChange={handlerRadioButton}
              required={"*Este campo es obligatorio."}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"NIT"}
              name={"nit"}
              type={"text"}
              placeholder={"NIT"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"Email"}
              name={"email"}
              type={"text"}
              placeholder={"Email"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <RadioButtons
              label={"Estado"}
              name={"status"}
              options={[
                { option: "Activo", value: 1 },
                { option: "Inactivo", value: 0 },
              ]}
              register={register}
              errors={errors}
              handlerChange={handlerRadioButton}
              required={"*Este campo es obligatorio."}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <RadioButtons
              label={"Rol"}
              name={"role"}
              options={[
                { option: "Administrador", value: 0 },
                { option: "Abogado", value: 1 },
                { option: "Asistente", value: 2 },
              ]}
              register={register}
              errors={errors}
              handlerChange={handlerRadioButton}
              required={"*Este campo es obligatorio."}
            />
          </div>
        </div>
        <div class="flex flex-row justify-end -mx-0.5 md:flex mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
            type="submit"
            value={"Enviar"}
          >
            Registrar
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default NewUser;
