import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import AuthService from "../../../services/Auth/Auth.Service";
import LogService from "../../../services/Log/Log.Service";
import ChartService from "../../../services/Chart/Chart.Service";

const PlatformLogins = () => {
  const [logins, setLogins] = useState([]);

  useEffect(() => {
    async function fetchLogins() {
      let current_year = moment().format("YYYY");
      let start_date = `${current_year}-01-01`;
      const response = await ChartService.getLoginsOfCurrentYear(start_date);
      console.log(response.data);
      setLogins(response.data);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchLogins();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        position: "top",
        text: "Inicios en la plataforma",
        font: {
          size: 30,
        },
      },
    },
  };

  const labels = logins.map((data_object) => {
    return data_object.month_name;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Inicios Exitosos",
        data: logins.map(({ success }) => success),
        borderColor: "rgba(162, 223, 181, 0.5)",
        backgroundColor: "rgb(162, 223, 181)",
      },
      {
        label: "Inicios Fallidos",
        data: logins.map(({ failed }) => failed),
        borderColor: "rgba(255, 107, 107, 0.5)",
        backgroundColor: "rgb(255, 107, 107)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default PlatformLogins;
