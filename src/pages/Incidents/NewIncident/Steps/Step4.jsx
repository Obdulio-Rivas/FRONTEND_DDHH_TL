import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GiPassport } from "react-icons/gi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";

import Select from "../../../../components/Forms/Select/Select";
import Input from "../../../../components/Forms/Inputs/Input";

const Step4 = ({ handlerStore }) => {
  const [radioValues, setRadioValues] = useState({
    country_leave: 1
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handlerChecked = ({ name, value }) => {
    setRadioValues({ ...radioValues, [name]: value });
  };

  const onSubmit = (data) => {
    handlerStore({
      step4: {
        title: "Step4",
        values: data,
      },
    });
    navigate("/incident/step5");
  };

  return (
    <form
      className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-start mb-4">
        <GiPassport className="text-4xl" />
        <h2 className="ml-2 text-3xl">Perfil migratorio.</h2>
      </div>
      <div class="md:w-2/4 px-3 mb-6 md:mb-0">
        <RadioButtons
          label={"¿Ha decidido salir del país?"}
          name={"country_leave"}
          options={["Si", "No"]}
          register={register}
          errors={errors}
          handlerChecked={handlerChecked}
          required={"*Este campo es obligatorio."}
        />
      </div>
      <div className="relative md:w-2/4 px-3">
        <Select
          label={"¿A qué país?"}
          options={[
            { option: "El Salvador", value: "El Salvador" },
            { option: "Guatemala", value: "Guatemala" },
            { option: "Nicaragua", value: "Nicaragua" },
          ]}
          disabled={radioValues?.country_leave}
          name={"country_leave_name"}
          required={"*Este campo es obligatorio."}
          register={register}
          errors={errors}
        />
      </div>
      <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Nombres"}
            name={"name"}
            type={"text"}
            placeholder={"Nombres"}
            register={register}
            errors={errors}
            disabled={radioValues?.country_leave}
            required={"*Este campo es obligatorio."}
          />
        </div>
      <div key="family_cant" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
        <label
          htmlFor="family_cant"
          className="uppercase tracking-wide text-black text-xs font-bold mb-2"
        >
          ¿Cuántas personas de su grupo familiar?
        </label>
        <input
          className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
          {...register("family_cant")}
          type="number"
          id="family_cant"
          placeholder="Cantidad de personas del grupo familiar"
        />
        <div>
          {errors["family_cant"] && (
            <span className="text-red-500 text-xs italic">
              {errors["family_cant"].message}
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

export default Step4;
