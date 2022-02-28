import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="text-center mx-6 lg:w-2/3">
        <img
        alt="logo"
          className="m-auto w-24 lg:w-48"
          src="../legalistica_logo.png"
        />
        <h1 className="mt-2 mb-1 text-2xl lg:text-3xl">Pagina no encontrada - Page 404</h1>
        <div>
          <p>
            Sentimos el inconveniente pero no logramos encontrar la pagina que busca - 
            <Link
              className="text-blue-700 font-semibold hover:underline hover:decoration-wavy"
              to="/home"
            >
              Team Legalistica
            </Link>{" "}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Page404;
