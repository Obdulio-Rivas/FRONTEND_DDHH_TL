import React from "react";
import { useForm } from "react-hook-form";
const Input = (props) => {
  const { label, value, name, type, placeholder, handlerChange, message } = props;
  let {register, handleSubmit, formState: { errors },} = useForm();

  return (
    <div className="block my-4 w-full">
      <label
        htmlFor={name}
        className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium"
      >
        {label}
      </label>
      <input
        {...register(name, { required: message })}
        className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handlerChange}
      />
      <div>
        {errors[name] && (
          <span className="text-red-500 text-xs italic">
            {errors[name].message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
