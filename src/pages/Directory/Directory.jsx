import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Directory = () => {
  const directory = [
    {
      url_img: 'https://i1.sndcdn.com/avatars-000335982476-u9sleh-t500x500.jpg',
      name: "PNC",
      phone: "911",
      website: "http://www.pnc.gob.sv/",
    },
    {
      url_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo_FGR_El_Salvador_claro.svg/2003px-Logo_FGR_El_Salvador_claro.svg.png',
      name: "FGR",
      phone: "2593 7400",
      website: "https://www.fiscalia.gob.sv/",
    },
    {
      url_img: 'https://www.pddh.gob.sv/wp-content/uploads/2017/02/logo.png',
      name: "PDDH",
      phone: "2520-4331 / 2520-4300",
      website: "https://www.pddh.gob.sv/",
    },
    {
      url_img: 'https://pbs.twimg.com/profile_images/1455163810600345600/B8ek_ln4_400x400.jpg',
      name: "PGR",
      phone: "7095-7080",
      website: "https://pgr.gob.sv/",
    },
    {
      url_img: 'https://isdemu.gob.sv/wp-content/uploads/2021/11/banner-11-11-1-scaled.jpg',
      name: "ISDEMU",
      phone: "2510-4100",
      website: "https://isdemu.gob.sv/",
    },
    {
      url_img: 'https://arpas.org.sv/wp-content/uploads/2018/09/CONNa-logo.jpg',
      name: "CONNA",
      phone: "2511-5400",
      website: "https://www.conna.gob.sv/",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-12 mb-14">
        <div className="md:flex no-wrap md:-mx-2 flex-col w-full">
          <div className="mb-2">
            <h1 className="text-6xl font-bold text-slate-800 text-center">
              Directorio de instituciones.
            </h1>
          </div>
          <div className="mt-12">
            <ul
              className={"flex flex-row flex-wrap justify-between items-center mt-4"}
            >
              {directory.map((element, index) => (
                <li key={index} className={"flex flex-row m-4"}>
                  <img className={'w-20 h-20'} src={element.url_img} alt="url_imgo" />
                  <div className="flex flex-col ml-4">
                    <span className={'text-xl font-semibold'}>{element.name}</span>
                    <a href={`tel:${element.phone}`}>{element.phone}</a>
                    <a
                      href={element.website}
                      className="cursor-pointer self-center text-lg underline text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ir al sitio web.
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Directory;
