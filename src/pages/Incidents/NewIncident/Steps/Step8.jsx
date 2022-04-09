import React, { useState, useEffect } from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../services/Auth/Auth.Service";
import VictimService from "../../../../services/Victim/Victim.Service";

const Step8 = ({ store, handlerStore }) => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const getMonthName = (monthNumber) => {
    return [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ][monthNumber];
  };

  //const getBiAnsewer

  const onSubmit = async (data) => {
    let id_user = AuthService.getCurrentUser().id_user;
    let id_incident = 0;
    let ids_victims = [];

    handlerStore({
      step8: {
        title: "Step8",
        values: data,
      },
    });

    store.step7.values.map(async (value) => {
      let response = await VictimService.postVictim(value);
      console.log(response);
      ids_victims.push(response.id_victim)
    });

    /*ids_victims.map(id_victim => async (value) => {
      let response = await VictimService.postVictim(value)
      
    });*/
    //navigate("/incident/step9");
  };

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white p-16 border border-slate-200">
      <div className="my-4 mb-10">
        <h1 className="text-2xl text-gray-900 font-bold text-center">
          FICHA DE REGISTRO Y SEGUIMIENTO DE CASOS DE DESPLAZAMIENTO FORZADO
          (Interno/Externo)
        </h1>
      </div>
      <div className="my-4">
        <h1 className="border border-slate-300 text-lg text-gray-800 font-semibold text-left py-2 px-4 mb-2">
          I. DATOS DE REGISTRO INSTITUCIONAL.
        </h1>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            <span>Expediente:</span>
            <span>{store?.step1?.values?.expediente}</span>
          </li>
          <li className="py-1">
            <span className="mr-2">Fecha:</span>
            <span>{store?.step1?.values?.incident_date}</span>
          </li>
          <li className="py-1">
            <span className="mr-2">Hora:</span>
            <span>
              {store?.step1?.values?.hour?.split(":")[0] >= 12 &&
              store?.step1?.values?.hour?.split(":")[1] > 0
                ? `${store?.step1?.values?.hour} PM`
                : `${store?.step1?.values?.hour} AM`}
            </span>
          </li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            <span className="mr-2">
              ¿Conoce otra institución u organización sobre el caso?
            </span>
            <span className="mx-2">
              Si{" "}
              {store?.step1?.values?.incident_institution === "1" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
            <span className="mx-2">
              No{" "}
              {store?.step1?.values?.incident_institution === "0" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
          </li>
          <li className="py-1">
            <span className="mr-2">¿Cuál?</span>
            <span>{store?.step1?.values?.incident_institution_name}</span>
          </li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            <span className="mr-2">Nombre de quien Refiere:</span>
            <span>{store?.step1?.values?.name_reference}</span>
          </li>
          <li className="py-1">
            <span className="mr-2">Contacto:</span>
            <span>{store?.step1?.values?.contact}</span>
          </li>
          <li className="py-1">
            <span className="mr-2">Identificación del Caso:</span>
            <span>{store?.step1?.values?.incident_identification}</span>
          </li>
        </ul>
      </div>
      <div className="my-4">
        <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
          <span>II. DATOS DE USUARIO.</span>
          <span className="text-base">
            Victima Directa:
            <span className="mx-2">
              Si{" "}
              {store?.step2?.values?.direct_victim === "1" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
            <span className="mx-2">
              No{" "}
              {store?.step2?.values?.direct_victim === "0" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
          </span>
        </h1>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            {`Nombre Completo: ${store?.step2?.values?.name} ${store?.step2?.values?.last_name}`}
          </li>
          <li className="py-1">{`Edad: ${store?.step2?.values?.age}`}</li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">{`Tipo de Documento de Identidad:  ${store?.step2?.values?.type_dui}`}</li>
          <li className="py-1">{`N° de Documento:  ${store?.step2?.values?.dui}`}</li>
          <li className="py-1">
            <span className="mr-2">Sabe Leer y Escribir:</span>
            <span className="mx-2">
              Si{" "}
              {store?.step2?.values?.illiterate === "1" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
            <span className="mx-2">
              No{" "}
              {store?.step2?.values?.illiterate === "0" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
          </li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            <span className="mr-2">Sexo:</span>
            <span className="mx-2">
              Hombre{" "}
              {store?.step2?.values?.gender === "1" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
            <span className="mx-2">
              Mujer{" "}
              {store?.step2?.values?.gender === "0" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
          </li>
          <li className="py-1">{`Orientación Sexual/Identidad de Género: ${store?.step2?.values?.gender_identity}`}</li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">{`Grado Académico: ${store?.step2?.values?.academic_grade}`}</li>
          <li className="py-1">{`Profesión u Oficio: ${store?.step2?.values?.profession}`}</li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">{`País: ${store?.step2?.values?.country}`}</li>
          <li className="py-1">{`Departamento: ${store?.step2?.values?.deparment}`}</li>
          <li className="py-1">{`Municipio: ${store?.step2?.values?.municipality}`}</li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">{`Dirección: ${store?.step2?.values?.adress}`}</li>
          <li className="py-1">{`Teléfono: ${store?.step2?.values?.phone}`}</li>
        </ul>
      </div>
      <div className="my-4">
        <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
          <span>III. DATOS DE LAS VICTIMAS.</span>
          <span className="text-base">
            {`Número total de personas afectadas: ${
              store?.step6?.values?.length ? store?.step7?.values?.length : 0
            }`}
          </span>
        </h1>
        <div className="divide-y divide-dashed divide-slate-300">
          {store?.step7?.values.map(
            (
              {
                name,
                last_name,
                age,
                type_dui,
                dui,
                illiterate,
                gender,
                physical_disability,
                gender_identity,
                type_disability,
                academic_grade,
                profession,
                chronic_disease,
                medicamento,
              },
              index
            ) => {
              return (
                <div className="py-4" key={index}>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">{`Nombre Completo: ${name} ${last_name}`}</li>
                    <li className="py-1">{`Edad: ${age}`}</li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">{`${type_dui}: ${dui}`}</li>
                    <li className="py-1">{`Sabe Leer y Escribir: ${
                      illiterate ? `Si ` : "No"
                    }`}</li>

                    <li className="py-1">
                      <span className="mr-2">Sabe Leer y Escribir:</span>
                      <span className="mx-2">
                        Si{" "}
                        {illiterate === "1" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                      <span className="mx-2">
                        No{" "}
                        {illiterate === "0" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                    </li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      <span className="mr-2">Sexo:</span>
                      <span className="mx-2">
                        Hombre{" "}
                        {gender === "1" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                      <span className="mx-2">
                        Mujer{" "}
                        {gender === "0" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                    </li>
                    <li className="py-1">
                      {`
                    Orientación Sexual/Identidad de Género: ${gender_identity}`}
                    </li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      {`
                    Grado Académico: ${academic_grade}`}
                    </li>
                    <li className="py-1">
                      {`
                    Profesión u Oficio: ${profession}`}
                    </li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      <span className="mr-2">
                        Padece de alguna Discapacidad Física:
                      </span>
                      <span className="mx-2">
                        Si{" "}
                        {physical_disability === "1" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                      <span className="mx-2">
                        No{" "}
                        {physical_disability === "0" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                    </li>
                    <li className="py-1">
                      {`
                    Tipo de Discapacidad: ${academic_grade}`}
                    </li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      <span className="mr-2">
                        Padece de Alguna Enfermedad Crónica:
                      </span>
                      <span className="mx-2">
                        Si{" "}
                        {chronic_disease === "1" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                      <span className="mx-2">
                        No{" "}
                        {chronic_disease === "0" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                    </li>
                    <li className="py-1">
                      {`
                    Medicamento Recetado: ${academic_grade}`}
                    </li>
                  </ul>
                </div>
              );
            }
          )}
          {store?.step7?.values?.length === 0 ? (
            <span>No se regitro ningun usuario!</span>
          ) : null}
        </div>
      </div>
      <div className="my-4">
        <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
          <span>IV. PERFIL ESPECIFICO DE LOS HECHOS.</span>
        </h1>
        <div className="divide-y divide-dotted divide-slate-300">
          <div className="py-2">
            <ul className="flex flex-row flex-wrap justify-between px-5">
              <li className="py-1">{`Fecha en que Ocurrieron los Hechos: ${store?.step3?.values?.date_hechos}`}</li>
              <li className="py-1">{`Hora Aproximada: ${store?.step3?.values?.datetime_hechos}`}</li>
            </ul>
            <ul className="flex flex-row flex-wrap justify-between px-5">
              <li className="py-1">{`Departamento: ${store?.step3?.values?.deparment}`}</li>
              <li className="py-1">{`Municipio: ${store?.step3?.values?.municipality}`}</li>
              <li className="py-1">{`Dirección: ${store?.step3?.values?.adress}`}</li>
            </ul>
          </div>
          <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
            <li className="py-1">
              <span>Causa del Desplazamiento:</span>
              <ul>
                {store?.step3?.values?.cause_displacement?.map(
                  (value, index) => (
                    <li key={index}>{value}</li>
                  )
                )}
              </ul>
            </li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
            <li className="py-1">
              <span>Personas o grupos que generaron el desplazamiento:</span>
              <ul>
                {store?.step3?.values?.people_displacement?.map(
                  (value, index) => (
                    <li key={index}>{value}</li>
                  )
                )}
              </ul>
            </li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
            <li className="py-1">
              <span>¿Cuáles instituciones han acompañado?</span>
              <ul>
                {store?.step3?.values?.institutions_accompanied.map(
                  (value, index) => (
                    <li key={index}>{value}</li>
                  )
                )}
              </ul>
            </li>
          </ul>
          <div className="py-2">
            <ul className="flex flex-row flex-wrap justify-between px-5">
              <li className="py-1">
                <span className="mr-2">
                  ¿Interpuso denuncia en alguna instancia estatal?
                </span>
                <span className="mx-2">
                  Si{" "}
                  {store?.step3?.values?.statal_institution === "1" ? (
                    <BsCheckSquare className="inline-flex text-sm" />
                  ) : (
                    <BsSquare className="inline-flex text-sm" />
                  )}
                </span>
                <span className="mx-2">
                  No{" "}
                  {store?.step3?.values?.statal_institution === "0" ? (
                    <BsCheckSquare className="inline-flex text-sm" />
                  ) : (
                    <BsSquare className="inline-flex text-sm" />
                  )}
                </span>
              </li>
              <li className="py-1">{`¿En Cual? ${store?.step3?.values?.statal_institution_name}`}</li>
            </ul>
            <ul className="flex flex-row flex-wrap justify-between px-5">
              <li className="py-1">
                ¿Descripción del Acompañamiento brindado?
              </li>
              <li className="py-1">
                {store?.step3?.values?.accompanied_descriptions}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-4">
        <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
          <span>V. PERFIL SOCIECONOMICO.</span>
        </h1>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <span className="text-base">{`La casa donde resido/ residía era: 
          ${
            ["Propia", "Alquilada", "Financiada", "Casa", "Familiar", "Otros"][
              store?.step4?.values?.home
            ]
          }`}</span>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <span className="text-base">
            {`Ingresos Mensuales del grupo familiar: ${store?.step4?.values?.monthly_income}`}
          </span>
          <span>{`Ingreso actual del grupo familiar:  ${store?.step4?.values?.familiar_income}`}</span>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            <span>¿Cómo ha logrado sobrevivir durante el desplazamiento?</span>
            <ul>
              {store?.step4?.values?.survive_displacement?.map(
                (value, index) => (
                  <li key={index}>{value}</li>
                )
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div className="my-4">
        <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
          <span>VI. PERFIL MIGRATORIO.</span>
        </h1>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            <span className="mr-2">¿Ha decidido salir del país?</span>
            <span className="mx-2">
              Si{" "}
              {store?.step5?.values?.country_leave === "1" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
            <span className="mx-2">
              No{" "}
              {store?.step5?.values?.country_leave === "0" ? (
                <BsCheckSquare className="inline-flex text-sm" />
              ) : (
                <BsSquare className="inline-flex text-sm" />
              )}
            </span>
          </li>
          <li className="py-1">{`¿A qué país? ${store?.step5?.values?.country_leave_name}`}</li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <span className="text-base">
            {`¿Cuántas personas de su grupo familiar? ${store?.step5?.values?.family_cant}`}
          </span>
        </ul>
      </div>
      <div className="my-4">
        <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
          <span>VII. NARRATIVA DE LOS HECHOS.</span>
        </h1>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <span className="text-base text-justify">
            {store?.step6?.values?.description_incident}
          </span>
        </ul>
      </div>
      <div className="my-6">
        <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-6">
          <span>VIII. ACUERDO DE CREACION.</span>
        </h1>
        <div className="flex flex-row flex-wrap justify-between px-5">
          <p className="text-base text-justify">
            Yo <b>{`${currentUser.name} ${currentUser.last_name}`}</b>, doy fe
            que la informacion plasmada en la ficha actual y elaborada por mi
            persona ha sido recopilada de viva voz por la persona que ha venido
            en calidad de victima directa o conocido de la misma a declarar los
            hechos anteriormente descritos a mi persona, a las{" "}
            {new Date().getHours()} horas con {new Date().getMinutes()} minutos
            del dia {new Date().getDate()} del mes de{" "}
            {getMonthName(new Date().getMonth())} del año{" "}
            {new Date().getFullYear()}.
          </p>
        </div>
        <form
          className="flex flex-row flex-wrap justify-end px-5 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="hidden"
            {...register("id_creater_user")}
            value={currentUser?.id_user}
          />
          <input
            className="cursor-pointer font-bold text-gray-800"
            type="submit"
            value={"Acepto el acuerdo"}
          />
        </form>
      </div>
    </div>
  );
};

export default Step8;
