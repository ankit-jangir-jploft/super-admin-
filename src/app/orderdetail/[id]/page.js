"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import { GET, POST } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCodeGenerator from "@/app/Components/QRcode";
import Cookies from "js-cookie";

const Page = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [orderDetails, setOrderDetails] = useState({});
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  const fetchOrderDetails = async () => {
    try {
      const option = { id: id };
      const res = await GET(`${BASE_URL}/api/admin/OrderBillDetail`, option);
      if (res?.data?.status) {
        setOrderDetails(res.data?.data);

        setProducts(res.data?.data?.order_details);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLogs = async () => {
    try {
      const option = { order_id: id };
      const res = await GET(`${BASE_URL}/api/admin/orderLogList`, option);
      if (res?.data?.status) {
        setLogs(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const orders = {
    0: { name: t("order_status.ordered"), style: "ordered" },
    1: {
      name: t("order_status.ready_for_picking"),
      style: "ready_for_picking",
    },
    2: {
      name: t("order_status.currently_picking"),
      style: "currently_picking",
    },
    3: { name: t("order_status.sent"), style: "ready_for_picking" },
    4: { name: t("order_status.in_transit"), style: "in_transit" },
    5: { name: t("order_status.delivered"), style: "ready_for_picking" },
    6: { name: t("order_status.completed"), style: "completed" },
    7: { name: t("order_status.canceled"), style: "canceled" },
    8: { name: t("order_status.on_hold"), style: "on_hold" },
  };

  const handleLogSubmit = async () => {
    try {
      if (content.trim() === "") {
        toast.dismiss();
        toast.error("Please enter log content");
        return;
      }

      const payload = { order_id: id, content: content, user_id: user?.id };
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

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const content = document.getElementById("pdf-content");

    if (!content) {
      console.error("Content not found");
      return;
    }

    setLoading(true);

    // Temporarily show the content
    content.style.display = "block";

    try {
      const canvas = await html2canvas(content, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      if (!imgData || imgData === "data:,") {
        console.error("Failed to generate image data");
        return;
      }

      // Calculate the width and height for A4 size
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Add the image to the PDF

      // Save the PDF
      pdf.save("order-details.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Hide the content again
      content.style.display = "none";
      setLoading(false); // Set loading to false after PDF generation
    }
  };

  const logStatus = {
    note: {
      name: "Note",
      html: "<strong>Customer note:</strong><br/>",
      style: "note",
    },
    order_status: {
      name: "Order Status",
      html: "<strong>Changed status:</strong>",
      style: "order-status",
    },
    new_order: {
      name: "New Order",
      html: "",
      style: "new-order",
    },
    none: {
      name: "None",
      html: "",
      style: "none",
    },
  };

  useEffect(() => {
    const userDetails = JSON.parse(Cookies.get("user"));
    setUser(userDetails);
    fetchOrderDetails();
    fetchLogs();
  }, []);

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>
            {t("order_details.orders")} #{orderDetails?.id}
          </h2>
        </div>
        <div className='filter-manage'>
          <div className=''>
            <button
              className={`status ${
                orders[+orderDetails?.order_status]?.style
              } w-auto me-2`}
            >
              {orders[+orderDetails?.order_status]?.name}
            </button>
          </div>
          <div className=''>
            <button
              onClick={() => {
                window.location.href = `/shipping/${id}`;
              }}
              className='bold-btn w-auto me-2'
            >
              <img src='/images/pick-list.svg' /> {t("order_details.pick_list")}
            </button>
            <button className='bold-btn w-auto me-2'>
              <img src='/images/sales-ovr.svg' />{" "}
              {t("order_details.salesoverview")}
            </button>
            <button
              className='bold-btn w-auto me-2'
              onClick={() => {
                if (orderDetails?.package_slip) {
                  window.open(orderDetails.package_slip, "_blank");
                } else {
                  console.log("Package slip not available");
                }
              }}
            >
              <img
                src='/images/pkg-slip.svg'
                alt='Package Slip Icon'
              />{" "}
              {t("order_details.package_slip")}
            </button>

            <button className='bold-btn w-auto me-2'>
              <img src='/images/invce.svg' />{" "}
              {t("order_details.create_shipping_label")}
            </button>

            <button
              className='bold-btn w-auto me-2'
              onClick={generatePDF}
            >
              <img src='/images/pick-list.svg' /> {t("order_details.invoice")}
            </button>
            <Link href={"/"}>
              <img src='/images/dotted-btn.svg' />
            </Link>
          </div>
        </div>
        <div
          className='order-tble w-100 d-inline-block'
          id='invoice'
        >
          <Row>
            <Col md={9}>
              <Row>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>{t("order_details.note")}</h2>
                    <p>{orderDetails?.comment}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>
                      {t("order_details.customer")}{" "}
                      <span>{t("order_details.see_contact")}</span>
                    </h2>
                    <p>{orderDetails?.customer?.name}</p>
                    <p>
                      <Link href={"#"}>{orderDetails?.customer?.email}</Link>
                    </p>
                    <p>
                      <Link href='#'>{orderDetails?.customer?.phone}</Link>
                    </p>
                    <p>
                      {t("order_details.seller")}:{" "}
                      {orderDetails?.customer?.seller_name}
                    </p>
                    <p>
                      {t("order_details.order")}:{" "}
                      {orderDetails?.customer?.no_orders}
                    </p>
                    <p>
                      {t("order_details.total")}: kr{" "}
                      {orderDetails?.customer?.total_price}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>
                      {t("order_details.invoice")}{" "}
                      <span className='disssbl'>
                        {t("order_details.not_invoiced")}
                      </span>
                    </h2>
                    <p>{orderDetails?.delivery_address?.name}</p>
                    <p>{orderDetails?.delivery_address?.address}</p>
                    <p>
                      {orderDetails?.delivery_address?.post_code}{" "}
                      {orderDetails?.delivery_address?.city}
                    </p>
                    <p>{orderDetails?.delivery_address?.email_address}</p>
                    <p>{orderDetails?.delivery_address?.phone_no}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>
                      {t("order_details.shipping")}{" "}
                      <span className='disssbl'>
                        {t("order_details.packageslip_not_created")}
                      </span>
                    </h2>
                    <p>{orderDetails?.billing_address?.name}</p>
                    <p>{orderDetails?.billing_address?.address}</p>
                    <p>
                      {orderDetails?.billing_address?.post_code}{" "}
                      {orderDetails?.billing_address?.city}
                    </p>
                    <p>{orderDetails?.billing_address?.email_address}</p>
                    <p>{orderDetails?.billing_address?.phone_no}</p>
                  </div>
                </Col>
              </Row>
              <div className='shdw-crd'>
                <div className='table-responsive order-table w-100 order-dtl-tbl'>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{t("order_details.product")}</th>
                        <th>{t("order_details.cost")}</th>
                        <th>{t("order_details.quantity")}</th>
                        <th>{t("order_details.total")}</th>
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
                    <tfoot
                      style={{
                        background: "#F7F4F1",
                        width: "100%",
                        padding: "15px 20px",
                        borderRadius: "15px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      <tr>
                        <td
                          colSpan='5'
                          style={{ padding: "10px 10px", fontSize: "16px" }}
                        >
                          <div className='biling-details'>
                            <p>
                              {t("order_details.products_sum")}:{" "}
                              <span>kr {orderDetails?.total_final_amount}</span>
                            </p>
                            <p>
                              {t("order_details.shipping_&_Handling")}:{" "}
                              <span>{orderDetails?.shipping_charge}</span>
                            </p>
                            <p>
                              <b>{t("order_details.total")}: </b>{" "}
                              <b>
                                kr{" "}
                                {parseInt(orderDetails?.total_final_amount) +
                                  parseInt(orderDetails?.shipping_charge)}
                              </b>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className='order-dtl-box'>
                <h2>{t("order_details.log")}</h2>
                {(logs?.length &&
                  logs?.map((log) => {
                    const updatedContent = log?.order_price
                      ? `
                       <p style="padding: 0; display: inline-block; width: 70%; text-align: left;">
                         ${log?.content}
                       </p>
                       <p style="padding: 0; display: inline-block; width: 28%; text-align: right;">
                         kr ${log?.order_price}
                       </p>
                     `
                      : log?.content;

                    return (
                      <div
                        key={log?.id}
                        className='logg-dtl'
                      >
                        {log?.role_name ? (
                          <div className='d-flex justify-content-between'>
                            <span>{log?.updated_at}</span>
                            <span>{log?.role_name}</span>
                          </div>
                        ) : (
                          <span>{log?.updated_at}</span>
                        )}
                        <label
                          dangerouslySetInnerHTML={{
                            __html: logStatus[log?.type]?.html
                              ? logStatus[log?.type]?.html +
                                " " +
                                updatedContent
                              : updatedContent,
                          }}
                        />

                        {/* {log?.content}
                        </label> */}
                      </div>
                    );
                  })) || <div className='logg-dtl'>No logs</div>}

                <div className='logg-til-desc'>
                  <div className='form-group'>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows='4'
                      placeholder={t("order_details.add_an_internal_note")}
                    ></textarea>
                  </div>
                  <div className='text-end'>
                    <button
                      className='send_chat_btn'
                      onClick={handleLogSubmit}
                    >
                      <img
                        className=''
                        src='/images/chat_arrow.svg'
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* {loading ? (
          ""
        ) : ( */}
      <div
        id='pdf-content'
        style={{ display: "none" }}
      >
        {/* Your PDF content goes here */}
        <section className='shipping-cart'>
          <Container className='border-btm'>
            <h1 className='heading-mange'>Pick List</h1>
            <Row>
              <Col md={4}>
                <div className='addrs-shping'>
                  <h2>Delivery Address</h2>
                  <p>
                    {orderDetails?.delivery_address?.name} <br />
                    {orderDetails?.delivery_address?.address} <br />
                    {orderDetails?.delivery_address?.post_code}{" "}
                    {orderDetails?.delivery_address?.city} <br />
                    {orderDetails?.delivery_address?.state}
                  </p>
                </div>
              </Col>
              <Col
                md={4}
                className='text-center'
              >
                <div className='addrs-shping d-inline-block text-start'>
                  <h2>Billing Address</h2>
                  <p>
                    {orderDetails?.billing_address?.name} <br />
                    {orderDetails?.billing_address?.address} <br />
                    {orderDetails?.billing_address?.post_code}{" "}
                    {orderDetails?.billing_address?.city} <br />
                    {orderDetails?.billing_address?.state}
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className='qr-img-section text-end'>
                  <QRCodeGenerator url={"https://user.propheticpathway.com"} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Add other sections as needed */}
        <section>
          <Container>
            <Row>
              <Col md={6}>
                <ul className='pin-personal-dtl'>
                  <li>
                    <strong>Order Number:</strong> {orderDetails?.order_number}
                  </li>
                  <li>
                    <strong>Status:</strong>{" "}
                    {orderDetails?.order_status === 1 ? "Completed" : "Pending"}
                  </li>
                  <li>
                    <strong>Order Date:</strong>{" "}
                    {new Date(orderDetails?.created_at).toLocaleString()}
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className='pin-personal-dtl'>
                  <li>
                    <strong>Customer ID:</strong> {orderDetails?.customer?.id}
                  </li>
                  <li>
                    <strong>Phone:</strong> {orderDetails?.customer?.phone}
                  </li>
                  <li>
                    <strong>Email:</strong> {orderDetails?.customer?.email}
                  </li>
                  <li>
                    <strong>Seller:</strong> {orderDetails?.seller_name}
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <div className='table-responsive order-table'>
              <table>
                <thead>
                  <tr>
                    <th>Packed</th>
                    <th>Quantity</th>
                    <th>Product</th>
                    <th>Product Number</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>{product?.qty}</td>
                      <td>
                        {product?.product_name} - {product?.qty} pcs
                      </td>
                      <td>{product?.product_number}</td>
                      <td>-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      </div>
      {/* )} */}

      {/* <div id="pdf-content" style={{ display: 'none'}}>
        <section className="shipping-cart">
          <Container className="border-btm" >
            <h1 className="heading-mange">Pick List</h1>
            <Row>
              <Col md={4}>
                <div className="addrs-shping">
                  <h2>Delivery Address</h2>
                  <p>
                    {orderDetails?.delivery_address?.name} <br />
                    {orderDetails?.delivery_address?.address} <br />
                    {orderDetails?.delivery_address?.post_code}{" "}
                    {orderDetails?.delivery_address?.city} <br />
                    {orderDetails?.delivery_address?.state}
                  </p>
                </div>
              </Col>
              <Col md={4} className="text-center">
                <div className="addrs-shping d-inline-block text-start">
                  <h2>Billing Address</h2>
                  <p>
                    {orderDetails?.billing_address?.name} <br />
                    {orderDetails?.billing_address?.address} <br />
                    {orderDetails?.billing_address?.post_code}{" "}
                    {orderDetails?.billing_address?.city} <br />
                    {orderDetails?.billing_address?.state}
                  </p>
                </div>
              </Col>
              <Col md={4}>
              <div className='qr-img-section text-end'>
                <QRCodeGenerator url={"https://user.propheticpathway.com"} />
              </div>
            </Col>
            </Row>
          </Container>
        </section>
       
      </div> */}
    </>
  );
};

export default Page;
