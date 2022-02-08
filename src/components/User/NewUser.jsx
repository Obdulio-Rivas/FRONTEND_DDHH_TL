import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Form from "../../templates/Form";
import UserService from "../../services/User/User.Service";
import AuthService from "../../services/Auth/Auth.Service";
const NewUser = () => {
  const [values, setValues] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    dui: "",
    birth_date: "",
    status: 0,
    role: 0,
    phone: "",
    gender: 0, //0 = W || 1 = M
    url_image: "https://firebasestorage.googleapis.com/v0/b/legalistica.appspot.com/o/images%2Fusers%2Fbb44cf-d7e-d27-7502-bf1ea077b6e.undefined?alt=media&token=aaaf32b3-e744-4bdb-ad72-b84705d19c6c",
    nit: "",
  });

  const handlerSubmit = async (e) => {
    //console.log(values);
    const response = await UserService.postUsers(values);
    if (response.is_successful) {
      AuthService.setCurrentUser(response);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const template = {
    title: "Nuevo usuario",
    fields: [
      {
        title: "Nombres:",
        type: "text",
        name: "name",
        value: values.name,
        message: "El nombre es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        title: "Apellidos:",
        type: "text",
        name: "last_name",
        value: values.last_name,
        message: "El apellido es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        title: "Correo:",
        type: "email",
        name: "email",
        value: values.email,
        message: "El correo es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        title: "Password:",
        type: "password",
        name: "password",
        value: values.password,
        message: "El password es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        title: "DUI:",
        type: "text",
        name: "dui",
        value: values.dui,
        message: "El dui es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        title: "Fecha de Nacimiento:",
        type: "date",
        name: "birth_date",
        value: values.birth_date,
        message: "la fecha de nacimiento es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        title: "Estado:",
        type: "number",
        name: "status",
        value: values.status,
        message: "El estado es requerido.",
        controll: "select",
        options: [{
            title: 'Activo',
            value: 1
        },{
            title: 'Inactivo',
            value: 0
        }],
        onChange: handleChange,
      },
      {
        title: "Rol:",
        type: "number",
        name: "role",
        value: values.role,
        message: "El rol es requerido.",
        controll: "select",
        options: [{
            title: 'Administrador',
            value: 1
        },{
            title: 'Abogado',
            value: 2
        },{
            title: 'Asistente',
            value: 3
        }],
        onChange: handleChange,
      },
      {
        title: "Telefono:",
        type: "text",
        name: "phone",
        value: values.phone,
        message: "El telefono es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        title: "Genero:",
        type: "number",
        name: "gender",
        value: values.gender,
        message: "El genero es requerido.",
        controll: "select",
        options: [{
            title: 'Masculino',
            value: 1
        },{
            title: 'Femenino',
            value: 0
        }],
        onChange: handleChange,
      },
      /*{
        title: "Imagen:",
        type: "text",
        name: "urlimage",
        value: values.url_image,
        message: "La imagen es requerido.",
        controll: "input",
        onChange: handleChange,
      },*/
      {
        title: "NIT:",
        type: "text",
        name: "nit",
        value: values.nit,
        message: "El nit es requerido.",
        controll: "input",
        onChange: handleChange,
      },
      {
        type: "success",
        value: "Registrar",
        controll: "button",
      },
    ],
    onSubmit: handlerSubmit,
  };

  return (
    <>
      <Navbar />
      <Form template={template} />
    </>
  );
};

export default NewUser;
