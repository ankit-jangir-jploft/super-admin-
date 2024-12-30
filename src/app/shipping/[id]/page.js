"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { GET } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import moment from "moment";
import QRCodeGenerator from "@/app/Components/QRcode";

const page = ({ params }) => {
  const { id } = params;
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  const fetchOrderDetails = async () => {
    try {
      const options = { id: id };
      const res = await GET(`${BASE_URL}/api/admin/OrderBillDetail`, options);
      if (res?.data?.status) {
        setOrderDetails(res.data?.data);
        setProducts(res.data?.data?.order_details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);


  console.log({ orderDetails })

  return (
    <>
      <section className='shipping-cart'>
        <Container className='border-btm'>
          <h1 className='heading-mange'>PLUKKLISTE</h1>
          <Row>
            <Col md={4}>
              <div className='addrs-shping'>
                <h2>Leveringsadresse</h2>
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
                <h2>Faktureringsadresse</h2>
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
                <QRCodeGenerator url={"https://user.propheticpathway.com"} />
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
                  <strong>Ordrenummer:</strong> {orderDetails?.order_number}{" "}
                </li>
                <li>
                  <strong>Leveringsmate:</strong> {orderDetails?.order_status === 1 ? "Completed" : "Pending"}
                </li>
                <li>
                  <strong>Ordredato:</strong>{" "}
                  {moment(orderDetails?.created_at).format(
                    "DD-MM-YYYY hh:mm A"
                  )}{" "}
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <ul className='pin-personal-dtl'>
                <li>
                  <strong>Kunde.nr:</strong> {orderDetails?.customer?.id}{" "}
                </li>
                <li>
                  <strong>Telefon:</strong>{" "}
                  {orderDetails?.customer?.phone }
                </li>
                <li>
                  <strong>E-post:</strong>  {orderDetails?.customer?.email}
                </li>
                <li>
                  <strong>Selger: </strong> Robert{" "}
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
                  <th>Pakket</th>
                  <th>Antall</th>
                  <th>Produkt</th>
                  <th>Art. nr</th>
                  <th>Lokasjon</th>
                  {/* <th className='text-end'>Pris</th> */}
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
                        <td>{product?.qty}</td>
                        <td>
                          {product?.product_name} - {product?.qty} stk
                        </td>
                        <td>{product?.product_number  }</td>
                        <td>-</td>
                        {/* <td className='text-end'>{product?.price}</td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
};

export default page;
