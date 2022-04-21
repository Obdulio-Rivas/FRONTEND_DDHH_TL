import React, { useState, useEffect } from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../services/Auth/Auth.Service";
import VictimService from "../../../../services/Victim/Victim.Service";
import IncidentVictimsService from "../../../../services/IncidentVictims/IncidentVictims.Service";
import CaseService from "../../../../services/Incident/Incident.Service";

const Step8 = ({ store, handlerStore }) => {
  const step1 = store.step1?.values;
  const step2 = store.step2?.values;
  const step3 = store.step3?.values;
  const step4 = store.step4?.values;
  const step5 = store.step5?.values;
  const step6 = store.step6?.values;

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

  //Fecha
  const month_name = getMonthName(new Date().getMonth());
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const date = new Date().getDate();

  const creation_agreement = `Yo ${currentUser.name} ${currentUser.last_name}, doy fe
    que la informacion plasmada en la ficha actual y elaborada por mi
    persona ha sido recopilada de viva voz por la persona que ha venido
    en calidad de victima directa o conocido de la misma a declarar los
    hechos anteriormente descritos a mi persona, a las ${hours} horas con ${minutes} 
    minutos del dia ${date} del mes de ${month_name} del año ${year}.`;
  const onSubmit = async (data) => {
    let id_user = currentUser.id_user;
    let id_incident = 0;
    let array = [];
    let cause_displacement = "";
    let people_displacement = "";
    let institutions_accompanied = "";
    let survive_displacement = "";

    for (let i = 0; i < step3.cause_displacement.length; i++) {
      cause_displacement =
        cause_displacement + " - " + step3.cause_displacement[i];
    }
    for (let i = 0; i < step3.people_displacement.length; i++) {
      people_displacement =
        people_displacement + " - " + step3.people_displacement[i];
    }
    for (let i = 0; i < step3.institutions_accompanied.length; i++) {
      institutions_accompanied =
        institutions_accompanied + " - " + step3.institutions_accompanied[i];
    }
    for (let i = 0; i < step4.survive_displacement.length; i++) {
      survive_displacement =
        survive_displacement + " - " + step4.survive_displacement[i];
    }

    let Incidentobject = {
      expediente: step1.expediente,
      incident_date: step1.incident_date,
      hour: step1.hour,
      incident_institution: step1.incident_institution,
      incident_institution_name: step1.incident_institution_name,
      name_reference: step1.name_reference,
      contact: step1.contact,
      incident_identification: step1.incident_identification,
      //datos especificos del caso
      date_hechos: step3.date_hechos,
      incident_time: step3.incident_time,
      adress: step3.adress,
      deparment: step3.deparment,
      municipality: step3.municipality,
      cause_displacement: cause_displacement,
      people_displacement: people_displacement,
      institutions_accompanied: institutions_accompanied,
      statal_institution: step3.statal_institution,
      statal_institution_name: step3.statal_institution_name,
      accompanied_descriptions: step3.accompanied_descriptions,
      //perfil socioeconomico
      home: step4.home,
      monthly_income: step4.monthly_income,
      familiar_income: step4.familiar_income,
      survive_displacement: survive_displacement,
      //perfil migratorio
      country_leave: step5.country_leave,
      country_leave_name: step5.country_leave_name,
      family_cant: step5.family_cant === "" ? 0 : step5.family_cant,
      //general
      status: 0,
      description_incident: step6.description_incident,
      creation_agreement: creation_agreement,
      //Foreign key.
      id_type_incident: 0,
      id_user: id_user,
    };

    handlerStore({
      step8: {
        title: "Step8",
        values: data,
      },
    });

    //console.log(Incidentobject);

    /**Registrando el denunciante */
    let victimResponse = await VictimService.postVictim(step2);
    array.push(victimResponse.data.id_victim);
    console.log(victimResponse);

    /** Registrar Incidente */
    let caseResponse = await CaseService.postIncident(Incidentobject);
    id_incident = caseResponse.data.id_incident;
    console.log(caseResponse);

    /**Registrar las victimas */
    for (let i = 0; i < store.step7.values.length; i++) {
      let response = await VictimService.postVictim(store.step7.values[i]);
      array.push(response.data.id_victim);
    }

    /**Registrar la relacion de incidente victima */
    array.map(async (_id_victim) => {
      let newIncidentVictim = {
        id_incident: id_incident,
        id_user: id_user,
        id_victim: _id_victim,
      };
      let response = await IncidentVictimsService.postIncidentVictim(
        newIncidentVictim
      );
      console.log(response);
    });

    navigate(`/incident/verify/${id_incident}`);
  };

  console.log(!!store.step1)

  if (!store.step1 || !store.step2 || !store.step3 || !store.step4 || !store.step5 || !store.step6 || !store.step7 ) {
    return (
      <div className="max-w-5xl mx-auto my-10 bg-white p-16 border border-slate-200">
        <div className="my-4 mb-10">
          <h1 className="text-2xl text-gray-900 font-bold text-center">
            Aun faltan pasos que llenar
          </h1>
        </div>
      </div>
    );
  }

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
              <li className="py-1">{`Hora Aproximada: ${store?.step3?.values?.incident_time}`}</li>
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
          <p className="text-base text-justify">{creation_agreement}</p>
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
            className="hidden"
            {...register("creation_agreement")}
            value={creation_agreement}
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
