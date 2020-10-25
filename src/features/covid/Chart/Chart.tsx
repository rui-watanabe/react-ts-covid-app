import React from "react";
import styles from "./Chart.module.css";
import { Line, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectData, selectDataDaily, selectCountry } from "../covidSlice";

const Chart: React.FC = () => {
  const data = useSelector(selectData);
  const dataDaily = useSelector(selectDataDaily);
  const country = useSelector(selectCountry);

  console.log(dataDaily);

  const barChart = data && (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "#008080",
              "rgba(255,0,0,0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Latest status in ${country}` },
      }}
    />
  );

  const lineChart = dataDaily[0] && (
    <Line
      data={{
        labels: dataDaily.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dataDaily.map((data) => data.confirmed.total),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dataDaily.map((data) => data.deaths.total),
            label: "Deaths",
            borderColor: "#ff3370",
            fill: true,
          },
        ],
      }}
    />
  );

  return (
    <div className={styles.container}>
      {country.length ? barChart : lineChart}
    </div>
  );
};

export default Chart;
