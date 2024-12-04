'use client'
import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'

const page = () => {
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
                <li><strong>Ordrenummer:</strong> 10320 </li>
                <li><strong>Leveringsmate:</strong> Gratis Frakt </li>
                <li><strong>Ordredato:</strong> 29.09.2021 - 14:03 </li>
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
                <tr>
                  <td><h3>Julepakke #1 Til pg fra lapper til jul - 40 stk</h3>
                    <p>Art.nr: DUG40JUL</p>
                  </td>
                  <td className='text-end'>17</td>
                </tr>
                <tr>
                  <td><h3>Julepakke #2 Til pg fra lapper til jul - 40 stk</h3>
                    <p>Art.nr: DUG40JUL, lbs:30</p>
                  </td>
                  <td className='text-end'>13</td>
                </tr>
                <tr>
                  <td><h3>Julepakke #3</h3>
                    <p>Art.nr: DUG40JUL</p>
                  </td>
                  <td className='text-end'>11</td>
                </tr>
                <tr>
                  <td><h3>Brusdagspakke #2</h3>
                    <p>Art.nr: DUG40JUL</p>
                  </td>
                  <td className='text-end'>17</td>
                </tr>
                <tr>
                  <td><h3>Brusdagspakke #6</h3>
                    <p>Art.nr: DUG40JUL , lbs:30</p>
                  </td>
                  <td className='text-end'>12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  )
}

export default page