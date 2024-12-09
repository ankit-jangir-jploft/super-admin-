"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import CreateTask from "@/app/Components/CreateTask";
import { GET } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";

const page = ({ params }) => {
  const { id } = params;
  const [modalShow, setShowModal] = useState(false);
  const [customer, setCustomers] = useState({});
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
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
        <div className='filter-manage'>
          <button className='status green-clr w-auto me-2'>
            PAGAENDE FORHANDSSALG
          </button>
          <div>
            <button className='bold-btn w-auto me-2'>Send Epost</button>
            <button className='bold-btn w-auto me-2'>Ring</button>
            <button className='bold-btn w-auto me-2'>Legg til oppgave</button>
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
                    <tr>
                      <td>#10202</td>
                      <td>14.08.2024</td>
                      <td>Fullfort</td>
                      <td>4 stk</td>
                      <td>kr 0</td>
                    </tr>
                    <tr>
                      <td>#10202</td>
                      <td>14.08.2024</td>
                      <td>Fullfort</td>
                      <td>4 stk</td>
                      <td>kr 0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='order-dtl-box mt-4'>
                <h2>Tags</h2>
                <div className='p-2'>
                  <button className='tags-btn'>
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Produkt: julepakke #2 <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Produkt: julepakke #3 <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Produkt: julepakke #2 <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Produkt: julepakke #3 <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src='/images/close.svg' />
                  </button>
                </div>
                <div className='search-frm justify-content-end px-3'>
                  <input
                    type='text'
                    placeholder='Sok i order'
                    className='rounded w-auto ps-2'
                  />
                  <button className='add-icon'>
                    <img src='/images/add.svg' />
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className='order-dtl-box'>
                <h2>Logg </h2>
                <div className='logg-dtl'>
                  <span>29.09.2024 - 15:04</span>
                  <label>Kunde opprettet som gjest</label>
                </div>
                <div className='logg-dtl'>
                  <span>29.09.2024 - 15:04</span>
                  <label>Ordre #10202</label>
                </div>
                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Bengt</Link>
                  </span>
                  <label>
                    Endret status - Folg app provepakke{" "}
                    <Link href='orderdetail'>
                      <img
                        className='img-fluid exclamation-img'
                        src='/images/exclamation-mark.svg'
                      />
                    </Link>
                  </label>
                </div>
                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'> Bengt</Link>
                  </span>
                  <label>Kunde tilordnet robert</label>
                </div>
                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Robert</Link>
                  </span>
                  <label>Robert opprettet en oppgave i Asana</label>
                </div>

                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Bengt</Link>
                  </span>
                  <label>
                    Emdert til{" "}
                    <button className='status red w-auto'>varm</button>
                  </label>
                </div>

                <div className='logg-dtl'>
                  <span>29.09.2024 - 15:04 </span>
                  <label>Order #10310</label>
                </div>
                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Bengt</Link>
                  </span>
                  <label>Folger du opp denne ordren Robert ?</label>
                </div>

                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Robert</Link>
                  </span>
                  <label>Kontaktet pa telefon, ga litt informasjon</label>
                </div>
                <div className='logg-dtl'>
                  <span>29.09.2024 - 15:04</span>
                  <label>Automatisk SMS og e-post om dugnadsstart sendt.</label>
                </div>
                <div className='logg-dtl'>
                  <span>29.09.2024 - 15:04</span>
                  <label>Endret status - Pagaende forhandssalg</label>
                </div>
                <div className='logg-til-desc'>
                  <div className='form-group'>
                    <textarea
                      rows='4'
                      placeholder='Legg til internt notat...'
                    ></textarea>
                  </div>
                  <div className='text-end'>
                    <button className='btn-primary px-3 py-1'>
                      Legg til notat
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <CreateTask
        show={modalShow}
        onHide={() => handlePopup()}
      />
    </>
  );
};

export default page;
