import React from "react";

const Input = ({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
  required,
  disabled = 1,
  pattern,
  validation,
  type_documentation=null
}) => {
  if (name === "password") {
    return (
      <>
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for={name}
        >
          {`${label}:`}
        </label>
        <input
          id={name}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 ${
            disabled == 0 ? "cursor-not-allowed" : null
          }`}
          type={type}
          placeholder={placeholder}
          disabled={disabled == 0 ? true : false}
          {...register(name, {
            required: required,
            pattern: {
              value: pattern,
              message:
                "El password debe contener por lo menos una mayuscula, un numero y un caracter especial.",
            },
          })}
        />
        {errors[name] && (
          <span className="text-red-500 text-xs italic">
            {errors[name].message}
          </span>
        )}
      </>
    );
  }else if(name=="dui" && type_documentation != null)
  {
    return (
      <>
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for={name}
        >
          {`${label}:`}
        </label>
        <input
          id={name}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 ${
            disabled == 0 ? "cursor-not-allowed" : null
          }`}
          type={type}
          placeholder={placeholder}
          disabled={disabled == 0 ? true : false}
          {...register(name, type_documentation=="DUI" ? {
            required: required,
            pattern: {
              value: /^\d{8}-\d{1}$/g,
              message:
                "Debe digitar el formato correcto del dui. Ejemplo: 00000000-0",
            },
          } : type_documentation=="NIT" ? {
            required: required,
            pattern: {
              value: /^\d{4}-\d{6}-\d{3}-\d{1}/,
              message:
                "Debe digitar el formato correcto del nit. Ejemplo: 0000-000000-000-1",
            },
          } : {
            required: required,
            pattern: {
              value: /^\d{4}-\d{6}-\d{3}-\d{1}/,
              message:
                "Debe digitar el formato correcto de la cedula. Ejemplo: 0000-000000-000-1",
            },
          })}
        />
        {errors[name] && (
          <span className="text-red-500 text-xs italic">
            {errors[name].message}
          </span>
        )}
      </>
    );
  }else {
    return (
      <>
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for={name}
        >
          {`${label}:`}
        </label>
        <input
          id={name}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 ${
            disabled == 0 ? "cursor-not-allowed" : null
          }`}
          type={type}
          placeholder={placeholder}
          disabled={disabled == 0 ? true : false}
          {...register(name, validation==0 ? {required:null} : {
            required: required,
            pattern: {
              value: pattern,
              message:
                "Debe digitar el formato correcto. Ejemplo: " + placeholder,
            },
          })}
        />
        {errors[name] && (
          <span className="text-red-500 text-xs italic">
            {errors[name].message}
          </span>
        )}
      </>
    );
  }
};

export default Input;
