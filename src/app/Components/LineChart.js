"use client";
import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    title: {
      text: "Monthly Data Trend",
      align: "center",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [10, 15, 8, 12, 20, 25, 30],
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type='line'
        height={350}
      />
    </div>
  );
};

export default LineChart;
