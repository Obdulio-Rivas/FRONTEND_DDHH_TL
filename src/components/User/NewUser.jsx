import React, {useState} from "react";
import Navbar from "../Navbar/Navbar";
import TemplateForm from "../template/TemplateForm";
import UserService from "../../services/User/User.Service";
const NewUser = ()=>{

    const [values, setValues] = useState({ 
        name: "",
        last_name:"",
        email: "",
        password: "",
        dui: "",
        birth_date: "",
        status: 0,
        role: 0,
        phone: "",
        gender: 0, //0 = W || 1 = M
        urlimage: "",
        nit: "", });

    const handlerSubmit = async (e) => {
        //console.log(values);
      const postdata = await UserService.postUsers(values);
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

    const template ={
        title:'Formulario',
        fields:[
            {
                title: 'Nombres:',
                type: 'text',
                name:'name',
                value: values.name,
                message:"El nombre es requerido.",
                onChange: handleChange
            },
            {
                title: 'Apellidos:',
                type: 'text',
                name:'last_name',
                value: values.last_name,
                message:"El apellido es requerido.",
                onChange: handleChange
            },
            {
                title: 'Correo:',
                type: 'email',
                name:'email',
                value: values.email,
                message:"El correo es requerido.",
                onChange: handleChange
            },
            {
                title: 'Password:',
                type: 'password',
                name:'password',
                value: values.password,
                message:"El password es requerido.",
                onChange: handleChange
            },
            {
                title: 'Dui:',
                type: 'text',
                name:'dui',
                value: values.dui,
                message:"El dui es requerido.",
                onChange: handleChange
            },
            {
                title: 'Fecha de Nacimiento:',
                type: 'date',
                name:'birth_date',
                value: values.birth_date,
                message:"la fecha de nacimiento es requerido.",
                onChange: handleChange
            },{
                title: 'Estado:',
                type: 'number',
                name:'status',
                value: values.status,
                message:"El estado es requerido.",
                onChange: handleChange
            },{
                title: 'Rol:',
                type: 'number',
                name:'role',
                value: values.role,
                message:"El rol es requerido.",
                onChange: handleChange
            },{
                title: 'Telefono:',
                type: 'text',
                name:'phone',
                value: values.phone,
                message:"El telefono es requerido.",
                onChange: handleChange
            },{
                title: 'Genero:',
                type: 'number',
                name:'gender',
                value: values.gender,
                message:"El genero es requerido.",
                onChange: handleChange
            },
            {
                title: 'Imagen:',
                type: 'text',
                name:'urlimage',
                value: values.urlimage,
                message:"La imagen es requerido.",
                onChange: handleChange
            },
            {
                title: 'Nit:',
                type: 'text',
                name:'nit',
                value: values.nit,
                message:"El nit es requerido.",
                onChange: handleChange
            },
        ],
        onSubmit: handlerSubmit,
    }

    return(
        <>
            <Navbar/>
            <TemplateForm
                template={template}
            />
        </>
        
    );
}

export default NewUser;