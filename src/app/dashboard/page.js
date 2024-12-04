"use client";
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const page = () => {
  const state = {
    series: [
      {
        name: "High - 2013",
        data: [10, 29, 25, 36, 32, 25, 33],
      },
    ],
    options: {
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
      colors: ["#FD575A", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },

      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  const state1 = {
    series: [55, 15],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Sales", "Profit"],
      colors: ["#CDCDCD", "#FD5A59"],
      legend: {
        position: "bottom",
        itemMargin: {
          horizontal: 10, // Horizontal gap between legend items
          vertical: 5, // Vertical gap between rows of legend items (for multiple lines)
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

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>Main Dashboard</h2>
          <div className='search-frm'>
            <input
              type='text'
              placeholder='Sok i order'
            />
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={"/"}>
              <img src='/images/avatar-style.png' />
            </Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <div className='dash-crde pinks-cr'>
              <p>Number of groups</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>26</h2>
                <span>
                  +11.02%{" "}
                  <img
                    className=''
                    src='/images/ArrowRise.svg'
                  />
                </span>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='dash-crde'>
              <p>Number of sellers</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>26</h2>
                <span>
                  +0.03%{" "}
                  <img
                    className=''
                    src='/images/ArrowRise.svg'
                  />
                </span>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='dash-crde blue-cr'>
              <p>Profit</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>275.000</h2>
                <span>
                  +15.03%{" "}
                  <img
                    className=''
                    src='/images/ArrowRise.svg'
                  />
                </span>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='dash-crde rde-cr'>
              <p>No. of packages</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>4950 stk</h2>
                <span>
                  +6.08%{" "}
                  <img
                    className=''
                    src='/images/ArrowRise.svg'
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <div className='grph-crd'>
              {/* <img className='img-fluid' src="/images/sales-ananst.png" /> */}
              <div id='chart'>
                <h3>Sales Analytics</h3>
                <ApexCharts
                  options={state.options}
                  series={state.series}
                  type='line'
                  height={300}
                />
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='grph-crd'>
              {/* <img className='img-fluid' src="/images/revenue-ananst.png" /> */}
              <h3>Revenue</h3>
              <div id='chart'>
                <ApexCharts
                  options={state1.options}
                  series={state1.series}
                  type='donut'
                  height={315}
                />
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
                <tr>
                  <td>1</td>
                  <td>Gimletroll G15</td>
                  <td>15 stk</td>
                  <td>kr 1125,-</td>
                  <td>10 okt 24</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Oyestad J11</td>
                  <td>12 stk</td>
                  <td>kr 1125,-</td>
                  <td>15 okt 24</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Saltdalen 7C</td>
                  <td>11 stk</td>
                  <td>kr 1125,-</td>
                  <td>12 okt 24</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>HFK Handball</td>
                  <td>8 stk</td>
                  <td>kr 1125,-</td>
                  <td>Not set</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <b>Total</b>
                  </td>
                  <td>
                    <b>168 stk</b>
                  </td>
                  <td>
                    <b>kr 15700,-</b>
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
