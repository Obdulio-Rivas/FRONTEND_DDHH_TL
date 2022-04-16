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
  const [loginStatus, setLoginStatus] = useState({
    successful: 0,
    unsuccessful: 0,
  });

  useEffect(() => {
    async function fetchUsers() {
      let successful = 0;
      let unsuccessful = 0;
      let today = moment().add(-1, "d").format("YYYY-MM-DD");
      let current_year = moment().format("YYYY");
      let start_date = `${current_year}-01-01`;
      const response = await ChartService.getLoginsBetweenDates(start_date, today);
      console.log(response)
      response.data.map((log) => {
        if (true) {
          successful++;
        } else {
          unsuccessful++;
        }
        return true;
      });
      setLoginStatus({
        successful: successful,
        unsuccessful: unsuccessful
      });
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchUsers();
    console.log(loginStatus)
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
            size: 30
        }
      },
    },
  };

  const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  
  const data = {
    labels,
    datasets: [
      {
        label: "Inicios Exitosos",
        data: labels.map(() =>
          Math.random()
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Inicios Fallidos",
        data: labels.map(() =>
        Math.random()
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default PlatformLogins;
