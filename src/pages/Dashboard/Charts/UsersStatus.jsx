import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AuthService from "../../../services/Auth/Auth.Service";
import ChartService from "../../../services/Chart/Chart.Service";

const UsersStatus = () => {
  const [userStatus, setUserStatus] = useState([]);

  useEffect(() => {
    async function fetchIncidents() {
      const response = await ChartService.getUsersStatus();
      setUserStatus(response.data[0]);
      console.log(response.data[0])
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchIncidents();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        position: "top",
        text: "Estado de los usuarios",
        font: {
            size: 30
        }
      },
    },
  };

  const data = {
    labels: ["Activos", "Inactivos", "Pendientes"],
    datasets: [
      {
        label: "# de usuarios",
        data: [
          userStatus.active,
          userStatus.inactive,
          userStatus.pending
        ],
        backgroundColor: [
          "rgb(162, 213, 171)",
          "rgb(255, 107, 107)",
          "rgb(255, 217, 61)",
        ],
        borderColor: [
          "rgb(238, 238, 238)",
          "rgb(238, 238, 238)",
          "rgb(238, 238, 238)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};

export default UsersStatus;
