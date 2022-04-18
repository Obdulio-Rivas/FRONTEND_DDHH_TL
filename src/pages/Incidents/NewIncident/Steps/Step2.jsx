import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Select from "../../../../components/Forms/Select/Select";
import Input from "../../../../components/Forms/Inputs/Input";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";
import DepartmentService from "../../../../services/Dimensions/Department/Department.Service";
import MunicipalityService from "../../../../services/Dimensions/Municipality/Municipality.Service";

const Step2 = ({ handlerStore }) => {
  const navigate = useNavigate();
  const [municipalities, setMunicipalities] = useState([
    { option: "Selecciona una opcion", value: "Default value" },
  ]);
  const [departments, setDepartments] = useState([
    { option: "Selecciona una opcion", value: "Default value" },
  ]);

  const [radioValues, setRadioValues] = useState({
    chronic_disease: 0,
    physical_disability: 0,
  });

  const [SelectValues, setSelectValues] = useState({
    type_dui:"DUI"
  });

  useEffect(() => {
    async function getSelectOptions() {
      let arrayValues = [
        { option: "Selecciona una opcion por favor", value: 0 },
      ];
      let response = await DepartmentService.getDepartments();
      arrayValues = response?.data?.map(({ id_department, department }) => {
        return { option: department, value: id_department };
      });
      setDepartments(arrayValues);
    }
    getSelectOptions();
  }, []);

  useEffect(() => {
    async function getSelectOptions() {
      let arrayValues = [
        { option: "Selecciona una opcion por favor", value: 0 },
      ];
      let response = await MunicipalityService.getMunicipalities();
      arrayValues = response?.data?.map(({ id_municipality, municipality }) => {
        return { option: municipality, value: id_municipality };
      });
      setMunicipalities(arrayValues);
    }
    getSelectOptions();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlerRadioButton = ({ name, value }) => {
    setRadioValues({ ...radioValues, [name]: value });
  };

  const handlerSelect = ({name,value})=>{
    setSelectValues({...SelectValues,[name]:value});
    console.log(SelectValues);
  };

  const onSubmit = (data) => {
    handlerStore({
      step2: {
        title: "Step2",
        values: data,
      },
    });
    navigate("/incident/step3");
  };

  const handlerClick = () => {
    navigate("/incident/step1");
  };

  return (
    <form
      className="bg-white border border-slate-300 m-auto rounded px-8 py-8 mt-10 mb-4 flex flex-col md:w-2/3 sm:w-3/4 w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-row items-center justify-start">
          <FiUser className="text-4xl" />
          <h2 className="ml-2 text-3xl">Agregar Usuario.</h2>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <RadioButtons
              label={"Victima directa:"}
              name={"type_victim"}
              options={[
                { label: "Si", value: "denunciante y victima"},
                { label: "No", value: "denunciante"},
              ]}
              register={register}
              errors={errors}
              handlerChange={handlerRadioButton}
              required={"*Este campo es obligatorio."}
            />
          </div>
        </div>
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
            handlerSelect={handlerSelect}
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
            type_documentation={SelectValues?.type_dui}
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
                value: "Ninguno",
              },
              {
                option: "Basico",
                value: "Basico",
              },
              {
                option: "Educacion Media",
                value: "Educacion Media",
              },
              {
                option: "Graduado de bachillerato",
                value: "Graduado de bachillerato",
              },
              {
                option: "Universitario",
                value: "Universitario",
              },
              {
                option: "Graduado de Universidad",
                value: "Graduado de Universidad",
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
        <div className="relative md:w-2/6 px-3">
          <Select
            label={"Pais"}
            name={"country"}
            options={[
              {
                option: "Seleccione una opcion.",
                value: NaN,
              },
              { option: "El Salvador", value: "El Salvador" },
              { option: "Guatemala", value: "Guatemala" },
            ]}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
        <div className="relative md:w-2/6 px-3">
          <Select
            label={"Departamento"}
            name={"deparment"}
            options={departments}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
        <div className="relative md:w-2/6 px-3">
          <Select
            label={"Municipio"}
            name={"municipality"}
            options={municipalities}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-4/6 px-3 mb-6 md:mb-0">
          <Input
            label={"Direccion"}
            name={"adress"}
            type={"text"}
            placeholder={"Direccion"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-2/6 px-3 mb-6 md:mb-0">
          <Input
            label={"Telefono"}
            name={"phone"}
            type={"text"}
            placeholder={"7777-7777"}
            register={register}
            errors={errors}
            pattern={/^\d{4}-\d{4}$/g}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-3/6 px-3 mb-6 md:mb-0">
          <Input
            label={"Parroquia"}
            name={"adress"}
            type={"text"}
            placeholder={"Parroquia"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-3/6 px-3 mb-6 md:mb-0">
          <Input
            label={"Parroco"}
            name={"phone"}
            type={"text"}
            placeholder={"Parroco"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
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

export default Step2;
