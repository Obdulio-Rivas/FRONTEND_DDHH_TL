import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserService from "../../services/User/User.Service";
import AuthService from "../../services/Auth/Auth.Service";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Forms/Inputs/Input";
import RadioButtons from "../../components/Forms/RadioButtons/RadioButtons";
import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";

const UpdateUser = () => {
  const params = useParams();
  const { id_user: id_user_params } = params;

  const [radioValues, setRadioValues] = useState({});
  const [user, setUser] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function fetchUsers() {
      // You can await here
      const response = await UserService.getUser(id_user_params);
      setValue('id_user', response.data[0].id_user);
      setValue('name', response.data[0].name);
      setValue('last_name', response.data[0].last_name);
      setValue('birth_date', response.data[0].birth_date);
      setValue('dui', response.data[0].dui);
      setValue('phone', response.data[0].phone);
      setValue('nit', response.data[0].nit);
      setValue('email', response.data[0].email);

      setUser(response.data);
    }

    return fetchUsers();
  }, [id_user_params, setValue]);

  const handlerRadioButton = ({ name, value }) => {
    setRadioValues({ ...radioValues, [name]: value });
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const response = await UserService.putUsers(data);
    if (response.is_successful) {
      AuthService.updateJwtUser(response);
      toast.success("Usuario actualizado con exito!", {
        position: "bottom-center",
      });
    } else {
      toast.error("No fue posible actualizar el usuario!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Navbar />
      <form
        className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-center justify-start mb-10">
          <AiOutlineUserAdd className="text-4xl" />
          <h2 className="ml-2 text-3xl">Editar Usuario.</h2>
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
              placeholder={"00000000-0"}
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
              placeholder={"7777-7777"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
              pattern={/^\d{4}-\d{4}$/g}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            {user[0]?.gender!==undefined ? 
            <RadioButtons
              label={"Genero"}
              name={"gender"}
              options={[
                { label: "Masculino", value: 1 },
                { label: "Femenino", value: 0 },
              ]}
              register={register}
              errors={errors}
              handlerChange={handlerRadioButton}
              valueRadio={user[0]?.gender}
              required={"*Este campo es obligatorio."}
            /> : <div></div>}
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            <Input
              label={"NIT"}
              name={"nit"}
              type={"text"}
              placeholder={"0000-000000-000-1"}
              register={register}
              errors={errors}
              required={"*Este campo es obligatorio."}
              pattern={/^\d{4}-\d{6}-\d{3}-\d{1}/}
            />
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            {user[0]?.status!==undefined?
              <RadioButtons
              label={"Estado"}
              name={"status"}
              options={[
                { label: "Activo", value: 1 },
                { label: "Inactivo", value: 0 },
              ]}
              register={register}
              errors={errors}
              handlerChange={handlerRadioButton}
              valueRadio={user[0]?.status}
              required={"*Este campo es obligatorio."}
              /> : <div></div>
            }
          </div>
          <div className="md:w-2/6 px-3 mb-6 md:mb-0">
            {user[0]?.role!==undefined?
              <RadioButtons
              label={"Rol"}
              name={"role"}
              options={[
                { label: "Administrador", value: 0 },
                { label: "Abogado", value: 1 },
                { label: "Asistente", value: 2 },
              ]}
              register={register}
              errors={errors}
              handlerChange={handlerRadioButton}
              valueRadio={user[0]?.role}
              required={"*Este campo es obligatorio."}
            />:<div></div>
            }
            
          </div>
        </div>
        <div class="flex flex-row justify-end -mx-0.5 md:flex mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
            type="submit"
            value={"Actualizar"}
          >
            Actualizar
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default UpdateUser;
