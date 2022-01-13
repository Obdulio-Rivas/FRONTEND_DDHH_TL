import React from "react";

const Input = (props) => {
  const { label, value, name, type, placeholder, handlerChange } = props;

  return (
    <div className="block my-4 w-full">
      <label
        htmlFor={name}
        className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium"
      >
        {label}
      </label>
      <input
        className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handlerChange}
      />
    </div>
  );
};

export default Input;
