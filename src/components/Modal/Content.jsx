import React from "react";
import ReactDom from "react-dom";
import { MdClose } from "react-icons/md";

const Content = ({modaltype, title, children, closeModal, handlerActionOK, handlerActionAbort }) => {
    return ReactDom.createPortal(
      <>
        <div
          className="fixed top-1/2 left-1/2 bg-slate-50 p-5 pb-10 z-50 rounded-lg max-w-sm w-2/3"
          style={{ transform: "translate(-50%, -50%)" }}
          onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-start relative">
            <span className="pl-4 text-2xl">{title}</span>
          <button
            id="btn_cancel"
            className="absolute right-0 top-0"
            onClick={closeModal}
          >
            <MdClose className="text-slate-600 text-3xl"/>
          </button>
            </div>
          <div className="flex justify-center p-5">{children}</div>
          <div className="flex flex-row justify-between px-5">
          <button
            className="px-3 py-2 bg-green-500 text-white rounded-lg"
            onClick={handlerActionOK}
          >
            Continuar
          </button>
          {modaltype=='eliminar' ? 
          <button
            className="px-3 py-2 bg-red-500 text-white rounded-lg"
            onClick={handlerActionAbort}
          >
            Cancelar
          </button> : <></>}
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
};

export default Content;
