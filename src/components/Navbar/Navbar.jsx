import React from "react";
import Menu from "./Menu/Menu";

const Navbar = () => {

  return (
    <nav className="bg-white shadow-md text-gray-700">
      <div className="container flex flex-wrap px-4 py-2 mx-auto lg:space-x-4 justify-between">
        {/*Logo*/}
        <a
          href="#"
          className="inline-flex p-2 text-xl font-bold tracking-wide uppercase "
        >
          <img className="w-auto h-10" src="./legalistica_logo.png"/>
        </a>
        {/*Menu*/}
        <Menu/>
      </div>
    </nav>
  );
};

export default Navbar;
