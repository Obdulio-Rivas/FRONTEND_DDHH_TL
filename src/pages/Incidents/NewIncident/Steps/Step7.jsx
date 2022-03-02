import React, { useState, useEffect } from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../services/Auth/Auth.Service";

const Step7 = ({ store, handlerStore }) => {
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const getMonthName = (monthNumber) => {
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][monthNumber]
  }

  const onSubmit = (data) => {
    handlerStore({
      step2: {
        title: "Step7",
        values: data,
      },
    });
    navigate("/incident/step8");
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
            ¿Cuál? Institucion de Ingenieros Asociados por un mundo Tecnologico.
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
            Victima Directa: No <BsSquare className="inline-flex text-sm" /> SI{" "}
            <BsCheckSquare className="inline-flex text-sm" />
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
          <span className="text-base">Número Total de personas Afectadas:</span>
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
          <li className="py-1">
            Padece de alguna Discapacidad Física: No{" "}
            <BsSquare className="inline-flex text-sm" /> SI{" "}
            <BsCheckSquare className="inline-flex text-sm" />
          </li>
          <li className="py-1">Tipo de Discapacidad:</li>
        </ul>
        <ul className="flex flex-row flex-wrap justify-between px-5">
          <li className="py-1">
            Padece de Alguna Enfermedad Crónica: No{" "}
            <BsSquare className="inline-flex text-sm" /> SI{" "}
            <BsCheckSquare className="inline-flex text-sm" />
          </li>
          <li className="py-1">Medicamento Recetado:</li>
        </ul>
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
          <span className="text-base">La casa donde resido/ residía era:</span>
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
            Ahorros Trabajo Informal Préstamo Remesas Empeños Mendicidad Otros:
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
            Tempore nobis rem eum tenetur vero sit magni exercitationem, veniam,
            velit alias quas adipisci nihil quae qui dolores quibusdam
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
            Yo <b>{`${currentUser.name} ${currentUser.last_name}`}</b>, doy fe que la
            informacion plasmada en la ficha actual y elaborada por mi persona
            ha sido recopilada de viva voz por la persona que ha venido en
            calidad de victima directa o conocido de la misma a declarar los
            hechos anteriormente descritos a mi persona, a las{" "}
            {new Date().getHours()} horas con {new Date().getMinutes()} minutos
            del dia {new Date().getDate()} del mes de {getMonthName(new Date().getMonth())}{" "}
            del año {new Date().getFullYear()}.
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
          <input className="cursor-pointer font-bold text-gray-800" type="submit" value={"Acepto el acuerdo"} />
        </form>
      </div>
    </div>
  );
};

export default Step7;
