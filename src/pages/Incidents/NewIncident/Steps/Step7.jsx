import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiUser, FiUsers, FiMinus } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Select from "../../../../components/Forms/Select/Select";
import Input from "../../../../components/Forms/Inputs/Input";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";

const Step7 = ({ handlerStore }) => {
  const [showVictimsList, setShowVictimsList] = useState(false);
  const [victims, setVictims] = useState([]);
  const navigate = useNavigate();

  const [radioValues, setRadioValues] = useState({
    chronic_disease: 0,
    physical_disability: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlerClick = () => {
    setShowVictimsList(!showVictimsList);
  };

  const handlerRadioButton = ({name, value}) => {
    setRadioValues({...radioValues, [name]: value});
  }

  const onSubmitVictimToList = (data) => {
    if (victims.length === 0) {
      addVictim(data);
      toast.success("El usuario a sido agregado correctamente.", {
        position: "bottom-center",
      });
      return;
    }

    for (let i = 0; i < victims.length; i++) {
      if (victims[i].dui !== data.dui) {
        addVictim(data);
        toast.success("El usuario a sido agregado correctamente.", {
          position: "bottom-center",
        });
        return null;
      }else{
        toast.error(`Error: Ya existe una victima con DUI ${data.dui}.`, {
          position: "bottom-center",
        });
        return null;
      }
    }
  };

  const onSubmitVictimsToIncident = () => {
    handlerStore({
      step7: {
        title: "Step7",
        values: victims,
      },
    });
    navigate("/incident/step8");
  };

  const addVictim = (data) => {
    let listOfVictims = victims;
    listOfVictims.push({ ...data });
    setVictims(listOfVictims);
    reset();
  };

  const removeVictim = (pVictim) => {
    let resultVictims = victims.filter((victim) => victim.dui !== pVictim.dui);
    setVictims(resultVictims);
    toast.success(`Se removio la victima con DUI ${pVictim.dui} exitosamente.`, {
      position: "bottom-center",
    });
  };

  if (showVictimsList) {
    return (
      <form
        className="bg-white border border-slate-300 m-auto rounded px-8 pt-10 pb-8 mt-16 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
        onSubmit={handleSubmit(onSubmitVictimsToIncident)}
      >
        <div className="flex flex-row items-center justify-start mb-4">
          <FiUsers className="text-4xl" />
          <h2 className="ml-2 text-3xl">Listado de Victimas.</h2>
        </div>
        <div class="flex flex-col justify-between -mx-0.5 md:flex mb-6">
          {victims.map((victim, index) => {
            return (
              <div className="flex flex-row rounded w-full h-full" key={index}>
                <div className="flex flex-col w-full bg-slate-50 hover:bg-slate-100 p-4 border-l border-y rounded-l border-slate-300 transition-colors duration-700">
                  <div className="flex flex-row items-center">
                    <FiUser className="w-auto text-2xl mr-2" />
                    <div className="text-slate-700">
                      <span className="text-lg font-bold">{`${victim.name} ${victim.last_name}`}</span>
                      <span className="text-lg font-bold">{` - Edad ${victim.age} años.`}</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <HiOutlineIdentification className="w-auto text-2xl mr-2" />
                    <div className="text-slate-600">
                      <span className="text-base font-medium">{`${victim.type_dui}: ${victim.dui}`}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-row justify-center items-center bg-red-500 hover:bg-red-600 cursor-pointer px-4 transition-colors duration-700 border-r border-y rounded-r border-red-600"
                  onClick={() => removeVictim(victim)}
                >
                  <FiMinus className="block h-full" />
                </div>
              </div>
            );
          })}
        </div>
        <div class="flex flex-row justify-between -mx-0.5 md:flex mb-2">
          <div onClick={() => handlerClick()}>
            <div className="flex flex-row items-center bg-slate-200 border border-slate-300 rounded-md px-4 py-3 text-lg cursor-pointer">
              <FiUser />
              <span className="text-slate-600 h-full ml-2">
                Agregar Victima
              </span>
            </div>
          </div>
          <button
            className={`${victims.length === 0 ? "bg-slate-500 hover:bg-slate-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"} text-white font-bold rounded-md px-7 py-3 transition duration-1000`}
            type="submit"
            value={"Enviar"}
            disabled={victims.length === 0 ? true : false}
          >
            Siguiente
          </button>
        </div>
        <Toaster />
      </form>
    );
  }

  return (
    <form
      className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
      onSubmit={handleSubmit(onSubmitVictimToList)}
    >
      <div className="flex flex-row items-center justify-start mb-4">
        <FiUsers className="text-4xl" />
        <h2 className="ml-2 text-3xl">Agregar Victimas.</h2>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Nombres"}
            name={"name"}
            type={"text"}
            placeholder={"Nombres"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Apellidos"}
            name={"last_name"}
            type={"text"}
            placeholder={"Apellidos"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-1/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Edad"}
            name={"age"}
            type={"number"}
            placeholder={"Edad"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="relative md:w-1/3 px-3">
          <Select
            label={"Tipo de documento"}
            options={[
              { option: "DUI", value: "DUI" },
              { option: "NIT", value: "NIT" },
              { option: "CEDULA", value: "CEDULA" },
            ]}
            name={"type_dui"}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
        <div class="md:w-2/3 px-3 mb-6 md:mb-0">
          <Input
            label={"Numero de documento"}
            name={"dui"}
            type={"text"}
            placeholder={"Numero de documento"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"Sabe leer y escribir:"}
            name={"illiterate"}
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
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"Sexo:"}
            name={"gender"}
            options={[
              { label: "Masculino", value: 1 },
              { label: "Femenino", value: 0 },
            ]}
            register={register}
            errors={errors}
            handlerChange={handlerRadioButton}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-2/3 px-3 mb-6 md:mb-0">
          <Select
            label={"Orientación Sexual/ Identidad de Género:"}
            options={[
              {
                option: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              { option: "Homosexual", value: "Homosexual" },
              { option: "Heterosexual", value: "Heterosexual" },
              { option: "Binario", value: "Binario" },
              { option: "Otro", value: "Otro" },
            ]}
            name={"gender_identity"}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
        <div className="relative md:w-1/3 px-3">
          <Select
            label={"Grado Academico:"}
            options={[
              {
                option: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                option: "Ninguno",
                value: 0,
              },
              {
                option: "Basico",
                value: 1,
              },
              {
                option: "Educacion Media",
                value: 2,
              },
              {
                option: "Graduado de bachillerato",
                value: 3,
              },
              {
                option: "Universitario",
                value: 4,
              },
              {
                option: "Graduado de Universidad",
                value: 5,
              },
            ]}
            name={"academic_grade"}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
        <div className="relative md:w-1/3 px-3">
          <Select
            label={"Profesión u Oficio:"}
            options={[
              {
                option: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              { option: "Abogado", value: "Abogado" },
              { option: "Medico", value: "Medico" },
              { option: "Ingeniero", value: "Ingeniero" },
              { option: "Otro", value: "Otro" },
            ]}
            name={"profession"}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6 mt-4">
        <div class="md:w-1/5 px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"Padece de alguna Discapacidad Física:"}
            name={"physical_disability"}
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
        <div className="relative md:w-4/5 px-3">
          <Select
            label={"Tipo de Discapacidad:"}
            options={[
              {
                option: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              { option: "Enfermedad 1", value: "Enfermedad 1" },
              { option: "Enfermedad 2", value: "Enfermedad 2" },
              { option: "Enfermedad 3", value: "Enfermedad 3" },
              { option: "Otro", value: "Otro" },
            ]}
            disabled={radioValues?.physical_disability}
            name={"type_disability"}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6 mt-4">
        <div class="md:w-1/5 px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"Padece de Alguna Enfermedad Crónica:"}
            name={"chronic_disease"}
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
        <div className="relative md:w-4/5 px-3">
          <Select
            label={"Medicamento recetado:"}
            options={[
              {
                option: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              { option: "Medicamento 1", value: "Medicamento 1" },
              { option: "Medicamento 2", value: "Medicamento 2" },
              { option: "Medicamento 3", value: "Medicamento 3" },
              { option: "Otro", value: "Otro" },
            ]}
            disabled={radioValues?.chronic_disease}
            name={"medicamento"}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div class="flex flex-row justify-between -mx-0.5 md:flex mb-2">
        <div onClick={() => handlerClick()}>
          <div className="flex flex-row items-center bg-slate-200 border border-slate-300 rounded-md px-4 py-3 text-lg cursor-pointer">
            {victims.length === 0 ? <FiUser /> : <FiUsers />}
            <span className="text-slate-600 h-full ml-2">
              Victimas agregadas: {victims.length}
            </span>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-7 py-3 transition duration-1000"
          type="submit"
          value={"Enviar"}
        >
          Agregar Victima
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default Step7;
