import React from "react";

const Input = ({ label, name, type, placeholder, register, errors, required, disabled = 0,pattern }) => {

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
        className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 ${disabled ==! 0 ? 'cursor-not-allowed' : null}`}
        type={type}
        placeholder={placeholder}
        disabled={disabled ==! 0 ? true : false}
        {...register(name, { required: required, pattern:{value:pattern, message:"Debe digitar el formato correcto."} })}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs italic">
          {errors[name].message}
        </span>
      )}
    </>
  );
};

export default Input;
