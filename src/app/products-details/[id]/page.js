"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import CreateTask from "@/app/Components/CreateTask";
import { GET, POST } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import SlickSlider from "../../Components/Sidebar/Sidebar";

const page = ({ params }) => {
  const { id } = params;
  const [modalShow, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const handlePopup = () => {
    setShowModal(!modalShow);
  };

  const fetchProductDetails = async () => {
    try {
      const options = {
        id: id,
      };
      const res = await GET(`${BASE_URL}/api/admin/productDetail`, options);
      console.log(res.data);
      if (res?.data?.status) {
        setProductDetails(res?.data?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const deleteKeywordHandler = async (keywordId) => {
    try {
      const options = {
        keyword_id: keywordId,
        customer_id: id,
      };
      const res = await POST(
        `${BASE_URL}/api/admin/deleteCustomerKeyword`,
        options
      );

      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res?.data?.message);
        fetchProductDetails();
      } else {
        toast.dismiss();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />

      <div className='detail-admin-main'>
        <div className='admin-header pb-0'>
          <h2>
            {productDetails?.name}{" "}
            <span>
              {productDetails?.product_number}{" "}
              {/* {productDetails?.userDetail?.delivery_address ||
                "Q ldrettslag J14"} */}
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
                    <div className=' content-box-left-right'>
                      <p>
                        Display <span>{productDetails?.display}</span>
                      </p>
                      <p>
                        Visible in online stores:{" "}
                        <span>
                          {productDetails?.product_status == 1 ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        Visible in product gallery:{" "}
                        <span>
                          {productDetails?.product_status == 1 ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        Warehouse location:{" "}
                        <span>{productDetails?.warehouse_address}</span>
                      </p>
                      <p>
                        Stock keep:{" "}
                        <span>
                          {productDetails?.stock_keep == 1 ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        Quantity in stock:{" "}
                        <span>{productDetails?.quantity}</span>
                      </p>
                      <p>
                        Category:{" "}
                        <span>{productDetails?.categories?.name}</span>
                      </p>
                      <p>
                        Sub category:{" "}
                        <span>{productDetails?.sub_category}</span>
                      </p>
                      <p>
                        GTIN / EAN: <span>{productDetails?.gtin}</span>
                      </p>
                      <p>
                        Menu order: <span>{productDetails?.menu_order}</span>
                      </p>
                      <div className='mt-2'></div>
                      <p>
                        Created at: <span>03.11.2024 - 14:12</span>
                      </p>
                      <p>
                        Updated at: <span>04.11.2024 - 17:11</span>
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={8}>
                  <Row>
                    <Col md={6}>
                      <div className='order-dtl-box'>
                        <h2>Pricing </h2>
                        <p>
                          Price: <span>{productDetails?.price}</span>
                        </p>
                        <p>
                          Sales price:<span>{productDetails?.sale_price}</span>
                        </p>
                        <p>
                          Special price:{" "}
                          <span>{productDetails?.speacial_price}</span>
                        </p>
                        <p>
                          VAT: <span>{productDetails?.vat}</span>
                        </p>
                        <p>
                          VAT class: <span>{productDetails?.vat_class}</span>
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
                          Width: <span>{productDetails?.width} cm</span>
                        </p>
                        <p>
                          Depth: <span>{productDetails?.depth} cm</span>
                        </p>
                        <p>
                          Weight: <span>{productDetails?.weight} g</span>
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
                <Col
                  md={12}
                  className='btom_cart_box'
                >
                  <div className='order-dtl-box mt-4'>
                    <h2>My pages description</h2>
                    <p>{productDetails?.page_description}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    <h2>Short description</h2>
                    <p>{productDetails?.short_description}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    <h2>Product description</h2>

                    <p>{productDetails?.product_description}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    <h2>Meta description</h2>
                    <p>{productDetails?.meta_description}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='tag-box-btm mt-4'>
                    <h2>Keywords</h2>
                    <div className='tag_list'>
                      <ul>
                        {productDetails?.keywords?.map((keyword) => {
                          return (
                            <li>
                              {keyword?.name}{" "}
                              <img
                                src='/images/close-tag.svg'
                                onClick={() =>
                                  deleteKeywordHandler(keyword?.id)
                                }
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='tag-box-btm  '>
                    <h2>Related products</h2>
                    <div className='tag_list'>
                      <ul>
                        <li>Anledningspakke #3 (DUG30GULL) </li>
                        <li>Julepakke #1 (PDK8) </li>
                        <li>Julepakke #2 (PDK9) </li>
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
                    {/* <button className='btn-primary px-3 py-1'>
                      Legg til notat
                    </button> */}
                    <button
                      className='send_chat_btn'
                      onClick={handleLogSubmit}
                    >
                      {/* Legg til notat  */} 
                      <img
                        className=''
                        src='/images/chat_arrow.svg'
                      />
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
