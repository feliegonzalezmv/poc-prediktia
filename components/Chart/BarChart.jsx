import React from "react";
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
import styles from "./BarChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
        beginAtZero: true,
        font: {
          size: 18,
          family: "Figtree",
          weight: "500",
        },
      },
      title: {
        display: true,
        text: "Quantities",
        font: {
          size: 18,
          family: "Figtree",
          weight: "500",
        },
      },
      grid: {
        borderDash: [8, 5],
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 18,
          family: "Figtree",
          weight: "400",
        },
      },
      title: {
        display: true,
        text: "Product sizes",
        font: {
          size: 18,
          family: "Figtree",
          weight: "500",
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};

export function BarChart({ title, dataChart, close }) {

  const data = {
    labels: Object.keys(dataChart),
    datasets: [
      {
        label: "d",
        data: dataChart,
        backgroundColor: "#6AC6A7",
        borderRadius: 3,
        color: "#747181",
      },
    ],
  };
  return (
    <div className={styles.barChartContainer}>
      <div className={styles.modalHead}>
        <h4>{title}</h4>
        <div className={styles.botones}>
          <button className={styles.edit}>Edit</button>
          <div className={styles.square} onClick={() => {
            close();
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
              <path d="M10.472 0.399994L6 4.87199L1.528 0.399994L0.400002 1.52799L4.872 5.99999L0.400002 10.472L1.528 11.6L6 7.12799L10.472 11.6L11.6 10.472L7.128 5.99999L11.6 1.52799L10.472 0.399994Z" />
            </svg>
          </div>
        </div>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}
