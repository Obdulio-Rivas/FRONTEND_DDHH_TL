import React from "react";

const Checkbox = (props) => {

  const { id, name, value, label } = props;

  return (
    <div className="flex flex-row flex-nowrap justify-items-center">
      <input
        className="self-center mr-1"
        type="checkbox"
        id={id}
        name={name}
        value={value}
      />
      <label className="text-gray-800 font-medium select-none" htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
