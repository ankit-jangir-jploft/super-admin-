"use client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RevenueChart = ({ donutChart }) => {
  const { t } = useTranslation();
  useEffect(() => {
    // Update the chart percentages
    const updateChart = (percentage1, percentage2) => {
      const circle = document.querySelector(".circle");
      if (circle) {
        circle.setAttribute(
          "stroke-dasharray",
          `${percentage1}, ${100 - percentage1}`
        );
      }
      // Update value labels
      const valueLeft = document.querySelector(".value-left");
      const valueRight = document.querySelector(".value-right");
      if (valueLeft) valueLeft.innerText = `${percentage1}%`;
      if (valueRight) valueRight.innerText = `${percentage2}%`;
    };

    updateChart(40, 60);
  }, []);

  return (
    <div>
      <div className='chart'>
        <svg
          viewBox='-1 -3 47 48'
          className='circular-chart'
        >
          <path
            className='circle-bg'
            d='M21 2
              a 19 19 0 0 1 0 38
              a 19 19 0 0 1 0 -38'
          />
          <path
            className='circle'
            strokeDasharray='50,50'
            d='M21 2
              a 19 19 0 0 1 0 38
              a 19 19 0 0 1 0 -38'
          />
        </svg>
        <div className='value-label value-left'>50%</div>
        <div className='value-label value-right'>50%</div>
      </div>
      <div className='legend'>
        <span>
          <span className='legend-circle sales'></span> {t("dashboard.sales")}
        </span>
        <span>
          <span className='legend-circle profit'></span> {t("dashboard.profit")}
        </span>
      </div>
    </div>
  );
};

export default RevenueChart;
