import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

/*const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  age: yup.number().required().positive().integer(),
  website: yup.string().url(),
});*/

const Step1 = ({ handlerStore }) => {
  const { register, handleSubmit, formState: {errors}, setValue,watch} = useForm();
  const navigate = useNavigate();
  const useWatch = watch("incident_institution",0)
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
    <div className=" mx-auto max-w-9xl lg:px-24">
      <div className="flex flex-wrap flex-col lg:w-5/5 mt-4">
    <form className="px-4 pt-2 pb-2 mb-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-5x1 mx-auto my-10 bg-white p-16 border border-slate-200">
        <div className="my-4 mb-10">
        <h1 className="text-2xl text-gray-900 font-bold text-center">
          FICHA DE REGISTRO Y SEGUIMIENTO DE CASOS DE DESPLAZAMIENTO FORZADO
          (Interno/Externo)
        </h1>
      </div>
      <div className="my-4">
            <h1 className="border border-slate-300 text-lg text-gray-800 font-semibold text-left py-2 px-4 mb-2">
              I. DATOS DE REGISTRO INSTITUCIONAL.
            </h1>
            <div className="-mx-3 md:flex mb-6">
              <div key="expediente" className="md:w-2/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="expediente" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                      Expediente:
                    </label>
                    <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                      {...register("expediente", { required:"El expediente es requerido" })} type="text" id="expediente" placeholder="Expediente"/>
                    <div>
                      {errors["expediente"] && (
                        <span className="text-red-500 text-xs italic">
                          {errors["expediente"].message}
                        </span>)}
                  </div>
              </div>
              <div key="incident_date" className="md:w-2/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="incident_date" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                      Fecha:
                    </label>
                    <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                      {...register("incident_date", { required:"La fecha es requerida"})} type="date" id="incident_date"/>
                    <div>
                      {errors["incident_date"] && (
                        <span className="text-red-500 text-xs italic">
                          {errors["incident_date"].message}
                        </span>)}
                  </div>
              </div>
              <div key="hour" className="md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="hour" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                      Hora:
                    </label>
                    <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                      {...register("hour", { required:"La hora es requerida"})} type="text" id="hour"/>
                    <div>
                      {errors["hour"] && (
                        <span className="text-red-500 text-xs italic">
                          {errors["hour"].message}
                        </span>)}
                  </div>
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
            <div key="incident_institution" className="md:w-2/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="incident_institution" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    ¿Conoce alguna institucion de ayuda?
                  </label>
                  <label
                    htmlFor="incident_institution"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <br></br>
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="radio"
                      id="incident_institution"
                      name="incident_institution"
                      value={1}
                      {...register("incident_institution")}
                    />
                    SI
                  </label>
                  <label
                    htmlFor="incident_institution"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="radio"
                      id="incident_institution"
                      name="incident_institution"
                      value={0}
                      {...register("incident_institution")}
                    />
                    NO
                  </label>

            </div>

            {useWatch==1 &&( <>
              <div key="incident_institution_name" className="md:w-2/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="incident_institution_name" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  ¿Cuál?
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("incident_institution_name", { required:"El nombre de la institucion es requerida"})} type="text" id="incident_institution_name" placeholder="Institucion"/>
                  <div>
                    {errors["incident_institution_name"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["incident_institution_name"].message}
                      </span>)}
                </div>
            </div>
            </>)}

            <div key="name_reference" className="md:w-3/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="name_reference" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  Nombre de quien Refiere:
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("name_reference", { required:"El nombre de referencia es requerida"})} type="text" id="name_reference" placeholder="Nombre a quien refiere"/>
                  <div>
                    {errors["name_reference"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["name_reference"].message}
                      </span>)}
                </div>
            </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
            <div key="contact" className="md:w-2/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="contact" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  Contacto:
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("contact", { required:"El contacto es requerida"})} type="number" id="contact"placeholder="Contacto"/>
                  <div>
                    {errors["contact"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["contact"].message}
                      </span>)}
                </div>
            </div>

            <div key="incident_identification" className="md:w-3/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="incident_identification" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  Identificación del Caso:
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("incident_identification", { required:"La identificacion del incidente es requerida"})} type="number" id="incident_identification"/>
                  <div>
                    {errors["incident_identification"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["incident_identification"].message}
                      </span>)}
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
      </div>
  </div>
    </form>
    </div>
    </div>
  );
};

export default Step1;
