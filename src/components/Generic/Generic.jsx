import React, { useState } from "react";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "red",
  padding: "10px",
};


export const Generic = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  
  const openModal = () => {
    setIsOpen(true);
  };
  
  const handlerActionOK = () => {
    console.log('Okay')
    setIsOpen(false);
  };
  
  const handlerActionAbort = async () => {
    toast.success("Contraseña actualizada con exito!", {
      position: "bottom-center",
    });
    setIsOpen(false);
  };

  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES}>
        <button onClick={(e) => openModal()}>Open Modal</button>
        <Modal title={'Title'} children={'Hola'} open={isOpen} closeModal={closeModal} handlerActionOK={handlerActionOK} handlerActionAbort={handlerActionAbort}/>
      </div>

      <div style={OTHER_CONTENT_STYLES}>Other Content</div>
    </>
  );
};
export default Generic;
