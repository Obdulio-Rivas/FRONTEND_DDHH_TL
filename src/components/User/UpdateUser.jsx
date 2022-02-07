import React,{useState,useEffect} from 'react';
import TemplateForm from '../../templates/Form';
import Navbar from '../Navbar/Navbar';
import UserService from '../../services/User/User.Service';
const UpdateUser = ({id_userUpdate}) => {    
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
        url_image: "",
        nit: "",
        id_user:0,
      });
    useEffect(() => {
    async function fetchUsers() {
        // You can await here
        const response = await UserService.getUser(id_userUpdate);
        const [{name, last_name, email, password,dui, birth_date,status, role, phone, gender, url_image, nit,id_user}] = response.data;
        setValues({
            name:name,
            last_name:last_name,
            email:email,
            password:password,
            dui:dui,
            birth_date:birth_date,
            status:status,
            role:role,
            phone:phone,
            gender:gender,
            url_image:url_image,
            nit:nit,
            id_user:id_user
        });
        // ...
        }
          fetchUsers();
    }, []);
    
      const handlerSubmit = async (e) => {
        //console.log(values);
        const putdata = await UserService.putUsers(values);
        console.log(putdata);
        if (putdata.is_successful) {
          console.log(putdata);
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
        title: "Formulario",
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
          /*{
            title: "Password:",
            type: "password",
            name: "password",
            value: values.password,
            message: "El password es requerido.",
            controll: "input",
            onChange: handleChange,
          },*/
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
          {
            title: "Imagen:",
            type: "text",
            name: "urlimage",
            value: values.url_image,
            message: "La imagen es requerido.",
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
            value: "Actualizar",
            controll: "button",
          },
        ],
        onSubmit: handlerSubmit,
      };
    
      return (
        <>
          <Navbar />
          <TemplateForm template={template} />
        </>
      );
    };

    export default UpdateUser;