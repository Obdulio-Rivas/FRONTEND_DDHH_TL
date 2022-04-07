import React from "react";
import { BsDash } from "react-icons/bs";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  const { title, options,  optionStatus, haddlerClickOption } = props;

  const haddlerClick = () => {
    haddlerClickOption(title, !optionStatus.optionSelected);
  };

  if (title === undefined) {
    return null;
  }

  return (
    <li className="relative">
      <button
        onClick={() => haddlerClick()}
        className={`flex w-full px-4 py-2 font-medium rounded-md outline-none focus:outline-none text-gray-${optionStatus.option === title ? '900': '700'}`}
      >
        {title}
      </button>
      <div className={`right-0 p-2 mt-1 bg-white rounded-md lg:shadow lg:absolute lg:border  ${
            (optionStatus.option === title && optionStatus.optionSelected) ? null : "hidden"
          }`}>
        <ul className="space-y-2 lg:w-48">
          {options.map(({ key, option, href }) => (
            <li key={key} onClick={() => haddlerClick()}>
              <Link
                to={href}
                className="flex p-2 font-normal text-sm text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black"
              >
                <BsDash className="self-center text-black mr-1"/>{option}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Dropdown;
