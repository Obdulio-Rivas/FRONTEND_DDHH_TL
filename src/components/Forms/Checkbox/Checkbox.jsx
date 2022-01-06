import React from "react";

const Checkbox = () => {
  return (
    <div className="flex flex-row flex-nowrap justify-items-center">
      <input
        className="self-center mr-1"
        type="checkbox"
        id="show_password"
        name="vehicle1"
        value="show_password"
      />
      <label className="text-gray-800 font-medium select-none" for="show_password">Mostrar contrasena</label>
    </div>
  );
};

export default Checkbox;
