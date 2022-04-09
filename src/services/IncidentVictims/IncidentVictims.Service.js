import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getIncidentVictim = async (id_incident_victim) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/incident_victim/${id_incident_victim}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const getIncidentsVictims = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/incident_victim/`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const postIncidentVictim = async (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(`${API_URL}incident_victim/`, requestOptions);

  const response = await fetchData.json();
  return response;
};

/*const getIncidentsByUser = async (id_user) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(
    `${API_URL}/incident/incidents_by_user/${id_user}`,
    requestOptions
  );
  const response = await fetchData.json();
  return response;
};*/

const IncidentVictimsService = {
getIncidentVictim,
getIncidentsVictims,
postIncidentVictim,
  //getIncidentsByUser,
};

export default IncidentVictimsService;