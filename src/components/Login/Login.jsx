import React from "react";
import Hero from "./Hero/Hero";
import LoginForm from "./Form/LoginForm";
import Footer from "./Footer/Footer";

const Login = () => {
  return (
      <div className="lg:h-screen lg:w-screen flex flex-wrap lg:flex-nowrap">
        <div className="flex justify-center w-screen h-max lg:h-screen p-4">
          <div className="flex flex-row flex-wrap self-center h-5/6 w-10/12 max-w-full">
            <Hero/>
            <Footer/>
          </div>
        </div>
        <div className="flex flex-row flex-wrap w-screen h-screen p-4">
          <div className="block m-auto h-4/6 w-6/12 max-w-full">
            <LoginForm/>
          </div>
        </div>
      </div>
  );
};

export default Login;
