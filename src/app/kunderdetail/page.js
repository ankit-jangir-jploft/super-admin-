"use client";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import CreateTask from "../Components/CreateTask";

const page = () => {
  const [modalShow, setShowModal] = useState(false);
  const handlePopup = () => {

    setShowModal(!modalShow);
  };
  return (
    <>
      <Sidebar />
      <div className="detail-admin-main">
        <div className="admin-header pb-0">
          <h2>
            Kari Nordmann <span>#1319 | Q ldrettslag j14</span>
          </h2>
        </div>
        <div className="filter-manage">
          <button className="status green-clr w-auto me-2">
            PAGAENDE FORHANDSSALG
          </button>
          <div>
            <button className="bold-btn w-auto me-2">Send Epost</button>
            <button className="bold-btn w-auto me-2">Ring</button>
            <button className="bold-btn w-auto me-2">Legg til oppgave</button>
            <button
              className="add-icon"
              onClick={(e) => {
                e.preventDefault();
                handlePopup();
              }}
            >
              <img src="/images/add.svg" />
            </button>
          </div>
        </div>
        <div className="order-tble kunder-dtl-box w-100 d-inline-block">
          <Row>
            <Col md={3}>
              <div className="order-dtl-box">
                <h2>Kunde </h2>
                <p>#1319</p>
                <p>Q ldrettslag J14</p>
                <p>Kari Nordmann</p>
                <p>kari.nordmann@firmanavn.no</p>
                <p>+47 99 88 77 66</p>
                <p>Opprettet: 14.08.2024</p>
                <p>Antall dugnader: 1</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="order-dtl-box">
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
              <div className="order-dtl-box">
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
              <div className="order-dtl-box">
                <h2>Adresse </h2>
                <p>Kari Nordmann</p>
                <p>Snarveien 33</p>
                <p>2133 Storbyasen</p>
                <p>Norge</p>
              </div>
              <div className="order-dtl-box">
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
              <div className="table-responsive order-table w-100 order-dtl-tbl">
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
              <div className="order-dtl-box mt-4">
                <h2>Tags</h2>
                <div className="p-2">
                  <button className="tags-btn">
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src="/images/close.svg" />
                  </button>
                  <button className="tags-btn">
                    Produkt: julepakke #2 <img src="/images/close.svg" />
                  </button>
                  <button className="tags-btn">
                    Produkt: julepakke #3 <img src="/images/close.svg" />
                  </button>
                  <button className="tags-btn">
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src="/images/close.svg" />
                  </button>
                  <button className="tags-btn">
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src="/images/close.svg" />
                  </button>
                  <button className="tags-btn">
                    Produkt: julepakke #2 <img src="/images/close.svg" />
                  </button>
                  <button className="tags-btn">
                    Produkt: julepakke #3 <img src="/images/close.svg" />
                  </button>
                  <button className="tags-btn">
                    Produkt: julepakke #1 Til og fra lapper{" "}
                    <img src="/images/close.svg" />
                  </button>
                </div>
                <div className="search-frm justify-content-end px-3">
                  <input
                    type="text"
                    placeholder="Sok i order"
                    className="rounded w-auto ps-2"
                  />
                  <button className="add-icon">
                    <img src="/images/add.svg" />
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="order-dtl-box">
                <h2>Logg </h2>
                <div className="logg-dtl">
                  <span>29.09.2024 - 15:04</span>
                  <label>Kunde opprettet som gjest</label>
                </div>
                <div className="logg-dtl">
                  <span>29.09.2024 - 15:04</span>
                  <label>Ordre #10202</label>
                </div>
                <div className="logg-dtl">
                  <span>
                    29.09.2024 - 15:04 <Link href="orderdetail">Bengt</Link>
                  </span>
                  <label>
                    Endret status - Folg app provepakke{" "}
                    <Link href="orderdetail">
                      <img
                        className="img-fluid exclamation-img"
                        src="/images/exclamation-mark.svg"
                      />
                    </Link>
                  </label>
                </div>
                <div className="logg-dtl">
                  <span>
                    29.09.2024 - 15:04 <Link href="orderdetail"> Bengt</Link>
                  </span>
                  <label>Kunde tilordnet robert</label>
                </div>
                <div className="logg-dtl">
                  <span>
                    29.09.2024 - 15:04 <Link href="orderdetail">Robert</Link>
                  </span>
                  <label>Robert opprettet en oppgave i Asana</label>
                </div>

                <div className="logg-dtl">
                  <span>
                    29.09.2024 - 15:04 <Link href="orderdetail">Bengt</Link>
                  </span>
                  <label>
                    Emdert til{" "}
                    <button className="status red w-auto">varm</button>
                  </label>
                </div>

                <div className="logg-dtl">
                  <span>29.09.2024 - 15:04 </span>
                  <label>Order #10310</label>
                </div>
                <div className="logg-dtl">
                  <span>
                    29.09.2024 - 15:04 <Link href="orderdetail">Bengt</Link>
                  </span>
                  <label>Folger du opp denne ordren Robert ?</label>
                </div>

                <div className="logg-dtl">
                  <span>
                    29.09.2024 - 15:04 <Link href="orderdetail">Robert</Link>
                  </span>
                  <label>Kontaktet pa telefon, ga litt informasjon</label>
                </div>
                <div className="logg-dtl">
                  <span>29.09.2024 - 15:04</span>
                  <label>Automatisk SMS og e-post om dugnadsstart sendt.</label>
                </div>
                <div className="logg-dtl">
                  <span>29.09.2024 - 15:04</span>
                  <label>Endret status - Pagaende forhandssalg</label>
                </div>
                <div className="logg-til-desc">
                  <div className="form-group">
                    <textarea
                      rows="4"
                      placeholder="Legg til internt notat..."
                    ></textarea>
                  </div>
                  <div className="text-end">
                    <button className="btn-primary px-3 py-1">
                      Legg til notat
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <CreateTask show={modalShow} onHide={() => handlePopup()} />
    </>
  );
};

export default page;
