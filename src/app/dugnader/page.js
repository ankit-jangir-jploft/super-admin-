"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";
import Paginate from "../Utils/Paginate";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../Components/SkeletonLoader";

const page = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrent] = useState(1);
  const [pagination, setPagination] = useState();
  const [groupDataListing, setGroupDataListing] = useState();
  const [userData, setUserData] = useState({});
  const [selectedEndDate, setSelectedEndDate] = useState(""); // State for selected end date
  const [selectedStatus, setSelectedStatus] = useState(""); // State for selected status
  const [loading, setLoading] = useState(false);
   const [searchQuery, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const options = {
        page: currentPage,
        end_date: selectedEndDate, // Include selected end date
        status: selectedStatus, // Include selected status
        searchQuery: searchQuery,
      };
  
      const response = await GET(`${BASE_URL}/api/admin/groupDataListing`, options);
  
      console.log(response?.data?.data);
      setPagination(response.data?.pagination);
      setGroupDataListing(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

   useEffect(() => {
      const timer = setTimeout(() => {
        fetchData();
      }, 500); 
  
      return () => {
        clearTimeout(timer); // Cleanup previous timeout if searchQuery changes
      };
    }, [searchQuery]);

  useEffect(() => {
    fetchData();

    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, [currentPage, selectedEndDate,  selectedStatus]);

  const onPageChange = (selected) => {
    setCurrent(selected);
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className='admin-header'>
              {/* <h2>Dugnader</h2> */}
              <h2>{t("dugnader.dugnader")}</h2>
              <div className='filter-container'>
             
              {/* <div className='search-frm mx-3'>
              <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">{t("dugnader.select_status")}</option>
                  <option value="0">{t("dugnader.active")}</option>
                  <option value="1">{t("dugnader.inactive")}</option>
                </select>
              <input
                  type='date'
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                />
                </div> */}
              
            
                <div className='search-frm'>
                <input
                  type='text'
                  // placeholder='Search'
                  value={searchQuery}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              </div>
            </div>
            <div className='shdw-crd'>
              <div className='table-responsive order-table'>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Start date</th> */}
                      <th>
                        <b>{t("dugnader.start_date")}</b>
                      </th>
                      {/* <th>End date</th> */}
                      <th>{t("dugnader.end_date")}</th>
                      {/* <th>Dugnadsgroup</th> */}
                      <th>{t("dugnader.dugnadsgroup")}</th>
                      {/* <th>Sellers</th> */}
                      <th>{t("dugnader.sellers")}</th>
                      {/* <th>Active</th> */}
                      <th>{t("dugnader.active")}</th>
                      {/* <th>Packs</th> */}
                      <th>{t("dugnader.packs")}</th>
                      {/* <th>APS</th> */}
                      <th>{t("dugnader.aps")}</th>
                      {/* <th>Turnover</th> */}
                      <th>{t("dugnader.turnover")}</th>
                      {/* <th>Profit</th> */}
                      <th>{t("dugnader.profit")}</th>
                      {/* <th>Status</th> */}
                      <th>{t("dugnader.status")}</th>
                      {/* <th>Contact person</th> */}
                      <th>{t("dugnader.contact_person")}</th>
                      {/* <th>Seller</th> */}
                      {/* <th>{t("dugnader.seller")}</th> */}
                      {/* <th>Contact</th> */}
                      <th>{t("dugnader.contact")}</th>
                      {/* <th>
                        <Link href='/'>
                          <img src='/images/fltres.svg' />
                        </Link>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {groupDataListing?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.start_date}</td>
                        <td>{item?.end_date}</td>
                        <td>{item?.name}</td>
                        <td>{item?.number_of_seller}</td>
                        <td>
                          {item?.active_seller}/{item?.number_of_seller}
                        </td>
                        <td>{item?.packs}</td>
                        <td>{item?.aps}</td>
                        <td>kr {item?.turnover}</td>
                        <td>kr {item?.profit}</td>
                        <td>
                          <button
                            className={`status ${item?.status === 0 ? "green-clr" : "red-clr"
                              }`}
                          >
                            {item?.status === 0
                              ? t("dugnader.active")
                              : t("dugnader.inactive")}
                          </button>
                        </td>

                        <td>{item?.contact_person}</td>
                        {/* <td>{item?.seller}</td> */}
                        <td>{item?.contact}</td>
                        {/* <td>{item?.contact}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='tablebruk justify-content-end'>
              {/* <select>
            <option>Mass action</option>
            <option>Mass action</option>
          </select> */}

              <Paginate
                currentPage={currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
                paginationData={pagination}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default page;
