"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const page = () => {
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState({});
  const [userData, setUserData] = useState({});

  const fetchStatistics = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/statistics`);
      if (res?.data?.status) {
        setStatistics(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, []);

  const verticalBarChartOptions = (themeColors, dates) => ({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false, // Hides the toolbar including download icons
      },
    },
    colors: ["#FD5A59"], // Single color for bars
    plotOptions: {
      bar: {
        borderRadius: 2, // Rounded edges on bars
        columnWidth: "30%", // Width of bars
        endingShape: "rounded", // Rounded ends
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels inside bars
    },
    xaxis: {
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
      ],
      labels: {
        style: {
          colors: "#000", // Apply text color to x-axis labels
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#000", // Apply text color to y-axis labels
        },
      },
    },
    title: {
      text: "Closing Date",
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#000", // Apply text color to chart title
      },
    },
    grid: {
      show: true, // Hide grid lines
    },
    tooltip: {
      theme: "dark",
    },
  });
  const [verticalBarChartSeries, setVerticalBars] = useState([
    {
      name: "Active Users",
      data: [2, 5, 8, 7, 5, 4, 3, 5, 7, 8, 9, 10, 2, 3],
    },
  ]);

  const Series = [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false, // Hides the toolbar including download icons
      },
    },
    colors: ["#FFC3C2", "#FD5A59"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        borderRadius: 2,
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      show: false,
      // title: {
      //   text: '$ (thousands)'
      // }
    },
    title: {
      text: "Completed Dugnader",
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#000", // Apply text color to chart title
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return "$ " + val + " thousands"
      //   }
      // }
    },
  };

  const seriess = [60, 40];
  const options1 = {
    chart: {
      width: 380,
      type: "pie",
    },
    legend: {
      show: false,
    },
    colors: ["#FFC3C2", "#FD5A59"],
    labels: ["Team A", "Team B"],
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
  };

  const Series3 = [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58],
    },
    {
      name: "Revenue",
      data: [76, 85, 85, 48, 80, 55],
    },
  ];
  const options3 = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: false, // Hides the toolbar including download icons
      },
    },
    colors: ["#FFC3C2", "#FD5A59"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        borderRadius: 2,
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yaxis: {
      show: false,
      // title: {
      //   text: '$ (thousands)'
      // }
    },
    title: {
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#000", // Apply text color to chart title
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return "$ " + val + " thousands"
      //   }
      // }
    },
  };
  return (
    <>
      <Sidebar />
      <div className='detail-admin-main statistics-mne'>
        <div className='admin-header'>
          <h2>
            {t("statistics.statistics")}{" "}
            <Link href={"/"}>
              <img src='/images/linkhed.svg' />
            </Link>
          </h2>
          <div className='filter_date'>
            {t("statistics.from")}{" "}
            <input
              type='Date'
              placeholder='Year to date'
            ></input>{" "}
            {t("statistics.to")}{" "}
            <input
              type='Date'
              placeholder='Year to date'
            ></input>
          </div>
          <div className='search-frm'>
            <input
              type='text'
              // placeholder='Sok i order'
            />
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={`/useredit/${userData?.id}`}>
              <img
                className='object-fit-cover rounded-circle'
                style={{ width: "41px", height: "41px" }}
                src={userData?.profile_image}
                onError={(e) => {
                  e.target.src = "/images/avatar-style.png";
                }}
              />
            </Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3 '>
            <div className='dash-crde pinks-cr'>
              {/* <p>Number of active groups</p> */}
              <p>{t("statistics.number_of_active_groups")}</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{statistics?.number_of_group}</h2>
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
              {/* <p>Number of active sellers</p> */}
              <p>{t("statistics.number_of_active_sellers")}</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{statistics?.number_of_active_seller}</h2>
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
          <div className='col-md-2'>
            <div className='dash-crde blue-cr'>
              {/* <p>Number of Packages Sold</p> */}
              <p>{t("statistics.number_of_packages_sold")}</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{statistics?.number_of_packages_sold}</h2>
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
          <div className='col-md-2'>
            <div className='dash-crde rde-cr'>
              {/* <p>Number of Packages Not Delivered</p> */}
              <p>{t("statistics.number_of_packages_not_delivered")}</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{statistics?.number_of_packages_not_delivered}</h2>
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
          <div className='col-md-2'>
            <div className='dash-crde rde-cr'>
              {/* <p>New orders</p> */}
              <p>{t("statistics.new_orders")}</p>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{statistics?.new_order}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mb-4'>
            <div className='grph-crd'>
              <Form.Select aria-label='Default select example'>
                <option>14 Days</option>
                <option value='1'>7 Days</option>
                <option value='2'>10 Days</option>
                <option value='3'>10 Days</option>
              </Form.Select>
              <ApexCharts
                options={verticalBarChartOptions()}
                series={verticalBarChartSeries}
                type='bar'
                height={300}
              />
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='grph-crd'>
              <input type='Date'></input>
              <ApexCharts
                options={options}
                series={Series}
                type='bar'
                height={300}
              />
              <div className='grafh_footer'>
                <div className='leftSalesperson'>
                  <div className='left_side'>
                    <span className=''>
                      <img src='/images/Avatar-sing.svg' />
                    </span>
                    <div className='text_bx'>
                      <h3>Salesperson</h3>
                      <p>Number of completed dugnader</p>
                    </div>
                  </div>
                  <div className='count_num'>15</div>
                </div>
                <div className='leftSalesperson'>
                  <div className='left_side'>
                    <span className=''>
                      <img src='/images/Avatargrup.svg' />
                    </span>
                    <div className='text_bx'>
                      <h3>Group</h3>
                      <p>Number of completed dugnader</p>
                    </div>
                  </div>
                  <div className='count_num'>89</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-5 mb-4'>
            <div className='grph-crd'>
              <div className='table-responsive order-table '>
                {/* <h3>Top Products</h3> */}
                <h3>{t("statistics.top_products")}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      {/* <th>Name</th> */}
                      <th>{t("statistics.name")}</th>
                      {/* <th>Of available stock</th> */}
                      <th>{t("statistics.of_available_stock")}</th>
                      {/* <th className='text-end'>Sales</th> */}
                      <th className='text-end'>{t("statistics.sales")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statistics?.topProducts?.length &&
                      statistics?.topProducts?.map((product, i) => {
                        return (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                              <div className='progress progress-ble'>
                                <div
                                  className='progress-bar w-75 bdy-crd'
                                  role='progressbar'
                                  aria-valuenow={90 / (i + 1)}
                                  aria-valuemin='0'
                                  aria-valuemax='100'
                                ></div>
                              </div>
                            </td>
                            <td className='text-end'>
                              <div className='bdy-sale'>
                                {Math.floor(80 / (i + 1))}%
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    {/* <tr>
                      <td>1</td>
                      <td>BIRTHDAY CARDS</td>
                      <td>
                        <div className='progress progress-ble'>
                          <div
                            className='progress-bar w-75 bdy-crd'
                            role='progressbar'
                            aria-valuenow='75'
                            aria-valuemin='0'
                            aria-valuemax='100'
                          ></div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='bdy-sale'>45%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>ANLEDNINGSKORT</td>
                      <td>
                        <div className='progress progress-grn'>
                          <div
                            className='progress-bar w-50 all-endys'
                            role='progressbar'
                            aria-valuenow='40'
                            aria-valuemin='0'
                            aria-valuemax='100'
                          ></div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='allend-sale'>29%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>EVENT CARDS #2</td>
                      <td>
                        <div className='progress progress-prpl'>
                          <div
                            className='progress-bar w-25 evnt-crds'
                            role='progressbar'
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                          ></div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='evnt-crds-sale'>18%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>EVENT CARDS #2</td>
                      <td>
                        <div className='progress progress-rde'>
                          <div
                            className='progress-bar w-25 till-fra'
                            role='progressbar'
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                          ></div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='till-fra-sale'>18%</div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='col-md-3 mb-4'>
            <div className='grph-crd '>
              <input type='Date'></input>
              {/* <h3>Budget</h3> */}
              <h3>{t("statistics.budget")}</h3>
              <ApexCharts
                options={options1}
                series={seriess}
                type='pie'
                height={250}
              />
            </div>
          </div>
          <div className='col-md-4  mb-4'>
            <div className='grph-crd'>
              <h3>
                {t("statistics.sales_against_budget")}{" "}
                <Link href='/'>
                  <img src='/images/question-mark.svg' />
                </Link>
              </h3>
              <ApexCharts
                options={options3}
                series={Series3}
                type='bar'
                height={250}
              />
              <div className='botm-box-slas-bug'>
                <div className='left-sal'>
                  <span className='dout-inc'></span>
                  <div>
                    <h2>Sales</h2>
                    <p>330 000</p>
                  </div>
                </div>
                <div className='shape-arrow'></div>
                <div className='left-sal right-disx'>
                  <span className='dout-inc'></span>
                  <div>
                    <h2>Budget</h2>
                    <p>550 000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
