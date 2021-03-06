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
import IncidentVictimsService from "../../../services/IncidentVictims/IncidentVictims.Service";
import VictimService from "../../../services/Victim/Victim.Service";
import MunicipalityService from "../../../services/Dimensions/Municipality/Municipality.Service";
import DepartmentService from "../../../services/Dimensions/Department/Department.Service";
import toast from "react-hot-toast";

const ViewIncident = () => {
  let { id_incident } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [incident, setIncident] = useState([]);
  const [victims, setVictims] = useState([]);
  const [complainant, setComplainant] = useState({});
  const [department, setDepartment] = useState([]);
  const [municipality, setMunicipality] = useState([]);

  useEffect(() => {
    async function getIncidentsOfUser(id_incident) {
      let arrayIncidenteVictim = [];
      let arrayVictims = [];
      const departmentResponse = await DepartmentService.getDepartments();
      setDepartment(departmentResponse.data);
      const municipalityResponse =
        await MunicipalityService.getMunicipalities();
      setMunicipality(municipalityResponse.data);
      const response = await IncidentService.getIncident(id_incident);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
        setIncident(response.data);
        /**Trayendo el id de las victimas relacionadas */
        const incidentVictimResponse =
          await IncidentVictimsService.getIncidentVictimByIdIncident(
            id_incident
          );
        incidentVictimResponse.data.map(({ id_victim }) => {
          return arrayIncidenteVictim.push(id_victim);
        });
        /**Mostrando las victimas relacionadas al caso */
        for (let i = 0; i < arrayIncidenteVictim.length; i++) {
          let victimResponse = await VictimService.getVictim(
            arrayIncidenteVictim[i]
          );
          if (victimResponse.data[0].type_victim !== "victima") {
            setComplainant(victimResponse.data[0]);
          }
          if (victimResponse.data[0].type_victim === "victima") {
            arrayVictims.push(victimResponse.data[0]);
          }
        }
        setVictims(arrayVictims);
        setIsLoading(false);
        toast.success(`Incidente cargado con exito!`, {
          position: "bottom-center",
        });
      }else{
        toast.error(`No se encontro ningun incidente!`, {
          position: "bottom-center",
        });
      }
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
                  <span>{incident[0]?.expediente}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Fecha:</span>
                  <span>{incident[0]?.incident_date}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Hora:</span>
                  <span>
                    {incident[0]?.hour?.split(":")[0] >= 12 &&
                    incident[0]?.hour?.split(":")[1] > 0
                      ? `${incident[0]?.hour} PM`
                      : `${incident[0]?.hour} AM`}
                  </span>
                </li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  <span className="mr-2">
                    ??Conoce otra instituci??n u organizaci??n sobre el caso?
                  </span>
                  <span className="mx-2">
                    Si{" "}
                    {incident[0]?.incident_institution === 1 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {incident[0]?.incident_institution === 0 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </li>
                <li className="py-1">
                  <span className="mr-2">??Cu??l?</span>
                  <span>{incident[0]?.incident_institution_name}</span>
                </li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  <span className="mr-2">Nombre de quien Refiere:</span>
                  <span>{incident[0]?.name_reference}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Contacto:</span>
                  <span>{incident[0]?.contact}</span>
                </li>
                <li className="py-1">
                  <span className="mr-2">Identificaci??n del Caso:</span>
                  <span>{incident[0]?.incident_identification}</span>
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
                    {complainant?.type_victim === "denunciante y victima" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {complainant?.type_victim === "denunciante" ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </span>
              </h1>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  {`Nombre Completo: ${complainant?.name} ${complainant?.last_name}`}
                </li>
                <li className="py-1">{`Edad: ${complainant?.age}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`Tipo de Documento de Identidad:  ${complainant?.type_dui}`}</li>
                <li className="py-1">{`N?? de Documento:  ${complainant?.dui}`}</li>
                <li className="py-1">
                  <span className="mr-2">Sabe Leer y Escribir:</span>
                  <span className="mx-2">
                    Si{" "}
                    {complainant?.illiterate === 1 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {complainant?.illiterate === 0 ? (
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
                    {complainant?.gender === 1 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    Mujer{" "}
                    {complainant?.gender === 0 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </li>
                <li className="py-1">{`Orientaci??n Sexual/Identidad de G??nero: ${complainant?.gender_identity}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`Grado Acad??mico: ${complainant?.academic_grade}`}</li>
                <li className="py-1">{`Profesi??n u Oficio: ${complainant?.profession}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`Pa??s: ${complainant?.country}`}</li>
                <li className="py-1">{`Departamento: ${
                  department.filter(
                    (x) => x.id_department === complainant?.department
                  )[0]?.department
                }`}</li>
                <li className="py-1">{`Municipio: ${
                  municipality.filter(
                    (x) => x.id_municipality === complainant?.municipality
                  )[0]?.municipality
                }`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">{`Direcci??n: ${complainant?.adress}`}</li>
                <li className="py-1">{`Tel??fono: ${complainant?.phone}`}</li>
              </ul>
            </div>
            <div className="my-4">
              <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
                <span>III. DATOS DE LAS VICTIMAS.</span>
                <span className="text-base">
                  {`N??mero total de personas afectadas: ${
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
                      prescription_drug,
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

                          <li className="py-1">
                            <span className="mr-2">Sabe Leer y Escribir:</span>
                            <span className="mx-2">
                              Si{" "}
                              {illiterate === 1 ? (
                                <BsCheckSquare className="inline-flex text-sm" />
                              ) : (
                                <BsSquare className="inline-flex text-sm" />
                              )}
                            </span>
                            <span className="mx-2">
                              No{" "}
                              {illiterate === 0 ? (
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
                              {gender === 1 ? (
                                <BsCheckSquare className="inline-flex text-sm" />
                              ) : (
                                <BsSquare className="inline-flex text-sm" />
                              )}
                            </span>
                            <span className="mx-2">
                              Mujer{" "}
                              {gender === 0 ? (
                                <BsCheckSquare className="inline-flex text-sm" />
                              ) : (
                                <BsSquare className="inline-flex text-sm" />
                              )}
                            </span>
                          </li>
                          <li className="py-1">
                            {`
                    Orientaci??n Sexual/Identidad de G??nero: ${gender_identity}`}
                          </li>
                        </ul>
                        <ul className="flex flex-row flex-wrap justify-between px-5">
                          <li className="py-1">
                            {`
                    Grado Acad??mico: ${academic_grade}`}
                          </li>
                          <li className="py-1">
                            {`
                    Profesi??n u Oficio: ${profession}`}
                          </li>
                        </ul>
                        <ul className="flex flex-row flex-wrap justify-between px-5">
                          <li className="py-1">
                            <span className="mr-2">
                              Padece de alguna Discapacidad F??sica:
                            </span>
                            <span className="mx-2">
                              Si{" "}
                              {physical_disability === 1 ? (
                                <BsCheckSquare className="inline-flex text-sm" />
                              ) : (
                                <BsSquare className="inline-flex text-sm" />
                              )}
                            </span>
                            <span className="mx-2">
                              No{" "}
                              {physical_disability === 0 ? (
                                <BsCheckSquare className="inline-flex text-sm" />
                              ) : (
                                <BsSquare className="inline-flex text-sm" />
                              )}
                            </span>
                          </li>
                          <li className="py-1">
                            {`
                    Tipo de Discapacidad: ${type_disability!=null ? type_disability:"-"}`}
                          </li>
                        </ul>
                        <ul className="flex flex-row flex-wrap justify-between px-5">
                          <li className="py-1">
                            <span className="mr-2">
                              Padece de Alguna Enfermedad Cr??nica:
                            </span>
                            <span className="mx-2">
                              Si{" "}
                              {chronic_disease === 1 ? (
                                <BsCheckSquare className="inline-flex text-sm" />
                              ) : (
                                <BsSquare className="inline-flex text-sm" />
                              )}
                            </span>
                            <span className="mx-2">
                              No{" "}
                              {chronic_disease === 0 ? (
                                <BsCheckSquare className="inline-flex text-sm" />
                              ) : (
                                <BsSquare className="inline-flex text-sm" />
                              )}
                            </span>
                          </li>
                          <li className="py-1">
                            {`
                    Medicamento Recetado: ${prescription_drug!=null ? prescription_drug:"-"}`}
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
                    <li className="py-1">{`Fecha en que Ocurrieron los Hechos: ${incident[0]?.date_hechos}`}</li>
                    <li className="py-1">{`Hora Aproximada: ${incident[0]?.incident_time}`}</li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">{`Departamento: ${
                      department.filter(
                        (x) => x.id_department === incident[0]?.department
                      )[0]?.department
                    }`}</li>
                    <li className="py-1">{`Municipio: ${
                      municipality.filter(
                        (x) => x.id_municipality === incident[0]?.municipality
                      )[0]?.municipality
                    }`}</li>
                    <li className="py-1">{`Direcci??n: ${incident[0]?.adress}`}</li>
                  </ul>
                </div>
                <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
                  <li className="py-1">
                    <span>Causa del Desplazamiento:</span>
                    <ul>{incident[0]?.cause_displacement}</ul>
                  </li>
                </ul>
                <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
                  <li className="py-1">
                    <span>
                      Personas o grupos que generaron el desplazamiento:
                    </span>
                    <ul>{incident[0]?.people_displacement}</ul>
                  </li>
                </ul>
                <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
                  <li className="py-1">
                    <span>??Cu??les instituciones han acompa??ado?</span>
                    <ul>{incident[0]?.institutions_accompanied}</ul>
                  </li>
                </ul>
                <div className="py-2">
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      <span className="mr-2">
                        ??Interpuso denuncia en alguna instancia estatal?
                      </span>
                      <span className="mx-2">
                        Si{" "}
                        {incident[0]?.statal_institution === 1 ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                      <span className="mx-2">
                        No{" "}
                        {incident[0]?.statal_institution === 0 ? (
                          <BsCheckSquare className="inline-flex text-sm" />
                        ) : (
                          <BsSquare className="inline-flex text-sm" />
                        )}
                      </span>
                    </li>
                    <li className="py-1">{`??En Cual? ${incident[0]?.statal_institution_name!= null ? incident[0]?.statal_institution_name : "-" }`}</li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      ??Descripci??n del Acompa??amiento brindado?
                    </li>
                    <li className="py-1">
                      {incident[0]?.accompanied_descriptions}
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
                <span className="text-base">{`La casa donde resido/ resid??a era: 
          ${
            ["Propia", "Alquilada", "Financiada", "Casa", "Familiar", "Otros"][
              incident[0]?.home
            ]
          }`}</span>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <span className="text-base">
                  {`Ingresos Mensuales del grupo familiar: ${incident[0]?.monthly_income}`}
                </span>
                <span>{`Ingreso actual del grupo familiar:  ${incident[0]?.familiar_income}`}</span>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  <span>
                    ??C??mo ha logrado sobrevivir durante el desplazamiento?
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
                  <span className="mr-2">??Ha decidido salir del pa??s?</span>
                  <span className="mx-2">
                    Si{" "}
                    {incident[0]?.country_leave === 1 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                  <span className="mx-2">
                    No{" "}
                    {incident[0]?.country_leave === 0 ? (
                      <BsCheckSquare className="inline-flex text-sm" />
                    ) : (
                      <BsSquare className="inline-flex text-sm" />
                    )}
                  </span>
                </li>
                <li className="py-1">{`??A qu?? pa??s? ${incident[0]?.country_leave_name==="0" ? "-":incident[0]?.country_leave_name}`}</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <span className="text-base">
                  {`??Cu??ntas personas de su grupo familiar? ${incident[0]?.family_cant===0?"-" : incident[0]?.family_cant}`}
                </span>
              </ul>
            </div>
            <div className="my-4">
              <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
                <span>VII. NARRATIVA DE LOS HECHOS.</span>
              </h1>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <span className="text-base text-justify">
                  {incident[0]?.description_incident}
                </span>
              </ul>
            </div>
            <div className="my-6">
              <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-6">
                <span>VIII. ACUERDO DE CREACION.</span>
              </h1>
              <div className="flex flex-row flex-wrap justify-between px-5">
                <p className="text-base text-justify">
                  {incident[0]?.creation_agreement}
                </p>
              </div>
              <div className="flex flex-row flex-wrap justify-end px-5 mt-6">
                <div className="flex flex-row justify-around items-center py-3">
                  
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
