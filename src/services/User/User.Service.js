import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getUsers = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
    },
  };
  const fetchData = await fetch(`${API_URL}/user/`, requestOptions);
  const response = await fetchData.json();
  return response;
};


const postUsers = async (values) =>{
  const requestOptions = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
    "user-access-token": AuthService.getCurrentUser().jwt,
  },
    body: JSON.stringify(values),
  };

  const fetchData = await fetch(
    `${API_URL}user/`,
    requestOptions
  );

  const response = await fetchData.json();
  return response;
}

const UserService = {
  getUsers,
  postUsers,
};

export default UserService;
