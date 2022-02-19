import React from "react";
import { Link } from "react-router-dom";

const Actions = ({ value, options = [] }) => {

  return (
    <div className="flex w-full flex-row justify-center">
      {options.map(({ path, param, icon, color = 'black' }, index) => {
        return (
          <Link className={`text-xl mx-2 text-${color}-600`} key={index} to={`${path}/${value}`}>
            {icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Actions;
