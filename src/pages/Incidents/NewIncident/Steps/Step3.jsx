import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineFileDone } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import DepartmentService from "../../../../services/Dimensions/Department/Department.Service";
import MunicipalityService from "../../../../services/Dimensions/Municipality/Municipality.Service";
import Input from "../../../../components/Forms/Inputs/Input";
import RadioButtons from "../../../../components/Forms/RadioButtons/RadioButtons";
import Select from "../../../../components/Forms/Select/Select";
import Checkbox from "../../../../components/Forms/Checkbox/Checkbox";
import Textarea from "../../../../components/Forms/Textarea/Textarea";

const Step3 = ({ handlerStore }) => {
  const screenHeight = document.body.clientHeight;

  const [radioValues, setRadioValues] = useState({
    statal_institution: 0,
  });

  const [municipalities, setMunicipalities] = useState([
    { option: "Selecciona una opcion", value: "Default value" },
  ]);
  const [departments, setDepartments] = useState([
    { option: "Selecciona una opcion", value: "Default value" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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

  const handlerRadioButton = ({ name, value }) => {
    setRadioValues({ ...radioValues, [name]: value });
  };

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
        <AiOutlineFileDone className="text-4xl" />
        <h2 className="ml-2 text-3xl">Perfil especifico de los hechos.</h2>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Fecha en que Ocurrieron los Hechos"}
            name={"date_hechos"}
            type={"date"}
            placeholder={"Fecha en que Ocurrieron los Hechos"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-1/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Hora Aprox."}
            name={"datetime_hechos"}
            type={"time"}
            placeholder={"Hora aproximada de los hehos"}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="relative md:w-2/5 px-3">
          <Select
            label={"Departamento"}
            name={"deparment"}
            options={departments}
            required={"*Este campo es obligatorio."}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
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
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-2/4 px-3 mb-6 md:mb-0">
          <Checkbox
            label={"Causa del desplazamiento"}
            name={"cause_displacement"}
            options={[
              "Amenazas",
              "Homicidio",
              "Extorsión",
              "Desaparición de un Miembro de la Familia",
              "Reclutamiento Forzoso",
              "Testigo de un hecho Delictivo",
              "Agresión Física",
            ]}
            register={register}
            errors={errors}
            required={"*Este campo es obligatorio."}
          />
        </div>
        <div className="md:w-2/4 px-3 mb-6 md:mb-0">
          <Checkbox
            label={"Personas o grupos que generaron el desplazamiento"}
            name={"people_displacement"}
            options={[
              "FAES",
              "PNC",
              "Crimen Organizado",
              "Desconocidos",
              "Pandillas (MS)",
              "Pandillas (Barrio 18)",
              "Particulares",
              "Otro"
            ]}
            register={register}
            errors={errors}
            openOption={{ type: "text", index: 7 }}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3 mb-6 md:mb-0">
          <Checkbox
            label={"¿Cuáles instituciones han acompañado?"}
            name={"institutions_accompanied"}
            options={[
              "Ninguna",
              "PNC",
              "FGR",
              "PDDH",
              "PGR",
              "ISDEMU",
              "CONNA",
              "Otra"
            ]}
            register={register}
            errors={errors}
            openOption={{ type: "text", index: 7 }}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-2/5 px-3 mb-6 md:mb-0">
          <RadioButtons
            label={"¿Interpuso denuncia en alguna instancia estatal?"}
            name={"statal_institution"}
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
        <div className="md:w-3/5 px-3 mb-6 md:mb-0">
          <Input
            label={"Nombre de la institucion estatal"}
            name={"statal_institution_name"}
            type={"text"}
            placeholder={"Nombre de la institucion estatal"}
            register={register}
            errors={errors}
            disabled={radioValues?.statal_institution}
            validation={radioValues?.statal_institution}
            required={"*Este campo es obligatorio."}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full md:h-min px-3 mb-6 md:mb-0">
          <Textarea
            label={"Descripcion del acompañamiento brindado"}
            name={"accompanied_descriptions"}
            type={"text"}
            height={screenHeight / 6}
            placeholder={"Descripcion del acompañamiento brindado..."}
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

export default Step3;
