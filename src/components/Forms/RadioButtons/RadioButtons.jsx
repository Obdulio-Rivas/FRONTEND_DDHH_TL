import React from "react";

const RadioButtons = ({
  label,
  options = [""],
  name,
  valueRadio = 0,
  required,
  register,
  errors,
  handlerChange = null,
}) => {
  return (
    <>
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-city"
      >
        {label}
      </label>
      <div className="flex flex-row flex-wrap justify-start items-center" onChange={ !!handlerChange ? (e)=>handlerChange(e.target) : null}>
        {options.map((option, index, array) => {
          return (
            <label key={index} className={`inline-flex items-center mt-3 ${index !== 0 ? 'ml-3': null}`}>
              <input
                type="radio"
                value={option.value}
                name={name}
                id={`${name}_${index}`}
                className="form-checkbox h-5 w-5 text-gray-600"
                defaultChecked={valueRadio===option.value ? true : false}
                {...register(name, { required: required })}
              />
              <span className="ml-2 text-gray-700">{option.label}</span>
            </label>
          );
        })}
      </div>
      {errors[name] && (
        <span className="text-red-500 text-xs italic">
          {errors[name].message}
        </span>
      )}
    </>
  );
};

export default RadioButtons;
