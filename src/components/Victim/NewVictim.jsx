import React, {useState} from "react";
import Navbar from "../../Navbar/Navbar";
import TemplateForm from "../../../templates/Form";
import VictimService from "../../../services/Victim/Victim.Service";
import toast ,{ Toaster } from "react-hot-toast";
const NewVictim = ()=>{
    const [values, setValues] = useState({ 
        name: "",
        last_name:"",
        edad: "",
        type_dui: "",
        dui: "",
        illiterate: 0,
        gender: "",
        gender_identity: 0, //0 = W || 1 = M
        academic_grade: "", 
        profession: "", 
        country: "", 
        department: "", 
        municipality: "", 
        adress: "", 
        phone: "", 
        parroco: "", 
        physical_disability: "", 
        type_disability: "", 
        chronic_disease: "", 
        Prescription_Drug: "", });

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
            title: "Edad:",
            type: "text",
            name: "edad",
            value: values.edad,
            message: "La edad es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Tipo de documento:",
            type: "number",
            name: "type_dui",
            value: values.type_dui,
            message: "El tipo de documento es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "NIT",
                value: 1,
              },
              {
                title: "DUI",
                value: 0,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "DUI:",
            type: "text",
            name: "dui",
            value: values.dui,
            message: "El documento unico de identidad es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "¿Sabe leer y escribir?",
            type: "number",
            name: "illiterate",
            value: values.illiterate,
            message: "La opcion es requerida es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Sabe leer y escribir",
                value: 1,
              },
              {
                title: "No sabe leer ni escribir",
                value: 0,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Genero:",
            type: "number",
            name: "gender",
            value: values.gender,
            message: "El genero es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Masculino",
                value: 1,
              },
              {
                title: "Femenino",
                value: 0,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Identidad de genero:",
            type: "number",
            name: "gender_identity",
            value: values.gender_identity,
            message: "La identidad de genero es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Ninguno",
                value: 0,
              },
              {
                title: "Transgenero",
                value: 1,
              },
              {
                title: "Homosexual",
                value: 2,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Grado Academico:",
            type: "number",
            name: "academic_grade",
            value: values.academic_grade,
            message: "El grado academico es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Ninguno",
                value: 0,
              },
              {
                title: "Basico",
                value: 1,
              },
              {
                title: "Educacion Media",
                value: 2,
              },
              {
                title: "Graduado de bachillerato",
                value: 3,
              },
              {
                title: "Universitario",
                value: 4,
              },
              {
                title: "Graduado de Universidad",
                value: 5,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Profesion:",
            type: "number",
            name: "profession",
            value: values.profession,
            message: "La profesion es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Ninguno",
                value: 0,
              },
              {
                title: "ING. en sistemas",
                value: 1,
              },
              {
                title: "Doctor",
                value: 2,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Pais:",
            type: "number",
            name: "country",
            value: values.country,
            message: "El pais es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Ninguno",
                value: 0,
              },
              {
                title: "El Salvador",
                value: 1,
              },
              {
                title: "Guatemala",
                value: 2,
              },
              {
                title: "Honduras",
                value: 3,
              },
              {
                title: "Nicaragua",
                value: 4,
              },
              {
                title: "Panama",
                value: 5,
              },
              {
                title: "Costa Rica",
                value: 6,
              },
              {
                title: "Belice",
                value: 7,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Departamento:",
            type: "number",
            name: "department",
            value: values.department,
            message: "El departamento es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Ninguno",
                value: 0,
              },
              {
                title: "San Salvador",
                value: 1,
              },
              {
                title: "Santa Ana",
                value: 2,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Municipio:",
            type: "number",
            name: "municipality",
            value: values.municipality,
            message: "El municipio es requerido.",
            controll: "select",
            options: [
              {
                title: "Seleccione una opcion.",
                value: "DEFAULT",
              },
              {
                title: "Ninguno",
                value: 0,
              },
              {
                title: "San Salvador",
                value: 1,
              },
              {
                title: "Ahuachapán",
                value: 2,
              },
            ],
            onChange: handleChange,
          },
          {
            title: "Departamento:",
            type: "text",
            name: "adress",
            value: values.adress,
            message: "La direccion es requerido.",
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
            title: "Parroco:",
            type: "text",
            name: "parroco",
            value: values.parroco,
            message: "El parroco es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Padece de alguna Discapacidad Física:",
            type: "checkbox",
            name: "physical_disability",
            message: "La opcion es requerido.",
            controll: "checkbox",
            onChange: handleChange,
          },
          {
            title: "Tipo de discapacidad:",
            type: "text",
            name: "type_disability",
            value: values.type_disability,
            message: "El tipo de discapacidad es requerido.",
            controll: "input",
            dynamic:{
              field:'physical_disability',
              value:true
            },
            onChange: handleChange,
          },
          {
            title: "Padece de Alguna Enfermedad Crónica:",
            type: "checkbox",
            name: 'chronic_disease',
            message: "La opcion es requerido.",
            controll: "checkbox",
            onChange: handleChange,
          },
          {
            title: "Medicamento Recetado:",
            type: "text",
            name: "Prescription_Drug",
            value: values.Prescription_Drug,
            message: "La receta es requerido.",
            dynamic:{
              field:'chronic_disease',
              value:true
            },
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
                watchFields={['chronic_disease','physical_disability']}
                onSubmit={onSubmit}
                code={2}
            />
            <Toaster/>
        </>
        
    );
}

export default NewVictim;