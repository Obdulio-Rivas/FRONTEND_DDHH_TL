import React from "react";
import { useForm } from "react-hook-form";
import { GrMoney } from "react-icons/gr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/Forms/Inputs/Input";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";
import Checkbox from "../../../../components/Forms/Checkbox/Checkbox";

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

  const handlerClick = () => {
    navigate("/incident/step2");
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
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"La casa donde resido/ residía era"}
            name={"home"}
            options={[
              "Propia",
              "Alquilada",
              "Financiada",
              "Casa Familiar"
            ]}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-2/4 px-3 mb-6 md:mb-0">
          <Input
            label={"Ingresos Mensuales del grupo familiar"}
            name={"monthly_income"}
            type={"text"}
            placeholder={"Institución u organización que conoce sobre el caso..."}
            register={register}
            errors={errors}
          />
        </div>
        <div className="md:w-2/4 px-3 mb-6 md:mb-0">
          <Input
            label={"Ingreso actual del grupo familiar"}
            name={"familiar_income"}
            type={"text"}
            placeholder={"Institución u organización que conoce sobre el caso..."}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3 mb-6 md:mb-0">
          <Checkbox
            label={"¿Cómo ha logrado sobrevivir durante el desplazamiento?"}
            name={"survive_displacement"}
            options={[
              "Ahorros",
              "Trabajo Informal",
              "Préstamo",
              "Remesas",
              "Empeños",
              "Mendicidad",
              "Otro"
            ]}
            register={register}
            errors={errors}
            openOption={{ type: "text", index: 6 }}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div class="flex flex-row justify-between -mx-0.5 md:flex mb-2">
        <div onClick={() => handlerClick()}>
          <div className="flex flex-row items-center bg-slate-200 border border-slate-300 rounded-md px-4 py-3 text-lg cursor-pointer">
            <span className="text-slate-600 h-full ml-2">Regresar</span>
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

export default Step3;
