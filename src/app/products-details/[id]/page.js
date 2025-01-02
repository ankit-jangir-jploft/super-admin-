"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Cookies from "js-cookie";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import CreateTask from "@/app/Components/CreateTask";
import { GET, POST } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import SlickSlider from "../../Components/SliderItem";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const page = ({ params }) => {
  const { t } = useTranslation();
  const { id } = params;
  const [modalShow, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");
  const handlePopup = () => {
    setShowModal(!modalShow);
  };
  const [roleType, setRoleType] = useState();

  useEffect(() => {
    // Fetch roleType only on the client side
    setRoleType(Cookies.get("roleType"));
  }, []);

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
  const handleAddLog = async () => {
    try {
      const options = {
        user_id: id,
        content: logsData,
      };

      const res = await POST(
        `${BASE_URL}/api/admin/customerLogCreate`,
        options
      );
      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res.data?.message);
        fetchLogs();
        setLogsData("");
      } else {
        toast.dismiss();
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProductLogs = async () => {
    try {
      const options = {
        product_id: id,
      };
      const res = await GET(`${BASE_URL}/api/admin/productLogList`, options);

      if (res?.data?.status) {
        setLogs(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchProductLogs();
  }, []);

  const addLogsHandler = async () => {
    try {
      const payload = {
        product_id: id,
        content: content,
      };

      const res = await POST(`${BASE_URL}/api/admin/productLogCreate`, payload);
      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res.data?.message);
        setContent("");
        fetchProductLogs();
      } else {
        toast.dismiss();
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

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
            {productDetails?.name} <b>{productDetails?.product_number}</b>
            <span>
              <div className='slg-btm'>
                {/* {productDetails?.product_number}{" "} */}
                <span>{productDetails?.product_slug}</span>
              </div>
            </span>
          </h2>
          <div className='search-frm '>
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
                    {/* <h2>General </h2> */}
                    <h2>{t("products_detail.general")}</h2>
                    <div className=' content-box-left-right'>
                      <p>
                        {t("products_detail.display")}{" "}
                        <span>{productDetails?.display}</span>
                      </p>
                      <p>
                        {/* Visible in online stores:{" "} */}
                        {t("products_detail.visible_in_online_stores")}{" "}
                        <span>{productDetails?.visible}</span>
                        <span>
                          {productDetails?.product_status == 1 ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        {/* Visible in product gallery:{" "} */}
                        {t("products_detail.visible_in_product_gallery")}{" "}
                        <span>
                          {productDetails?.product_status == 1
                            ? t("products_detail.yes")
                            : t("products_detail.no")}
                        </span>
                      </p>
                      <p>
                        {/* Warehouse location:{" "} */}
                        {t("products_detail.warehouse_location")}{" "}
                        <span>{productDetails?.warehouse_address}</span>
                      </p>
                      <p>
                        {/* Stock keep:{" "} */}
                        {t("products_detail.stock_keep")}{" "}
                        <span>
                          {productDetails?.stock_keep == 1 ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        {/* Quantity in stock:{" "} */}
                        {t("products_detail.quantity_in_stock")}{" "}
                        <span>{productDetails?.quantity}</span>
                      </p>
                      <p>
                        {/* Category: */}
                        {t("products_detail.category")}:
                        <span>{productDetails?.category_name}</span>
                      </p>
                      <p>
                        {/* Sub category:{" "} */}
                        {t("products_detail.sub_category")}{" "}
                        <span>{productDetails?.sub_category}</span>
                      </p>
                      <p>
                        {/* GTIN / EAN:  */}
                        {t("products_detail.gtin_ean")}:
                        <span>{productDetails?.gtin}</span>
                      </p>
                      <p>
                        {/* Menu order:  */}
                        {t("products_detail.menu_order")}:
                        <span>{productDetails?.menu_order}</span>
                      </p>
                      <div className='mt-2'></div>
                      <p>
                        {/* Created at: */}
                        {t("products_detail.created_at")}:
                        <span>03.11.2024 - 14:12</span>
                      </p>
                      <p>
                        {/* Updated at: */}
                        {t("products_detail.updated_at")}:
                        <span>04.11.2024 - 17:11</span>
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={8}>
                  <Row>
                    <Col md={6}>
                      <div className='order-dtl-box'>
                        {/* <h2>Pricing </h2> */}
                        <h2>{t("products_detail.pricing")}</h2>
                        <p>
                          {t("products_detail.price")}:{" "}
                          <span>{productDetails?.price}</span>
                        </p>
                        <p>
                          {t("products_detail.sales_price")}:
                          <span>{productDetails?.sale_price}</span>
                        </p>
                        <p>
                          {t("products_detail.special_price")}:{" "}
                          <span>{productDetails?.speacial_price}</span>
                        </p>
                        <p>
                          {t("products_detail.vat")}:{" "}
                          <span>{productDetails?.vat}</span>
                        </p>
                        <p>
                          {t("products_detail.vat_class")}:{" "}
                          <span>{productDetails?.vat_class}</span>
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className='order-dtl-box'>
                        {/* <h2>Dimensions </h2> */}
                        <h2>{t("products_detail.dimensions")}</h2>
                        <p>
                          {t("products_detail.length")}:{" "}
                          <span>{productDetails?.height} cm</span>
                        </p>
                        <p>
                          {t("products_detail.width")}:{" "}
                          <span>{productDetails?.width} cm</span>
                        </p>
                        <p>
                          {t("products_detail.depth")}:{" "}
                          <span>{productDetails?.depth} cm</span>
                        </p>
                        <p>
                          {t("products_detail.weight")}:{" "}
                          <span>{productDetails?.weight} g</span>
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
                    {/* <h2>My pages description</h2> */}
                    <h2>{t("products_detail.my_pages_description")}</h2>
                    <p>{productDetails?.page_description}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    {/* <h2>Short description</h2> */}
                    <h2>{t("products_detail.short_description")}</h2>
                    <p>{productDetails?.short_description}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    {/* <h2>Product description</h2> */}
                    <h2>{t("products_detail.product_description")}</h2>
                    <div
                      style={{
                        textAlign: "left",
                        display: "flex",
                        alignItems: "self-start",
                        justifyContent: "flex-start",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: productDetails?.product_description || "",
                      }}
                    />
                  </div>
                </Col>
                <Col md={12}>
                  <div className='order-dtl-box mt-4'>
                    {/* <h2>Meta description</h2> */}
                    <h2>{t("products_detail.meta_description")}</h2>
                    <p>{productDetails?.meta_description}</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className='tag-box-btm mt-4'>
                    {/* <h2>Keywords</h2> */}
                    <h2>{t("products_detail.keywords")}</h2>
                    <div className='tag_list'>
                      <ul>
                        {productDetails?.keywords?.map((keyword) => {
                          return (
                            <li>
                              {keyword}{" "}
                              <img
                                src='/images/close-tag.svg'
                                // onClick={() =>
                                //   deleteKeywordHandler(keyword?.id)
                                // }
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
                    {/* <h2>Related products</h2> */}
                    <h2>{t("products_detail.related_products")}</h2>
                    <div className='tag_list'>
                      <ul>
                        {productDetails?.related_products?.map((product) => {
                          return (
                            <li key={product?.id}>
                              {product?.name} ({product?.product_number}){" "}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <div className='order-dtl-box'>
                {/* <h2>Logg </h2> */}
                <h2>{t("products_detail.log")}</h2>
                {(logs?.length &&
                  logs?.map((log, i) => {
                    return (
                      <div className='logg-dtl'>
                        <span>{log?.created_at}</span>
                        <label>{log?.name}</label>
                      </div>
                    );
                  })) || <div className='no_data_found'>No logs available</div>}

                {roleType !== "guest" && (
                  <div className='logg-til-desc'>
                    <div className='form-group'>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows='4'
                        placeholder=''
                      ></textarea>
                    </div>
                    <div className='text-end'>
                      {/* <button
                        onClick={addLogsHandler}
                        className='btn-primary px-3 py-1'
                      >
                        Legg til notat
                      </button> */}
                      <button
                        className='send_chat_btn'
                        onClick={addLogsHandler}
                      >
                        {/* Legg til notat  */}
                        <img
                          className=''
                          src='/images/chat_arrow.svg'
                        />
                      </button>
                    </div>
                  </div>
                )}
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
