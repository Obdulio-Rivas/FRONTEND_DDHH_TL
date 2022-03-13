import React, { useState } from "react";

const Textarea = ({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
  required,
  disabled = 0,
  height = 0,
}) => {
  const [numberOfWords, setNumberOfWords] = useState(0);

  const handlerChange = (e) => {
    let currentNumberOfWords =
      e.target.value.trim() === ""
        ? 0
        : e.target.value.trim().split(" ").length;
    setNumberOfWords(currentNumberOfWords);
  };

  return (
    <>
      <label
        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for={name}
      >
        {`${label}:`}
      </label>
      <textarea
        id={name}
        className={`appearance-none block w-full h-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 resize-none ${
          disabled ==! 0 ? "cursor-not-allowed" : null
        }`}
        type={type}
        placeholder={placeholder}
        style={{height: height}}
        disabled={disabled ==! 0 ? true : false}
        {...register(name, { required: required })}
        onChange={(e) => handlerChange(e)}
      />
      <div>
        <span>Numero de palabras: {numberOfWords}</span>
      </div>
      {errors[name] && (
        <span className="text-red-500 text-xs italic">
          {errors[name].message}
        </span>
      )}
    </>
  );
};

export default Textarea;
