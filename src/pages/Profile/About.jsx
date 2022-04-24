import React from "react";
import { AiOutlineUser } from "react-icons/ai";

const About = ({ user }) => {
  const { name, last_name, gender, phone, dui, nit, email, birth_date } = user;

  return (
    <div className="bg-white p-6 border-gray-200 border-2 rounded-md">
      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
        <span clas="text-green-500">
          <AiOutlineUser className="text-2xl" />
        </span>
        <span className="tracking-wide text-xl">Informacion personal.</span>
      </div>
      <div className="text-gray-700">
        <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Nombres</div>
            <div className="px-4 py-2">{name}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Apellidos</div>
            <div className="px-4 py-2">{last_name}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Genero</div>
            <div className="px-4 py-2">
              {gender === 1 ? "Masculino" : "Femenino"}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Numero de Contacto</div>
            <div className="px-4 py-2">
              <a className="text-blue-800" href={`tel:${phone}`}>
                {phone}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Numero de DUI</div>
            <div className="px-4 py-2">{dui}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Numero de NIT</div>
            <div className="px-4 py-2">{nit}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Correo Electronico</div>
            <div className="px-4 py-2">
              <a className="text-blue-800" href="mailto:jane@example.com">
                {email}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Fecha de nacimiento</div>
            <div className="px-4 py-2">{birth_date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
