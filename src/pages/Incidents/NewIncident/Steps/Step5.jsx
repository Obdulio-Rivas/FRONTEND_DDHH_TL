import React from "react";
import { useForm } from "react-hook-form";
import { GrCircleInformation } from "react-icons/gr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step5 = ({ handlerStore }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step5: {
        title: "Step5",
        values: data,
      },
    });
    navigate("/incident/step6");
  };

  return (
    <form
      className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-start mb-4">
        <GrCircleInformation className="text-4xl" />
        <h2 className="ml-2 text-3xl">Narrativa de los hechos.</h2>
      </div>
      <div
        key="description_incident"
        className="sm:w-2/2 lg:2/2 px-3 mb-6 md:mb-0"
      >
        <label
          htmlFor="description_incident"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          Narrativa:
        </label>
        <input
          className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
          {...register("description_incident", {
            required: "El expediente es requerido",
          })}
          type="text"
          id="description_incident"
        />
        <div>
          {errors["description_incident"] && (
            <span className="text-red-500 text-xs italic">
              {errors["description_incident"].message}
            </span>
          )}
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

export default Step5;
