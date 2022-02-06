import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getUsers = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/user/`, requestOptions);
  const response = await fetchData.json();
  return response;
};


const getUser = async (id_user) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/user/${id_user}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const postUsers = async (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(`${API_URL}user/`, requestOptions);

  const response = await fetchData.json();
  return response;
};

const putUsers = async (values) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(`${API_URL}user/`, requestOptions);

  const response = await fetchData.json();
  return response;
};

const UserService = {
  getUsers,
  getUser,
  postUsers,
  putUsers,
};

export default UserService;
