'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { BASE_URL } from '../../Utils/apiHelper'
import { GET } from '../../Utils/apiFunctions'
import moment from 'moment'

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




  return (
    <>
      <section className='shipping-cart pt-5'>
        <Container>
          <Row>
            <Col md={6}>
              <img src="/images/logo.png" />
            </Col>
            <Col md={6}>
              <div className='addrs-shping'>
                <h2>Dugnadstid.no</h2>
                <p>Dugnadstid AS <br />
                  Rigedalen 17<br />
                  4626 KRISTIANSAND</p>
              </div>
            </Col>
            <Col md={6}>
              <div className='m-0 mb-4 qr-img-section text-end'>
                <img src="/images/qr.png" className='img-fluid' />
              </div>
              <div className='addrs-shping'>
                <h2>PAKKSEDDEL</h2>
                <p>Kari Nordmann   <br />
                  Snarveien 33<br />
                  2105 Storbyasen</p>
              </div>
            </Col>

            <Col md={6}>
              <ul className='pin-personal-dtl'>
                <li><strong>Ordrenummer:</strong> {orderDetails?.order_number} </li>
                <li><strong>Leveringsmate:</strong>  {orderDetails?.order_status === 1 ? "Completed" : "Pending"} </li>
                <li><strong>Ordredato:</strong>  {moment(orderDetails?.created_at).format(
                  "DD-MM-YYYY hh:mm A"
                )}{" "} </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <div className='table-responsive package-table mt-5'>
            <table>
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th className='text-end'>Antall</th>
                </tr>
              </thead>
              <tbody>

                {
                  products?.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <h3> {product?.product_name} - {product?.id}</h3>
                        <p>Art.nr: DUG40JUL</p>
                      </td>
                      <td className="text-end">{product?.qty}</td>
                    </tr>
                  ))
                }




              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  )
}

export default page