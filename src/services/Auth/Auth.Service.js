import moment from "moment";
const API_URL = "https://testing--environment.herokuapp.com/API/";
//const API_URL = "http://localhost:3001/api/";

const check_JWT = () => {
  try {

    if (getCurrentUser()?.expires_in) {
      const expires_in = getCurrentUser().expires_in;
      const current_time = moment()
        .add(+6, "h")
        .format("YYYY-MM-DD HH:mm:ss");
      if (expires_in >= current_time) {
        return true;
      }
    }

    return false;
  } catch (e) {
    //Crear un servicio de log.
    console.log(e);
    console.log(!getCurrentUser()?.expires_in)

    return false;
  }
};

const login = async (values) => {
  // POST request using fetch with async/await
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(
    `${API_URL}authentication/login_user`,
    requestOptions
  );

  const response = await fetchData.json();

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
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  check_JWT,
  getCurrentUser,
};

export default AuthService;
