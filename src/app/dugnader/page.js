"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";
import Paginate from "../Utils/Paginate";
import Cookies from "js-cookie";

const page = () => {
  const [currentPage, setCurrent] = useState(1);
  const [pagination, setPagination] = useState();
  const [groupDataListing, setGroupDataListing] = useState();
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    try {
      const response = await GET(`${BASE_URL}/api/admin/groupDataListing`);

      console.log(response?.data?.data);
      setPagination(response.data?.pagination);
      setGroupDataListing(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, [currentPage]);

  const onPageChange = (selected) => {
    setCurrent(selected);
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>Dugnader</h2>
          <div className='search-frm'>
            <input
              type='text'
              placeholder='Sok i order'
            />
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={`/useredit/${userData?.id}`}>
              <img
                className='object-fit-cover rounded-circle'
                style={{ width: "41px", height:"41px" }}
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
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Dugnadsgroup</th>
                  <th>Sellers</th>
                  <th>Active</th>
                  <th>Packs</th>
                  <th>APS</th>
                  <th>Turnover</th>
                  <th>Profit</th>
                  <th>Status</th>

                  <th>Contact person</th>
                  <th>Seller</th>
                  <th>Contact</th>
                  <th>
                    <Link href='/'>
                      <img src='/images/fltres.svg' />
                    </Link>
                  </th>
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
                    <td>{item?.turnover}</td>
                    <td>{item?.profit}</td>
                    <td>
                      <button className='status green-clr'>
                        {item?.status === 1 ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td>{item?.contact_person}</td>
                    <td>{item?.seller}</td>
                    <td>{item?.contact}</td>
                    <td>{item?.contact}</td>
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
      </div>
    </>
  );
};

export default page;
