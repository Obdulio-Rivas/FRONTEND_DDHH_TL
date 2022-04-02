import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import Input from "../../../../components/Forms/Inputs/Input";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";
import IncidentService from "../../../../services/Incident/Incident.Service";
import AuthService from "../../../../services/Auth/Auth.Service";

/*const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  age: yup.number().required().positive().integer(),
  website: yup.string().url(),
});*/

const Step1 = ({ handlerStore }) => {
  const [lastIncidentCreated, setLastIncidentCreated] = useState(0);
  const [radioValues, setRadioValues] = useState({
    incident_institution: 0,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const handlerRadioButton = ({ name, value }) => {
    console.log(value)
    setRadioValues({ ...radioValues, [name]: value });
  };

  useEffect(() => {
    async function getSelectOptions() {
      const id_current_user = AuthService.getCurrentUser().id_user;
      const response = await IncidentService.getIncidentsByUser(
        id_current_user
      );
      const last_incident_id =
        response?.data?.length !== 0
          ? response?.data[response?.data?.length - 1].id_incident
          : 0;
      setLastIncidentCreated(last_incident_id);
    }
    getSelectOptions();
  }, []);

  useEffect(() => {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const currentDay = now.getFullYear() + "-" + month + "-" + day;
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
    const currentMilliseconds = now.getTime().toString();
    const expediente_name = `${AuthService.getCurrentUser().name[0]}${
      AuthService.getCurrentUser().last_name[0]
    }-${currentMilliseconds}`;
    const defaultValues = [
      {
        key: "expediente",
        value: `TDH-${expediente_name}-${lastIncidentCreated}`,
      },
      {
        key: "incident_date",
        value: currentDay,
      },
      {
        key: "hour",
        value: currentTime,
      },
      {
        key: "incident_institution_name",
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
  }, [setValue, lastIncidentCreated]);

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
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Expediente"}
            name={"expediente"}
            type={"text"}
            placeholder={"Expediente"}
            register={register}
            errors={errors}
            disabled={0}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Fecha"}
            name={"incident_date"}
            type={"date"}
            placeholder={"Fecha"}
            register={register}
            errors={errors}
            disabled={0}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-1/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Hora"}
            name={"hour"}
            type={"text"}
            placeholder={"Hora"}
            register={register}
            errors={errors}
            disabled={0}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"¿Conoce otra institución u organización sobre el caso?"}
            name={"incident_institution"}
            options={[{label: "Si", value: 1}, {label: "No", value: 0}]}
            register={register}
            errors={errors}
            handlerChange={handlerRadioButton}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-3/5 px-3 mb-6 md:mb-0">
          <Input
            label={"¿Cuál?"}
            name={"incident_institution_name"}
            type={"text"}
            placeholder={
              "Institución u organización que conoce sobre el caso..."
            }
            disabled={radioValues?.incident_institution}
            validation={radioValues?.incident_institution}
            required={"Digite una organizacion o institucion."}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-2/6 px-3 mb-6 md:mb-0">
          <Input
            label={"Contacto"}
            name={"contact"}
            type={"text"}
            placeholder={"7777-7777"}
            register={register}
            errors={errors}
            pattern={/^\d{4}-\d{4}$/g}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-2/6 px-3 mb-6 md:mb-0">
          <Input
            label={"Nombre de quien Refiere"}
            name={"name_reference"}
            type={"text"}
            placeholder={"Nombre de quien Refiere"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-2/6 px-3 mb-6 md:mb-0">
          <Input
            label={"Identificación del Caso"}
            name={"incident_identification"}
            type={"text"}
            placeholder={"Identificación del Caso"}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div class="flex flex-row justify-end -mx-0.5 md:flex mb-2">
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

export default Step1;
