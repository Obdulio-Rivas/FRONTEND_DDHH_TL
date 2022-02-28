import React from "react";
import { Link, useLocation } from "react-router-dom";

const StepManager = ({ children }) => {
  const location = useLocation();

  const getStep = (pathname = "") => {
    const pathStep = pathname.split("/");
    const indexPathStep = pathname.split("/").length - 1;
    return `/${pathStep[indexPathStep]}`;
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10">
        <nav className="w-full flex justify-center items-center m-auto">
          <ul className="flex border-b-2 border-gray-300">
            <li
              className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
                getStep(location.pathname) === "/step1"
                  ? "text-blue-600 bg-transparent border-b-4 border-blue-500"
                  : ""
              }`}
            >
              <Link to="/incident/step1">Step 1</Link>
            </li>
            <li
              className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
                getStep(location.pathname) === "/step2"
                  ? "text-blue-600 bg-transparent border-b-4 border-blue-500"
                  : ""
              }`}
            >
              <Link to="/incident/step2">Step 2</Link>
            </li>
            <li
              className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
                getStep(location.pathname) === "/step3"
                  ? "text-blue-600 bg-transparent border-b-4 border-blue-500"
                  : ""
              }`}
            >
              <Link to="/incident/step3">Step 3</Link>
            </li>
            <li
              className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
                getStep(location.pathname) === "/step4"
                  ? "text-blue-600 bg-transparent border-b-4 border-blue-500"
                  : ""
              }`}
            >
              <Link to="/incident/step4">Step 4</Link>
            </li>
            <li
              className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
                getStep(location.pathname) === "/step5"
                  ? "text-blue-600 bg-transparent border-b-4 border-blue-500"
                  : ""
              }`}
            >
              <Link to="/incident/step5">Step 5</Link>
            </li>
            <li
              className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
                getStep(location.pathname) === "/step6"
                  ? "text-blue-600 bg-transparent border-b-4 border-blue-500"
                  : ""
              }`}
            >
              <Link to="/incident/step6">Step 6</Link>
            </li>
            <li
              className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
                getStep(location.pathname) === "/step7"
                  ? "text-blue-600 bg-transparent border-b-4 border-blue-500"
                  : ""
              }`}
            >
              <Link to="/incident/step7">Step 7</Link>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </>
  );
};

export default StepManager;
