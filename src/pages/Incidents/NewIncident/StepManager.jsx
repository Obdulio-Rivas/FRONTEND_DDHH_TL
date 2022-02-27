import React from "react";
import { Link, useLocation } from "react-router-dom";

const StepManager = ({ children }) => {
  const location = useLocation();

  const getStep = (pathname = '') => {
    const pathStep = pathname.split('/');
    const indexPathStep = pathname.split('/').length - 1;
    return `/${pathStep[indexPathStep]}`;
  };

  return (
    <>
      <nav className="flex justify-left items-center">
        <ul className="flex border-b border-gray-200 dark:border-gray-700">
          <li className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${getStep(location.pathname) === "/step1" ? "text-blue-600 bg-transparent border-b-2 border-blue-500" : ""}`}>
            <Link to="/incident/step1">Step 1</Link>
          </li>
          <li className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${getStep(location.pathname) === "/step2" ? "text-blue-600 bg-transparent border-b-2 border-blue-500" : ""}`}>
            <Link to="/incident/step2">Step 2</Link>
          </li>
          <li className={`flex items-center h-10 px-2 py-2 -mb-px text-center sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${getStep(location.pathname) === "/step3" ? "text-blue-600 bg-transparent border-b-2 border-blue-500" : ""}`}>
            <Link to="/incident/step3">Step 3</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export default StepManager;
