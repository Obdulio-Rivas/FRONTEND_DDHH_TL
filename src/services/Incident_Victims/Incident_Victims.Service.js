import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getIncident_Victim = async (id_incident_victim) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/incident_victims/${id_incident_victim}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const getIncidents_Victims = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/incident_victims/`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const postIncident_Victim = async (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(`${API_URL}/incident_victims/`, requestOptions);

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

const CaseService = {
getIncident_Victim,
getIncidents_Victims,
postIncident_Victim,
  //getIncidentsByUser,
};

export default CaseService;