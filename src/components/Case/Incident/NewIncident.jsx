import React from 'react'
import Navbar from "../Navbar/Navbar";
import Form from "../../../templates/Form";
import UserService from "../../../services/Case/Case.Service";
import AuthService from "../../../services/Auth/Auth.Service";
import toast ,{ Toaster } from "react-hot-toast";
export default function NewIncident() {
    const [values, setValues] = useState({
      //registro institucional
        expediente: "",
        incident_date: "",
        hour: "",
        incident_institution: 0,
        incident_institution_name: "",
        name_reference: "",
        contact: 0,
        incident_identification: 0,
        //datos especificos del caso
        date_hechos: "",
        adress: "",
        deparment: 0,
        municipality: 0,
        cause_displacement: "",
        people_displacement: "",
        institutions_accompanied: "",
        statal_institution: 0,
        statal_institution_name: "",
        accompanied_descriptions: "",
        //Perfil socioeconomico
        home: "",
        monthly_income: 0,
        familiar_income: 0,
        survive_displacement: "",
        //perfil migratorio
        country_leave: 0,
        country_leave_name: "",
        family_cant: 0,
        //general
        status: 0,
        description_incident: "",
        //Foreign key
        id_user: "",
      });
    
      const onSubmit = async (data,e) => {
        e.preventDefault();
        const response = await UserService.postUsers(values);
        if (response.is_successful) {
          AuthService.updateJwtUser(response);
          toast.success("El usuario a sido agregado correctamente.",{
            position:"bottom-center"
          });
        }else{
          toast.error("No fue posible agregar el usuario!",{
            position:"bottom-center"
          })
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
            value: values.expediente,
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
            defaultValue: 'DEFAULT',
            options: [{
              title: 'Seleccione una opcion.',
              value: 'DEFAULT'
            },{
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
            defaultValue: 'DEFAULT',
            options: [{
              title: 'Seleccione una opcion.',
              value: 'DEFAULT'
            },{
                title: 'Administrador',
                value: 0
            },{
                title: 'Abogado',
                value: 1
            },{
                title: 'Asistente',
                value: 2
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
            defaultValue: 'DEFAULT',
            options: [{
              title: 'Seleccione una opcion.',
              value: 'DEFAULT'
            },{
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
      };
    
      return (
        <>
          <Navbar />
          <Form template={template}
          onSubmit={onSubmit}
          code={2}
          />
          <Toaster/>
        </>
      );
}
