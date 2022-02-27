import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getVictims = async () => {
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


const getVictim = async (id_victim) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/victim/${id_victim}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const postVictim = async (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(`${API_URL}/victim/`, requestOptions);

  const response = await fetchData.json();
  return response;
};

const VictimService = {
  getVictim,
  getVictims,
  postVictim,
};

export default VictimService;
