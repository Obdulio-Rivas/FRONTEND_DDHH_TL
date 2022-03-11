import React from "react";
import { useForm } from "react-hook-form";
import { GrMoney } from "react-icons/gr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step3 = ({ handlerStore }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step3: {
        title: "Step3",
        values: data,
      },
    });
    navigate("/incident/step4");
  };

  return (
    <form
      className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-start mb-4">
        <GrMoney className="text-4xl" />
        <h2 className="ml-2 text-3xl">Perfil socioeconomico.</h2>
      </div>
      <div key="home" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
        <label
          htmlFor="home"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          La casa donde resido/ residía era:
        </label>
        <label
          htmlFor="home"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          <br></br>
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
        <br></br>
        <label
          htmlFor="home"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          <input
            className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
            type="checkbox"
            id="home"
            name="home"
            value="Alquilada"
            {...register("home")}
          />
          Alquilada
        </label>
        <br></br>
        <label
          htmlFor="home"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          <input
            className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
            type="checkbox"
            id="home"
            name="home"
            value="Financiada"
            {...register("home")}
          />
          Financiada
        </label>
        <br></br>
        <label
          htmlFor="home"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          <input
            className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
            type="checkbox"
            id="home"
            name="home"
            value="Caso Familiar"
            {...register("home")}
          />
          Caso Familiar
        </label>
      </div>
      <div key="monthly_income" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
        <label
          htmlFor="monthly_income"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          Ingresos Mensuales del grupo familiar:
        </label>
        <input
          className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
          {...register("monthly_income", {
            required: "El monto mensual es requerida",
          })}
          type="number"
          id="monthly_income"
          placeholder="Ingresos mensuales..."
        />
        <div>
          {errors["monthly_income"] && (
            <span className="text-red-500 text-xs italic">
              {errors["monthly_income"].message}
            </span>
          )}
        </div>
      </div>
      <div key="familiar_income" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
        <label
          htmlFor="familiar_income"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          Ingreso actual del grupo familiar:
        </label>
        <input
          className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
          {...register("familiar_income", {
            required: "El monto mensual es requerida",
          })}
          type="number"
          id="familiar_income"
          placeholder="Ingresos actuales..."
        />
        <div>
          {errors["familiar_income"] && (
            <span className="text-red-500 text-xs italic">
              {errors["familiar_income"].message}
            </span>
          )}
        </div>
      </div>
      <div
        key="survive_displacement"
        className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0"
      >
        <label
          htmlFor="survive_displacement"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
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
        <br></br>
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
        <br></br>
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
        <br></br>
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
          <br></br>
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
        <br></br>
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

export default Step3;
