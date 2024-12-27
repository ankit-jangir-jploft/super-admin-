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
  const { id } = params;
  const [modalShow, setShowModal] = useState(false);
  const [customer, setCustomers] = useState({});
  const [tags, setTags] = useState([]);
  const [logs, setLogs] = useState([]);
  const [tagContent, setTagContent] = useState("");
  const [logsData, setLogsData] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [roleType, setRoleType] = useState();

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
      console.log(res.data);
      if (res?.data?.status) {
        setCustomers(res?.data?.data[0]);
        setOrderDetails(res.data?.orderList || []);
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
        <div className='admin-header pb-0'>
          <h2>
            {customer?.name}{" "}
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
              <button
                className='bold-btn w-auto me-2'
                onClick={sendMailHandler}
              >
                Send Epost
              </button>
              {/* <button className='bold-btn w-auto me-2'> */}
              <a
                className='bold-btn w-auto me-2'
                href={`tel:+${customer?.phone}`}
              >
                Ring
              </a>
              {/* </button> */}
              <button
                className='bold-btn w-auto me-2'
                onClick={(e) => {
                  e.preventDefault();
                  handlePopup();
                }}
              >
                Legg til oppgave
              </button>
              <button
                className='add-icon'
                onClick={(e) => {
                  e.preventDefault();
                  handlePopup();
                }}
              >
                <img src='/images/add.svg' />
              </button>
            </div>
          </div>
        )}
        <div className='order-tble kunder-dtl-box w-100 d-inline-block'>
          <Row>
            <Col md={3}>
              <div className='order-dtl-box'>
                <h2>Kunde </h2>
                <p>#{customer?.id}</p>
                <p>
                  {customer?.userDetail?.delivery_address || "Q ldrettslag J14"}
                </p>
                <p>{customer?.name}</p>
                <p>{customer?.email}</p>
                <p>{customer?.phone}</p>
                <p>Opprettet: {customer?.createdAt}</p>
                <p>Antall dugnader: 1</p>
              </div>
            </Col>
            <Col md={3}>
              <div className='order-dtl-box'>
                <h2>Aktiv dugnad </h2>
                <p>
                  Dugnadsgruppe: <span>Q ldrettslag J14</span>
                </p>
                <p>
                  Dugnadsstart: <span>02.09.2024</span>
                </p>
                <p>
                  Dugnadsslutt: <span>16.09.2024</span>
                </p>
                <p>
                  Antall selgere: <span>14</span>
                </p>
                <p>
                  Solgt til na: <span>0</span>
                </p>
                <p>
                  Selgere registrert: <span>4</span>
                </p>
              </div>
            </Col>
            <Col md={3}>
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
            </Col>
            <Col md={3}>
              <div className='order-dtl-box'>
                <h2>Adresse </h2>
                <p>{customer?.name}</p>
                <p>Snarveien 33</p>
                <p>
                  {customer?.userDetail?.zip_code || "1234"}{" "}
                  {customer?.userDetail?.city}
                </p>
                <p>Norge</p>
              </div>
              <div className='order-dtl-box'>
                <h2>Leveringsadresse </h2>
                <p>Kari Nordmann</p>
                <p>Snarveien 33</p>
                <p>2133 Storbyasen</p>
                <p>Norge</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <div className='table-responsive order-table w-100 order-dtl-tbl'>
                <table>
                  <thead>
                    <tr>
                      <th>Tidligere ordre</th>
                      <th>Dato</th>
                      <th>Status</th>
                      <th>Antall varer</th>
                      <th>Totalt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(orderDetails?.length &&
                      orderDetails?.map((order) => {
                        return (
                          <tr>
                            <td>#{order?.order_number}</td>
                            <td>{formatDateToCustom(order?.created_at)}</td>
                            <td>
                              {order?.order_status
                                ? orders[order?.order_status]
                                : ""}
                            </td>
                            <td>{order?.total_item} stk</td>
                            <td>kr {order?.total_amount}</td>
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
              <div className='order-dtl-box mt-4'>
                <h2>Tags</h2>
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
                {roleType === "guest" ? (
                  ""
                ) : (
                  <div className='search-frm justify-content-end px-3'>
                    <input
                      type='text'
                      className='rounded w-auto ps-2'
                      value={tagContent}
                      onChange={(e) => setTagContent(e.target.value)}
                    />
                    <button
                      className='add-icon'
                      onClick={handleAddTags}
                    >
                      <img src='/images/add.svg' />
                    </button>
                  </div>
                )}
              </div>
            </Col>
            <Col lg={4}>
              <div className='order-dtl-box'>
                <h2>Logg</h2>
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
                      <button
                        className='btn-primary px-3 py-1'
                        onClick={handleAddLog}
                      >
                        Legg til notat
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
