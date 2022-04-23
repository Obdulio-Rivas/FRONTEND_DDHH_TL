const options_menu = {
  0: [
    { key: 0, title: "Inicio", href: "/home", type: "normal" },
    {
      key: 1,
      title: "Usuarios",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Nuevo usuario", href: "/users/newUser" },
        { key: 1, option: "Listado de usuarios", href: "/users/" },
      ],
    },
    { key: 2, title: "Archivos", href: "/files", type: "normal" },
    {
      key: 3,
      title: "Incidentes",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Nuevo incidente", href: "/incident/step1" },
        { key: 1, option: "Listado de incidentes", href: "/incident/incidents" },
      ],
    },
    {
      key: 4,
      title: "Formatos",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Subir formato", href: "/formats/upload" },
        { key: 1, option: "Listado de formatos", href: "/formats" },
      ],
    },
    {
      key: 5,
      title: "Metricas",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Dashboard", href: "/dashboard" },
        { key: 1, option: "Logs del sistema", href: "/log" },
      ],
    },
  ],
  1: [
    { key: 0, title: "Inicio", href: "/home", type: "normal" },
    {
      key: 1,
      title: "Incidentes",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Nuevo incidente", href: "/incident/step1" },
        { key: 1, option: "Listado de incidentes", href: "/incident/incidents" },
      ],
    },
    {
      key: 2,
      title: "Formatos",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Listado de formatos", href: "/formats" },
      ],
    },
  ],
  2: [
    { key: 0, title: "Inicio", href: "/home", type: "normal" },
    {
      key: 1,
      title: "Incidentes",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Nuevo incidente", href: "/incident/step1" },
        { key: 1, option: "Listado de incidentes", href: "/incident/incidents" },
      ],
    },
    { key: 2, title: "Directorio", href: "/directory", type: "normal" },
  ],
};

const getMenu = (user_rol) => {
  return options_menu[user_rol];
};

export default getMenu;
