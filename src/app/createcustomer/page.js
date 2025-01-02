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
  const [companies, setCompanies] = useState([]);
  const [sellers, setSeller] = useState([]);
  const [orderConfirm, setOrderConfirm] = useState(0);

  // const fetchCompanies = async () => {
  //   try {
  //     const res = await GET(`${BASE_URL}/api/admin/companyList`);
  //     if (res?.data?.status) {
  //       setCompanies(res?.data?.data);
  //     }
  //   } catch (error) {}
  // };

  const fetchSellers = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/sellerList`);
      if (res?.data?.status) {
        setSeller(res?.data?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchSellers();
    // fetchCompanies();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // company_id: Yup.string().required("Company is required"),
    // orgnizationNumber: Yup.string()
    //   .matches(/^\d+$/, "Must be a number")
    //   .required("Organisation number is required"),
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
    // DeliveryAddress: Yup.string().required("Delivery address is required"),
  });

  const initialValues = {
    name: "",
    // company_id: "",
    // orgnizationNumber: "",
    address: "",
    zip: "",
    city: "",
    seller_id: "",
    contactPerson: "",
    phone: "",
    email: "",
    DeliveryAddress: "",
    countryCode: "+47",
  };
  const radios = [
    { name: "No", value: 0 },
    { name: "Yes", value: 1 },
  ];
  const submitHandler = async (values) => {
    const res = await POST(`${BASE_URL}/api/admin/customerCreate`, values);
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
          {({ values, handleChange }) => (
            <Form
              id='customerForm'
              className='row'
            >
              <div className='col-md-12'>
                <div className='shdw-crd crte-ordr'>
                  <h3>#1391</h3>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group swtch-bt'>
                        {/* <label htmlFor='address'>Address</label> */}
                        <label htmlFor='name'>
                          {t("customers_create.address")}
                        </label>
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

                      <div className='form-group'>
                        {/* <label htmlFor='DeliveryAddress'>
                          Delivery address
                        </label> */}
                        <label>{t("customers_create.delivery_address")}</label>
                        <Field
                          as='select'
                          id='DeliveryAddress'
                          name='DeliveryAddress'
                          className='form-control'
                        >
                          <option value='Same as address'>
                            Same as address
                          </option>
                        </Field>
                        <ErrorMessage
                          name='DeliveryAddress'
                          component='div'
                          className='text-danger'
                        />
                      </div>
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
