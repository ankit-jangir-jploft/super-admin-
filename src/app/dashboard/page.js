"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import dynamic from "next/dynamic";
import { BASE_URL } from "../Utils/apiHelper";
import { GET } from "../Utils/apiFunctions";
import Cookies from "js-cookie";
import RevenueChart from "../Components/RevenueChart";
import SalesAnalyticsChart from "../Components/SalesAnalytics";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const page = () => {
  const [dashBoardData, setDashBoardData] = useState();
  const [userData, setUserData] = useState();
  const series = [
    {
      name: "Sales - 2013",
      data: [10, 29, 20, 36, 7, 25, 70],
    },
    {
      name: "Profit - 2013",
      data: [34, 29, 40, 50, 78, 25, 60],
    },
  ];
  const [lineChart, setLineChart] = useState(series);
  const [lineChartOptions, setLineOptions] = useState({
    chart: {
      height: 300,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#CDCDCD", "#FD575A"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [
        "Dec",
        "Nov",
        "Oct",
        "Sep",
        "Aug",
        "Jul",
        "Jun",
        "May",
        "Apr",
        "Mar",
        "Feb",
        "Jan",
      ].reverse(),
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  const [donutChart, setDonut] = useState([]);

  const state1 = {
    series: [55, 15],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Sales", "Profit"],
      colors: ["#CDCDCD", "#FD575A"], // Match colors
      legend: {
        position: "bottom",
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    },
  };

  const fetchData = async () => {
    try {
      const response = await GET(`${BASE_URL}/api/admin/dashbord`);

      console.log(response?.data?.data);
      setDashBoardData(response?.data?.data);
      setLineChart(response?.data?.data?.lineChart);

      setDonut(response?.data?.data?.donutChart);
      const dynamicCategories = response?.data?.data?.months || [];
      const xaxis = {
        categories: dynamicCategories,
      };
      console.log("xaxis", xaxis);
      // setLineOptions((prevOptions) => ({
      //   ...prevOptions,
      //   xaxis: xaxis,
      // }));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("lineChartOptions", lineChartOptions);

  useEffect(() => {
    fetchData();

    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, []);

  // check
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      try {
        const payload = {
          query: query,
        };
        const res = await GET(`${BASE_URL}/api/admin/globalFilter`, payload);

        if (res?.data?.status) {
          setSuggestions(res?.data?.data || []);
          setDropdownVisible(true);
        } else {
          setSuggestions([]);
          setDropdownVisible(false);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setDropdownVisible(false);
      }
    } else {
      setSuggestions([]);
      setDropdownVisible(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const route = {
      customer: "kunderdetail",
      order: "orderdetail",
      product: "products-details",
    };
    window.location.href = `/${route[suggestion?.type]}/${suggestion?.id}`;
    setDropdownVisible(false);
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main main-dashbord-grph'>
        <div className='admin-header'>
          <h2>Main Dashboard</h2>
          <div
            className='search-frm'
            style={{ position: "relative" }}
          >
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Search...'
            />
            {suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  zIndex: 1000,
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
            <Link href=''>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={`/useredit/${userData?.id}`}>
              <img
                className='object-fit-cover rounded-circle'
                style={{ width: "41px" }}
                src={userData?.profile_image}
                onError={(e) => {
                  e.target.src = "/images/avatar-style.png";
                }}
              />
            </Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <div className='dash-crde pinks-cr'>
              <p>Number of groups</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2> {dashBoardData?.number_of_group}</h2>
                <span>Active</span>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='dash-crde'>
              <p>Number of sellers</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{dashBoardData?.number_of_seller}</h2>
                <span>Active</span>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='dash-crde blue-cr'>
              <p>Profit</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{dashBoardData?.profit}</h2>
                <span>Active</span>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='dash-crde rde-cr'>
              <p>No. of packages</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{dashBoardData?.no_of_packages} stk</h2>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-7 mb-4'>
            <div className='grph-crd'>
              <div id='chart'>
                {/* <h3>Sales Analytics</h3> */}
                {/* <ApexCharts
                  options={lineChartOptions}
                  series={lineChart}
                  type='line'
                  height={300}
                /> */}
                <SalesAnalyticsChart/>
              </div>
            </div>
          </div>
          <div className='col-md-5  mb-4'>
            <div className='grph-crd'>
              {/* <img className='img-fluid' src="/images/revenue-ananst.png" /> */}
              <h3>Revenue</h3>
              <div id='chart'>
                {/* <ApexCharts
                  options={state1.options}
                  series={donutChart}
                  type='donut'
                  height={315}
                /> */}
                <RevenueChart  />
              </div>
            </div>
          </div>
        </div>

        <div className='grph-crd'>
          <div className='table-responsive order-table'>
            <h3>Overview Groups</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Profit</th>
                  <th>End Date</th>
                </tr>
              </thead>

              <tbody>
                {dashBoardData?.group.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.total_items} stk</td>
                    <td>kr {item?.total_amount},-</td>
                    <td>{item?.end_date}</td>
                  </tr>
                ))}

                {/* Total row */}
                <tr>
                  <td></td>
                  <td>
                    <b>Total</b>
                  </td>
                  <td>
                    <b>
                      {dashBoardData?.group.reduce(
                        (sum, item) => sum + (item?.total_items || 0),
                        0
                      )}{" "}
                      stk
                    </b>
                  </td>
                  <td>
                    <b>
                      kr{" "}
                      {dashBoardData?.group.reduce(
                        (sum, item) => sum + (item?.total_amount || 0),
                        0
                      )}
                      ,-
                    </b>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
