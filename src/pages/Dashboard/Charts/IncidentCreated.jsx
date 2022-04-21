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
    async function fetchIncidents() {
      let current_year = moment().format("YYYY");
      let start_date = `${current_year}-01-01`;
      const response = await ChartService.getIncidentsOfCurrentYear(start_date);
      setIncidents(response.data);
      if (response.is_successful) {
        AuthService.updateJwtUser(response);
      }
    }
    fetchIncidents();
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
        label: "Verificados",
        data: incidents.map(({ number_of_verify }) => number_of_verify),
        backgroundColor: "rgb(162, 213, 171)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default IncidentCreated;
