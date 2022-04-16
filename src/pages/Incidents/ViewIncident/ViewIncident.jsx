import React, { useState, useEffect } from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Dots from "../../../components/Loaders/Dots";
import Navbar from "../../../components/Navbar/Navbar";
import AuthService from "../../../services/Auth/Auth.Service";
import IncidentService from "../../../services/Incident/Incident.Service";
import Incident from "../../../templates/pdfs/incident/Incident";
import PDFDownload from "../../../templates/pdfs/PDFDownload";
import { AiOutlinePrinter } from "react-icons/ai";

const ViewIncident = () => {
  let { id_incident } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [incident, setIncident] = useState([]);
  const [victims, setVictims] = useState([]);
  const [incidentUser, setIncidentUser] = useState([]);

  useEffect(() => {
    async function getIncidentsOfUser(id_incident) {
      const response = await IncidentService.getIncident(id_incident);
      console.log(response);
      setIncident(response.data);
      setIsLoading(false);
    }
    getIncidentsOfUser(id_incident);
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Dots />
      </>
    );
  }

  if (!incident?.length) {
    return (
      <>
        <Navbar />
        <span>No se encotraron casos aun relacionados al usuario.</span>
      </>
    );
  }

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="max-w-5xl mx-auto my-10 bg-white p-16 border border-slate-200">
            <div className="my-4 mb-10">
              <h1 className="text-2xl text-gray-900 font-bold text-center">
                FICHA DE REGISTRO Y SEGUIMIENTO DE CASOS DE DESPLAZAMIENTO
                FORZADO (Interno/Externo)
              </h1>
            </div>
            <div className="my-4">
              <h1 className="border border-slate-300 text-lg text-gray-800 font-semibold text-left py-2 px-4 mb-2">
                I. DATOS DE REGISTRO INSTITUCIONAL.
              </h1>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  <span>Expediente:</span>
                  <span>{incident[0].expediente}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Fecha:</span>
                  <span>{incident[0].incident_date}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Hora:</span>
                  <span>
                    {
                    incident[0].hour?.split(":")[0] >= 12 &&
                    incident[0].hour?.split(":")[1] > 0
                      ? `${incident[0].hour} PM`
                      : `${incident[0].hour} AM`}
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
                    {incident[0].incident_institution === 1 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {incident[0].incident_institution === 0 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </li>
                <li className="py-1">
                  <span className="mr-2">¿Cuál?</span>
                  <span>{incident[0].incident_institution_name}</span>
                </li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  <span className="mr-2">Nombre de quien Refiere:</span>
                  <span>{incident.name_reference}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Contacto:</span>
                  <span>{incident.contact}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Identificación del Caso:</span>
                  <span>{incident.incident_identification}</span>
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
                    {incident.direct_victim === "1" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {incident.direct_victim === "0" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </span>
              </h1>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  {`Nombre Completo: ${incident.name} ${incident.last_name}`}
                </li>
                <li className="py-1">{`Edad: ${incident.age}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`Tipo de Documento de Identidad:  ${incident.type_dui}`}</li>
                <li className="py-1">{`N° de Documento:  ${incident.dui}`}</li>
                <li className="py-1">
                  <span className="mr-2">Sabe Leer y Escribir:</span>
                  <span className="mx-2">
                    Si{" "}
                    {incident.illiterate === "1" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {incident.illiterate === "0" ? (
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
                    {incident.gender === "1" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    Mujer{" "}
                    {incident.gender === "0" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </li>
                <li className="py-1">{`Orientación Sexual/Identidad de Género: ${incident.gender_identity}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`Grado Académico: ${incident.academic_grade}`}</li>
                <li className="py-1">{`Profesión u Oficio: ${incident.profession}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`País: ${incident.country}`}</li>
                <li className="py-1">{`Departamento: ${incident.deparment}`}</li>
                <li className="py-1">{`Municipio: ${incident.municipality}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`Dirección: ${incident.adress}`}</li>
                <li className="py-1">{`Teléfono: ${incident.phone}`}</li>
              </ul>
            </div>
            <div className="my-4">
              <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
                <span>III. DATOS DE LAS VICTIMAS.</span>
                <span className="text-base">
                  {`Número total de personas afectadas: ${
                    victims?.length ? victims?.length : 0
                  }`}
                </span>
              </h1>
              <div className="divide-y divide-dashed divide-slate-300">
                {victims?.map(
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
                {victims?.length === 0 ? (
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
                    <li className="py-1">{`Fecha en que Ocurrieron los Hechos: ${incident?.date_hechos}`}</li>
                    <li className="py-1">{`Hora Aproximada: ${incident?.datetime_hechos}`}</li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">{`Departamento: ${incident?.deparment}`}</li>
                    <li className="py-1">{`Municipio: ${incident?.municipality}`}</li>
                    <li className="py-1">{`Dirección: ${incident?.adress}`}</li>
                  </ul>
                </div>
                <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
                  <li className="py-1">
                    <span>Causa del Desplazamiento:</span>
                    <ul>
                      {incident?.cause_displacement?.map((value, index) => (
                        <li key={index}>{value}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
                <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
                  <li className="py-1">
                    <span>
                      Personas o grupos que generaron el desplazamiento:
                    </span>
                    <ul>
                      {incident?.people_displacement?.map((value, index) => (
                        <li key={index}>{value}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
                <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
                  <li className="py-1">
                    <span>¿Cuáles instituciones han acompañado?</span>
                    <ul>
                      {incident?.institutions_accompanied?.map(
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
                        {incident?.statal_institution === "1" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                      <span className="mx-2">
                        No{" "}
                        {incident?.statal_institution === "0" ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                    </li>
                    <li className="py-1">{`¿En Cual? ${incident?.statal_institution_name}`}</li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      ¿Descripción del Acompañamiento brindado?
                    </li>
                    <li className="py-1">
                      {incident?.accompanied_descriptions}
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
              incident?.home
            ]
          }`}</span>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <span className="text-base">
                  {`Ingresos Mensuales del grupo familiar: ${incident?.monthly_income}`}
                </span>
                <span>{`Ingreso actual del grupo familiar:  ${incident?.familiar_income}`}</span>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  <span>
                    ¿Cómo ha logrado sobrevivir durante el desplazamiento?
                  </span>
                  <ul>
                    {incident?.survive_displacement?.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
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
                    {incident?.country_leave === "1" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {incident?.country_leave === "0" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </li>
                <li className="py-1">{`¿A qué país? ${incident?.country_leave_name}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <span className="text-base">
                  {`¿Cuántas personas de su grupo familiar? ${incident?.family_cant}`}
                </span>
              </ul>
            </div>
            <div className="my-4">
              <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
                <span>VII. NARRATIVA DE LOS HECHOS.</span>
              </h1>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <span className="text-base text-justify">
                  {incident?.description_incident}
                </span>
              </ul>
            </div>
            <div className="my-6">
              <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-6">
                <span>VIII. ACUERDO DE CREACION.</span>
              </h1>
              <div className="flex flex-row flex-wrap justify-between px-5">
                <p className="text-base text-justify">
                  Yo <b>{`${incidentUser.name} ${incidentUser.last_name}`}</b>,
                  doy fe que la informacion plasmada en la ficha actual y
                  elaborada por mi persona ha sido recopilada de viva voz por la
                  persona que ha venido en calidad de victima directa o conocido
                  de la misma a declarar los hechos anteriormente descritos a mi
                  persona, a las {new Date().getHours()} horas con{" "}
                  {new Date().getMinutes()} minutos del dia{" "}
                  {new Date().getDate()} del mes de{" "}
                  {getMonthName(new Date().getMonth())} del año{" "}
                  {new Date().getFullYear()}.
                </p>
              </div>
              <div className="flex flex-row flex-wrap justify-end px-5 mt-6">
                <div className="flex flex-row justify-around items-center py-3">
                  <PDFDownload
                    document={<Incident />}
                    filename={`${incident?.expediente} - ${Date.now()}`}
                  >
                    <div className="flex flex-row justify-center items-center">
                      <AiOutlinePrinter className="text-4xl mx-1 cursor-pointer" />
                      <span>Descargar PDF</span>
                    </div>
                  </PDFDownload>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIncident;
