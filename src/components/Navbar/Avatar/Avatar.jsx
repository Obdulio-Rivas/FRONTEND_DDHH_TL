import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AiOutlineProfile,
  AiOutlineInfoCircle,
  AiOutlineLogout,
} from "react-icons/ai";

const options = [
  {
    key: 1,
    icon: <AiOutlineProfile />,
    option: "Perfil",
    href: "/profile",
    font_color: "gray",
  },
  {
    key: 2,
    icon: <AiOutlineInfoCircle />,
    option: "Acerca de",
    href: "/about",
    font_color: "gray",
  },
];

const SingOut = () => {
  let navigate = useNavigate();
  
  const handdlerSingOut = () => {
    //Destroy sessionStorage
    navigate("/");
  };

  return (
    <li>
      <div
        onClick={() => handdlerSingOut()}
        className={`flex p-2 font-normal text-sm text-red-600 rounded-md hover:bg-zinc-100 hover:text-red-900`}
      >
        <span className="self-center mr-1">{<AiOutlineLogout />}</span>
        {"Cerrar Sesion"}
      </div>
    </li>
  );
};

const Avatar = (props) => {
  const { user } = props;
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  let navigate = useNavigate();

  const haddlerClick = () => {
    setIsOpenAvatar(!isOpenAvatar);
  };

  return (
    <li className="relative pt-1">
      <button
        href="#"
        onClick={() => haddlerClick()}
        className="flex w-full px-4 py-1 font-medium rounded-md outline-none focus:outline-none justify-start align-middle"
      >
        <img
          className="rounded-full w-8 h-8 max-h-8 border-2 border-slate-200"
          src={user ? user.avatarURL : "./profile.jpg"}
          alt="user avatar"
        />
        <span className="px-2 my-auto leading-none">Obdulio R.</span>
      </button>
      <div
        className={`right-0 p-2 mt-1 bg-white rounded-md lg:shadow lg:absolute lg:border ${
          isOpenAvatar ? null : "hidden"
        }`}
      >
        <ul className="space-y-2 lg:w-48">
          {options?.map(({ key, icon, option, href, font_color }) => (
            <li key={key}>
              <Link
                to={href}
                className={`flex p-2 font-normal text-sm text-${font_color}-600 rounded-md hover:bg-zinc-100 hover:text-${font_color}-900`}
              >
                <span className="self-center mr-1">{icon}</span>
                {option}
              </Link>
            </li>
          ))}
          <SingOut/>
        </ul>
      </div>
    </li>
  );
};

export default Avatar;
