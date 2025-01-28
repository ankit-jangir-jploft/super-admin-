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
  const [verticalBarChartSeries, setVerticalBars] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [days, setDays] = useState("14");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMonths, setSelectedMonths] = useState("");
  const [seriess, setSeries] = useState([0, 0]); // Initial data for the pie chart
  const [labels, setLabels] = useState([]);
  const [series3, setSeries3] = useState([]);
  const [options3, setOptions3] = useState({});
  const [salesTotal, setSalesTotal] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleMonthsChange = (event) => {
    setSelectedMonths(event.target.value);
    fetchBudgetData(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const fetchSalesAndBudgetData = async () => {
    try {
      const res = await GET(
        `${BASE_URL}/api/admin/statisticsSalesAgainstBudget`
      ); // Adjust the endpoint as needed
      if (res?.data?.status) {
        const { salesTotal, budgetTotal, categories, sales, budget } =
          res.data.data;
        setSalesTotal(salesTotal);
        setBudgetTotal(budgetTotal);

        // Update series data for the chart
        setSeries3([
          {
            name: t("statistics.sales"),
            data: sales,
          },
          {
            name: t("statistics.budget"),
            data: budget,
          },
        ]);

        // Update chart options
        setOptions3({
          chart: {
            type: "bar",
            height: 250,
            toolbar: {
              show: false,
            },
          },
          colors: ["#FFC3C2", "#FD5A59"],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "80%",
              endingShape: "rounded",
              borderRadius: 2,
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
            categories: categories, // Use categories from the API response
          },
          yaxis: {
            show: false,
          },
          title: {
            align: "left",
            style: {
              fontSize: "20px",
              fontWeight: "600",
              color: "#000",
            },
          },
          grid: {
            show: false,
          },
          legend: {
            show: false,
          },
          fill: {
            opacity: 1,
          },
          tooltip: {},
        });
      }
    } catch (error) {
      console.error("Error fetching sales and budget data:", error);
    }
  };

  const fetchStatistics = async (start, end) => {
    try {
      const res = await GET(
        `${BASE_URL}/api/admin/statistics?start_date=${start}&end_date=${end}`
      );
      if (res?.data?.status) {
        setStatistics(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    fetchStatistics(event.target.value, endDate); // Fetch with updated start date
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    fetchStatistics(startDate, event.target.value); // Fetch with updated end date
  };

  const fetchClosingDateData = async () => {
    try {
      const res = await GET(
        `${BASE_URL}/api/admin/statisticsCloseDate?filter=${days}`
      );
      if (res?.data?.status) {
        const { dates, activeUsers } = res.data.data;
        setVerticalBars([
          {
            name:  (t("statistics.active_users")),
            data: activeUsers,
          },
        ]);
        setChartOptions(verticalBarChartOptions(dates));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBudgetData = async (month) => {
    try {
      const res = await GET(
        `${BASE_URL}/api/admin/statisticsBudget?month=${month}`
      );
      if (res?.data?.status) {
        const { budget, labels } = res.data.data;
        setSeries(budget); // Update series data
        setLabels(labels); // Update labels
      }
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    fetchSalesAndBudgetData();
  }, []);

  // Effect to fetch current month's data on component mount
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().slice(0, 7); // Format: YYYY-MM
    setSelectedMonths(currentMonth); // Set the selected month state
    fetchBudgetData(currentMonth); // Fetch data for the current month
  }, []);

  useEffect(() => {
    fetchClosingDateData();
  }, [days]);

  useEffect(() => {
    fetchStatistics(startDate, endDate);
    // const userDetails = JSON.parse(Cookies.get("user"));
    // setUserData(userDetails);
  }, []);

  const verticalBarChartOptions = (dates) => ({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ["#FD5A59"],
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "30%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: dates.map((date) => date.toString()), // Convert numbers to strings for categories
      labels: {
        style: {
          colors: "#000",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#000",
        },
      },
    },
    title: {
      text: "Closing Date",
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#000",
      },
    },
    grid: {
      show: true,
    },
    tooltip: {
      theme: "dark",
    },
  });

  const Series = [
    {
      name: (t("statistics.not_profit")),
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: (t("statistics.revenue")),
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
        t("dashboard.feb"),
        t("dashboard.mar"),
        t("dashboard.apr"),
        t("dashboard.may"),
        t("dashboard.jun"),
        t("dashboard.jul"),
        t("dashboard.aug"),
        t("dashboard.sep"),
        t("dashboard.oct"),
      ],
    },
    yaxis: {
      show: false,
      // title: {
      //   text: '$ (thousands)'
      // }
    },
    title: {
      text: t("statistics.completed_dugnader"),
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

  const options1 = {
    chart: {
      width: 380,
      type: "pie",
    },
    legend: {
      show: false,
    },
    colors: ["#FFC3C2", "#FD5A59"],
    labels: labels, // Use dynamic labels
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
      name: (t("statistics.not_profit")),
      data: [44, 55, 57, 56, 61, 58],
    },
    {
      name: (t("statistics.revenue")),
      data: [76, 85, 85, 48, 80, 55],
    },
  ];

  return (
    <>
      {/* <Sidebar /> */}
      <div className='detail-admin-main-cp statistics-mne'>
        {/* <div className='admin-header'>
          <h2>
            {t("statistics.statistics")}{" "}
            <Link href={"/"}>
              <img src='/images/linkhed.svg' />
            </Link>
          </h2>
          <div>
            <div className='filter_date'>
              {t("statistics.from")}{" "}
              <input
                type='date'
                value={startDate}
                onChange={handleStartDateChange}
                placeholder='Year to date'
              />{" "}
              {t("statistics.to")}{" "}
              <input
                type='date'
                value={endDate}
                onChange={handleEndDateChange}
                placeholder='Year to date'
              />
            </div>
          </div>
        </div> */}
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
              <Form.Select
                aria-label='Default select example'
                onChange={(e) => setDays(e.target.value)}
              >
                <option value='14'>14 {t("statistics.days")}</option>
                <option value='7'>7 {t("statistics.days")}</option>
                <option value='10'>10 {t("statistics.days")}</option>
              </Form.Select>
              <ApexCharts
                options={chartOptions}
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
                    <h3>{t("statistics.salesperson")}</h3>
                    <p>{t("statistics.number_of_completed_dugnader")}</p>
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
                    <h3>{t("statistics.groups")}</h3>
                      <p>{t("statistics.number_of_completed_dugnader")}</p>
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
            <div className='grph-crd'>
              <div className='budget-grp'>
                <h3>{t("statistics.budget")}</h3>
                <div style={{ position: "relative", marginBottom: "10px" }}>
                  <input
                    type='month'
                    value={selectedMonths}
                    onChange={handleMonthsChange}
                    style={{
                      padding: "5px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                    required
                  />
                  <label
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "8px",
                      color: selectedMonth ? "#000" : "#aaa",
                      transition: "0.2s",
                      pointerEvents: "none",
                      fontSize: "14px",
                    }}
                  ></label>
                </div>
              </div>

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
                  <img
                    src='/images/question-mark.svg'
                    alt='Help'
                  />
                </Link>
              </h3>
              <ApexCharts
                options={options3}
                series={series3}
                type='bar'
                height={250}
              />
              <div className='botm-box-slas-bug'>
                <div className='left-sal'>
                  <span className='dout-inc'></span>
                  <div>
                    <h2>Sales</h2>
                    <p>{salesTotal.toLocaleString()}</p>{" "}
                    {/* Format number with commas */}
                  </div>
                </div>
                <div className='shape-arrow'></div>
                <div className='left-sal right-disx'>
                  <span className='dout-inc'></span>
                  <div>
                    <h2>Budget</h2>
                    <p>{budgetTotal.toLocaleString()}</p>{" "}
                    {/* Format number with commas */}
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
