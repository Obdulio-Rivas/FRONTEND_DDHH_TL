import API_URL from "../../../const/api.js";
import AuthService from "../../Auth/Auth.Service.js";

const getDepartments = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/department/`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const getDepartment = async (id_department) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(
    `${API_URL}/department/${id_department}`,
    requestOptions
  );
  const response = await fetchData.json();
  return response;
};

const DepartmentService = {
  getDepartment,
  getDepartments,
};

export default DepartmentService;
