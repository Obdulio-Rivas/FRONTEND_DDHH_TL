import React from "react";

const Select = ({
  label,
  options = [{option: "Selecciona una opcion", value: 'Default value'}],
  name,
  required,
  register,
  errors,
  disabled = 0,
}) => {
  return (
    <>
      <label
        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for={name}
      >
        {`${label}:`}
      </label>
      <div class="relative">
        <select
          id="name"
          disabled={disabled ==! 0 ? true : false}
          defaultValue={options[0].value}
          className={`block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded ${disabled ==! 0 ? 'cursor-not-allowed' : null}`}
          {...register(name, { required: required })}
        >
          {options?.map(({ option, value }, index) => {
            return (
              <option
                key={index}
                value={value}
                selected={index === 0 ? true : false}
              >
                {option}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker top-1/3 right-4">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
        {errors[name] && (
          <span className="text-red-500 text-xs italic">
            {errors[name].message}
          </span>
        )}
      </div>
    </>
  );
};

export default Select;
