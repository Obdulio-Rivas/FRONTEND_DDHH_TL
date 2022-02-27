import React from "react";
import ReactDom from "react-dom";
import Content from "./Content";

export default function Modal({title, isOpen, children, closeModal, handlerActionOK, handlerActionAbort }) {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-40`} onClick={closeModal}>
        <Content title={title} children={children}  closeModal={closeModal} handlerActionOK={handlerActionOK} handlerActionAbort={handlerActionAbort}/>
      </div>
    </>,
    document.getElementById("portal")
  );
}
