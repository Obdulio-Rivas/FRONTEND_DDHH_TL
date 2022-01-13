import React from 'react'

const Hero = () => {
    return (
        <>
            <img
              className="sm:h-16 md:h-20 lg:h-28 self-center"
              src="./legalistica_logo.png"
              alt="logo"
            />
            <div className="hidden lg:flex">
              <h1 className="text-left xl:text-7xl lg:text-6xl uppercase font-bold">
                <span>Gestiona tus documentos</span>
                <br />
                <span style={{ color: "#4975E9" }}>legales</span>
              </h1>
            </div>
            <p className="hidden lg:flex self-start text-2xl">
              Almacena todos tus recursos dentro de un sistema que te permita
              llevarlos a todos lados, respaldando tus documentos en la nube.
            </p>
        </>
    )
}

export default Hero
