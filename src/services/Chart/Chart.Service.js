import API_URL from "../../const/api.js";
import AuthService from "../Auth/Auth.Service.js";

const getLoginsBetweenDates = async (start_date, end_date) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-access-token": AuthService.getCurrentUser().jwt,
      "access-control-allow-credentials": true,
    },
  };
  const fetchData = await fetch(`${API_URL}/chart/logins_between_dates?start_date=${start_date}&end_date=${end_date}`, requestOptions);
  const response = await fetchData.json();
  return response;
};

const ChartService = {
  getLoginsBetweenDates
};

export default ChartService;
