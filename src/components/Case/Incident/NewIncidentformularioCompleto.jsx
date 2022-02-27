import React,{useState} from 'react'
import Navbar from "../../Navbar/Navbar";
import Form from "../../../templates/Form";
import AuthService from "../../../services/Auth/Auth.Service";
import toast ,{ Toaster } from "react-hot-toast";
import CaseService from '../../../services/Case/Case.Service';
export default function NewIncident() {
  let concatenacion1='1'
  let concatenacion2=''
  let concatenacion3=''
  let contador =0
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
      
      const onSubmit =(data,e) => {
        const {input} = e.target
        e.preventDefault();
        console.log(data.cause_displacement);
        /*const response = await CaseService.postIncident(values);
        if (response.is_successful) {
          AuthService.updateJwtUser(response);

          toast.success("El usuario a sido agregado correctamente.",{
            position:"bottom-center"
          });
        }else{
          toast.error("No fue posible agregar el usuario!",{
            position:"bottom-center"
          })
        }*/

      };
    
      const handleChange = (e) => {
        const { value, name,type, checked } = e.target;
        if(type==='checkbox' && checked===true)
        {
          if(name==='cause_displacement')
          {
            concatenacion1=value
            console.log(checked);
          }else if(name==='people_displacement')
          {

          }else if(name==='institutions_accompanied'){

          }
        }
        setValues({
          ...values,
          [name]: value,
        });
      };
    
      const template = {
        title: "Nuevo usuario",
        fields: [
          //Registro institucional------------------------------------------------------------
          {
            title: "Nombre del expediente:",
            type: "text",
            name: "expediente",
            value: values.expediente,
            message: "El expediente es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Fecha:",
            type: "date",
            name: "incident_date",
            value: values.incident_date,
            message: "La fecha es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Hora:",
            type: "number",
            name: "hour",
            value: values.hour,
            message: "La hora es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Intitucion del caso:",
            type: "number",
            name: "incident_institution",
            value: values.incident_institution,
            message: "La institucion es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Nombre de la institucion:",
            type: "text",
            name: "incident_institution_name",
            value: values.incident_institution_name,
            message: "El nombre de la institucion es requerida.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Nombre de referencia:",
            type: "text",
            name: "name_reference",
            value: values.name_reference,
            message: "El nombre de referencia es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Contacto:",
            type: "number",
            name: "contact",
            value: values.contact,
            message: "El contacto es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Numero de identificacion del caso:",
            type: "number",
            name: "incident_identification",
            value: values.incident_identification,
            message: "El numero de identificacion del caso es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          //Datos especificaos del caso---------------------------------------------------------------
          {
            title: "Fecha de los hechos:",
            type: "date",
            name: "date_hechos",
            value: values.date_hechos,
            message: "La fecha de los hechos es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Dirección:",
            type: "text",
            name: "adress",
            value: values.adress,
            message: "La direccion es requerida.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Departamento:",
            type: "number",
            name: "deparment",
            value: values.deparment,
            message: "El departamento es requerido.",
            controll: "select",
            defaultValue: 'DEFAULT',
            options: [{
              title: 'Seleccione una opcion.',
              value: 'DEFAULT'
            },{
                title: 'San Salvador',
                value: 1
            },{
                title: 'La Paz',
                value: 0
            }],
            onChange: handleChange,
          },
          {
            title: "Municipio:",
            type: "number",
            name: "municipality",
            value: values.municipality,
            message: "El municipio es requerido.",
            controll: "select",
            defaultValue: 'DEFAULT',
            options: [{
              title: 'Seleccione una opcion.',
              value: 'DEFAULT'
            },{
                title: 'San Salvador',
                value: 0
            },{
                title: 'Apopa',
                value: 1
            },{
                title: 'Soyapango',
                value: 2
            }],
            onChange: handleChange,
          },
          //checbox de cause_displacement
          {
            title: "Causa del desplazamiento:",
            controll: "checkboxlist",
            checkboxlist:[
              {
                title: "Amenaza:",
                type: "checkbox",
                name: "cause_displacement",
                value: 'Amenaza',
                message: "La causa del desplazamiento es requerido.",
                onChange: handleChange,
              },
              {
                title: "Homicidio:",
                type: "checkbox",
                name: "cause_displacement",
                value: 'Homicidio',
                message: "La causa del desplazamiento es requerido.",
                onChange: handleChange,
              },
              {
                title: "Extorsión:",
                type: "checkbox",
                name: "cause_displacement",
                value: 'Extorsión',
                message: "La causa del desplazamiento es requerido.",
                onChange: handleChange,
              },
            ]
          },
          
          //----------
          {
            title: "Desplazamiento de personas:",
            type: "text",
            name: "people_displacement",
            value: values.people_displacement,
            message: "El Desplazamiento de personas es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Institucion comprometida:",
            type: "text",
            name: "institutions_accompanied",
            value: values.institutions_accompanied,
            message: "La institucion comprometida es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Institucion estatal:",
            type: "number",
            name: "statal_institution",
            value: values.statal_institution,
            message: "La intitucion estatal es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Nombre de la institucion estatal:",
            type: "text",
            name: "statal_institution_name",
            value: values.statal_institution_name,
            message: "El nombre de la institucion estatal es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          {
            title: "Descripcion del acompañante:",
            type: "text",
            name: "accompanied_descriptions",
            value: values.accompanied_descriptions,
            message: "La descripcion del acompañante es requerido.",
            controll: "input",
            onChange: handleChange,
          },
          //Perfil socioeconomico
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
