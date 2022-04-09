import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";
const _platform_uuid = "86e40247-693e-45c7-aaca-23e579f6a580";

const getLog = async (id_log) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "platform-uuid": _platform_uuid,
      "platform-user": AuthService?.getCurrentUser()?.id_user || -1,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/log/${id_log}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const getLogs = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "platform-uuid": _platform_uuid,
      "platform-user": AuthService?.getCurrentUser()?.id_user || -1,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/log/`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const postLog = async (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "platform-uuid": _platform_uuid,
      "platform-user": AuthService?.getCurrentUser()?.id_user || -1,
      "Access-Control-Allow-Origin": true,
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(`${API_URL}log/`, requestOptions);

  const response = await fetchData.json();
  return response;
};


const LogService = {
  getLog,
  getLogs,
  postLog,
};

export default LogService;
