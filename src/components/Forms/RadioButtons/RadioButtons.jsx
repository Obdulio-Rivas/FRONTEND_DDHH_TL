import React from "react";

const RadioButtons = ({
  label,
  options = [""],
  name,
  required,
  register,
  errors,
  handlerChecked
}) => {

  return (
    <>
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-city"
      >
        {label}
      </label>
      <div className="flex flex-row justify-start items-center" onChange={(e)=>handlerChecked(e.target)}>
        {options.map((option, index, array) => {
          return (
            <label key={index} className={`inline-flex items-center mt-3 ${index !== 0 ? 'ml-3': null}`}>
              <input
                type="radio"
                value={index}
                name={name}
                id={name}
                className="form-checkbox h-5 w-5 text-gray-600"
                defaultChecked={index === (array.length - 1) ? true: false}
                {...register(name, { required: required })}
              />
              <span className="ml-2 text-gray-700">{option}</span>
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
