import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GiPassport } from "react-icons/gi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";

import Select from "../../../../components/Forms/Select/Select";
import Input from "../../../../components/Forms/Inputs/Input";

const Step5 = ({ handlerStore }) => {
  const [radioValues, setRadioValues] = useState({
    country_leave: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const handlerRadioButton = ({ name, value }) => {
    setRadioValues({ ...radioValues, [name]: value });
  };

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

  useEffect(() => {
    const defaultValues = [
      {
        key: "country_leave_name",
        value: 0,
      },
      {
        key: "family_cant",
        value: "",
      },
    ];
    const setDefaultValues = (defaultValues) => {
      defaultValues.map(({ key, value }) => {
        setValue(key, value);
        return null;
      });
    };
    setDefaultValues(defaultValues);
  }, [setValue]);

  return (
    <form
      className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-start mb-4">
        <GiPassport className="text-4xl" />
        <h2 className="ml-2 text-3xl">Perfil migratorio.</h2>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div class="md:w-1/5 px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"¿Ha decidido salir del país?"}
            name={"country_leave"}
            options={[
              { label: "Si", value: 1 },
              { label: "No", value: 0 },
            ]}
            register={register}
            errors={errors}
            handlerChange={handlerRadioButton}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"¿Cuántas personas de su grupo familiar?"}
            name={"family_cant"}
            type={"number"}
            placeholder={"Numero de personas."}
            register={register}
            errors={errors}
            required={"Digite una cantidad de personas."}
            disabled={radioValues?.country_leave}
            validation={radioValues?.country_leave}
          />
        </div>
        <div className="relative md:w-2/5 px-3">
          <Select
            label={"¿A qué país?"}
            options={[
              { option: "Seleccione una opcion", value: "Ninguno" },
              { option: "El Salvador", value: "El Salvador" },
              { option: "Guatemala", value: "Guatemala" },
              { option: "Nicaragua", value: "Nicaragua" },
            ]}
            disabled={radioValues?.country_leave}
            name={"country_leave_name"}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div class="flex flex-row justify-between -mx-0.5 md:flex mb-2">
        <div onClick={() => handlerClick()}>
          <div className="flex flex-row items-center bg-slate-200 border border-slate-300 rounded-md px-4 py-3 text-lg cursor-pointer">
            <span className="text-slate-600 h-full">Regresar</span>
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
