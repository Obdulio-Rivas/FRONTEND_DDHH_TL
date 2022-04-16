import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import ChartService from "../../../services/Chart/Chart.Service";
import AuthService from "../../../services/Auth/Auth.Service";

const IncidentCreated = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function fetchLogins() {
      let current_year = moment().format("YYYY");
      let start_date = `${current_year}-01-01`;
      const response = await ChartService.getIncidentsOfCurrentYear(start_date);
      console.log(response.data);
      setIncidents(response.data);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchLogins();
  }, []);


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        text: "Incidentes registrados",
        font: {
            size: 30
        },
      },
    },
  };

  const labels = incidents.map((data_object) => {
    return data_object.month_name;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Pendientes",
        data: incidents.map(({ number_of_pendings }) => number_of_pendings),
        backgroundColor: "rgb(255, 217, 61)",
      },
      {
        label: "En curso",
        data: incidents.map(({ number_of_progress }) => number_of_progress),
        backgroundColor: "rgb(254, 177, 57)",
      },
      {
        label: "Completados",
        data: incidents.map(({ number_of_completed }) => number_of_completed),
        backgroundColor: "rgb(162, 213, 171)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default IncidentCreated;
