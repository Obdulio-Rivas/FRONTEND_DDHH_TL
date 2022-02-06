import React, {useState} from "react";
import Navbar from "../../Navbar/Navbar";
import TemplateForm from "../../../templates/Form";
import VictimService from "../../../services/Victim/Victim.Service";
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

    const handlerSubmit = async (e) => {
        //console.log(values);
      const postdata = await VictimService.postVictim(values);
      console.log(postdata);
      if (postdata.is_successful) {
        console.log(postdata);
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
        onSubmit: handlerSubmit,
      };

    return(
        <>
            <Navbar/>
            <TemplateForm
                template={template}
            />
        </>
        
    );
}

export default NewVictim;