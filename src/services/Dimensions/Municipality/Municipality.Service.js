import API_URL from "../../../const/api.js";
import AuthService from "../../Auth/Auth.Service.js";

const getMunicipalities = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/municipality/`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const getMunicipality = async (id_municipality) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/municipality/${id_municipality}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const getMunicipalitiesByDepartment = async (id_department) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/municipality/municipalities_by_department/${id_department}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const MunicipalityService = {
  getMunicipality,
  getMunicipalities,
  getMunicipalitiesByDepartment
  };
  
  export default MunicipalityService;