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

const page = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrent] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchQuery, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [userData, setUserData] = useState({});

  const fetchCustomers = async () => {
    try {
      const options = {
        per_page: 10,
        page: currentPage,
        searchQuery: searchQuery,
      };
      const res = await GET(`${BASE_URL}/api/admin/customerList`, options);

      if (res?.data?.status) {
        setCustomers(res.data?.data);
        setPagination(res.data?.pagination);
      }
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const onPageChange = (selected) => {
    setCurrent(selected);
  };

  useEffect(() => {
    fetchCustomers();
    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, [searchQuery, currentPage]);

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

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>Customers</h2>
          <div className='search-frm'>
            <Link href={"/createcustomer"}>
              <img src='/images/add-plus.svg' />
            </Link>
            <input
              type='text'
              placeholder='Search customers'
              value={searchQuery}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Link href={"/"}>
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
        <div className='shdw-crd'>
          <div className='table-responsive order-table'>
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type='checkbox'
                      checked={selectedCustomers.length === customers.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Added</th>
                  <th>Dugnadsgroup</th>
                  <th>Contact person</th>
                  <th>Email address</th>
                  <th>Telephone</th>
                  <th>Status</th>
                  <th>Lead</th>
                  <th>Last log</th>
                  <th>Last contact</th>
                  <th>Seller</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {customers.length
                  ? customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <input
                            type='checkbox'
                            checked={selectedCustomers.includes(customer.id)}
                            onChange={() => handleSelectCustomer(customer.id)}
                          />
                        </td>
                        <td>{customer?.id || "N/A"}</td>
                        <td>{customer?.name || "N/A"}</td>
                        <td>{customer?.createdAt || "N/A"}</td>
                        <td>{customer?.DugnadsGroup || "N/A"}</td>
                        <td>{customer?.contactPerson || "N/A"}</td>
                        <td>{customer?.email || "N/A"}</td>
                        <td>{customer?.phone || "N/A"}</td>
                        <td>
                          <button className='status'>Created</button>
                        </td>
                        <td>
                          <button className='status cold'>Cold</button>
                        </td>
                        <td>{customer?.lastLog || "N/A"}</td>
                        <td>{customer?.lastContact || "N/A"}</td>
                        <td>{customer?.sellerName || "N/A"}</td>
                        <td>
                          <Link href={`/kunderdetail/${customer?.id}`}>
                            <img src='/images/added-us.svg' />
                          </Link>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <div className='tablebruk'>
          <div className='tablebruk_left'>
            <select
              className='form-select'
              value={action}
              onChange={(e) => {
                setAction(e.target.value);
              }}
            >
              <option value={""}>Mass action</option>
              <option value={"delete"}>Delete</option>
            </select>
            {action && (
              <button
                className='crte-userd Confirm_btn'
                onClick={handleMassAction}
              >
                Confirm
              </button>
            )}
          </div>
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
          />
        </div>
      </div>
    </>
  );
};

export default page;
