"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";

const page = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrent] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchQuery, setSearch] = useState("");

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
    } catch (error) {}
  };

  const onPageChange = ({ selected }) => {
    setCurrent(selected + 1);
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery, currentPage]);
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
              placeholder='Sok i order'
              value={searchQuery}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {/* <img className='input-right-icon' src="/images/search-interface.svg" /> */}
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={"/"}>
              <img src='/images/avatar-style.png' />
            </Link>
          </div>
        </div>
        <div className='shdw-crd'>
          <div className='table-responsive order-table'>
            <table>
              <thead>
                <tr>
                  <th>Mark</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Added</th>
                  <th>Dugnadsgroup</th>
                  <th>Contact person</th>
                  <th>Emailaddress</th>
                  <th>Telephone</th>
                  <th>Status</th>
                  <th>Lead</th>
                  <th>Last log</th>
                  <th>Last contact</th>
                  <th>Seller</th>
                  <th>View</th>
                  <th>
                    <Link href='/'>
                      <img src='/images/fltres.svg' />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.length &&
                  customers.map((custm) => {
                    return (
                      <tr>
                        <td>
                          <input type='checkbox' />
                        </td>
                        <td>{custm?.id || "N/A"}</td>
                        <td>{custm?.name || "N/A"}</td>
                        <td>{custm?.createdAt || "N/A"}</td>
                        <td>{custm?.DugnadsGroup || "N/A"}</td>
                        <td>{custm?.contactPerson || "N/A"}</td>
                        <td>{custm?.email || "N/A"}</td>
                        <td>{custm?.phone || "N/A"}</td>
                        <td>
                          <button className='status '>Created</button>
                        </td>
                        <td>
                          <button className='status cold'>Cold</button>
                        </td>
                        <td>{custm?.lastLog || "N/A"}</td>
                        <td>{custm?.lastContact || "N/A"}</td>
                        <td>{custm?.sellerName || "N/A"}</td>
                        <td>
                          <Link href={`/kunderdetail/${custm?.id}`}>
                            <img src='/images/added-us.svg' />
                          </Link>
                        </td>
                        <td></td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='tablebruk'>
          <select>
            <option>Mass action</option>
            <option>Mass action</option>
          </select>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pagination?.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default page;
