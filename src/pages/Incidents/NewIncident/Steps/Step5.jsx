import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step5 = ({handlerStore}) => {
  const { register, handleSubmit,formState:{errors} } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step5: {
        title: "Step5",
        values: data,
      },
    });
    navigate('/incident/step6');
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
              VII. NARRATIVA DE LOS HECHOS.
            </h1>
            <div className="flex flex-row flex-wrap w-4/5 mx-auto">
            <div key="description_incident" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="description_incident" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Narrativa:
                  </label>
                  <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    {...register("description_incident", { required:"El expediente es requerido" })} type="text" id="description_incident"/>
                  <div>
                    {errors["description_incident"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["description_incident"].message}
                      </span>)}
                </div>
            </div>
            <input type="submit" />
          </div>
      </div>
  </div>
    </form>
    </div>
    </div>
  );
};

export default Step5;