import moment from "moment";
import API_URL from "../../const/api.js";

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
        }
      }
    }

    return false;
  } catch (e) {
    //Crear un servicio de log.
    console.log(e);
    console.log(!getCurrentUser()?.expires_in);

    return false;
  }
};

const login = async (values) => {
  // POST request using fetch with async/await
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-credentials": false,
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

  return {email, status};
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
