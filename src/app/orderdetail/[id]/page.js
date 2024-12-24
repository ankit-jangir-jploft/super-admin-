"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import { GET, POST } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import { toast } from "react-toastify";

const page = () => {
  const { id } = useParams();

  const [orderDetails, setOrderDetails] = useState({});
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");

  const fetchOrderDetails = async () => {
    try {
      const option = {
        id: id,
      };

      const res = await GET(`${BASE_URL}/api/admin/OrderBillDetail`, option);
      console.log("Ashish pareek", res.data);
      if (res?.data?.status) {
        setOrderDetails(res.data?.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLogs = async () => {
    try {
      const option = {
        order_id: id,
      };
      const res = await GET(`${BASE_URL}/api/admin/orderLogList`, option);
      if (res?.data?.status) {
        setLogs(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const orders = {
    0: { name: "Pending", style: "gray-clr" },
    1: { name: "Confirmed", style: "brown-clr" },
    2: { name: "Processing", style: "green-clr" },
    3: { name: "Shipped", style: "blue-clr" },
    4: { name: "Delivered", style: "purple-clr" },
    5: { name: "Canceled", style: "red-clr" },
  };

  const handleLogSubmit = async () => {
    try {
      if (content.trim() === "") {
        toast.dismiss();
        toast.error("Please enter log content");
        return;
      }

      const payload = {
        order_id: id,
        content: content,
      };
      const res = await POST(`${BASE_URL}/api/admin/orderLogCreate`, payload);

      if (res?.data?.status) {
        toast.dismiss();
        toast.success("Log created successfully");
        setContent("");
        fetchLogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    fetchLogs();
  }, []);
  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>Ordre #{orderDetails?.id}</h2>
          {/* <div className='search-frm'>
            <input
              type='text'
              placeholder='Sok i order'
            />
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={"/"}>
              <img src='/images/avatar-style.png' />
            </Link>
          </div> */}
        </div>
        <div className='filter-manage'>
          <div className=''>
            {console.log("dffdf ds", orderDetails)}
            <button
              className={`status ${
                orders[+orderDetails?.order_status]?.style
              } w-auto me-2`}
            >
              {orders[+orderDetails?.order_status]?.name}
            </button>
          </div>
          <div className=''>
            <button className='bold-btn w-auto me-2'>
              <img src='/images/pick-list.svg' /> Pick list
            </button>
            <button className='bold-btn w-auto me-2'>
              <img src='/images/sales-ovr.svg' /> Salesoverview
            </button>
            <button className='bold-btn w-auto me-2'>
              <img src='/images/pkg-slip.svg' /> Package slip
            </button>
            <button className='bold-btn w-auto me-2'>
              <img src='/images/invce.svg' /> Opprett fraktlapp
            </button>
            <button className='bold-btn w-auto me-2'>
              <img src='/images/pick-list.svg' /> Invoice
            </button>
            {/* <button className='status w-auto me-2'>Opprett retur</button> */}
            <Link href={"/"}>
              <img src='/images/dotted-btn.svg' />
            </Link>
          </div>
        </div>
        <div className='order-tble w-100 d-inline-block'>
          <Row>
            <Col md={9}>
              <Row>
                <Col md={3}>
                  {/* <div className='send-ordercast mb-2'>
                <input type='text' placeholder='Send ordrebekreftelse ' /><span><img src="/images/send.svg" /></span>
              </div> */}
                  <div className='order-dtl-box'>
                    <h2>Note</h2>
                    <p>{orderDetails?.comment}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>
                      Customer <span className=''>See contact</span>
                    </h2>
                    <p>{orderDetails?.customer?.name}</p>
                    <p>
                      <Link href={"#"}>{orderDetails?.customer?.email}</Link>
                    </p>
                    <p>
                      <Link href='#'>{orderDetails?.customer?.phone}</Link>
                    </p>
                    <p>Selger: {orderDetails?.customer?.seller_name}</p>
                    <p>Ordre: {orderDetails?.customer?.no_orders}</p>
                    <p>Totalt: kr {orderDetails?.customer?.total_price}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>
                      Invoice <span className='disssbl'>Not invoiced</span>
                    </h2>
                    <p>Q ldrettslag AS (998778687)</p>
                    <p>Kari Nordmann</p>
                    <p>Snarveien 33</p>
                    <p>2133 Storbyasen</p>
                    <p>Kari.Nordmann@firmanavn.no</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>
                      Shipping{" "}
                      <span className='disssbl'>Packageslip not created</span>
                    </h2>
                    <p>{orderDetails?.delivery_address?.name}</p>
                    {/* <p>Snarveien 33</p> */}
                    <p>
                      {orderDetails?.delivery_address?.post_code}{" "}
                      {orderDetails?.delivery_address?.city}
                    </p>
                    <p>{orderDetails?.delivery_address?.email_address}</p>
                    <p>{orderDetails?.delivery_address?.phone_no}</p>
                  </div>
                </Col>
              </Row>
              <div className='shdw-crd'>
                <div className='table-responsive order-table w-100 order-dtl-tbl'>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product </th>
                        <th>Cost</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orderDetails?.order_details?.length &&
                        orderDetails?.order_details?.map((product) => {
                          return (
                            <tr key={product?.id}>
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
                                  <Link href='orderdetail'>
                                    {product?.product_name} - {product?.qty}stk{" "}
                                  </Link>
                                </div>
                              </td>
                              <td>{product?.price}</td>
                              <td>{product?.qty} stk</td>
                              <td>kr {product?.total}</td>
                            </tr>
                          );
                        })) || (
                        <tr>
                          <td
                            colSpan={5}
                            className='text-center'
                          >
                            No Products
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className='order-dtl-box'>
                <h2>Logg </h2>
                {(logs?.length &&
                  logs?.map((log) => {
                    return (
                      <div
                        key={log?.id}
                        className='logg-dtl'
                      >
                        <span>{log?.updated_at}</span>
                        <label>{log?.content}</label>
                      </div>
                    );
                  })) || <div className='logg-dtl'>No logs</div>}

                <div className='logg-til-desc'>
                  <div className='form-group'>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows='4'
                    ></textarea>
                  </div>
                  <div className='text-end'>
                    <button
                      className='btn-primary px-3 py-1'
                      onClick={handleLogSubmit}
                    >
                      Legg til notat
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default page;
