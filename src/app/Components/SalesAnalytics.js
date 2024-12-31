"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from "recharts";

const data = [
  { name: "Jan", sales: 75000 },
  { name: "Feb", sales: 50000 },
  { name: "Mar", sales: 100000 },
  { name: "Apr", sales: 125000 },
  { name: "May", sales: 90000 },
  { name: "Jun", sales: 110000 },
  { name: "Jul", sales: 125000 },
  { name: "Aug", sales: 90000 },
  { name: "Sep", sales: 110000 },
  { name: "Oct", sales: 125000 },
  { name: "Nov", sales: 90000 },
  { name: "Dec", sales: 110000 },
];

const SalesAnalyticsChart = () => {
  const [timeframe, setTimeframe] = useState("Yearly");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Sales Analytics</h3>
        <div>
          {["Daily", "Weekly", "Monthly", "Yearly"].map((label) => (
            <button
              key={label}
              style={{
                padding: "8px 12px",
                margin: "0 4px",
                background: timeframe === label ? "#ff4d4f" : "#f3f3f3",
                color: timeframe === label ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setTimeframe(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="SalesAnalyticsChart mt-5">

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#C6C7F8"
            strokeWidth={2}
            dot={<Dot r={6} stroke="#000" />}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalyticsChart;
