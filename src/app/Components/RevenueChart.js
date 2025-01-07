"use client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RevenueChart = ({ donutChart }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (donutChart.length >= 2) {
      const [value1, value2] = donutChart.map(Number);

      const total = value1 + value2;
      const percentage1 = (value1 / total) * 100;
      const percentage2 = (value2 / total) * 100;

      console.log("percentage1", percentage1);
      console.log("percentage2", percentage2);

      // Update stroke-dasharray dynamically
      const circle = document.querySelector(".circle");
      if (circle) {
        const strokeDasharray = `${percentage2} ${100 - percentage2}`;
        circle.setAttribute("stroke-dasharray", strokeDasharray);
      }

      // Update value labels
      const valueLeft = document.querySelector(".value-left");
      const valueRight = document.querySelector(".value-right");
      if (valueLeft) valueLeft.innerText = `${percentage2.toFixed(2)}%`;
      if (valueRight) valueRight.innerText = `${percentage1.toFixed(2)}%`;
    } else {
      console.warn("donutChart data is insufficient to update the chart.");
    }
  }, [donutChart]); // Re-run effect whenever donutChart changes.

  return (
    <div>
      <div className='chart'>
        <svg
          viewBox='0 0 42 42'
          className='circular-chart'
        >
          <circle
            className='circle-bg'
            cx='21'
            cy='21'
            r='15.915'
          />
          <circle
            className='circle'
            cx='21'
            cy='21'
            r='15.915'
            strokeDasharray='0 100'
          />
        </svg>
        <div className='value-label value-left'>0%</div>
        <div className='value-label value-right'>0%</div>
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
