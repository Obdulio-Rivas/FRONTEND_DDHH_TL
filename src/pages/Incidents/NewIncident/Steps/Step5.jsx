import React from "react";
import { useForm } from "react-hook-form";
import { GrCircleInformation } from "react-icons/gr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Textarea from "../../../../components/Forms/Textarea/Textarea";

const Step5 = ({ handlerStore }) => {
  const screenHeight = document.body.clientHeight;
  
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

  const handlerClick = () => {
    navigate("/incident/step4");
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
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full md:h-min px-3 mb-6 md:mb-0">
          <Textarea
            label={"Narrativa"}
            name={"description_incident"}
            type={"text"}
            height={(screenHeight/3)}
            placeholder={"Narrativa de los hechos..."}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div class="flex flex-row justify-between -mx-0.5 md:flex mb-2">
        <div onClick={() => handlerClick()}>
          <div className="flex flex-row items-center bg-slate-200 border border-slate-300 rounded-md px-4 py-3 text-lg cursor-pointer">
            
            <span className="text-slate-600 h-full ml-2">
              Regresar
            </span>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
          type="submit"
          value={"Enviar"}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default Step5;
