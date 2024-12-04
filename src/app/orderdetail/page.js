"use client";
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

const page = () => {
  return (
    <>
      <Sidebar />
      <div className="detail-admin-main">
        <div className="admin-header">
          <h2>
            Ordre #10320 <span>29 September 2024 - 15:04</span>
          </h2>
          <div className="search-frm">
            <input type="text" placeholder="Sok i order" />
            <Link href={"/"}>
              <img src="/images/notifications_none.svg" />
            </Link>
            <Link href={"/"}>
              <img src="/images/avatar-style.png" />
            </Link>
          </div>
        </div>
        <div className="filter-manage">
          <div className="">
            <button className="status green-clr w-auto me-2">
              Ready to picking
            </button>
          </div>
          <div className="">
            <button className="bold-btn w-auto me-2">
              <img src="/images/pick-list.svg" /> Pick list
            </button>
            <button className="bold-btn w-auto me-2">
              <img src="/images/sales-ovr.svg" /> Salesoverview
            </button>
            <button className="bold-btn w-auto me-2">
              <img src="/images/pkg-slip.svg" /> Package slip
            </button>
            <button className="bold-btn w-auto me-2">
              <img src="/images/invce.svg" /> Opprett fraktlapp
            </button>
            <button className="bold-btn w-auto me-2">
              <img src="/images/pick-list.svg" /> Invoice
            </button>
            {/* <button className='status w-auto me-2'>Opprett retur</button> */}
            <Link href={"/"}>
              <img src="/images/dotted-btn.svg" />
            </Link>
          </div>
        </div>
        <div className="order-tble w-100 d-inline-block">
          <Row>
            <Col md={9}>
              <Row>
                <Col md={3} >
                  {/* <div className='send-ordercast mb-2'>
                <input type='text' placeholder='Send ordrebekreftelse ' /><span><img src="/images/send.svg" /></span>
              </div> */}
                  <div className="order-dtl-box">
                    <h2>Note</h2>
                    <p>
                      Can you add another sales booklet to the order please, i
                      didnt find it in the webstore.
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="order-dtl-box">
                    <h2>
                      Customer <span className="">See contact</span>
                    </h2>
                    <p>Kari Nordmann</p>
                    <p>
                      <Link href="orderdetail">Kari.Nordmann@firmanavn.no</Link>
                    </p>
                    <p>
                      <Link href="orderdetail">+47 99 88 77 66</Link>
                    </p>
                    <p>Selger: Robert</p>
                    <p>Ordre: 1</p>
                    <p>Totalt: kr 12 650</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="order-dtl-box">
                    <h2>
                      Invoice <span className="disssbl">Not invoiced</span>
                    </h2>
                    <p>Q ldrettslag AS (998778687)</p>
                    <p>Kari Nordmann</p>
                    <p>Snarveien 33</p>
                    <p>2133 Storbyasen</p>
                    <p>Kari.Nordmann@firmanavn.no</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="order-dtl-box">
                    <h2>
                      Shipping{" "}
                      <span className="disssbl">Packageslip not created</span>
                    </h2>
                    <p>Kari Nordmann</p>
                    <p>Snarveien 33</p>
                    <p>2133 Storbyasen</p>
                    <p>Kari.Nordmann@firmanavn.no</p>
                    <p>99887766</p>
                  </div>
                </Col>
              </Row>
              <div className="shdw-crd">
                <div className="table-responsive order-table w-100 order-dtl-tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product </th>
                        <th>Cost</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>PKD9</td>
                        <td>
                          <div className="produt-tile">
                            <img
                              className="product-img img-fluid"
                              src="/images/product.png"
                            />
                            <Link href="orderdetail">
                              Lulepakee #1-til og fra lapper - 40stk{" "}
                            </Link>
                          </div>
                        </td>
                        <td>50</td>
                        <td>44 stk</td>
                        <td>kr 2 200</td>
                      </tr>
                      <tr>
                        <td>PKD9</td>
                        <td>
                          <div className="produt-tile">
                            <img
                              className="product-img img-fluid"
                              src="/images/product.png"
                            />
                            <Link href="orderdetail">
                              Lulepakee #1-til og fra lapper - 40stk{" "}
                            </Link>
                          </div>
                        </td>
                        <td>50</td>
                        <td>44 stk</td>
                        <td>kr 2 200</td>
                      </tr>
                      <tr>
                        <td>PKD9</td>
                        <td>
                          <div className="produt-tile">
                            <img
                              className="product-img img-fluid"
                              src="/images/product.png"
                            />
                            <Link href="orderdetail">
                              Lulepakee #1-til og fra lapper - 40stk{" "}
                            </Link>
                          </div>
                        </td>
                        <td>50</td>
                        <td>44 stk</td>
                        <td>kr 2 200</td>
                      </tr>
                      <tr>
                        <td>PKD9</td>
                        <td>
                          <div className="produt-tile">
                            <img
                              className="product-img img-fluid"
                              src="/images/product.png"
                            />
                            <Link href="orderdetail">
                              Lulepakee #1-til og fra lapper - 40stk{" "}
                            </Link>
                          </div>
                        </td>
                        <td>50</td>
                        <td>44 stk</td>
                        <td>kr 2 200</td>
                      </tr>
                      <tr>
                        <td>PKD9</td>
                        <td>
                          <div className="produt-tile">
                            <img
                              className="product-img img-fluid"
                              src="/images/product.png"
                            />
                            <Link href="orderdetail">
                              Lulepakee #1-til og fra lapper - 40stk{" "}
                            </Link>
                          </div>
                        </td>
                        <td>50</td>
                        <td>44 stk</td>
                        <td>kr 2 200</td>
                      </tr>
                      <tr>
                        <td>PKD9</td>
                        <td>
                          <div className="produt-tile">
                            <img
                              className="product-img img-fluid"
                              src="/images/product.png"
                            />
                            <Link href="orderdetail">
                              Lulepakee #1-til og fra lapper - 40stk{" "}
                            </Link>
                          </div>
                        </td>
                        <td>50</td>
                        <td>44 stk</td>
                        <td>kr 2 200</td>
                      </tr>

                      <tr>
                        <td colspan="4">Gratis frakt</td>
                        <td>kr 0</td>
                      </tr>
                      <tr>
                        <td colspan="3"></td>
                        <td>
                          <span className="total-prc">Produkter delsum:</span>
                          <span className="total-prc">Frakt:</span>
                          <span className="total-prc">Ordretotal:</span>
                        </td>
                        <td>
                          <span className="total-prc">kr 12 650</span>
                          <span className="total-prc">kr 0</span>
                          <span className="total-prc">kr 12 650</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="order-dtl-box">
                <h2>Logg </h2>
                <div className="logg-dtl">
                  <span>29.09.2024 - 15:04</span>
                  <label>Kunde opprettet ordre.</label>
                </div>
                <div className="logg-dtl">
                  <span>29.09.2024 - 15:04</span>
                  <label>
                    <strong>Kundenotat:</strong> Kan dere legge med et ekstra
                    salgshefte? Tenkte vise til gruppen til min datter og.
                  </label>
                </div>
                <div className="logg-dtl">
                  <span>
                    29.09.2024 - 15:04 <Link href="orderdetail">Robert</Link>
                  </span>
                  <label>
                    Robert redigerte ordre.{" "}
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
                    29.09.2024 - 15:04 <Link href="orderdetail">Bengt</Link>
                  </span>
                  <label>Endret status - Klar for plukking</label>
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
    </>
  );
};

export default page;
