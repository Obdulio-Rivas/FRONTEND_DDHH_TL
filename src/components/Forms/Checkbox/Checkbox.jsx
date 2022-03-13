import React from "react";

const Checkbox = ({
  label,
  options = [],
  name,
  required,
  register,
  errors,
  openOption,
}) => {

  const getOpenOption = (name, register, openOption, errors) => {
    return (
      <>
        <label
          className="flex flex-row flex-wrap justify-start items-center w-full mt-2 mb-1"
          for={'test'}
        >
          {`${openOption.value}:`}
        </label>
        <input
          id={'test'}
          name={name}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3`}
          type={openOption.type}
          placeholder={openOption.value}
          {...register(name, { required: required })}
        />
      </>
    );
  };

  return (
    <>
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-city"
      >
        {label}
      </label>
      <div
        className="flex flex-row flex-wrap justify-start items-center"
      >
        {options.map((option, index, array) => {
          return (
            <label key={index} className={`inline-flex items-center mt-3 mr-4`}>
              <input
                type="checkbox"
                value={index}
                name={name}
                id={name}
                className="form-checkbox h-5 w-5 text-gray-600"
                {...register(name, { required: required })}
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          );
        })}
        {!!openOption ? getOpenOption(name, register, openOption, errors) : null}
      </div>
      {errors[name] && (
        <span className="text-red-500 text-xs italic">
          {errors[name].message}
        </span>
      )}
    </>
  );
};

export default Checkbox;
