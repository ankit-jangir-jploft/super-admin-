"use client";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";

const page = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const toggleRow = (id) => {
    setOpenRowId((prev) => (prev === id ? null : id)); // Close if the same row is clicked, otherwise open
  };
  const orders = [
    {
      id: "10321",
      time: "6 minutes ago",
      customer: "Kari Nordmann",
      team: "Q Iddrettslag G14",
      status: "Ready to picking",
      statusClass: "green-clr",
      type: "Bestillit o nettbtikk",
      quantity: 3,
      value: "Kr 450",
      handler: "Robert",
      addContactIcon: "/images/add-contc.svg",
      products: [
        {
          productId: "PKD9",
          image: "/images/product1.png",
          productName: "Juletrepakke #3",
          cost: "50",
          quantity: "44 stk",
          total: "Kr 2200",
        },
        {
          productId: "PKD10",
          image: "/images/product2.png",

          productName: "Juletrepakke #2",
          quantity: "59 stk",
          cost: "50",

          total: "Kr 2950",
        },
        {
          productId: "PKD11",
          image: "/images/product2.png",

          productName: "Sales Brochure",
          cost: "0",
          quantity: "14 stk",
          total: "Kr 0",
        },
      ],
    },
    {
      id: "10321",
      time: "30 minutes ago",
      customer: "Kari Nordmann",
      team: "Q Iddrettslag J12",
      status: "Canceled",
      statusClass: "",
      type: "Bestillit o nettbtikk",
      quantity: 96,
      value: "Kr 9 600",
      handler: "Robert",
      addContactIcon: "/images/added-us.svg",
      products: [
        {
          productId: "PKD9",
          image: "/images/product1.png",
          productName: "Juletrepakke #3",
          cost: "50",
          quantity: "44 stk",
          total: "Kr 2200",
        },
        {
          productId: "PKD10",
          image: "/images/product2.png",

          productName: "Juletrepakke #2",
          quantity: "59 stk",
          cost: "50",

          total: "Kr 2950",
        },
        {
          productId: "PKD11",
          image: "/images/product2.png",

          productName: "Sales Brochure",
          cost: "0",
          quantity: "14 stk",
          total: "Kr 0",
        },
      ],
    },
    {
      id: "10321",
      time: "1 hour ago",
      customer: "Kari Nordmann",
      team: "A Iddrettslag G16",
      status: "Currently picking",
      statusClass: "brown-btn",
      type: "Bestillit o nettbtikk",
      quantity: 14,
      value: "Kr 1 450",
      handler: "Robert",
      addContactIcon: "/images/added-us.svg",
      products: [
        {
          productId: "PKD9",
          image: "/images/product1.png",
          productName: "Juletrepakke #3",
          cost: "50",
          quantity: "44 stk",
          total: "Kr 2200",
        },
        {
          productId: "PKD10",
          image: "/images/product2.png",

          productName: "Juletrepakke #2",
          quantity: "59 stk",
          cost: "50",

          total: "Kr 2950",
        },
        {
          productId: "PKD11",
          image: "/images/product2.png",

          productName: "Sales Brochure",
          cost: "0",
          quantity: "14 stk",
          total: "Kr 0",
        },
      ],
    },
  ];
  return (
    <>
      <Sidebar />
      <div className="detail-admin-main">
        <div className="admin-header">
          <h2>Orders</h2>
          <div className="search-frm">
            <Link href={"/createorder"}>
              <img src="/images/add-plus.svg" />
            </Link>
            <input type="text" placeholder="Sok i order" />
            {/* <img className='input-right-icon' src="/images/search-interface.svg" /> */}
            <Link href={"/"}>
              <img src="/images/notifications_none.svg" />
            </Link>
            <Link href={"/"}>
              <img src="/images/avatar-style.png" />
            </Link>
          </div>
        </div>
        <div className="shdw-crd">
          <div className="table-responsive order-table">
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
                  <th>Seller</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>#{order.id}</td>
                      <td>{order.time}</td>
                      <td>{order.customer}</td>
                      <td>{order.team}</td>
                      <td>
                        <button className={`status ${order.statusClass}`}>
                          {order.status}
                        </button>
                      </td>
                      <td>{order.type}</td>
                      <td>{order.quantity}</td>
                      <td>{order.value}</td>
                      <td>
                        <div className="action-btn-table">
                          <img
                            src="/images/dwn-aro.svg"
                            className="cursor-pointer"
                            onClick={() => toggleRow(index)}
                            alt="Toggle Sub Rows"
                          />
                          <Link href="/salesoverview">
                            <img src="/images/disable-print.svg" />
                          </Link>
                          <Link href="/shipping">
                            <img src="/images/checklist.svg" />
                          </Link>
                          <Link href="/package">
                            <img src="/images/save.svg" />
                          </Link>
                        </div>
                      </td>
                      <td>{order.handler}</td>
                      <td>
                        <Link href="/">
                          <img src={order.addContactIcon} />
                        </Link>
                      </td>
                    </tr>
                    {openRowId === index && (
                      <tr>
                        <td colSpan="12" className="sub-row">
                          <table className="sub-table w-full">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th></th>
                                <th></th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product, productIndex) => (
                                <tr key={productIndex}>
                                  <td className="productId">
                                    {product.productId}
                                  </td>
                                
                                  <td>
                                    <div className="sub-row-img">
                                      <img src={product?.image} alt="product" />
                                      <span>{product.productName}</span>
                                    </div>
                                  </td>
                                  <td>
                                  
                                  </td>
                                  <td>
                                  
                                  </td>
                                  <td>{product.cost}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.total}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="tablebruk">
          <select>
            <option>Mass action</option>
            <option>Mass action</option>
          </select>
          <ul className="pgnatne">
            <li>Showing 15 of 1154 elements</li>
            <li>
              <Link href={"/"}>
                <img src="/images/frst-aro.svg" />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <img src="/images/revrse.svg" />
              </Link>
            </li>
            <li>1 of 42</li>
            <li>
              <Link href={"/"}>
                <img src="/images/nxt-aro.svg" />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <img src="/images/lstpge-aro.svg" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
