import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getLoginsOfCurrentYear = async (start_date) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/chart/logins_current_year?start_date=${start_date}`, requestOptions);
  const response = await fetchData.json();
  return response;
};


const getIncidentsOfCurrentYear = async (start_date) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/chart/incidents_current_year?start_date=${start_date}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const ChartService = {
  getLoginsOfCurrentYear,
  getIncidentsOfCurrentYear
};

export default ChartService;
