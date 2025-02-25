"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { GET } from "@/app/Utils/apiFunctions";
import { APPLICATION_LINK, BASE_URL } from "@/app/Utils/apiHelper";
import moment from "moment";
import QRCodeGenerator from "@/app/Components/QRcode";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const page = ({ params }) => {
  const { t } = useTranslation();
  const { id } = params;
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  const fetchOrderDetails = async () => {
    try {
      const options = { id: id };
      const res = await GET(`${BASE_URL}/api/admin/picklist-details`, options);
      if (res?.data?.status) {
        setOrderDetails(res.data?.data);
        setProducts(res.data?.data?.order_details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Cookies.set("i18next", "nor", {
      expires: 365,
      path: "/dashboard",
    });
    fetchOrderDetails();
  }, []);

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

  return (
    <>
      <section className='shipping-cart'>
        <Container className='border-btm'>
          {/* <h1 className='heading-mange'>PLUKKLISTE</h1> */}
          <h1 className='heading-mange'>{t("picklist.picking_list")}</h1>
          <Row>
            <Col md={4}>
              <div className='addrs-shping'>
                {/* <h2>Leveringsadresse</h2> */}
                <h2>{t("picklist.delivery_address")}</h2>
                <p>
                  {orderDetails?.delivery_address?.name} <br />
                  {orderDetails?.delivery_address?.address}
                  <br />
                  {orderDetails?.delivery_address?.post_code}{" "}
                  {orderDetails?.delivery_address?.city}
                  <br />
                  {orderDetails?.delivery_address?.state}
                </p>
              </div>
            </Col>
            <Col
              md={4}
              className='text-center'
            >
              <div className='addrs-shping d-inline-block text-start'>
                {/* <h2>Faktureringsadresse</h2> */}
                <h2>{t("picklist.faktureringsadresse")}</h2>
                <p>
                  {orderDetails?.billing_address?.name} <br />
                  {orderDetails?.billing_address?.address}
                  <br />
                  {orderDetails?.billing_address?.post_code}{" "}
                  {orderDetails?.billing_address?.city}
                  <br />
                  {orderDetails?.billing_address?.state}
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className='qr-img-section text-end'>
                <QRCodeGenerator
                  url={`${APPLICATION_LINK}/order-status-change/${id}`}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col md={6}>
              <ul className='pin-personal-dtl'>
                <li>
                  <strong>{t("picklist.ordrenummer")}:</strong>{" "}
                  {orderDetails?.order_number}{" "}
                </li>
                <li>
                  {/* <strong>Leveringsmate:</strong>{" "} */}
                  <strong>{t("picklist.leveringsmate")}:</strong>{" "}
                  {orders[orderDetails?.order_status]?.name}
                </li>
                <li>
                  {/* <strong>Ordredato:</strong>{" "} */}
                  <strong>{t("picklist.ordredato")}:</strong>{" "}
                  {moment(orderDetails?.created_at).format(
                    "DD-MM-YYYY hh:mm A"
                  )}{" "}
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <ul className='pin-personal-dtl'>
                <li>
                  <strong>{t("picklist.kunde_nr")}:</strong>{" "}
                  {orderDetails?.customer?.id}{" "}
                </li>
                <li>
                  {/* <strong>Telefon:</strong> */}
                  <strong>{t("picklist.telefon")}:</strong>{" "}
                  {orderDetails?.customer?.phone}
                </li>
                <li>
                  {/* <strong>E-post:</strong> */}
                  <strong>{t("picklist.e_post")}:</strong>{" "}
                  {orderDetails?.customer?.email}
                </li>
                <li>
                  {/* <strong>Selger: </strong> */}
                  <strong>{t("picklist.selger")}:</strong>{" "}
                  {orderDetails?.seller_name}{" "}
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
                  {/* <th>Pakket</th> */}
                  <th>{t("picklist.pakket")}</th>
                  {/* <th>Antall</th> */}
                  <th>{t("picklist.antall")}</th>
                  {/* <th>Produkt</th> */}
                  <th>{t("picklist.produkt")}</th>
                  {/* <th>Art. nr</th> */}
                  <th>{t("picklist.art_nr")}</th>
                  {/* <th>Lokasjon</th> */}
                  <th>{t("picklist.lokasjon")}</th>
                  {/* <th className='text-end'>Pris</th> */}
                </tr>
              </thead>
              <tbody>
                {(products.length &&
                  products.map((product) => {
                    return (
                      <tr>
                        <td>
                          <input type='checkbox' />
                        </td>
                        <td>{product?.qty}</td>
                        <td>
                          {product?.product_name} - {product?.qty} stk
                        </td>
                        <td>{product?.product_number}</td>
                        <td>{product?.warehouse_address}</td>
                        {/* <td className='text-end'>{product?.price}</td> */}
                      </tr>
                    );
                  })) || (
                  <tr>
                    <th
                      colSpan={7}
                      className='text-center'
                    >
                      Nothing here
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
};

export default page;
