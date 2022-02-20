import React, {useState} from "react";
import Navbar from "../../Navbar/Navbar";
import TemplateForm from "../../../templates/Form";
import VictimService from "../../../services/Victim/Victim.Service";
import toast ,{ Toaster } from "react-hot-toast";
const NewVictim = ()=>{

    const [values, setValues] = useState({ 
        name: "",
        last_name:"",
        email: "",
        dui: "",
        birth_date: "",
        status: 0,
        phone: "",
        gender: 0, //0 = W || 1 = M
        nit: "", });

    const onSubmit = async (data,e) => {
      e.preventDefault();
      const response = await VictimService.postVictim(values);
      console.log(response);

      if (response.is_successful) {
        toast.success("Se ha guardado correctamente el registro.",{
          position:"bottom-center"
        });
      }else
      {
        toast.error("No fue posible guardar el registro!",{
          position:"bottom-center"
        });
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
        title: "Agregar victima",
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
            controll: "input",
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
            controll: "input",
            onChange: handleChange,
          },
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

    return(
        <>
            <Navbar/>
            <TemplateForm
                template={template}
                onSubmit={onSubmit}
            />
            <Toaster/>
        </>
        
    );
}

export default NewVictim;