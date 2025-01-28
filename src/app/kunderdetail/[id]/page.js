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
import CustomerStatusModal from "../../modals/customerstatuschange";

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
  const [userAddress, setUserAddress] = useState();
  const [user, setUser] = useState({});
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    // Fetch roleType only on the client side
    setRoleType(Cookies.get("roleType"));
  }, []);

  console.log({ customer });

  const handlePopup = () => {
    setShowModal(!modalShow);
  };

  const fetchCustomerDetails = async () => {
    try {
      const options = {
        id: id,
      };
      const res = await GET(`${BASE_URL}/api/admin/customerDetail`, options);

      console.log({ res });
      if (res?.data?.status) {
        setCustomers(res?.data?.data[0]);
        setOrderDetails(res.data?.orderList || []);
        setGroupList(res.data?.groupLists || []);
        setLastPurchaseOrder(res.data?.lastPurchaseDetails || []);
        setDeliveryAddress(res.data?.DeliveryAddress);
        setUserAddress(res?.data?.userAddress);
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

  const leadStatus = {
    None: {
      value: t("lead_option.none"),
      style: "",
    },
    Warm: {
      value: t("lead_option.warm"),
      style: "Warm",
    },
    Cold: {
      value: t("lead_option.cold"),
      style: "Cold",
    },
    Luke: {
      value: t("lead_option.luke"),
      style: "Luke",
    },
  };

  const logStatus = {
    note: {
      name: "Note",
      html: `<strong>${t("note.customer_note")}:</strong><br/>`,
      style: "note",
    },
    order_status: {
      name: "Order Status",
      html: `<strong>${t("note.changed_status")}:</strong>`,
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

  useEffect(() => {
    const userDetails = JSON.parse(Cookies.get("user"));
    setUser(userDetails);
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
            {customer?.name}
            <span>
              #{customer?.id} | {customer?.userDetail?.delivery_address}
            </span>
          </h2>
        </div>

        {roleType === "guest" ? (
          ""
        ) : (
          <div className='filter-manage'>
            <button
              className={`status ${
                customerStatus[customer?.customer_status]?.style
              } w-auto me-2`}
              onClick={() => {
                setShowStatusChange(true);
                setCurrentStatus(customer?.customer_status);
              }}
            >
              {customerStatus[customer?.customer_status]?.value}
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
                      {t("customer_details.edit")}
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
                      <b
                        className={`text-right ${
                          leadStatus[customer?.lead_status]?.style
                        }`}
                      >
                        {leadStatus[customer?.lead_status]?.value}
                      </b>{" "}
                    </h2>

                    {/* <h2>{customer?.origin} </h2> */}

                    <p>#{customer?.id}</p>
                    <p>{customer?.userDetail?.delivery_address}</p>
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
                      {t("customer_details.sellers_registered")}:{" "}
                      <span>{lastPurchaseOrder?.user_count}</span>
                    </p>
                    <p>
                      {t("customer_details.sold_till_now")}:{" "}
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
                    <p>{userAddress?.address}</p>

                    <p>{userAddress?.zip_code}</p>
                    <p>
                      {userAddress?.post_code} {userAddress?.city}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='order-dtl-box'>
                    {/* <h2> Delivery address</h2> */}
                    <h2>{t("customer_details.delivery_address")}</h2>
                    {/* 
                    <p>{deliveryAddress?.address}</p>
                    <p>{deliveryAddress?.city}</p>



                    <p>{deliveryAddress?.post_code}</p> */}

                    <p>{deliveryAddress?.address}</p>

                    <p>{deliveryAddress?.zip_code}</p>
                    <p>
                      {deliveryAddress?.post_code} {deliveryAddress?.city}
                    </p>
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
                                <div className='colr-them'>
                                  {" "}
                                  #{order?.order_number}
                                </div>
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
                  className='table-responsive order-table w-100 order-dtl-tbl shdw-crd bordernone ener_page_details'
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
                      })) || <div></div>}
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
                  logs.map((log, index) => {
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
                        className='logg-dtl'
                        key={index}
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
                      </div>
                    );
                  })
                ) : (
                  <p>{t("kunder.no_logs_avalilable")}</p>
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

      <CustomerStatusModal
        id={id}
        isOpen={showStatusChange}
        onClose={() => {
          setShowStatusChange(false);
          fetchCustomerDetails();
          fetchLogs();
          fetchTags();
        }}
        status={currentStatus}
      />
    </>
  );
};

export default page;
