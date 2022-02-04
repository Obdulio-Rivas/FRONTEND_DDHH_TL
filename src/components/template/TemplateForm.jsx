import React from "react";
import {useForm}  from 'react-hook-form'

function GeneralForm({template}){

    let {register,handleSubmit,formState:{ errors }} = useForm();
    let {title, fields, onSubmit } = template;

    

    const renderFields = (fields) =>{
        return fields.map(field =>{
            let {title, type, name,value, message,onChange} = field;

            switch (type) {
                case "text":
                    return(
                        <div key={name} className="block my-4 w-full">
                            <label htmlFor ={name} className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium">{title}</label>
                            <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline" 
                            {...register(name,{required:message})} type={"text"} name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "email":
                    return(
                        <div key={name} className="block my-4 w-full">
                            <label htmlFor ={name} className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium">{title}</label>
                            <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline" 
                            {...register(name,{required:message})} type="email"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "password":
                    return(
                        <div key={name} className="block my-4 w-full">
                            <label htmlFor ={name} className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium">{title}</label>
                            <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                            {...register(name,{required:message})} type="password"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "date":
                    return(
                        <div key={name} className="block my-4 w-full">
                            <label htmlFor ={name} className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium">{title}</label>
                            <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                             {...register(name,{required:message})} type="date"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "number":
                    return(
                        <div key={name} className="block my-4 w-full">
                            <label htmlFor ={name} className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium">{title}</label>
                            <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                             {...register(name,{required:message})} type="number"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                default:
                    return(
                        <div key={name} className="block my-4 w-full">
                            <label htmlFor ={name} className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium">{title}</label>
                            <input className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                             {...register(name,{required:message})} type={type} name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
            }
        })
    };
    return(
        <div>
            <form className="block w-52" onSubmit={handleSubmit(onSubmit)}>
                <h4>{title}</h4>
                {renderFields(fields)}

                <br/>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
    
}

export default GeneralForm;