import React, { useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
  required,
  disabled = 1,
  pattern,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
}) => {

  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    console.log(inputEl)
  };

  return (
    <div className="w-full border border-dashed border-gray-300 bg-white p-4 rounded-md">
      <section onClick={()=>console.log(1)} className="w-full border border-dashed bg-slate-100 border-gray-300 pb-6 pt-10 rounded-md">
        <div className="flex flex-row justify-center items-center relative">
          <MdAttachFile className="text-8xl text-gray-400" />
        </div>
        <div className="flex flex-row justify-center items-center relative">
          <span className="mt-4">{label}</span>
        </div>
        <input
          id={name}
          type="file"
          disabled={disabled == 0 ? true : false}
          {...register(name, {
            required: required,
            pattern: {
              value: pattern,
              message:
                "Debe ",
            },
          })}
          ref={inputEl}
          className={"invisible"}
        />
      </section>
    </div>
  );
};

export default FileUpload;
