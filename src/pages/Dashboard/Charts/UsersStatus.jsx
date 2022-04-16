import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import UserService from "../../../services/User/User.Service";
import AuthService from "../../../services/Auth/Auth.Service";

const UsersStatus = () => {
  const [usersStatus, setUsersStatus] = useState({
    activeUsers: 0,
    inactiveUsers: 0,
    pendingUsers: 0,
  });

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

  useEffect(() => {
    async function fetchUsers() {
      let activeUsers = 0;
      let inactiveUsers = 0;
      let pendingUsers = 0;
      const response = await UserService.getUsers();
      response.data.map((user) => {
        if (user.status === 0) {
          inactiveUsers++;
        } else if (user.status === 1) {
          activeUsers++;
        } else {
          pendingUsers++;
        }
        return true;
      });
      setUsersStatus({
        activeUsers: activeUsers,
        inactiveUsers: inactiveUsers,
        pendingUsers: pendingUsers,
      });
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchUsers();
  }, []);

  const data = {
    labels: ["Activos", "Inactivos", "Pendientes"],
    datasets: [
      {
        label: "# de usuarios",
        data: [
          usersStatus.activeUsers,
          usersStatus.inactiveUsers,
          usersStatus.pendingUsers,
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
