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
    {
      key: 2,
      title: "Victimas",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Nueva victima", href: "/victim/newVictim" },
        { key: 1, option: "Listado de victimas", href: "/victim/" },
        { key: 2, option: "Crear Caso", href: "/victim/newIncident" },
      ],
    },
    { key: 3, title: "Archivos", href: "/files", type: "normal" },
    { key: 4, title: "Testing", href: "/test", type: "normal" },
  ],
  1: [
    {
      key: 0,
      title: "Archivo",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Archivo 1", href: "/A1" },
        { key: 1, option: "Archivo 2", href: "/A2" },
        { key: 2, option: "Archivo 3", href: "/A3" },
      ],
    },
    {
      key: 1,
      title: "Crear Caso",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Caso 1", href: "/C1" },
        { key: 1, option: "Caso 2", href: "/C2" },
        { key: 2, option: "Caso 3", href: "/C3" },
      ],
    },
    { key: 2, title: "Seguimiento", href: "/Seguimiento", type: "normal" },
    { key: 3, title: "Directorio", href: "/Directorio", type: "normal" },
    { key: 4, title: "Dashboard", href: "/Dashboard", type: "normal" },
  ],
  2: [
    {
      key: 0,
      title: "Archivo",
      href: "#",
      type: "dropdown",
      options: [
        { key: 0, option: "Archivo 1", href: "/A1" },
        { key: 1, option: "Archivo 2", href: "/A2" },
        { key: 2, option: "Archivo 3", href: "/A3" },
      ],
    },
    {key: 1, title: "Crear Caso", href: "/CrearCaso", type: "normal",},
    { key: 2, title: "Seguimiento", href: "/Seguimiento", type: "normal" },
    { key: 3, title: "Directorio", href: "/Directorio", type: "normal" },
    { key: 4, title: "Dashboard", href: "/Dashboard", type: "normal" },
  ]
};

const getMenu = (user_rol) => {
    return options_menu[user_rol]
}

export default getMenu;