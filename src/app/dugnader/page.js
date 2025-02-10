"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET, POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";
import Paginate from "../Utils/Paginate";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../Components/SkeletonLoader";
import DugnaderFilterModal from "../modals/dugnaderFilterModel";

const Page = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrent] = useState(1);
    const [pagination, setPagination] = useState();
    const [groupDataListing, setGroupDataListing] = useState();
    const [userData, setUserData] = useState({});
    const [selectedEndDate, setSelectedEndDate] = useState(""); // State for selected end date
    const [selectedStatus, setSelectedStatus] = useState([]); // State for selected status
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearch] = useState("");
    const [selectedSort, setSelectedSort] = useState(""); 
    const [selectedSeller, setSelectedSeller] = useState("");
    const [selectedLead, setSelectedLead] = useState(""); 
    const [pageSize, setPageSize] = useState(10);
    const [sellers, setSellers] = useState([]); 
    const [showFilterModal, setShowFilterModal] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Create the payload with filters
            const payload = {
                per_page: pageSize,
                page: currentPage,
                end_date: selectedEndDate, // Include selected end date
                status: selectedStatus, // Include selected status
                searchQuery: searchQuery,
                filters: {
                    order_status: selectedStatus == 'active' ? "1" : selectedStatus == 'inactive' ?  "0" : "",
                    seller_id: selectedSeller,
                    sort_status: selectedSort === "asc" ? "0" : "1", 
                },
            };

            // Make the POST request to the API
            const response = await POST(`${BASE_URL}/api/admin/groupDataListing`, payload);

            console.log(response?.data?.data);
            setPagination(response.data?.pagination);
            setGroupDataListing(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

      useEffect(() => {
        const fetchSellers = async () => {
          try {
            const res = await GET(`${BASE_URL}/api/admin/orderSellerList`); 
            if (res?.data?.status) {
              setSellers(res.data.data); 
            } else {
              toast.error(res.data.message);
            }
          } catch (error) {
            console.error("Error fetching sellers:", error);
          }
        };
    
        fetchSellers();
      }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500); 

        return () => {
            clearTimeout(timer); // Cleanup previous timeout if searchQuery changes
        };
    }, [searchQuery, selectedSeller, selectedSort, selectedStatus]); // Trigger on searchQuery or selected filters change

    useEffect(() => {
        fetchData();

        const userDetails = JSON.parse(Cookies.get("user"));
        setUserData(userDetails);
    }, [currentPage, selectedEndDate, selectedStatus, pageSize]);

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
                            <h2>{t("dugnader.dugnader")}</h2>
                            <div className='filter-container'>
                                <div className='search-frm'>
                                    <input
                                        type='text'
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        placeholder={t("dugnader.search")}
                                    />
                                    <img
                                        src='/images/filter-ion-header.svg' // Add your filter icon here
                                        onClick={() => setShowFilterModal(true)}
                                        alt='Filter'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='shdw-crd'>
                            <div className='table-responsive order-table'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{t("dugnader.start_date")}</th>
                                            <th>{t("dugnader.end_date")}</th>
                                            <th>{t("dugnader.dugnadsgroup")}</th>
                                            <th>{t("dugnader.sellers")}</th>
                                            <th>{t("dugnader.active")}</th>
                                            <th>{t("dugnader.packs")}</th>
                                            <th>{t("dugnader.aps")}</th>
                                            <th>{t("dugnader.turnover")}</th>
                                            <th>{t("dugnader.profit")}</th>
                                            <th>{t("dugnader.status")}</th>
                                            <th>{t("dugnader.contact_person")}</th>
                                            <th>{t("dugnader.contact")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupDataListing?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.start_date}</td>
                                                <td>{item?.end_date}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.number_of_seller}</td>
                                                <td>{item?.active_seller}/{item?.number_of_seller}</td>
                                                <td>{item?.packs}</td>
                                                <td>{item?.aps}</td>
                                                <td>kr {item?.turnover}</td>
                                                <td>kr {item?.profit}</td>
                                                <td>
                                                    <button className={`status ${item?.status === 0 ? "green-clr" : "red-clr"}`}>
                                                        {item?.status === 0 ? t("dugnader.active") : t("dugnader.inactive")}
                                                    </button>
                                                </td>
                                                <td>{item?.contact_person}</td>
                                                <td>{item?.contact}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='tablebruk justify-content-end'>
                            <select
                                className='form-select'
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value)); // Update page size
                                    setCurrent(1); // Reset to the first page when page size changes
                                }}
                            >
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>

                            <Paginate
                                currentPage={currentPage}
                                totalPages={pagination?.totalPages}
                                onPageChange={onPageChange}
                                paginationData={pagination}
                            />
                        </div>

                        <DugnaderFilterModal
                        show={showFilterModal}
                        isOpen={showFilterModal}
                        onClose={() => setShowFilterModal(false)}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        selectedSeller={selectedSeller}
                        setSelectedSeller={setSelectedSeller}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                        sellers={sellers}
                    />
                    </>
                )}
            </div>
        </>
    );
};

export default Page;