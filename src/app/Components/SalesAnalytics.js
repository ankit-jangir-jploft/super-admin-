"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import Cookies from "js-cookie";

// Example datasets for different timeframes
const dataSets = {
  daily: [
    { name: "12 AM", sales: 5000 },
    { name: "4 AM", sales: 8000 },
    { name: "8 AM", sales: 7000 },
    { name: "12 PM", sales: 15000 },
    { name: "4 PM", sales: 12000 },
    { name: "8 PM", sales: 20000 },
  ],
  weekly: [
    { name: "Mon", sales: 25000 },
    { name: "Tue", sales: 30000 },
    { name: "Wed", sales: 20000 },
    { name: "Thu", sales: 40000 },
    { name: "Fri", sales: 35000 },
    { name: "Sat", sales: 45000 },
    { name: "Sun", sales: 30000 },
  ],
  monthly: [
    { name: "Week 1", sales: 75000 },
    { name: "Week 2", sales: 50000 },
    { name: "Week 3", sales: 100000 },
    { name: "Week 4", sales: 125000 },
  ],
  yearly: [
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
    { name: "Jan", sales: 75000 },
  ],
};

const SalesAnalyticsChart = () => {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState("yearly"); // Default timeframe
  const [chartData, setChartData] = useState(dataSets[timeframe]); // Initialize with yearly data
  const [lang, setLang] = useState("nor");

  const filters = [
    { key: "daily", label: t("dashboard.daily") },
    { key: "weekly", label: t("dashboard.weekly") },
    { key: "monthly", label: t("dashboard.monthly") },
    { key: "yearly", label: t("dashboard.yearly") },
  ];

  useEffect(() => {
    setLang(Cookies.get("i18next"));
  }, []);
  const handleFilterChange = (key) => {
    setTimeframe(key);
    // setChartData(dataSets[key]); // Update chart data based on selected timeframe
  };

  const fetchSalesData = async () => {
    try {
      const payload = {
        filter: timeframe,
        lang: lang,
      };
      const res = await GET(
        `${BASE_URL}/api/admin/dashboardLineChart?lang=${lang}`,
        payload
      );
      if (res?.data?.status) {
        setChartData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [timeframe]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h3>{t("dashboard.sales_analytics")}</h3>
        <div>
          {filters.map(({ key, label }) => (
            <button
              key={key}
              style={{
                padding: "8px 12px",
                margin: "0 4px",
                background: timeframe === key ? "#ff4d4f" : "#FFF",
                color: timeframe === key ? "#fff" : "#898989",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => handleFilterChange(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className='SalesAnalyticsChart mt-5'>
        <ResponsiveContainer
          width='100%'
          height={300}
        >
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='sales'
              stroke='#C6C7F8'
              strokeWidth={2}
              dot={
                <Dot
                  r={6}
                  stroke='#000'
                />
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalyticsChart;
