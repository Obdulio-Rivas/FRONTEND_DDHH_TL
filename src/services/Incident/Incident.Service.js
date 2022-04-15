import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getIncident = async (id_incident) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/incident/${id_incident}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const getIncidents = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/incident/`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const postIncident = async (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(`${API_URL}/incident/`, requestOptions);

  const response = await fetchData.json();
  return response;
};

const getIncidentsByUser = async (id_user) => {
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
};

const CaseService = {
  getIncident,
  getIncidents,
  postIncident,
  getIncidentsByUser,
};

export default CaseService;
