import React from "react";
import { BiCopyright } from "react-icons/bi";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="hidden lg:flex justify-center justify-items-center">
      <span className="flex flex-row text-center self-center">
        <BiCopyright className="self-center text-lg mr-2" />
        <p className="text-sm">2022 Derechos Reservados | Redes sociales</p>
        <Link to="/" className="cursor-pointer self-center text-lg mx-2">
          <BsFacebook />
        </Link>
        <Link to="/" className="cursor-pointer self-center text-lg mx-2">
          <BsInstagram />
        </Link>
        <Link to="/" className="cursor-pointer self-center text-lg mx-2">
          <BsLinkedin />
        </Link>
        <Link to="/" className="cursor-pointer self-center text-lg mx-2">
          <BsTwitter />
        </Link>
      </span>
    </div>
  );
};

export default Footer;
