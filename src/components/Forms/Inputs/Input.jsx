import React from "react";

const Input = ({ label, name, type, placeholder, register, errors,required }) => {
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
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: required })}
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
