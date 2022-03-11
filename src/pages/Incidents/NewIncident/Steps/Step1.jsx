import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import Input from "../../../../components/Forms/Inputs/Input";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";

/*const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  age: yup.number().required().positive().integer(),
  website: yup.string().url(),
});*/

const Step1 = ({ handlerStore }) => {
  const [radioValues, setRadioValues] = useState({
    incident_institution: 1
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const useWatch = watch("incident_institution", 0);

  const handlerChecked = ({ name, value }) => {
    setRadioValues({ ...radioValues, [name]: value });
  };
  const onSubmit = (data) => {
    handlerStore({
      step1: {
        title: "Datos Iniciales",
        values: data,
      },
    });
    navigate("/incident/step2");
  };

  return (
    <form
      className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-start mb-4">
        <BsBuilding className="text-4xl" />
        <h2 className="ml-2 text-3xl">Datos de registro institucional.</h2>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div key="expediente" className="md:w-2/5 px-3 mb-6 md:mb-0">
        <Input
            label={"Expediente"}
            name={"expediente"}
            type={"text"}
            placeholder={"Expediente"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div key="incident_date" className="md:w-2/5 px-3 mb-6 md:mb-0">
        <Input
            label={"Fecha"}
            name={"incident_date"}
            type={"date"}
            placeholder={"Fecha"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div key="hour" className="md:w-1/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Hora"}
            name={"hour"}
            type={"number"}
            placeholder={"Hora"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div key="incident_institution" className="md:w-2/5 px-3 mb-6 md:mb-0">
        <RadioButtons
          label={"¿Ha decidido salir del país?"}
          name={"incident_institution"}
          options={["Si", "No"]}
          register={register}
          errors={errors}
          handlerChecked={handlerChecked}
          required={"*Este campo es obligatorio."}
        />
        </div>
        <div key="incident_institution_name"className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"¿Cuál?"}
            name={"incident_institution_name"}
            type={"text"}
            placeholder={"¿Cuál?"}
            disabled={radioValues?.incident_institution}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>

        <div key="name_reference" className="md:w-3/5 px-3 mb-6 md:mb-0">
          <label
            htmlFor="name_reference"
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >
            Nombre de quien Refiere:
          </label>
          <input
            className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
            {...register("name_reference", {
              required: "El nombre de referencia es requerida",
            })}
            type="text"
            id="name_reference"
            placeholder="Nombre a quien refiere"
          />
          <div>
            {errors["name_reference"] && (
              <span className="text-red-500 text-xs italic">
                {errors["name_reference"].message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div key="contact" className="md:w-2/5 px-3 mb-6 md:mb-0">
          <label
            htmlFor="contact"
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >
            Contacto:
          </label>
          <input
            className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
            {...register("contact", {
              required: "El contacto es requerida",
            })}
            type="number"
            id="contact"
            placeholder="Contacto"
          />
          <div>
            {errors["contact"] && (
              <span className="text-red-500 text-xs italic">
                {errors["contact"].message}
              </span>
            )}
          </div>
        </div>

        <div
          key="incident_identification"
          className="md:w-3/5 px-3 mb-6 md:mb-0"
        >
          <label
            htmlFor="incident_identification"
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >
            Identificación del Caso:
          </label>
          <input
            className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
            {...register("incident_identification", {
              required: "La identificacion del incidente es requerida",
            })}
            type="number"
            id="incident_identification"
          />
          <div>
            {errors["incident_identification"] && (
              <span className="text-red-500 text-xs italic">
                {errors["incident_identification"].message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div key="Button" className="w-full flex justify-end mt-4">
        <div className="md:w-auto px-3">
          <button className="w-full bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 uppercase">
            Siguiente
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step1;
