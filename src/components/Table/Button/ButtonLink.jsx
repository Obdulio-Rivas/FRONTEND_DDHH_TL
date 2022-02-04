import React from "react";

const ButtonLink = (props) => {
  const { value, href, btnType, btn_full } = props;

  var buttonStyle = "";

  switch (btnType) {
    case "primary":
      buttonStyle = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        btn_full ? "w-full" : ""
      }`;
      break;
    case "success":
      buttonStyle = `bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        btn_full ? "w-full" : ""
      }`;
      break;
    default:
      buttonStyle = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        btn_full ? "w-full" : ""
      }`;
      break;
  }

  return (
    <div className="block m-auto w-full">
      <a href={href} className={buttonStyle}>
        {value}
      </a>
    </div>
  );
};

export default ButtonLink;
