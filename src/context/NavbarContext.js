import { createContext, useState } from "react";

const NavbarContext = createContext();

const NavbarProvider = ({children}) => {
  const [optionSelected, setOptionSelected] = useState('home');
  
  const haddlerClick = (option) => {
    console.log("Open Context!");
    setOptionSelected(option);
  };

  const data = {optionSelected, haddlerClick};

  return <NavbarProvider value={data}>{children}</NavbarProvider>;
};

export {NavbarProvider};

export default NavbarContext;