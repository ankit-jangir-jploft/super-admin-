"use client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RevenueChart = ({ donutChart }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const updateChart = (value1, value2) => {
      const total = value1 + value2;
      const percentage1 = (value1 / total) * 100;
      const percentage2 = (value2 / total) * 100;

      // Update stroke-dasharray dynamically
      const circle = document.querySelector(".circle");
      if (circle) {
        const strokeDasharray = `${percentage1} ${100 - percentage1}`;
        circle.setAttribute("stroke-dasharray", strokeDasharray);
      }

      // Update value labels
      const valueLeft = document.querySelector(".value-left");
      const valueRight = document.querySelector(".value-right");
      if (valueLeft) valueLeft.innerText = `${Math.round(percentage1)}%`;
      if (valueRight) valueRight.innerText = `${Math.round(percentage2)}%`;
    };

    updateChart(2, 98); // Example: Pass your two values here
  }, []);

  return (
    <div>
      <div className="chart">
        <svg viewBox="0 0 42 42" className="circular-chart">
          <circle
            className="circle-bg"
            cx="21"
            cy="21"
            r="15.915"
          />
          <circle
            className="circle"
            cx="21"
            cy="21"
            r="15.915"
            strokeDasharray="0 100" // Default value; updated dynamically
          />
        </svg>
        <div className="value-label value-left">0%</div>
        <div className="value-label value-right">0%</div>
      </div>
      <div className="legend">
        <span>
          <span className="legend-circle sales"></span> {t("dashboard.sales")}
        </span>
        <span>
          <span className="legend-circle profit"></span> {t("dashboard.profit")}
        </span>
      </div>
    </div>
  );
};

export default RevenueChart;
