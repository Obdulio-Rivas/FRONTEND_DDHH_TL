import React, { useState, useEffect } from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Dots from "../../../components/Loaders/Dots";
import Navbar from "../../../components/Navbar/Navbar";
import AuthService from "../../../services/Auth/Auth.Service";
import IncidentService from "../../../services/Incident/Incident.Service";

const ViewIncident = (props) => {
  let { id_incident } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function getIncidentsOfUser(id_incident) {
      const response = await IncidentService.getIncident(id_incident);
      console.log(response);
      setIncidents(response.data);
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

  if (!incidents?.length) {
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
            <li className="py-1">Expediente: TDH-0000000000-000/000</li>
            <li className="py-1">Fecha: 2/27/2022</li>
            <li className="py-1">Hora: 8:00 am</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">
              ¿Conoce otra institución u organización sobre el caso? No{" "}
              <BsSquare className="inline-flex text-sm" /> SI{" "}
              <BsCheckSquare className="inline-flex text-sm" />{" "}
            </li>
            <li className="py-1">
              ¿Cuál? Institucion de Ingenieros Asociados por un mundo
              Tecnologico.
            </li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">Nombre de quien Refiere:</li>
            <li className="py-1">Contacto:</li>
            <li className="py-1">Identificación del Caso:</li>
          </ul>
        </div>
        <div className="my-4">
          <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
            <span>II. DATOS DE USUARIO.</span>
            <span className="text-base">
              Victima Directa: No <BsSquare className="inline-flex text-sm" />{" "}
              SI <BsCheckSquare className="inline-flex text-sm" />
            </span>
          </h1>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">Nombre Completo:</li>
            <li className="py-1">Edad:</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">Tipo de Documento de Identidad:</li>
            <li className="py-1">N° de Documento:</li>
            <li className="py-1">Sabe Leer y Escribir:</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">Sexo: Hombre Mujer</li>
            <li className="py-1">Orientación Sexual/Identidad de Género:</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">Grado Académico:</li>
            <li className="py-1">Profesión u Oficio:</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">País:</li>
            <li className="py-1">Departamento:</li>
            <li className="py-1">Municipio:</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">Dirección:</li>
            <li className="py-1">Teléfono:</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">Parroquia:</li>
            <li className="py-1">Párroco:</li>
          </ul>
        </div>
        <div className="my-4">
          <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
            <span>III. DATOS DE LAS VICTIMAS.</span>
            <span className="text-base">
              Número total de personas afectadas: {}
            </span>
          </h1>
          <div className="divide-y divide-dashed divide-slate-300">
            {/* store?.step6?.values.map(
            (
              {
                name,
                last_name,
                age,
                type_dui,
                dui,
                illiterate,
                gender,
                gender_identity,
                academic_grade,
                profession,
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
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">{`Sexo: ${
                      gender ? "Hombre" : "Mujer"
                    }`}</li>
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
                      Padece de alguna Discapacidad Física: No{" "}
                      <BsSquare className="inline-flex text-sm" /> SI{" "}
                      <BsCheckSquare className="inline-flex text-sm" />
                    </li>
                    <li className="py-1">
                      {`
                    Tipo de Discapacidad: ${academic_grade}`}
                    </li>
                  </ul>
                  <ul className="flex flex-row flex-wrap justify-between px-5">
                    <li className="py-1">
                      Padece de Alguna Enfermedad Crónica: No{" "}
                      <BsSquare className="inline-flex text-sm" /> SI{" "}
                      <BsCheckSquare className="inline-flex text-sm" />
                    </li>
                    <li className="py-1">
                      {`
                    Medicamento Recetado: ${academic_grade}`}
                    </li>
                  </ul>
                </div>
              );
            }
          )*/}
          </div>
        </div>
        <div className="my-4">
          <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
            <span>IV. PERFIL ESPECIFICO DE LOS HECHOS.</span>
          </h1>
          <div className="divide-y divide-dotted divide-slate-300">
            <div className="py-2">
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">Fecha en que Ocurrieron los Hechos:</li>
                <li className="py-1">Hora Aproximada:</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">Dirección:</li>
                <li className="py-1">Departamento:</li>
                <li className="py-1">Municipio:</li>
              </ul>
            </div>
            <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
              <li className="py-1">
                <span>Causa del Desplazamiento:</span>
                <ul>
                  {["Amenazas", "Homicidio"].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </li>
            </ul>
            <ul className="flex flex-row flex-wrap justify-between px-5 py-2">
              <li className="py-1">
                <span>Personas o grupos que generaron el desplazamiento:</span>
                <ul>
                  {["FAES", "Crimen Organizado", "Pantilla X"].map(
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
                  {["PNC", "FGR", "Otra: X"].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </li>
            </ul>
            <div className="py-2">
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  ¿Interpuso denuncia en alguna instancia estatal? No{" "}
                  <BsSquare className="inline-flex text-sm" /> SI{" "}
                  <BsCheckSquare className="inline-flex text-sm" />
                </li>
                <li className="py-1">Medicamento Recetado:</li>
              </ul>
              <ul className="flex flex-row flex-wrap justify-between px-5">
                <li className="py-1">
                  ¿Descripción del Acompañamiento brindado?
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
            <span className="text-base">
              La casa donde resido/ residía era:
            </span>
            <span>Propia Alquilada Financiada Casa Familiar Otros</span>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <span className="text-base">
              Ingresos Mensuales del grupo familiar:
            </span>
            <span>Ingreso actual del grupo familiar: </span>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <span className="text-base">
              ¿Cómo ha logrado sobrevivir durante el desplazamiento?
            </span>
            <span>
              Ahorros Trabajo Informal Préstamo Remesas Empeños Mendicidad
              Otros:
            </span>
          </ul>
        </div>
        <div className="my-4">
          <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
            <span>VI. PERFIL MIGRATORIO.</span>
          </h1>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <li className="py-1">
              ¿Ha decidido salir del país? No{" "}
              <BsSquare className="inline-flex text-sm" /> SI{" "}
              <BsCheckSquare className="inline-flex text-sm" />
            </li>
            <li className="py-1">¿A qué país?</li>
          </ul>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <span className="text-base">
              ¿Cuántas personas de su grupo familiar?
            </span>
          </ul>
        </div>
        <div className="my-4">
          <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-2">
            <span>VII. NARRATIVA DE LOS HECHOS.</span>
          </h1>
          <ul className="flex flex-row flex-wrap justify-between px-5">
            <span className="text-base text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              voluptas soluta praesentium at nemo nisi repellendus fugit eaque
              molestiae, perspiciatis provident iure atque fuga, maiores debitis
              sint natus repudiandae sed assumenda totam. Molestias, molestiae.
              Sapiente repellat laudantium dignissimos porro hic? Laudantium
              aliquid doloribus vitae natus tempora provident nobis consectetur.
              Tempore nobis rem eum tenetur vero sit magni exercitationem,
              veniam, velit alias quas adipisci nihil quae qui dolores quibusdam
              perferendis harum enim! Labore aliquid natus voluptate! Ipsam modi
              nostrum quos porro nobis ducimus iste illo suscipit eius, fugiat
              sed? Sequi corrupti, sed et voluptatem modi dolor. Dignissimos
              aliquam recusandae ullam dolor.
            </span>
          </ul>
        </div>
        <div className="my-6">
          <h1 className="flex flex-row justify-between border border-slate-300 text-lg text-gray-800 font-semibold py-2 px-4 mb-6">
            <span>VIII. ACUERDO DE CREACION.</span>
          </h1>
          <div className="flex flex-row flex-wrap justify-between px-5">
            <p className="text-base text-justify">
              Yo <b>{/*`${currentUser.name} ${currentUser.last_name}`*/}</b>,
              doy fe que la informacion plasmada en la ficha actual y elaborada
              por mi persona ha sido recopilada de viva voz por la persona que
              ha venido en calidad de victima directa o conocido de la misma a
              declarar los hechos anteriormente descritos a mi persona, a las{" "}
              {new Date().getHours()} horas con {new Date().getMinutes()}{" "}
              minutos del dia {new Date().getDate()} del mes de{" "}
              {getMonthName(new Date().getMonth())} del año{" "}
              {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIncident;