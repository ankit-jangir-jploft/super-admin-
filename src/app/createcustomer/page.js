"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET, POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [orderConfirm, setOrderConfirm] = useState(0);
  const [customAddress, setCustomAddress] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const fetchSellers = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/roleSellerList`);
      if (res?.data?.status) {
        setSellers(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    zip: Yup.string()
      .matches(/^\d+$/, "Zip must be a number")
      .required("Zip is required"),
    city: Yup.string().required("City is required"),
    seller_id: Yup.string().required("Seller is required"),
    contactPerson: Yup.string().required("Contact person is required"),
    phone: Yup.string()
      .matches(/^\+?\d+$/, "Must be a valid phone number")
      .required("Telephone number is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
    // customZip: Yup.string()
    //   .matches(/^\d+$/, "Custom Zip must be a number")
    //   .when("DeliveryAddress", {
    //     is: "Custom",
    //     then: Yup.string().required("Custom Zip is required"),
    //   }),
    // customCity: Yup.string().when("DeliveryAddress", {
    //   is: "Custom",
    //   then: Yup.string().required("Custom City is required"),
    // }),
    // customAddress: Yup.string().when("DeliveryAddress", {
    //   is: "Custom",
    //   then: Yup.string().required("Custom Address is required"),
    // }),
  });

  const initialValues = {
    name: "",
    address: "",
    zip: "",
    city: "",
    seller_id: "",
    contactPerson: "",
    phone: "",
    email: "",
    DeliveryAddress: "Same as address",
    countryCode: "+47",
    country: 0,
    customZip: "",
    customCity: "",
    customAddress: "",
  };
  const radios = [
    { name: t("customers_create.yes"), value: 1 },
    { name: t("customers_create.no"), value: 0 },
  ];

  const submitHandler = async (values) => {
    const payload = {
      ...values,
      ...(values.DeliveryAddress === "Custom" && {
        customZip: values.customZip,
        customCity: values.customCity,
        customAddress: values.customAddress,
      }),
    };

    const res = await POST(`${BASE_URL}/api/admin/customerCreate`, payload);

    if (res?.data?.status) {
      toast.dismiss();
      toast.success(res.data?.message);
      router.push("/kunder");
    } else {
      toast.dismiss();
      toast.error(res.data?.message);
    }
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <div className='d-flex justify-content-between w-100 align-items-center'>
            {/* <h2>Create customer</h2> */}
            <h2>{t("customers_create.create_customer")}</h2>
            <div className='bot-btn'>
              <Link
                href={"/kunder"}
                className='can-btn'
              >
                {t("customers_create.cancel")}
              </Link>
              <button
                type='submit'
                form='customerForm'
                className='cr-btn btn createorder_top_right'
              >
                {t("customers_create.create_customer")}
              </button>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form
              id='customerForm'
              className='row'
            >
              <div className='col-md-12'>
                <div className='shdw-crd crte-ordr'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group swtch-bt'>
                        <label htmlFor='Country'>Country</label>
                        {/* <label htmlFor='name'>
                          {t("customers_create.address")}
                        </label> */}
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
                              onChange={(e) => {
                                const value = Number(e.currentTarget.value);
                                setFieldValue("country", value);
                                setOrderConfirm(value);
                              }}
                            >
                              {radio.name}
                            </ToggleButton>
                          ))}
                        </ButtonGroup>
                      </div>
                      <div className='form-group'>
                        {/* <label htmlFor='name'>Name</label> */}
                        <label htmlFor='name'>
                          {t("customers_create.name")}
                        </label>
                        <Field
                          type='text'
                          id='name'
                          name='name'
                          className='form-control'
                        />
                        <ErrorMessage
                          name='name'
                          component='div'
                          className='text-danger'
                        />
                      </div>

                      {/* <div className='form-group'>
                        <label htmlFor='company'>Company</label>
                        <Field
                          as='select'
                          id='company'
                          name='company_id'
                          className='form-control'
                        >
                          <option value=''>Select company</option>
                          {companies.length &&
                            companies.map((company, i) => {
                              return (
                                <option
                                  key={i}
                                  value={company.id}
                                >
                                  {company.name}
                                </option>
                              );
                            })}
                          <option value='Q Idrettslag AS'>
                            Q Idrettslag AS
                          </option>
                        </Field>
                        <ErrorMessage
                          name='company_id'
                          component='div'
                          className='text-danger'
                        />
                      </div> */}

                      {/* <div className='form-group'>
                        <label htmlFor='orgnizationNumber'>
                          Organisation number
                        </label>
                        <Field
                          type='text'
                          id='orgnizationNumber'
                          name='orgnizationNumber'
                          className='form-control'
                        />
                        <ErrorMessage
                          name='orgnizationNumber'
                          component='div'
                          className='text-danger'
                        />
                      </div> */}

                      <div className='form-group'>
                        {/* <label htmlFor='address'>Address</label> */}
                        <label htmlFor='address'>
                          {t("customers_create.address")}
                        </label>
                        <Field
                          type='text'
                          id='address'
                          name='address'
                          className='form-control'
                        />
                        <ErrorMessage
                          name='address'
                          component='div'
                          className='text-danger'
                        />
                      </div>
                      <div className='form-group'>
                        {/* <label htmlFor='email'>Email address</label> */}
                        <label>{t("customers_create.email_address")}</label>
                        <Field
                          type='email'
                          id='email'
                          name='email'
                          className='form-control'
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className='text-danger'
                        />
                      </div>
                      <div className='form-group row'>
                        <div className='col-md-2'>
                          {/* <label htmlFor='zip'>Zip</label> */}
                          <label>{t("customers_create.zip")}</label>
                          <Field
                            type='text'
                            id='zip'
                            name='zip'
                            className='form-control'
                          />
                          <ErrorMessage
                            name='zip'
                            component='div'
                            className='text-danger'
                          />
                        </div>
                        <div className='col-md-10'>
                          {/* <label htmlFor='city'>City</label> */}
                          <label>{t("customers_create.city")}</label>
                          <Field
                            type='text'
                            id='city'
                            name='city'
                            className='form-control'
                          />
                          <ErrorMessage
                            name='city'
                            component='div'
                            className='text-danger'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='form-group'>
                        {/* <label htmlFor='seller'>Seller</label> */}
                        <label>{t("customers_create.seller")}</label>
                        <Field
                          as='select'
                          id='seller'
                          name='seller_id'
                          className='form-control'
                        >
                          {/* <option value=''>Select seller</option> */}
                          <option value=''>
                            {t("customers_create.select_seller")}
                          </option>
                          {(sellers.length &&
                            sellers.map((seller, i) => {
                              return (
                                <option
                                  key={i}
                                  value={seller.id}
                                >
                                  {seller.name}
                                </option>
                              );
                            })) || <option>Not Available</option>}
                        </Field>
                        <ErrorMessage
                          name='seller_id'
                          component='div'
                          className='text-danger'
                        />
                      </div>

                      <div className='form-group'>
                        {/* <label htmlFor='contactPerson'>Contact person</label> */}
                        <label>{t("customers_create.contact_person")}</label>
                        <Field
                          type='text'
                          id='ContactPerson'
                          name='contactPerson'
                          className='form-control'
                        />
                        <ErrorMessage
                          name='contactPerson'
                          component='div'
                          className='text-danger'
                        />
                      </div>

                      <div className='form-group'>
                        {/* <label htmlFor='phone'>Telephone number</label> */}
                        <label>{t("customers_create.telephone_number")}</label>
                        <div className='d-flex '>
                          <Field
                            as='select'
                            id='countryCode'
                            name='countryCode'
                            className='me-2 form-control'
                            style={{ maxWidth: "80px" }}
                          >
                            <option value='+47'>+47</option>
                            <option value='+46'>+46</option>
                          </Field>
                          <Field
                            type='text'
                            id='phone'
                            name='phone'
                            className='form-control'
                          />
                        </div>
                        <ErrorMessage
                          name='phone'
                          component='div'
                          className='text-danger'
                        />
                      </div>

                      <div className='form-group'>
                        <label>{t("customers_create.delivery_address")}</label>
                        <Field
                          as='select'
                          id='DeliveryAddress'
                          name='DeliveryAddress'
                          className='form-control'
                          onChange={(e) => {
                            const value = e.target.value;
                            setFieldValue("DeliveryAddress", value);
                            setIsCustom(value === "Custom");
                          }}
                        >
                          <option value='Same as address'>
                            {t("customers_create.same_as_address")}
                          </option>
                          <option value='Custom'>
                            {t("customers_create.other")}
                          </option>
                        </Field>
                      </div>
                      {isCustom && (
                        <>
                          <div className='form-group row'>
                            <div className='col-md-2'>
                              {/* <label htmlFor='zip'>Zip</label> */}
                              <label>{t("customers_create.zip")}</label>
                              <Field
                                type='text'
                                id='customZip'
                                name='customZip'
                                className='form-control'
                              />
                              <ErrorMessage
                                name='customZip'
                                component='div'
                                className='text-danger'
                              />
                            </div>
                            <div className='col-md-10'>
                              {/* <label htmlFor='city'>City</label> */}
                              <label>{t("customers_create.city")}</label>
                              <Field
                                type='text'
                                id='customCity'
                                name='customCity'
                                className='form-control'
                              />
                              <ErrorMessage
                                name='customCity'
                                component='div'
                                className='text-danger'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <label>{t("customers_create.address")}</label>
                            <Field
                              type='text'
                              id='customAddress'
                              name='customAddress'
                              className='form-control'
                              value={customAddress}
                              onChange={(e) => setCustomAddress(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default page;
