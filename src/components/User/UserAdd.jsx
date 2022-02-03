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
                        <div key={name}>
                            <label htmlFor ={name}>{title}</label>
                            <input {...register(name,{required:message})} type={"text"} name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "email":
                    return(
                        <div key={name}>
                            <label htmlFor ={name}>{title}</label>
                            <input {...register(name,{required:message})} type="email"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "password":
                    return(
                        <div key={name}>
                            <label htmlFor ={name}>{title}</label>
                            <input {...register(name,{required:message})} type="password"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "date":
                    return(
                        <div key={name}>
                            <label htmlFor ={name}>{title}</label>
                            <input {...register(name,{required:message})} type="date"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                case "number":
                    return(
                        <div key={name}>
                            <label htmlFor ={name}>{title}</label>
                            <input {...register(name,{required:message})} type="number"name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
                default:
                    return(
                        <div key={name}>
                            <label htmlFor ={name}>{title}</label>
                            <input {...register(name,{required:message})} type={type} name={name} id={name} value={value} onChange={onChange}></input>
                            {errors[name] && <span className="red-text">{errors[name].message}</span>}
                        </div>
                        );
            }
            
        })
    };
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>{title}</h4>
                {renderFields(fields)}

                <br/>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
    
}

export default GeneralForm;