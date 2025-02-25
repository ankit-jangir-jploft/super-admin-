"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET, POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import Paginate from "../Utils/Paginate";
import Cookies from "js-cookie";
import CreateLeadModal from "../modals/leadChange";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../Components/SkeletonLoader";
import CustomerStatusModal from "../modals/customerstatuschange";
import KunderFilterModal from "../modals/kunderFilterModel";

const page = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrent] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchQuery, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [userData, setUserData] = useState({});
  const [roleType, setRoleType] = useState();
  const [showCreateLead, setShowLead] = useState(false);
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [leadUserId, setLeadUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [currentLead, setCurrentLead] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [selectedSeller, setSelectedSeller] = useState(""); // State for selected seller
  const [selectedSort, setSelectedSort] = useState(""); // State for selected seller
  const [selectedLead, setSelectedLead] = useState(""); // State for selected lead
  const [selectedContact, setSelectedContact] = useState(""); // State for selected contact
  const [sellers, setSellers] = useState([]); // State to store sellers
  const [pageSize, setPageSize] = useState(10);
   const [showFilterModal, setShowFilterModal] = useState(false);
   const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    setRoleType(Cookies.get("roleType"));
  }, []);

  // Fetch customers with debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(timer); // Cleanup previous timeout if searchQuery changes
    };
  }, [currentPage, searchQuery, selectedStatus, selectedSeller, selectedLead, selectedContact, selectedSort, pageSize]);
  
  
  useEffect(() => {
    setCurrent(1); // Reset to first page
  }, [searchQuery, selectedStatus, selectedSeller, selectedLead, selectedSort, pageSize]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await GET(`${BASE_URL}/api/admin/orderSellerList`); // Adjust the endpoint as necessary
        if (res?.data?.status) {
          setSellers(res.data.data); // Set the sellers state
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []); // Fetch sellers on mount

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const payload = {
        page: currentPage,
        per_page: pageSize,
        searchQuery: searchQuery,
        filters: {
          order_status: selectedStatus,
          lead_status: selectedLead,
          seller_id: selectedSeller,
          sort_status: selectedSort == "asc" ? "0" : "1" 
        },
      };
      console.log("payload", payload)
      const res = await POST(`${BASE_URL}/api/admin/customerList`, payload);
      if (res?.data?.status) {
        setCustomers(res.data?.data);
        setPagination(res.data?.pagination);
      }
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
    setLoading(false);
  };

  const onPageChange = (selected) => {
    setCurrent(selected);
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map((customer) => customer.id));
    }
  };

  const handleMassAction = async () => {
    try {
      if (!selectedCustomers.length) {
        toast.dismiss();
        toast.error("Please select customers to perform the action!");
        return;
      }

      const payload = {
        action: action,
        id: selectedCustomers,
      };

      const res = await POST(`${BASE_URL}/api/admin/customerStatus`, payload);

      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res.data.message);
        setSelectedCustomers([]);
        fetchCustomers();
        setAction("");
      } else {
        toast.dismiss();
        toast.error("Failed to perform the action!");
      }
    } catch (error) {
      console.log("Error performing mass action:", error);
    }
  };

  const customerStatus = {
    Created: {
      value: t("customer_status.created"),
      style: "created",
    },
    "Ordered trial package": {
      value: t("customer_status.ordered_trial_package"),
      style: "ordered_trial_package",
    },
    "Started dugnad": {
      value: t("customer_status.started_dugnad"),
      style: "started_dugnad",
    },
    "Finished dugnad": {
      value: t("customer_status.finished_dugnad"),
      style: "finished",
    },
    "Not started": {
      value: t("customer_status.not_started"),
      style: "not_started",
    },
  };

  const leadStatus = {
    None: {
      value: t("lead_option.none"),
      style: "",
    },
    Warm: {
      value: t("lead_option.warm"),
      style: "warm",
    },
    Cold: {
      value: t("lead_option.cold"),
      style: "cold",
    },
    Luke: {
      value: t("lead_option.luke"),
      style: "luke",
    },
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
              {/* <h2>Customers</h2> */}
              <h2>{t("customers.customers")}</h2>
              {/* <div className='search-frm'>

                <select
                  className="form-select"
                  value={selectedSeller}
                  onChange={(e) => {
                    setSelectedSeller(e.target.value);
                  }}
                >
                  <option value="">{t("kunder.select_seller")}</option>
                  {sellers.map((seller) => (
                    <option key={seller.id} value={seller.seller_id}>
                      {seller.name}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  value={selectedLead}
                  onChange={(e) => {
                    setSelectedLead(e.target.value);
                  }}
                >
                  <option value="">{t("kunder.select_lead")}</option>
                  <option value="None">{t("lead_option.none")}</option>
                  <option value="Warm">{t("lead_option.warm")}</option>
                  <option value="Cold">{t("lead_option.cold")}</option>
                  <option value="Luke">{t("lead_option.luke")}</option>
                </select>
                <input
                  type='text'
                  value={selectedContact}
                  onChange={(e) => setSelectedContact(e.target.value)}
                  placeholder={t("kunder.contact")}
                />
              </div> */}
              <div className='search-frm'>
                {roleType !== "guest" && (
                  <Link href={"/createcustomer"}>
                    <img src='/images/add-plus.svg' />
                  </Link>
                )}
                <input
                  type='text'
                  // placeholder='Search'
                  value={searchQuery}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                <img
                  src='/images/filter-ion-header.svg' // Add your filter icon here
                  onClick={() => setShowFilterModal(true)}
                  alt='Filter'
                />
                {/* <Link href={""}>
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
                </Link> */}
              </div>
            </div>
            <div className='shdw-crd'>
              <div className='table-responsive order-table'>
                <table>
                  <thead>
                    <tr>
                      <th>{t("customers.mark")}</th>
                      {/* <th>ID</th> */}
                      <th>{t("customers.id")}</th>
                      {/* <th>Name</th> */}
                      <th>{t("customers.name")}</th>
                      {/* <th>Added</th> */}
                      <th>{t("customers.added")}</th>
                      {/* <th>Dugnadsgroup</th> */}
                      <th>{t("customers.dugnadsgroup")}</th>
                      {/* <th>Contact person</th> */}
                      <th>{t("customers.contact_person")}</th>
                      {/* <th>Email address</th> */}
                      <th>{t("customers.email_address")}</th>
                      {/* <th>Telephone</th> */}
                      <th>{t("customers.telephone")}</th>
                      {/* <th>Status</th> */}
                      <th>{t("customers.status")}</th>
                      {/* <th>Lead</th> */}
                      <th>{t("customers.lead")}</th>
                      {/* <th>Last log</th> */}
                      <th>{t("customers.last_log")}</th>
                      {/* <th>Last contact</th> */}
                      <th>{t("customers.last_contact")}</th>
                      {/* <th>Seller</th> */}
                      <th>{t("customers.seller")}</th>
                      {/* <th>View</th> */}
                      <th>{t("customers.view")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(customers?.length &&
                      customers?.map((customer) => (
                        <tr key={customer.id}>
                          <td>
                            <input
                              type='checkbox'
                              checked={selectedCustomers.includes(customer.id)}
                              onChange={() => handleSelectCustomer(customer.id)}
                            />
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/kunderdetail/${customer?.id}`)
                            }
                          >
                            {customer?.id || "N/A"}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/kunderdetail/${customer?.id}`)
                            }
                          >
                            {customer?.name || "N/A"}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/kunderdetail/${customer?.id}`)
                            }
                          >
                            {customer?.createdAt || "N/A"}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/kunderdetail/${customer?.id}`)
                            }
                          >
                            {customer?.lastPurchaseDetails?.group_name || "N/A"}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/kunderdetail/${customer?.id}`)
                            }
                          >
                            {customer?.contactPerson || "N/A"}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/kunderdetail/${customer?.id}`)
                            }
                          >
                            <a
                              href=''
                              className='underline'
                            >
                              {customer?.email || "N/A"}
                            </a>
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/kunderdetail/${customer?.id}`)
                            }
                          >
                            <span style={{ color: "gray" }}>
                              {customer?.countryCode}{" "}
                            </span>{" "}
                            {customer?.phone || "N/A"}
                          </td>
                          <td>
                            <button
                              className={`status ${customerStatus[customer?.customer_status]?.style
                                }`}
                              onClick={() => {
                                setShowStatusChange(true);
                                setLeadUserId(customer.id);
                                setOrderId(customer?.order_id);
                                setCurrentStatus(customer?.customer_status);
                                console.log("customer?.order_id", customer);
                              }}
                            >
                              {customerStatus[customer?.customer_status]?.value}
                            </button>
                          </td>
                          <td
                            onClick={() => {
                              setShowLead(true);
                              setLeadUserId(customer.id);
                              setCurrentLead(customer?.lead_status);
                            }}
                          >
                            <button
                              className={`status ${customer?.lead_status}`}
                            >
                              {leadStatus[customer?.lead_status]?.value}
                            </button>
                          </td>
                          <td>{customer?.lastLog || "N/A"}</td>
                          <td>
                            {customer?.lastPurchaseDetails?.phone || "N/A"}
                          </td>
                          <td>
                            {customer?.lastPurchaseDetails?.seller_name ||
                              "N/A"}
                          </td>
                          <td>
                            <Link href={`/kunderdetail/${customer?.id}`}>
                              <img src='/images/added-us.svg' />
                            </Link>
                          </td>
                        </tr>
                      ))) || (
                        <tr>
                          <th
                            className='text-center'
                            colSpan={15}
                          >
                            {t("customers.no_record")}
                          </th>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='tablebruk'>
              {roleType === "guest" ? (
                ""
              ) : (
                <div className='tablebruk_left'>
                  <select
                    className='form-select'
                    value={action}
                    onChange={(e) => {
                      setAction(e.target.value);
                    }}
                  >
                    {/* <option value={""}>Mass action</option> */}
                    <option value={""}>{t("customers.mass_action")}</option>
                    {/* <option value={"delete"}>Delete</option> */}
                    <option value={"delete"}>{t("customers.delete")}</option>
                  </select>
                  {action && (
                    <button
                      className='crte-userd Confirm_btn'
                      onClick={handleMassAction}
                    >
                      {t("confirm_delete.confirm")}
                    </button>
                  )}
                </div>

              )}

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


              {/* <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pagination?.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          /> */}
              <Paginate
                currentPage={currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
                paginationData={pagination}
              />
            </div>

            <CreateLeadModal
              id={leadUserId}
              orderId={orderId}
              isOpen={showCreateLead}
              lead={currentLead}
              onClose={() => {
                setShowLead(false);
                fetchCustomers();
              }}
            />
            
            <KunderFilterModal
              show={showFilterModal}
              isOpen={showFilterModal}
              onClose={() => setShowFilterModal(false)}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedLead={selectedLead}
              setSelectedLead={setSelectedLead}
              selectedSeller={selectedSeller}
              setSelectedSeller={setSelectedSeller}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              sellers={sellers}
            />
            <CustomerStatusModal
              id={leadUserId}
              orderId={orderId}
              isOpen={showStatusChange}
              status={currentStatus}
              onClose={() => {
                setShowStatusChange(false);
                fetchCustomers();
              }}
            />
          
          </>
        )}
      </div>
    </>
  );
};

export default page;
