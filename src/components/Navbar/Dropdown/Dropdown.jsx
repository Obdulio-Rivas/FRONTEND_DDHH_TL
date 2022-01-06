import React, { useState } from "react";
import { BsDash } from "react-icons/bs";

const Dropdown = (props) => {
  const { title, options } = props;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const haddlerClick = () => {
    console.log("Open");
    setIsOpenDropdown(!isOpenDropdown);
  };

  if (title == undefined) {
    return null;
  }

  return (
    <li className="relative">
      <button
        onClick={() => haddlerClick()}
        className="flex w-full px-4 py-2 font-medium rounded-md outline-none  focus:outline-none"
      >
        {title}
      </button>
      <div className={`right-0 p-2 mt-1 bg-white rounded-md lg:shadow lg:absolute lg:border  ${
            isOpenDropdown ? null : "hidden"
          }`}>
        <ul className="space-y-2 lg:w-48">
          {options.map(({ key, option, href }) => (
            <li key={key}>
              <a
                href={href}
                className="flex p-2 font-normal text-sm text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black"
              >
                <BsDash className="self-center text-black mr-1"/>{option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Dropdown;
