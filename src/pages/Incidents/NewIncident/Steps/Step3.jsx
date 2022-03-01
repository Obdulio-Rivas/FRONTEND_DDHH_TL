import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step3 = ({handlerStore}) => {
  const { register, handleSubmit, formState:{errors}} = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step3: {
        title: "Step3",
        values: data,
      },
    });
    navigate('/incident/step4');
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
            V. PERFIL SOCIECONOMICO.
            </h1>
            <div className="flex flex-row flex-wrap w-4/5 mx-auto">
            <div key="home" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="home" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  La casa donde resido/ residía era:
                  </label>
                  <label
                    htmlFor="home"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="home"
                      name="home"
                      value="Propia"
                      {...register("home")}
                    />
                    Propia
                  </label>
            </div>
            <div key="monthly_income" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="monthly_income" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  Ingresos Mensuales del grupo familiar:
                  </label>
                  <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    {...register("monthly_income", { required:"El monto mensual es requerida"})} type="number" id="monthly_income"/>
                  <div>
                    {errors["monthly_income"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["monthly_income"].message}
                      </span>)}
                </div>
            </div>
            <div key="familiar_income" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="familiar_income" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  Ingreso actual del grupo familiar:
                  </label>
                  <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    {...register("familiar_income", { required:"El monto mensual es requerida"})} type="number" id="familiar_income"/>
                  <div>
                    {errors["familiar_income"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["familiar_income"].message}
                      </span>)}
                </div>
            </div>
            <div key="survive_displacement" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="survive_displacement" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  ¿Cómo ha logrado sobrevivir durante el desplazamiento?
                  </label>
                  <label
                    htmlFor="survive_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="survive_displacement"
                      name="survive_displacement"
                      value="Ahorros"
                      {...register("survive_displacement")}
                    />
                    Ahorros
                  </label>
                  <label
                    htmlFor="survive_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="survive_displacement"
                      name="survive_displacement"
                      value="Trabajo Informal"
                      {...register("survive_displacement")}
                    />
                    Trabajo Informal
                  </label>
                  <label
                    htmlFor="survive_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="survive_displacement"
                      name="survive_displacement"
                      value="Prestamo"
                      {...register("survive_displacement")}
                    />
                    Préstamo 
                  </label>
                  <label
                    htmlFor="survive_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="survive_displacement"
                      name="survive_displacement"
                      value="Remesas"
                      {...register("survive_displacement")}
                    />
                    Remesas
                  </label>
                  <label
                    htmlFor="survive_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="survive_displacement"
                      name="survive_displacement"
                      value="Empeños "
                      {...register("survive_displacement")}
                    />
                    Empeños
                  </label>
                  <label
                    htmlFor="survive_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="survive_displacement"
                      name="survive_displacement"
                      value="Mendicidad"
                      {...register("survive_displacement")}
                    />
                    Mendicidad
                  </label>
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

export default Step3;