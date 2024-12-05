"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";

const page = () => {
  const [currentPage, setCurrent] = useState(1);
  const [pagination, setPagination] = useState();
  const [products, setProducts] = useState([]);
  const fetchProductList = async () => {
    try {
      const options = {
        per_page: 10,
        page: currentPage,
      };

      const res = await GET(`${BASE_URL}/api/admin/Productlist`, options);
      console.log(res.data);
      if (res?.data?.status == "true") {
        setPagination(res.data?.pagination);
        setProducts(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPageChange = ({ selected }) => {
    console.log(selected);
    setCurrent(selected + 1);
  };
  useEffect(() => {
    fetchProductList();
  }, [currentPage]);

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>Products</h2>
          <div className='search-frm'>
            <Link href={"/createproduct"}>
              <img src='/images/add-plus.svg' />
            </Link>
            <input
              type='text'
              placeholder='Sok i order'
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
                  <th>Product #</th>
                  <th>Image</th>
                  <th>Product name</th>
                  <th>Location</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Sub category</th>
                  <th>Created</th>
                  <th>View</th>
                  <th>
                    <Link href='/'>
                      <img src='/images/fltres.svg' />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length &&
                  products.map((product) => {
                    return (
                      <tr>
                        <td>
                          <input type='checkbox' />
                        </td>
                        <td>{product?.product_number}</td>
                        <td>
                          <div className='produt-tile'>
                            <img
                              className='product-img img-fluid'
                              src={product?.image}
                              onError={(e) =>
                                (e.target.src = "/images/product.png")
                              }
                            />
                          </div>
                        </td>
                        <td>{product?.name}</td>
                        <td>{product?.wareHouseLocation || "N/A"}</td>
                        <td>{product?.quantity || "N/A"} stk</td>
                        <td>{product?.price || "N/A"}</td>
                        <td>
                          <button
                            className={`status ${
                              product?.product_status == 1
                                ? "green-clr"
                                : "yellow"
                            }`}
                          >
                            {product?.product_status == 1
                              ? "Published"
                              : "Unpublished"}
                          </button>
                        </td>
                        <td>{product?.category || "N/A"}</td>
                        <td>{product?.subCategory || "N/A"}</td>
                        <td>{product?.createdAt || "N/A"}</td>
                        <td>
                          <Link href={"/produkter"}>
                            <img src='/images/prdctes.svg' />
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

          {/* <ul className='pgnatne'>
            <li>Showing 15 of 1154 elements</li>
            <li>
              <Link href={"/"}>
                <img src='/images/frst-aro.svg' />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <img src='/images/revrse.svg' />
              </Link>
            </li>
            <li>1 of 42</li>
            <li>
              <Link href={"/"}>
                <img src='/images/nxt-aro.svg' />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <img src='/images/lstpge-aro.svg' />
              </Link>
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default page;
