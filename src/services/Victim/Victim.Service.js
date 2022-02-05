import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getVictim = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "user-access-token": AuthService.getCurrentUser().jwt,
        "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/victim/`, requestOptions);
  const response = await fetchData.json();
  return response;
};


const postVictim = async (values) =>{
  const requestOptions = {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "user-access-token": AuthService.getCurrentUser().jwt,
        "access-control-allow-credentials": true,
  },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(
    `${API_URL}/victim/`,
    requestOptions
  );

  const response = await fetchData.json();
  return response;
}

const VictimService = {
    getVictim,
    postVictim,
};

export default VictimService;