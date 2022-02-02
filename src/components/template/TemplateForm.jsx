import react from "react";
import Navbar from "../Navbar/Navbar";
import UserAdd from "../User/UserAdd";
const TemplateForm = ()=>{

    const template ={
        title:'Formulario',
        fields:[
            {
                title: 'Nombres:',
                type: 'text',
                name:'Nombres',
                message:"El nombre es requerido."
            },
            {
                title: 'Apellidos:',
                type: 'text',
                name:'Apellidos',
                message:"El apellido es requerido."
            },
            {
                title: 'Correo:',
                type: 'email',
                name:'Correo',
                message:"El correo es requerido."
            },
        ]
    }

    return(
        <>
            <Navbar/>
            <UserAdd
                template={template}
            />
        </>
        
    );
}

export default TemplateForm;