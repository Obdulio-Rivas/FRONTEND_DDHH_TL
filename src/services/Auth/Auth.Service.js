import moment from "moment";
import API_URL from "../../const/api.js";
import IPHelper from "../../helpers/IP.Helper.js";
import LogService from "../Log/Log.Service.js";

const check_JWT = () => {
  try {
    if (getCurrentUser()) {
      if (getCurrentUser()?.expires_in) {
        const expires_in = getCurrentUser().expires_in;
        const current_time = moment()
          .add(+6, "h")
          .format("YYYY-MM-DD HH:mm:ss");
        if (expires_in >= current_time) {
          return true;
        } else {
          IPHelper.getPublicIP().then(response => {
            LogService.postLog({
              id_user: getCurrentUser().id_user,
              role_user: getCurrentUser().role,
              type_log: `Sesion expirada`,
              title_log: `Tiempo de inactividad expirado`,
              description: `El tiempo permitido de inactividad del usuario ha expirado`,
              ip_client: response,
            });
          });
        }
      }
    }
    return false;
  } catch (e) {
    IPHelper.getPublicIP().then(response => {
      LogService.postLog({
        id_user: getCurrentUser().id_user,
        role_user: getCurrentUser().role,
        type_log: `Error`,
        title_log: `Error al validar el JWT de la sesion`,
        description: `Error - ${e}`,
        ip_client: response,
      });
    });
    return false;
  }
};

const login = async (values) => {
  // POST request using fetch with async/await
  /**
      "access-control-allow-credentials": false,
   */
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(
    `${API_URL}authentication/login_user`,
    requestOptions
  );

  const response = await fetchData.json();

  const email = !!response?.data?.email ? response.data.email : 0;
  const status = !!response?.data?.status ? response.data.status : 0;

  if (response.jwt) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...response.data,
        jwt: response.jwt,
        is_successful: response.is_successful,
        expires_in: response.expires_in,
      })
    );
  }

  //Registramos el resultado del intento de incio de sesion.
  LogService.postLog({
    id_user: response.is_successful ? response.data.id_user: -1,
    role_user: response.is_successful ? response.data.role: -1,
    type_log: "Inicio de sesion",
    title_log: response.is_successful
      ? "Inicio de sesion correcto"
      : "Inicio de sesion fallido",
    description: `${
      response.is_successful
        ? "Inicio de sesion correcto"
        : "Inicio de sesion fallido"
    } por parte del usuario ${values.email}`,
    ip_client: await IPHelper.getPublicIP(),
  });

  return { email, status };
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const updateCuerrentUser = (response) => {
  if (response.jwt) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...response,
      })
    );
  }
};

const updateJwtUser = (response) => {
  if (response.jwt) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...getCurrentUser(),
        jwt: response.jwt,
        is_successful: response.is_successful,
        expires_in: response.expires_in,
      })
    );
  }
};

const AuthService = {
  login,
  logout,
  check_JWT,
  getCurrentUser,
  updateCuerrentUser,
  updateJwtUser,
};

export default AuthService;
