import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Step2 = ({ handlerStore }) => {
  const { register, handleSubmit, formState:{errors}, watch } = useForm();
  const navigate = useNavigate();
  const useWatch = watch("statal_institution",0)

  const handlerChange = (e)=>{
    const {name,value,type,checked} = e.target
    if(name==="statal_institution" && checked===true)
    {
      console.log(name)
    }
  }

  const onSubmit = (data) => {
    handlerStore({
      step2: {
        title: "Step2",
        values: data,
      },
    });
    navigate("/incident/step3");
  };


  console.log(useWatch)
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
            <div className="-mx-3 md:flex mb-6">
            <div key="date_hechos" className="md:w-2/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="date_hechos" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  Fecha en que Ocurrieron los Hechos:
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("date_hechos", { required:"El expediente es requerido" })} type="date" id="date_hechos"/>
                  <div>
                    {errors["date_hechos"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["date_hechos"].message}
                      </span>)}
                </div>
            </div>
            <div key="adress" className="md:w-3/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="adress" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Direccion:
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("adress", { required:"La fecha es requerida"})} type="text" id="adress" placeholder="Direccion"/>
                  <div>
                    {errors["adress"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["adress"].message}
                      </span>)}
                </div>
            </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
            <div key="deparment" className="md:w-2/4 px-3 mb-6 md:mb-0">
                  <label htmlFor="deparment" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Departamento:
                  </label>
                  <select
                  {...register("deparment", { required:"debe seleccionar uno"})}
                  defaultValue="DEFAULT"
                  name="deparment"
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  id="deparment"
                >
                  <option key="San salvador" value="San salvador" className="py-3">San salvador</option>
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
            <div key="municipality" className="md:w-2/4 px-3 mb-6 md:mb-0">
                  <label htmlFor="municipality" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Municipalidad:
                  </label>
                  <select
                  {...register("municipality", { required:"debe seleccionar uno"})}
                  defaultValue="DEFAULT"
                  name="municipality"
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  id="municipality"
                >
                  <option key="San salvador" value="San salvador" className="py-3">San salvador</option>
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
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div key="cause_displacement" className="md:w-2/4 px-3 mb-6 md:mb-0">
                <label  className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                Causa del desplazamiento
                 <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <br></br>
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Amenanza"
                      {...register("cause_displacement")}
                    />
                    1.Amenaza
                  </label>
                  <br></br>
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
                    2.Homicidio
                  </label>
                  <br></br>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value=" Extorsión"
                      {...register("cause_displacement")}
                    />
                    3.Extorsión
                  </label>
                  <br></br>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Desaparición de un Miembro de la Familia"
                      {...register("cause_displacement")}
                    />
                    4.Desaparición de un Miembro de la Familia
                  </label>
                  <br></br>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Reclutamiento Forzoso"
                      {...register("cause_displacement")}
                    />
                    5.Reclutamiento Forzoso
                  </label>
                  <br></br>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Testigo de un hecho Delictivo"
                      {...register("cause_displacement")}
                    />
                    6.Testigo de un hecho Delictivo
                  </label>
                  <br></br>
                  <label
                    htmlFor="cause_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="cause_displacement"
                      name="cause_displacement"
                      value="Agresión Física"
                      {...register("cause_displacement")}
                    />
                     7.Agresión Física
                  </label>
                </label>
              </div>
              <div key="people_displacement" className="md:w-2/4 px-3 mb-6 md:mb-0">
                <label  className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                Personas o grupos que generaron el desplazamiento:
                <br></br>
                 <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="FAES"
                      {...register("people_displacement")}
                    />
                    1.FAES
                  </label>
                  <br></br>
                  <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="PNC"
                      {...register("people_displacement")}
                    />
                    2.PNC
                  </label>
                  <br></br>
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
                    3.Crimen Organizado
                  </label>
                  <br></br>
                  <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="Desconocidos"
                      {...register("people_displacement")}
                    />
                    4.Desconocidos
                  </label>
                  <br></br>
                  <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="Pandillas MS"
                      {...register("people_displacement")}
                    />
                    5.Pandillas MS
                  </label>
                  <br></br>
                  <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="Pandillas BARRIO 18"
                      {...register("people_displacement")}
                    />
                    6.Pandillas BARRIO 18
                  </label>
                  <br></br>
                  <label
                    htmlFor="people_displacement"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="people_displacement"
                      name="people_displacement"
                      value="Particulares"
                      {...register("people_displacement")}
                    />
                    7.Particulares
                  </label>
                </label>
              </div>
              </div>
              <div className="-mx-3 md:flex mb-6">
              <div key="institutions_accompanied" className="md:w-2/5 px-3 mb-6 md:mb-0">
                <label  className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                ¿Cuáles instituciones han acompañado?
                <label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <br></br>
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="Ninguna"
                      {...register("institutions_accompanied")}
                    />
                    1.Ninguna
                  </label>
                  <br></br>
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
                    2.PNC
                  </label>
                  <br></br>
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
                    3.FGR
                  </label>
                  <br></br>
                  <label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="PDDH"
                      {...register("institutions_accompanied")}
                    />
                    4.PDDH
                  </label>
                  <br></br>
                  <label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="PGR"
                      {...register("institutions_accompanied")}
                    />
                    5.PGR
                  </label>
                  <br></br>
                  <label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="ISDEMU"
                      {...register("institutions_accompanied")}
                    />
                    6.ISDEMU
                  </label>
                  <br></br>
                  <label
                    htmlFor="institutions_accompanied"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="checkbox"
                      id="institutions_accompanied"
                      name="institutions_accompanied"
                      value="CONNA"
                      {...register("institutions_accompanied")}
                    />
                    7.CONNA
                  </label>
                </label>
              </div>
            <div key="statal_institution" className="md:w-2/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="statal_institution" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                  ¿Interpuso denuncia en alguna instancia estatal?
                  </label>
                  <label
                    htmlFor="statal_institution"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <br></br>
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="radio"
                      id="statal_institution"
                      name="statal_institution"
                      value={1}
                      {...register("statal_institution",{onChange:handlerChange})}
                    />
                    SI
                  </label>
                  <label
                    htmlFor="statal_institution"
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    >
                      <input
                      className="accent-emerald-500/25 w-1/6 py-3 px-4 mb-3"
                      type="radio"
                      id="statal_institution"
                      name="statal_institution"
                      value={0}
                      {...register("statal_institution",{onChange:handlerChange})}
                    />
                    NO
                  </label>
            </div>
            {useWatch==1 && (<>
              <div key="statal_institution_name" className="md:w-2/5 px-3 mb-6 md:mb-0">
                  <label htmlFor="statal_institution_name" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Nombre de la institucion estatal:
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("statal_institution_name")} type="text" id="statal_institution_name"/>
                  <div>
                    {errors["statal_institution_name"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["statal_institution_name"].message}
                      </span>)}
                </div>
            </div>
            </>
            )}
            </div>
            <div key="accompanied_descriptions" className="sm:w-1/2 lg:1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="accompanied_descriptions" className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                    Descripcion del acompañamiento brindado:
                  </label>
                  <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                    {...register("accompanied_descriptions")} type="text" id="accompanied_descriptions"/>
                  <div>
                    {errors["accompanied_descriptions"] && (
                      <span className="text-red-500 text-xs italic">
                        {errors["accompanied_descriptions"].message}
                      </span>)}
                </div>
            </div>
            <div key="Button" className="w-full flex justify-end mt-4">
              <div className="md:w-auto px-3">
                <button className="w-full bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 uppercase">
                  Siguiente
                </button>
              </div>
            </div>
      </div>
  </div>
    </form>
    </div>
    </div>
  );
};

export default Step2;
