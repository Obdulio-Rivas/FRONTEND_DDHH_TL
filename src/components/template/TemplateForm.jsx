import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Forms/Button/Button";

function GeneralForm({ template }) {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { title, fields, onSubmit } = template;

  const renderFields = (fields) => {
    return fields.map((field) => {
      let {
        title,
        type,
        name,
        value,
        message,
        onChange,
        controll = "input",
        options = []
      } = field;

      switch (controll) {
        case "input":
          return (
            <div key={name} class="sm:w-full md:w-1/2 lg:1/3 px-3 mb-6 md:mb-0">
              <label
                htmlFor={name}
                class="uppercase tracking-wide text-black text-xs font-bold mb-2"
              >
                {title}
              </label>
              <input
                class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                {...register(name, { required: message })}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
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

        case "select":
          return (
            <div key={name} class="sm:w-full md:w-1/2 lg:1/3 px-3 mb-6 md:mb-0">
              <label
                class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor={name}
              >
                {title}
              </label>
              <div>
                <select
                  name={name}
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id={name}
                  onChange={onChange}
                >
                    {options.map(({title, value}, index)=>{
                        return (<option key={value} selected={index==0?true:false}  value={value} className="py-3">{title}</option>);
                    })}
                </select>
                <div>
                {errors[name] && (
                  <span className="text-red-500 text-xs italic">
                    {errors[name].message}
                  </span>
                )}
              </div>
              </div>
            </div>
          );
        case "button":
          return (
            <div key={name} class="w-full flex justify-end mt-4">
              <div class="md:w-auto px-3">
                <button class="w-full bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 uppercase">
                  {value}
                </button>
              </div>
            </div>
          );
        default:
          return (
            <div key={name} className="block my-4 mx-2 lg:w-2/6">
              <label
                htmlFor={name}
                className="select-none text-lg inline-block text-gray-800 w-auto m-auto mb-0.5 font-medium"
              >
                {title}
              </label>
              <input
                className="block w-full m-auto p-2 border-2 rounded-md mt-0.5 focus:outline-gray-400 focus:shadow-outline"
                {...register(name, { required: message })}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
              ></input>
              {errors[name] && (
                <span className="red-text">{errors[name].message}</span>
              )}
            </div>
          );
      }
    });
  };

  return (
    <div className=" mx-auto max-w-9xl lg:px-24">
      <div className="flex flex-wrap flex-row justify-between w-max">
        <div className="flex mx-auto mt-4 md:flex mb-6">
          <h2 className="font-bold text-4xl my-2">{title}</h2>
        </div>
      </div>
      <div className="flex flex-wrap flex-col lg:w-5/5 mt-4">
        <form
          className="px-4 pt-2 pb-2 mb-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class="-mx-3 md:flex mb-6">
            <div className="flex flex-row flex-wrap w-4/5 mx-auto">
              {renderFields(fields)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralForm;
