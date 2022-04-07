import React from "react";
import { BiCopyright } from "react-icons/bi";
import { BsFacebook, BsYoutube, BsTwitter } from "react-icons/bs";
import { MdWeb } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="hidden lg:flex justify-center justify-items-center">
      <span className="flex flex-row text-center self-center">
        <BiCopyright className="self-center text-lg mr-2" />
        <p className="text-sm">
          2022{" "}
          <Link
            className="text-blue-700 font-semibold hover:underline hover:decoration-wavy"
            to="/"
          >
            Legalistica.
          </Link>{" "}
          Todos los derechos Reservados | Redes sociales
        </p>
        <a
          href="https://www.facebook.com/tuteladh"
          className="cursor-pointer self-center text-lg mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFacebook />
        </a>
        <a
          href="https://www.youtube.com/channel/UCRQOy-NvDvXqII_cDxBb7jg"
          className="cursor-pointer self-center text-lg mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsYoutube />
        </a>
        <a
          href="http://tuteladh.org/sitioweb/"
          className="cursor-pointer self-center text-lg mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdWeb />
        </a>
        <a
          href="https://twitter.com/tuteladh"
          className="cursor-pointer self-center text-lg mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitter />
        </a>
      </span>
    </div>
  );
};

export default Footer;
