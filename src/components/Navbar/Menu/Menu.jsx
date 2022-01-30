import React, { useState } from "react";
import {
  AiOutlineMenu
} from "react-icons/ai";
import getMenu from "../../../const/menus";
import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";
import ItemMenu from "../ItemMenu/ItemMenu";

const Menu = () => {

  const options_menu = getMenu(1);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const haddlerClick = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <div className="inline-flex m-y-auto items-center justify-center">
        <button
          className="w-auto h-auto ml-auto  lg:hidden focus:outline-none"
          onClick={() => haddlerClick()}
        >
          <AiOutlineMenu className="border rounded-md outline-none p-1 w-8 h-8" />
        </button>
      </div>
      <div
        className={`w-full mt-2 lg:inline-flex lg:w-auto lg:mt-0 ${
          isNavbarOpen ? null : "hidden"
        }`}
      >
        <ul className="flex flex-col w-full space-y-2 m-auto lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-2">
          {options_menu.map((option_menu)=>{
            if(option_menu.type==='normal'){
              return <ItemMenu {...option_menu} />
            }else{
              return <Dropdown {...option_menu} />
            }
          })}
          <Avatar user={null}/>
        </ul>
      </div>
    </>
  );
};

export default Menu;