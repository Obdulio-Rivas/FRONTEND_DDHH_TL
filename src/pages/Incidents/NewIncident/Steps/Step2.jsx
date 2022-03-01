import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step2 = ({ handlerStore }) => {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handlerStore({
      step2: {
        title: "Step2",
        values: data,
      },
    });
    navigate("/incident/step3");
  };

  return (
    <div className=" mx-auto max-w-9xl lg:px-24">
      <div className="flex flex-wrap flex-col lg:w-5/5 mt-4">
    <form className="px-4 pt-2 pb-2 mb-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-5x1 mx-auto my-10 bg-white p-16 border border-slate-200">
        <div className="my-4 mb-10">
        <h1 className="text-2xl text-gray-900 font-bold text-center">
          FICHA DE REGISTRO Y SEGUIMIENTO DE CASOS DE DESPLAZAMIENTO FORZADO
          (Interno/Externo)
        </h1>
      </div>
      <div className="my-4">
            <h1 className="border border-slate-300 text-lg text-gray-800 font-semibold text-left py-2 px-4 mb-2">
            IV. PERFIL ESPECIFICO DE LOS HECHOS.
            </h1>
            <div className="flex flex-row flex-wrap w-4/5 mx-auto">
            <div key="date_hechos" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="date_hechos" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  Fecha en que Ocurrieron los Hechos:
                  </label>
                  <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    {...register("date_hechos", { required:"El expediente es requerido" })} type="date" id="date_hechos"/>
                  <div>
                    {errors["date_hechos"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["date_hechos"].message}
                      </span>)}
                </div>
            </div>
            <div key="adress" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="adress" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Direccion:
                  </label>
                  <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    {...register("adress", { required:"La fecha es requerida"})} type="text" id="adress"/>
                  <div>
                    {errors["adress"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["adress"].message}
                      </span>)}
                </div>
            </div>
            <div key="deparment" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="deparment" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Departamento:
                  </label>
                  <select
                  {...register("deparment", { required:"debe seleccionar uno"})}
                  defaultValue="DEFAULT"
                  name="deparment"
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="deparment"
                >
                    {/*{options.map(({title, value})=>{
                        return (<option key={value} value={value} disabled={value==='DEFAULT'?true:false} className="py-3">{title}</option>);
                    })}*/}
                </select>
                  <div>
                    {errors["deparment"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["deparment"].message}
                      </span>)}
                </div>
            </div>
            <div key="municipality" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="municipality" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Municipalidad:
                  </label>
                  <select
                  {...register("municipality", { required:"debe seleccionar uno"})}
                  defaultValue="DEFAULT"
                  name="municipality"
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="municipality"
                >
                    {/*{options.map(({title, value})=>{
                        return (<option key={value} value={value} disabled={value==='DEFAULT'?true:false} className="py-3">{title}</option>);
                    })}*/}
                </select>
                  <div>
                    {errors["municipality"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["municipality"].message}
                      </span>)}
                </div>
            </div>
            
              <div key="cause_displacement" className="sm:w-full md:w-1/2 lg:1/3 px-3 mb-6 md:mb-0">
                <label  className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                Causa del desplazamiento
                 <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Amenanza"
                      {...register("cause_displacement")}
                    />
                    Amenaza
                  </label>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Amenanza"
                      {...register("cause_displacement")}
                    />
                    Homicidio
                  </label>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Homicidio"
                      {...register("cause_displacement")}
                    />
                    Amenaza
                  </label>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Amenanza"
                      {...register("cause_displacement")}
                    />
                    Amenaza
                  </label>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Amenanza"
                      {...register("cause_displacement")}
                    />
                    Amenaza
                  </label>
                </label>
              </div>
              <div key="people_displacement" className="sm:w-full md:w-1/2 lg:1/3 px-3 mb-6 md:mb-0">
                <label  className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                Personas o grupos que generaron el desplazamiento:
                 <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="FAES"
                      {...register("people_displacement")}
                    />
                    FAES
                  </label>
                  <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="Crimen Organizado"
                      {...register("people_displacement")}
                    />
                    Crimen Organizado
                  </label><label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="Crimen Organizado"
                      {...register("people_displacement")}
                    />
                    Crimen Organizado
                  </label><label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="FAES"
                      {...register("people_displacement")}
                    />
                    FAES
                  </label>
                </label>
              </div>
              <div key="institutions_accompanied" className="sm:w-full md:w-1/2 lg:1/3 px-3 mb-6 md:mb-0">
                <label  className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                ¿Cuáles instituciones han acompañado?
                 <label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="PNC"
                      {...register("institutions_accompanied")}
                    />
                    PNC
                  </label>
                  <label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="FGR"
                      {...register("institutions_accompanied")}
                    />
                    FGR
                  </label><label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="FAES"
                      {...register("institutions_accompanied")}
                    />
                    FAES
                  </label>
                </label>
              </div>
            <div key="statal_institution" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="statal_institution" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  ¿Interpuso denuncia en alguna instancia estatal?
                  </label>
                  <label
                    htmlFor="statal_institution"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="statal_institution"
                      name="statal_institution"
                      value={1}
                      {...register("statal_institution")}
                    />
                    SI
                  </label>
                  <label
                    htmlFor="statal_institution"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="statal_institution"
                      name="statal_institution"
                      value={0}
                      {...register("statal_institution")}
                    />
                    NO
                  </label>
            </div>
            <div key="statal_institution_name" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="statal_institution_name" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Nombre de la institucion estatal:
                  </label>
                  <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    {...register("statal_institution_name")} type="text" id="statal_institution_name"/>
                  <div>
                    {errors["statal_institution_name"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["statal_institution_name"].message}
                      </span>)}
                </div>
            </div>
            <div key="accompanied_descriptions" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="accompanied_descriptions" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Descripcion del acompañamiento brindado:
                  </label>
                  <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    {...register("accompanied_descriptions")} type="text" id="accompanied_descriptions"/>
                  <div>
                    {errors["accompanied_descriptions"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["accompanied_descriptions"].message}
                      </span>)}
                </div>
            </div>
            <input type="submit" />
          </div>
      </div>
  </div>
    </form>
    </div>
    </div>
  );
};

export default Step2;
