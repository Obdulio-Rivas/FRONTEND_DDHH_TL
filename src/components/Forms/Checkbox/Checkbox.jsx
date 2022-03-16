import React, { useState } from "react";

const Checkbox = ({
  label,
  options = [],
  name,
  required,
  register,
  errors,
  openOption,
}) => {
  const [field, setField] = useState({ value: "", isDisabled: true });

  const handlerChangeInput = (e) => {
    setField({ ...field, value: e.target.value });
  };

  const handlerChangeCheckbox = (e) => {
    setField({ ...field, isDisabled: !field.isDisabled });
  };

  const getOpenOption = (name, openOption, isDisabled) => {
    return (
      <>
        <label
          className={`flex flex-row flex-wrap justify-start items-center w-full mt-2 mb-1`}
          for={`${name}_${openOption.index}`}
        >
          {`${options[openOption.index]}:`}
        </label>
        <input
          id={`${name}_${openOption.index}`}
          name={name}
          disabled={isDisabled}
          className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 ${isDisabled ? 'cursor-not-allowed' : null}`}
          type={openOption.type}
          placeholder={options[openOption.index]}
          onChange={(e) => handlerChangeInput(e)}
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
      <div className="flex flex-row flex-wrap justify-start items-center">
        {options.map((option, index, array) => {
          return (
            <label key={index} className={`inline-flex items-center mt-3 mr-4`}>
              <input
                type="checkbox"
                value={index === openOption?.index ? field?.value : option}
                name={name}
                id={name}
                className="form-checkbox h-5 w-5 text-gray-600"
                {...register(name, { required: required })}
                onChange={
                  index === openOption?.index
                    ? (e) => handlerChangeCheckbox(e)
                    : null
                }
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          );
        })}
        <input
          id={name}
          className={"invisible"}
          defaultChecked={true}
          name={name}
          type="checkbox"
          value={field.value}
        />
        {!!openOption
          ? getOpenOption(name, openOption, field.isDisabled)
          : null}
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
