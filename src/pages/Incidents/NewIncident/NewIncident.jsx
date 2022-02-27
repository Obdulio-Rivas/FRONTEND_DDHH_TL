import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import StepManager from "./StepManager";

const NewIncident = () => {
  const location = useLocation();
  const [store, setStore] = useState({});

  const handlerStore = (values) => {
    setStore((prevStore)=> {
      return {
        ...prevStore,
        ...values
      }
    })
  }

  const getStepForm = (pathname = '') => {
    const pathStep = pathname.split('/');
    const indexPathStep = pathname.split('/').length - 1;
    switch (pathStep[indexPathStep]) {
      case 'step1':
        return <Step1 handlerStore={handlerStore}/>;
      case 'step2':
        return <Step2 handlerStore={handlerStore} />;
      case 'step3':
        return <Step3 store={store}/>;

      default:
        return <Step1 />;
    }
  };

  return (
    <>
      <Navbar />
      <StepManager children={getStepForm(location.pathname)} />
    </>
  );
};

export default NewIncident;
