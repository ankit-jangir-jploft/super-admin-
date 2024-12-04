'use client'
import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'

const page = () => {
  return (
    <>
      <section className='shipping-cart'>
        <Container className='border-btm'>
          <h1 className='heading-mange'>PLUKKLISTE</h1>
          <Row>
            <Col md={4}>
              <div className='addrs-shping'>
                <h2>Leveringsadresse</h2>
                <p>Kari Nordmann <br />
                  Snarveien 33<br />
                  2105 Storbyasen<br />
                  Norge</p>
              </div>
            </Col>
            <Col md={4} className='text-center'>
              <div className='addrs-shping d-inline-block text-start'>
                <h2>Faktureringsadresse</h2>
                <p>Q ldrettslag AS <br />
                  Kari Nordmann <br />
                  Snarveien 33<br />
                  2105 Storbyasen<br />
                  Norge</p>
              </div>
            </Col>
            <Col md={4}>
              <div className='qr-img-section text-end'>
                <img src="/images/qr.png" className='img-fluid' />
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
                <li><strong>Ordrenummer:</strong> 10320 </li>
                <li><strong>Leveringsmate:</strong> Gratis Frakt </li>
                <li><strong>Ordredato:</strong> 29.09.2021 - 14:03 </li>
              </ul>
            </Col>
            <Col md={6}>
              <ul className='pin-personal-dtl'>
                <li><strong>Kunde.nr:</strong> 1745 </li>
                <li><strong>Telefon:</strong> 99 88 77 66 </li>
                <li><strong>E-post:</strong> kari.nordmann@firmanavn.no </li>
                <li><strong>Selger: </strong> Robert </li>
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
                  <th className='text-end'>Pris</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>17</td>
                  <td>Julepakke #1 Til og fra lapper til jul - 40 stk</td>
                  <td>DUG40JIL</td>
                  <td>A1</td>
                  <td className='text-end'>50</td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>17</td>
                  <td>Julepakke #1 Til og fra lapper til jul - 40 stk</td>
                  <td>DUG40JIL</td>
                  <td>A1</td>
                  <td className='text-end'>50</td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>17</td>
                  <td>Julepakke #1 Til og fra lapper til jul - 40 stk</td>
                  <td>DUG40JIL</td>
                  <td>A1</td>
                  <td className='text-end'>50</td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>17</td>
                  <td>Julepakke #1 Til og fra lapper til jul - 40 stk</td>
                  <td>DUG40JIL</td>
                  <td>A1</td>
                  <td className='text-end'>50</td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>17</td>
                  <td>Julepakke #1 Til og fra lapper til jul - 40 stk</td>
                  <td>DUG40JIL</td>
                  <td>A1</td>
                  <td className='text-end'>50</td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>17</td>
                  <td>Julepakke #1 Til og fra lapper til jul - 40 stk</td>
                  <td>DUG40JIL</td>
                  <td>A1</td>
                  <td className='text-end'>50</td>
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