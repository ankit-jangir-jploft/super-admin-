"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import CreateTask from "@/app/Components/CreateTask";
import { GET, POST } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";

function formatDateToCustom(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return "";
  }
}

const page = ({ params }) => {
  const { t } = useTranslation();
  const { id } = params;
  const [modalShow, setShowModal] = useState(false);
  const [customer, setCustomers] = useState({});
  const [tags, setTags] = useState([]);
  const [logs, setLogs] = useState([]);
  const [tagContent, setTagContent] = useState("");
  const [logsData, setLogsData] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [lastPurchaseOrder, setLastPurchaseOrder] = useState([]);
  const [roleType, setRoleType] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState({});

  useEffect(() => {
    // Fetch roleType only on the client side
    setRoleType(Cookies.get("roleType"));
  }, []);

  const handlePopup = () => {
    setShowModal(!modalShow);
  };

  const fetchCustomerDetails = async () => {
    try {
      const options = {
        id: id,
      };
      const res = await GET(`${BASE_URL}/api/admin/customerDetail`, options);
      if (res?.data?.status) {
        setCustomers(res?.data?.data[0]);
        setOrderDetails(res.data?.orderList || []);
        setGroupList(res.data?.groupLists || []);
        setLastPurchaseOrder(res.data?.lastPurchaseDetails || []);
        setDeliveryAddress(res.data?.DeliveryAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMailHandler = async () => {
    try {
      const options = {
        customer_id: id,
      };
      const res = await GET(`${BASE_URL}/api/admin/sendMailCustomer`, options);
      if (res?.data?.status) {
        toast.dismiss();
        toast.success("Mail sent successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTags = async () => {
    try {
      const options = {
        customer_id: id,
      };
      const res = await GET(`${BASE_URL}/api/admin/customerTagsList`, options);
      if (res?.data?.status) {
        setTags(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLogs = async () => {
    try {
      const options = {
        user_id: id,
      };
      const res = await POST(`${BASE_URL}/api/admin/customerLogList`, options);
      if (res?.data?.status) {
        setLogs(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (tagId) => {
    try {
      const options = {
        customer_id: id,
        tag_id: tagId,
      };

      const res = await POST(
        `${BASE_URL}/api/admin/customerTagdelete`,
        options
      );
      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res.data?.message);
        fetchTags();
      } else {
        toast.dismiss();
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTags = async () => {
    try {
      const options = {
        user_id: id,
        content: tagContent,
      };

      const res = await POST(
        `${BASE_URL}/api/admin/customerCreateTags`,
        options
      );
      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res.data?.message);
        fetchTags();
        setTagContent("");
      } else {
        toast.dismiss();
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddLog = async () => {
    try {
      const options = {
        user_id: id,
        content: logsData,
      };

      const res = await POST(
        `${BASE_URL}/api/admin/customerLogCreate`,
        options
      );
      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res.data?.message);
        fetchLogs();
        setLogsData("");
      } else {
        toast.dismiss();
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const orders = {
    0: { name: "Pending", style: "green-clr" },
    1: { name: "Confirmed", style: "brown-clr" },
    2: { name: "Processing", style: "gray-clr" },
    3: { name: "Shipped", style: "blue-clr" },
    4: { name: "Delivered", style: "purple-clr" },
    5: { name: "Canceled", style: "red-clr" },
  };

  useEffect(() => {
    fetchCustomerDetails();
    fetchTags();
    fetchLogs();
  }, []);

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header pb-3'>
          <h2>
            {customer?.name} <b>NO</b>
            <span>
              #{customer?.id} |{" "}
              {customer?.userDetail?.delivery_address || "Q ldrettslag J14"}
            </span>
          </h2>
        </div>

        {roleType === "guest" ? (
          ""
        ) : (
          <div className='filter-manage'>
            <button className='status green-clr w-auto me-2'>
              PAGAENDE FORHANDSSALG
            </button>
            <div>
              <div className='butn-border_top_right'>
                <a
                  className='btn-bordr-sec'
                  href={`tel:+${customer?.phone}`}
                >
                  <img src='/images/call-icon-top.svg' />
                  {t("customer_details.call")}
                </a>
                <a
                  className='btn-bordr-sec'
                  href={`mailto:${customer?.email}`}
                >
                  <img src='/images/mail-icon-top.svg' />
                  {t("customer_details.send_email")}
                </a>
                <button
                  className='btn-bordr-sec'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePopup();
                  }}
                >
                  <img src='/images/Createtask.svg' />
                  {t("customer_details.create_a_task")}
                </button>
                {/* <button className='btn-img-sec'>
                  <img src='/images/edit-icon-top2.svg' />
                </button> */}
                <Dropdown className='btn-img-sec'>
                  <Dropdown.Toggle id='dropdown-basic'>
                    <img
                      src='/images/edit-icon-top2.svg'
                      alt='Edit Icon'
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href={`/update-customer/${id}`}>
                      Edit
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* <button
                className='bold-btn w-auto me-2'
                onClick={sendMailHandler}
              >
                {t("customer_details.send_email")}
              </button>

              <a
                className='bold-btn w-auto me-2'
                href={`tel:+${customer?.phone}`}
              >
                {t("customer_details.call")}
              </a>

              <button
                className='bold-btn w-auto me-2'
                onClick={(e) => {
                  e.preventDefault();
                  handlePopup();
                }}
              >
                {t("customer_details.create_a_task")}
              </button>
              <button
                className='add-icon'
                onClick={(e) => {
                  e.preventDefault();
                  handlePopup();
                }}
              >
                <img src='/images/add.svg' />
              </button> */}
            </div>
          </div>
        )}
        <div className='order-tble kunder-dtl-box w-100 d-inline-block'>
          <Row>
            <Col lg={8}>
              <Row>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    <h2>
                      {t("customer_details.customer")}{" "}
                      <b className='text-right'>{customer?.lead_status}</b>{" "}
                    </h2>

                    {/* <h2>{customer?.origin} </h2> */}

                    <p>#{customer?.id}</p>
                    <p>
                      {customer?.userDetail?.delivery_address ||
                        "Q ldrettslag J14"}
                    </p>
                    <p>{customer?.name}</p>
                    <p>{customer?.email}</p>
                    <p>{customer?.phone}</p>
                    <p>
                      {t("customer_details.created")}: {customer?.createdAt}
                    </p>
                    <p>Antall dugnader: 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    {/* <h2>Aktiv dugnad </h2> */}
                    <h2>{t("customer_details.active_dugnad")}</h2>
                    <p>
                      {t("customer_details.dugnadsgroup")}:{" "}
                      <span>{lastPurchaseOrder?.group_name}</span>
                    </p>
                    <p>
                      {t("customer_details.start_date")}:{" "}
                      <span>
                        {formatDateToCustom(lastPurchaseOrder?.start_date)}
                      </span>
                    </p>
                    <p>
                      {t("customer_details.end_date")}:{" "}
                      <span>
                        {formatDateToCustom(lastPurchaseOrder?.end_date)}
                      </span>
                    </p>
                    <p>
                      {t("customer_details.sellers")}:{" "}
                      <span>{lastPurchaseOrder?.number_of_seller}</span>
                    </p>
                    <p>
                      {t("customer_details.sold_till_now")}:{" "}
                      <span>{lastPurchaseOrder?.user_count}</span>
                    </p>
                    <p>
                      {t("customer_details.sellers_registered")}:{" "}
                      <span>{lastPurchaseOrder?.total_qty_sold}</span>
                    </p>
                  </div>
                </Col>
                {/* <Col md={3}>
              <div className='order-dtl-box'>
                <h2>Gruppe informasjon </h2>
                <p>
                  Firmanavn: <span>Q ldrettslag AS`</span>
                </p>
                <p>
                  Org.nummer: <span>989787867</span>
                </p>
                <p>
                  Antall grupper: <span>3</span>
                </p>
                <p>
                  Ordre: <span>12</span>
                </p>
                <p>
                  Antall dugnader: <span>4</span>
                </p>
              </div>
            </Col> */}
                <Col md={3}>
                  <div className='order-dtl-box'>
                    {/* <h2>Adresse </h2> */}
                    <h2>{t("customer_details.address")}</h2>
                    <p>{customer?.name}</p>
                    <p>Snarveien 33</p>
                    <p>
                      {customer?.userDetail?.zip_code || "1234"}{" "}
                      {customer?.userDetail?.city}
                    </p>
                    <p>Norge</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    {/* <h2> Delivery address</h2> */}
                    <h2>{t("customer_details.delivery_address")}</h2>

                    <p>{deliveryAddress?.address}</p>
                    <p>{deliveryAddress?.city}</p>
                    <p>{deliveryAddress?.post_code}</p>
                  </div>
                </Col>
              </Row>

              <Col lg={12}>
                <div className='table-responsive order-table w-100 order-dtl-tbl shdw-crd bordernone'>
                  <table>
                    <thead>
                      <tr>
                        {/* <th>Tidligere ordre</th> */}
                        <th>#{t("customer_details.order")}</th>
                        {/* <th>Dato</th> */}
                        <th>{t("customer_details.date")}</th>
                        {/* <th>Status</th> */}
                        <th>{t("customer_details.status")}</th>
                        {/* <th>Antall varer</th> */}
                        <th>{t("customer_details.no_of_items")}</th>
                        {/* <th>Totalt</th> */}
                        <th>{t("customer_details.total")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orderDetails?.length &&
                        orderDetails?.map((order) => {
                          return (
                            <tr>
                              <td
                                onClick={() =>
                                  (window.location.href = `/orderdetail/${order?.id}`)
                                }
                              >
                                #{order?.order_number}
                              </td>
                              <td>{order?.created_at}</td>
                              <td></td>
                              <td>{order?.total_item}</td>
                              <td>{order?.total_amount}</td>
                            </tr>
                          );
                        })) || (
                        <tr>
                          <td
                            colSpan={6}
                            className='text-center'
                          >
                            No data
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className='table-responsive order-table w-100 order-dtl-tbl shdw-crd bordernone'
                  style={{ marginTop: "20px" }}
                >
                  <table>
                    <thead>
                      <tr>
                        {/* <th>Start date</th> */}
                        <th>{t("customer_details.start_date")}</th>
                        {/* <th>End date</th> */}
                        <th>{t("customer_details.end_date")}</th>
                        {/* <th>Dugnadsgroup</th> */}
                        <th>{t("customer_details.dugnadsgroup")}</th>
                        {/* <th>Sellers</th> */}
                        <th>{t("customer_details.sellers")}</th>
                        {/* <th>Active</th> */}
                        <th>{t("customer_details.active")}</th>
                        {/* <th>Packs</th> */}
                        <th>{t("customer_details.packs")}</th>
                        {/* <th>APS</th> */}
                        {/* <th>Turnover</th> */}
                        <th>{t("customer_details.turnover")}</th>
                        {/* <th>Profit</th> */}
                        <th>{t("customer_details.profit")}</th>
                        {/* <th>Status</th> */}
                        <th>{t("customer_details.status")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(groupList?.length &&
                        groupList.map((group, index) => (
                          <tr key={index}>
                            <td>{group?.start_date}</td>
                            <td>{group?.end_date}</td>
                            <td>{group?.group_name}</td>
                            <td>{group?.number_of_seller}</td>
                            <td>
                              {group?.user_count}/{group?.number_of_seller}
                            </td>
                            <td>{group?.total_qty_sold}</td>
                            <td>kr {group?.total_sale_price}</td>
                            <td>kr {group?.total_profit}</td>
                            <td>
                              {group?.group_status === 1 ? "Completed" : ""}
                            </td>
                          </tr>
                        ))) || (
                        <tr>
                          <td
                            colSpan={9}
                            className='text-center'
                          >
                            No data
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className='order-dtl-box mt-4'>
                  {/* <h2>Tags</h2> */}
                  <h2>{t("customer_details.tags")}</h2>
                  <div className='p-2'>
                    {(tags.length &&
                      tags.map((tag) => {
                        return roleType === "guest" ? (
                          <button className='tags-btn'>{tag?.name}</button>
                        ) : (
                          <button
                            onClick={() => handleDelete(tag?.id)}
                            className='tags-btn'
                          >
                            {tag?.name} <img src='/images/close.svg' />
                          </button>
                        );
                      })) || <div>No Tags</div>}
                  </div>
                </div>
                {roleType === "guest" ? (
                  ""
                ) : (
                  <div className='search-frm justify-content-end  btm_search_tagbx'>
                    <input
                      type='text'
                      className='rounded w-auto ps-2'
                      value={tagContent}
                      onChange={(e) => setTagContent(e.target.value)}
                    />
                    <button
                      className='add-icon-img'
                      onClick={handleAddTags}
                    >
                      <img src='/images/tag-ser-add-icon.svg' />
                    </button>
                  </div>
                )}
              </Col>
            </Col>
            <Col lg={4}>
              <div className='order-dtl-box'>
                {/* <h2>Logg</h2> */}
                <h2>{t("customer_details.log")}</h2>
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <div
                      className='logg-dtl'
                      key={index}
                    >
                      <span>{log?.updated_at}</span>
                      <label>{log?.content}</label>
                    </div>
                  ))
                ) : (
                  <p>No logs available.</p>
                )}
                {roleType !== "guest" && (
                  <div className='logg-til-desc'>
                    <div className='form-group'>
                      <textarea
                        rows='4'
                        value={logsData}
                        onChange={(e) => setLogsData(e.target.value)}
                      ></textarea>
                    </div>
                    <div className='text-end'>
                      {/* <button
                        className='btn-primary px-3 py-1'
                        onClick={handleAddLog}
                      >
                        Legg til notat
                      </button> */}
                      <button
                        className='send_chat_btn'
                        onClick={handleAddLog}
                      >
                        {/* Legg til notat  */}
                        <img
                          className=''
                          src='/images/chat_arrow.svg'
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <CreateTask
        show={modalShow}
        id={id}
        onHide={() => handlePopup()}
      />
    </>
  );
};

export default page;
