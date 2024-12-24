"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";
import Pagination from "../Components/PaginationCustom";

const page = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const [allOrders, setOrders] = useState([]);
  const [currentPage, setCurrent] = useState(1);
  const [searchOuery, setQuery] = useState("");
  const [pagination, setPagination] = useState();

  const toggleRow = (id) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const fetchOrders = async () => {
    try {
      const options = {
        page: currentPage,
        per_page: 10,
        searchQuery: searchOuery,
      };
      const res = await GET(`${BASE_URL}/api/admin/OrderList`, options);
      if (res?.data?.status) {
        console.log(res.data.data);
        setOrders(res.data?.data);
        setPagination(res.data?.pagination);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPageChange = ({ selected }) => {
    setCurrent(selected + 1);
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchOuery]);

  const orders = {
    0: { name: "Pending", style: "green-clr" },
    1: { name: "Confirmed", style: "brown-clr" },
    2: { name: "Processing", style: "gray-clr" },
    3: { name: "Shipped", style: "blue-clr" },
    4: { name: "Delivered", style: "purple-clr" },
    5: { name: "Canceled", style: "red-clr" },
  };

  // const orders = [
  //   {
  //     id: "10321",
  //     time: "6 minutes ago",
  //     customer: "Kari Nordmann",
  //     team: "Q Iddrettslag G14",
  //     status: "Ready to picking",
  //     statusClass: "green-clr",
  //     type: "Bestillit o nettbtikk",
  //     quantity: 3,
  //     value: "Kr 450",
  //     handler: "Robert",
  //     addContactIcon: "/images/add-contc.svg",
  //     products: [
  //       {
  //         productId: "PKD9",
  //         image: "/images/product1.png",
  //         productName: "Juletrepakke #3",
  //         cost: "50",
  //         quantity: "44 stk",
  //         total: "Kr 2200",
  //       },
  //       {
  //         productId: "PKD10",
  //         image: "/images/product2.png",

  //         productName: "Juletrepakke #2",
  //         quantity: "59 stk",
  //         cost: "50",

  //         total: "Kr 2950",
  //       },
  //       {
  //         productId: "PKD11",
  //         image: "/images/product2.png",

  //         productName: "Sales Brochure",
  //         cost: "0",
  //         quantity: "14 stk",
  //         total: "Kr 0",
  //       },
  //     ],
  //   },
  //   {
  //     id: "10321",
  //     time: "30 minutes ago",
  //     customer: "Kari Nordmann",
  //     team: "Q Iddrettslag J12",
  //     status: "Canceled",
  //     statusClass: "",
  //     type: "Bestillit o nettbtikk",
  //     quantity: 96,
  //     value: "Kr 9 600",
  //     handler: "Robert",
  //     addContactIcon: "/images/added-us.svg",
  //     products: [
  //       {
  //         productId: "PKD9",
  //         image: "/images/product1.png",
  //         productName: "Juletrepakke #3",
  //         cost: "50",
  //         quantity: "44 stk",
  //         total: "Kr 2200",
  //       },
  //       {
  //         productId: "PKD10",
  //         image: "/images/product2.png",

  //         productName: "Juletrepakke #2",
  //         quantity: "59 stk",
  //         cost: "50",

  //         total: "Kr 2950",
  //       },
  //       {
  //         productId: "PKD11",
  //         image: "/images/product2.png",

  //         productName: "Sales Brochure",
  //         cost: "0",
  //         quantity: "14 stk",
  //         total: "Kr 0",
  //       },
  //     ],
  //   },
  //   {
  //     id: "10321",
  //     time: "1 hour ago",
  //     customer: "Kari Nordmann",
  //     team: "A Iddrettslag G16",
  //     status: "Currently picking",
  //     statusClass: "brown-btn",
  //     type: "Bestillit o nettbtikk",
  //     quantity: 14,
  //     value: "Kr 1 450",
  //     handler: "Robert",
  //     addContactIcon: "/images/added-us.svg",
  //     products: [
  //       {
  //         productId: "PKD9",
  //         image: "/images/product1.png",
  //         productName: "Juletrepakke #3",
  //         cost: "50",
  //         quantity: "44 stk",
  //         total: "Kr 2200",
  //       },
  //       {
  //         productId: "PKD10",
  //         image: "/images/product2.png",

  //         productName: "Juletrepakke #2",
  //         quantity: "59 stk",
  //         cost: "50",

  //         total: "Kr 2950",
  //       },
  //       {
  //         productId: "PKD11",
  //         image: "/images/product2.png",

  //         productName: "Sales Brochure",
  //         cost: "0",
  //         quantity: "14 stk",
  //         total: "Kr 0",
  //       },
  //     ],
  //   },
  // ];
  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>Orders</h2>
          <div className='search-frm'>
            <Link href={"/createorder"}>
              <img src='/images/add-plus.svg' />
            </Link>
            <input
              type='text'
              value={searchOuery}
              onChange={(e) => setQuery(e.target.value)}
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
                  <th>Ordernumber</th>
                  <th>Date</th>
                  <th>Ordered by</th>
                  <th>Ordered for/from</th>
                  <th>Status</th>
                  <th>Origin</th>
                  <th>Items</th>
                  <th>Sum</th>
                  <th>Options</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {(allOrders.length &&
                  allOrders.map((order, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <input type='checkbox' />
                        </td>
                        <td
                          onClick={() =>
                            (window.location.href = `/orderdetail/${order?.id}`)
                          }
                        >
                          #{order.order_number}
                        </td>
                        <td
                          onClick={() =>
                            (window.location.href = `/orderdetail/${order?.id}`)
                          }
                        >
                          {order.created_at}
                        </td>
                        <td>{order.order_by}</td>
                        <td>{order.order_for || "N/A"}</td>
                        <td>
                          <button
                            className={`status ${
                              orders[+order.order_status]?.style
                            }`}
                          >
                            {orders[+order.order_status]?.name}
                          </button>
                        </td>
                        <td>{order.type}</td>
                        <td>{order.order_details_count}</td>
                        <td>{order.order_details_price_sum}</td>
                        <td>
                          <div className='action-btn-table'>
                            <img
                              src='/images/dwn-aro.svg'
                              className='cursor-pointer'
                              onClick={() => toggleRow(index)}
                              alt='Toggle Sub Rows'
                            />
                            <Link href='/salesoverview'>
                              <img src='/images/disable-print.svg' />
                            </Link>
                            {/* <Link href='/shipping'> */}
                            <Link href={`/shipping/${order.id}`}>
                              <img src='/images/checklist.svg' />
                            </Link>
                            <Link href='/package'>
                              <img src='/images/save.svg' />
                            </Link>
                          </div>
                        </td>
                        {/* <td>{order.handler}</td> */}
                        <td>
                          <Link href='/'>
                            <img src={order.addContactIcon} />
                          </Link>
                        </td>
                      </tr>
                      {openRowId === index && (
                        <tr>
                          <td
                            colSpan='12'
                            className='sub-row'
                          >
                            <table className='sub-table w-full'>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Product</th>

                                  <th>Seller</th>
                                  <th>Cost</th>
                                  <th>Quantity</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order?.orderDetails?.map(
                                  (product, productIndex) => (
                                    <tr key={productIndex}>
                                      <td className='productId'>
                                        {product?.id}
                                      </td>

                                      <td>
                                        <div className='sub-row-img'>
                                          <img
                                            src={product?.product_image}
                                            onError={(e) =>
                                              (e.target.src =
                                                "/images/product2.png")
                                            }
                                            alt='product'
                                          />
                                          <span>{product.product_name}</span>
                                        </div>
                                      </td>

                                      <td>{product.seller_name}</td>
                                      <td>{product.price}</td>
                                      <td>{product.qty}</td>
                                      <td>{product.total}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))) || (
                  <tr>
                    <td
                      colSpan='12'
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No Orders Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className='tablebruk'>
          <div className="tablebruk_left">
          <select class="form-select">
            <option>Mass action</option>
            <option>Mass action</option>
          </select>
          <button
                        href=''
                        className='crte-userd Confirm_btn'
                      >
                       Confirm
                      </button>
          </div>

         <Pagination />
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
