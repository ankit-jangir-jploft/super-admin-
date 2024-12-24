"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import CreateTask from "@/app/Components/CreateTask";
import { GET } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import SlickSlider from "../Components/SliderItem";


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
          <div className='search-frm'>
            <input
              type='text'
              placeholder='Sok i order'
            />
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={"/"}>
              <img src='/images/avatar-style.png' />
            </Link>
          </div>
        </div>

        <div className='order-tble kunder-dtl-box w-100 d-inline-block'>
          <Row>
            <Col lg={8}>
              <Row>
                <Col md={4}>
                  <div className='order-dtl-box'>
                    <h2>General </h2>
                    <div className=" content-box-left-right">
                      <p>Display <span>Everywhere</span></p>
                      <p>Visible in online stores: <span>Yes</span></p>
                      <p>Visible in product gallery: <span>Yes</span></p>
                      <p>Warehouse location: <span>A1</span></p>
                      <p>Stock keep: <span>Yes</span></p>
                      <p>Quantity in stock: <span>53534</span></p>
                      <p>Category: <span>Cards</span></p>
                      <p>Sub category: <span>Christmas</span></p>
                      <p>GTIN / EAN: <span>21</span></p>
                      <p>Menu order: <span>1</span></p>
                      <div className="mt-2"></div>
                      <p>Created at: <span>03.11.2024 - 14:12</span></p>
                      <p>Updated at: <span>04.11.2024 - 17:11</span></p>
                    </div>
                  </div>
                </Col>

                <Col md={8}>
                  <Row>
                    <Col md={6}>
                      <div className='order-dtl-box'>
                        <h2>Pricing </h2>
                        <p>
                          Price: <span>50</span>
                        </p>
                        <p>
                          Sales price:<span>125</span>
                        </p>
                        <p>
                          Special price: <span>-</span>
                        </p>
                        <p>
                          VAT: <span>Taxable</span>
                        </p>
                        <p>
                          VAT class: <span>Standard (25%)</span>
                        </p>

                      </div>
                    </Col>
                    <Col md={6}>
                      <div className='order-dtl-box'>
                        <h2>Dimensions </h2>
                        <p>
                          Length: <span>21 cm</span>
                        </p>
                        <p>
                          Width: <span>9 cm</span>
                        </p>
                        <p>
                          Depth: <span>2 cm</span>
                        </p>
                        <p>
                          Weight: <span>31 g</span>
                        </p>
                      </div>
                    </Col>
                    <Col md={11}>
                      <div className='img-item-box-slider'>
                        <SlickSlider />

                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={12} className="btom_cart_box">
                  <div className='order-dtl-box mt-4'>
                    <h2>My pages description</h2>
                    <p>Kortene er trykket i Norge på miljøvennlig FSC godkjent papir. Størrelsen er 10x15 cm. 10 forskjellige design.</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    <h2>Short description</h2>
                    <p>The cards are printed in Norway on environmentally friendly FSC approved paper. The size is 10×15 cm. 10 different designs.</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    <h2>Product description</h2>
                    <p><b>Dugnad med god fortjeneste!</b></p>
                    <p>
                      40 stk kjempefine til og fra lapper til julegavene dine. Disse er i sort og natur med gulltrykk.
                      Lappene leveres i en sort konvolutt med snor lås på baksiden</p>
                    <p>+60% fortjeneste til gruppen</p>
                    <p>+Lettsolgt dugnad alle kan være med på</p>

                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    <h2>Meta description</h2>
                    <p>Dugnadspakke med 40stk til og fra lapper til jul. Disse er veldig enkle å selge i en dugnad for en skoleklasse, et idrettslag, en russegruppe eller andre organisasjoner.</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='tag-box-btm mt-4'>
                    <h2>Keywords</h2>
                    <div className="tag_list">
                      <ul>
                        <li>Card  <img src='/images/close-tag.svg' /></li>
                        <li>Cards  <img src='/images/close-tag.svg' /></li>
                        <li>Christmas  <img src='/images/close-tag.svg' /></li>
                        <li>card pack  <img src='/images/close-tag.svg' /></li>
                        <li>dugnad  <img src='/images/close-tag.svg' /></li>
                        <li>keyword 6  <img src='/images/close-tag.svg' /></li>
                        <li>keyword 7  <img src='/images/close-tag.svg' /></li>
                        <li>keyword 8  <img src='/images/close-tag.svg' /></li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='tag-box-btm  '>
                    <h2>Related products</h2>
                    <div className="tag_list">
                      <ul>
                        <li>Anledningspakke #3  (DUG30GULL) </li> 
                        <li>Julepakke #1  (PDK8) </li> 
                        <li>Julepakke #2  (PDK9) </li>  
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
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
