"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { GET, POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CreateCustomerModal from "../modals/createcustomer";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [allAddress, setAllAddress] = useState([]);
  const [allDeliveryAddress, setAllDeliveryAddress] = useState([]);
  const [comments, setComments] = useState("");
  const [orderedBy, setOrderedBy] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState("");
  const [orderConfirm, setOrderConfirm] = useState(0);
  const [errors, setErrors] = useState({});
  const [adminManagers, setAdminManagers] = useState([]);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [showCreateCustomer, setCreate] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  const radios = [
    { name: t("order_create.no"), value: 0 },
    { name: t("order_create.yes"), value: 1 },
  ];

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!selectedCustomer.id)
      newErrors.selectedCustomer = t("order_create.customer_required");
    if (!orderedBy) newErrors.orderedBy = t("order_create.ordered_by_required");
    if (!selectedAddress)
      newErrors.selectedAddress = t("order_create.customer_address_required");
    if (!selectedDeliveryAddress)
      newErrors.selectedDeliveryAddress = t(
        "order_create.customer_delivery_address_required"
      );

    if (!confirmationEmail || !validateEmail(confirmationEmail))
      newErrors.confirmationEmail = t("order_create.valid_email_required");

    // if (!orderConfirm)
    //   newErrors.orderConfirm = "Order confirmation is required.";
    if (productCount.length === 0) {
      toast.dismiss();
      toast.error(t("order_create.at_least_one_product_required"));
      newErrors.products = t("order_create.at_least_one_product_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const incrementCount = (id, availableStock) => {
    setProductCount((prev) => {
      let updated = false;

      const newState = prev.map((pr) => {
        if (pr.id === id) {
          if (pr.qty < availableStock) {
            updated = true;
            return { ...pr, qty: pr.qty + 1 };
          } else {
            toast.error("Cannot exceed available stock!");
          }
        }
        return pr;
      });

      return updated ? newState : prev;
    });
  };

  const decrementCount = (id) => {
    setProductCount((prev) => {
      let updated = false;

      const newState = prev
        .map((pr) => {
          if (pr.id === id) {
            if (pr.qty > 1) {
              updated = true;
              return { ...pr, qty: pr.qty - 1 };
            } else {
              toast.error("Quantity cannot go below 1!");
            }
          }
          return pr;
        })
        .filter((pr) => pr.qty > 0);

      return updated ? newState : prev;
    });
  };

  const countHandler = (id, price) => {
    const counter = {
      id: id,
      qty: 1,
      price: price,
      seller_id: 0,
    };
    setProductCount((prev) => [...prev, counter]);
  };

  const fetchAddress = async () => {
    try {
      const options = {
        per_page: 20,
        customer_id: selectedCustomer?.id,
      };

      const res = await GET(`${BASE_URL}/api/admin/userAddressList`, options);

      if (res?.data?.status) {
        setAllAddress(res.data?.data);
      } else {
        setAllAddress([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeliveryAddress = async () => {
    try {
      const options = {
        per_page: 20,
        customer_id: selectedCustomer?.id,
      };
      const res = await GET(
        `${BASE_URL}/api/admin/userAddressDeliveryList`,
        options
      );
      if (res?.data?.status) {
        setAllDeliveryAddress(res.data?.data);
      } else {
        setAllDeliveryAddress([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductList = async () => {
    try {
      const options = {
        per_page: 20,
      };

      const res = await GET(`${BASE_URL}/api/admin/Productlist`, options);
      console.log(res.data);
      if (res?.data?.status == "true") {
        setProducts(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const options = {
        per_page: 10,
        // page: currentPage,
        // searchQuery: searchQuery,
      };
      const res = await POST(`${BASE_URL}/api/admin/customerList`, options);

      if (res?.data?.status) {
        setCustomers(res.data?.data);
      }
    } catch (error) {}
  };

  const fetchAdminManater = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/adminManagerList`);
      if (res?.data?.status) {
        setAdminManagers(res.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const userDetails = JSON.parse(Cookies.get("user"));

    setLoggedInUser(userDetails);
    setOrderedBy(userDetails?.id);
    fetchCustomers();
    fetchProductList();
    fetchAddress();
    fetchAdminManater();
    fetchDeliveryAddress();
  }, [selectedCustomer]);

  const submitHandler = async () => {
    if (!validateFields()) {
      return;
    }

    const data = {
      user_id: selectedCustomer.id,
      delivery_address_id: selectedAddress,
      customer_delivery_address_id: selectedDeliveryAddress,
      order_confirm: orderConfirm,
      order_by_user_id: orderedBy,
      comment: comments,
      confirmation_email: confirmationEmail,
      items: productCount.map((prd) => {
        prd.product_id = prd.id;
        return prd;
      }),
    };
    const res = await POST(`${BASE_URL}/api/admin/orderCreate`, data);
    if (res?.data?.status) {
      toast.dismiss();
      toast.success(res.data?.message);
      router.push("/order");
    }
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          {/* <h2>Create order</h2> */}
          <div className='d-flex justify-content-between w-100 align-items-center flex-wrap'>
            {/* <h2>Create order</h2> */}
            <h2>{t("order_create.create_order")}</h2>
            <div className='bot-btn'>
              <Link
                href={"/order"}
                className='can-btn'
              >
                {t("order_create.cancel")}
              </Link>
              <button
                className='cr-btn btn createorder_top_right'
                onClick={submitHandler}
              >
                {t("order_create.create_order")}
              </button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr'>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      {/* <Form.Label>Customer</Form.Label> */}
                      <Form.Label>{t("order_create.customer")}</Form.Label>
                      <Form.Select
                        value={selectedCustomer.id || ""}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const customer = customers.find(
                            (custm) => custm.id == selectedId
                          );
                          console.log(customer);
                          setConfirmationEmail(customer?.email);
                          setSelectedCustomer(customer || {});
                          fetchAddress();
                        }}
                        isInvalid={!!errors.selectedCustomer}
                      >
                        <option value=''>Select customer</option>
                        {/* <option value=''>
                          {t("order_create.select_customer")}
                        </option> */}
                        {customers.length > 0 ? (
                          customers.map((custm) => (
                            <option
                              key={custm.id}
                              value={custm.id}
                            >
                              {custm.name}
                            </option>
                          ))
                        ) : (
                          <option>No Customer</option>
                        )}
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>
                        {errors.selectedCustomer}
                      </Form.Control.Feedback>
                    </div>
                    <Button
                      className='add-btne btn-borderbl '
                      onClick={() => setCreate(true)}
                    >
                      +
                    </Button>
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Ordered by</Form.Label> */}
                    <Form.Label>{t("order_create.ordered_by")}</Form.Label>
                    <Form.Select
                      value={orderedBy}
                      onChange={(e) => {
                        setOrderedBy(e.target.value);
                      }}
                      isInvalid={!!errors.orderedBy}
                    >
                      <option value=''>Select ordered by</option>
                      <option value={loggedInUser?.id}>
                        {loggedInUser?.name}
                      </option>
                      {/* 
                      {adminManagers?.length &&
                        adminManagers?.map((admin) => {
                          return (
                            <option
                              key={admin.id}
                              value={admin.id}
                            >
                              {admin.name}
                            </option>
                          );
                        })} */}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      {errors.orderedBy}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Delivery address</Form.Label> */}
                    <Form.Label>
                      {t("order_create.customer_address")}
                    </Form.Label>
                    <Form.Select
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      isInvalid={!!errors.selectedAddress}
                    >
                      <option value={""}>Customers address</option>
                      {allAddress.length &&
                        allAddress.map((address) => {
                          return (
                            <option
                              key={address.id}
                              id={address.id}
                              value={address.id}
                            >
                              {address.address}
                            </option>
                          );
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      {errors.selectedAddress}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Delivery address</Form.Label> */}
                    <Form.Label>
                      {t("order_create.customer_delivery_address")}
                    </Form.Label>
                    <Form.Select
                      value={selectedDeliveryAddress}
                      onChange={(e) =>
                        setSelectedDeliveryAddress(e.target.value)
                      }
                      isInvalid={!!errors.selectedDeliveryAddress}
                    >
                      <option value={""}>Customers address</option>
                      {allDeliveryAddress.length &&
                        allDeliveryAddress.map((address) => {
                          return (
                            <option
                              key={address.id}
                              id={address.id}
                              value={address.id}
                            >
                              {address.address}
                            </option>
                          );
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      {errors.selectedDeliveryAddress}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <div className='swtch-bt'>
                    {/* <Form.Label>Order confirmation</Form.Label> */}
                    <Form.Label>
                      {t("order_create.order_confirmation")}
                    </Form.Label>
                    <ButtonGroup>
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type='radio'
                          variant={
                            idx % 2 ? "outline-success" : "outline-danger"
                          }
                          name='radio'
                          value={radio.value}
                          checked={orderConfirm === radio.value}
                          onChange={(e) =>
                            setOrderConfirm(Number(e.currentTarget.value))
                          }
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                  <Form.Group className='mb-3'>
                    <Form.Label>
                      {t("order_create.send_order_confirmation_to")}
                    </Form.Label>
                    <Form.Control
                      type='email'
                      value={confirmationEmail}
                      onChange={(e) => setConfirmationEmail(e.target.value)} // Update email state on change
                      isInvalid={!!errors.confirmationEmail} // Validate and show error if any
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.confirmationEmail}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Comment</Form.Label> */}
                    <Form.Label>{t("order_create.comment")}</Form.Label>
                    <Form.Control
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              {/* <h5 className='mt-3'>Products</h5> */}
              <h5>{t("order_create.products")}</h5>
              <div className='row'>
                {products.length > 0 &&
                  products.map((prod, i) => {
                    const item = productCount.find((pr) => pr.id === prod.id);
                    return (
                      <div
                        key={i}
                        className='col-lg-3'
                      >
                        <div className='prodct-crd'>
                          <img
                            src={prod?.image}
                            onError={(e) => {
                              e.target.src = "/images/product1.png";
                            }}
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "contain",
                            }}
                          />

                          <h4>{prod.name}</h4>
                          <span>Price {prod?.price},-</span>
                          {item ? (
                            <div className='prdct-plmn'>
                              <button onClick={() => decrementCount(prod.id)}>
                                -
                              </button>
                              <div className='qty-cnt'>{item.qty}</div>
                              <button
                                onClick={() =>
                                  incrementCount(prod.id, prod.quantity)
                                }
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => countHandler(prod.id, prod.price)}
                              className='btn d-block w-100 btn-addcrt'
                            >
                              <img
                                src='/images/bag.svg'
                                alt='Add to cart'
                              />{" "}
                              {t("order_create.add")}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                {errors.products && (
                  <small className='text-danger'>{errors.products}</small>
                )}
                <div className='col'></div>
              </div>
              <hr className='my-5'></hr>
            </div>
          </div>
        </div>
        <CreateCustomerModal
          isOpen={showCreateCustomer}
          onClose={() => {
            setCreate(false);
            fetchCustomers();
          }}
        />
      </div>
    </>
  );
};
export default page;
