"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GET, POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CreateCustomerModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  // const [companies, setCompanies] = useState([]);
  const [sellers, setSeller] = useState([]);
  const [isCustom, setIsCustom] = useState(false);

  // const fetchCompanies = async () => {
  //   try {
  //     const res = await GET(`${BASE_URL}/api/admin/companyList`);
  //     if (res?.data?.status) {
  //       setCompanies(res?.data?.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching companies:", error);
  //   }
  // };

  const fetchSellers = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/roleSellerList`);
      if (res?.data?.status) {
        setSeller(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSellers();
      // fetchCompanies();
    }
  }, [isOpen]);

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
    contactPerson: Yup.string().required("Contact person is required"),
    phone: Yup.string()
      .matches(/^\+?\d+$/, "Must be a valid phone number")
      .required("Telephone number is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
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
    customZip: "",
    customCity: "",
    customAddress: "",
  };

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
      onClose(); // Close modal after success
    } else {
      toast.dismiss();
      toast.error(res.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-custmr-ad'>
        <div className='modal-container'>
          {/* <button
          className='modal-close'
          onClick={onClose}
        >
          ×
        </button> */}

          <div className='admin-header'>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <h2>Create Customer</h2>
              <div className='bot-btn'>
                <button
                  onClick={onClose}
                  className='can-btn btn createcustomer_btncmf px-5'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  form='customerForm'
                  className='cr-btn btn createcustomer_btn px-3'
                >
                  Create customer
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
                className='form-content'
              >
                <div className='col-md-12'>
                  <div className='crte-ordr'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label htmlFor='name'>Name</label>
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
                          <label htmlFor='email'>Email address</label>
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
                          <label htmlFor='address'>Address</label>
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
                          <div className='col-md-5'>
                            <label htmlFor='zip'>Zip</label>
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
                          <div className='col-md-7'>
                            <label htmlFor='city'>City</label>
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
                          <label htmlFor='seller'>Seller</label>
                          <Field
                            as='select'
                            id='seller'
                            name='seller_id'
                            className='form-control'
                          >
                            <option value=''>None</option>
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
                          <label htmlFor='contactPerson'>Contact person</label>
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
                          <label htmlFor='phone'>Telephone number</label>
                          <div className='d-flex'>
                            <Field
                              as='select'
                              id='countryCode'
                              name='countryCode'
                              className='me-2 form-control'
                              style={{ maxWidth: "70px" }}
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
                          <label htmlFor='DeliveryAddress'>
                            Delivery address
                          </label>
                          <Field
                            as='select'
                            id='DeliveryAddress'
                            name='DeliveryAddress'
                            className='form-control select_arrow_input'
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
                          <ErrorMessage
                            name='DeliveryAddress'
                            component='div'
                            className='text-danger'
                          />
                        </div>
                        {isCustom && (
                          <>
                            <div className='form-group'>
                              <label>{t("customers_create.address")}</label>
                              <Field
                                type='text'
                                id='customAddress'
                                name='customAddress'
                                className='form-control'
                                value={values.customAddress}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setFieldValue("customAddress", value);
                                }}
                              />
                            </div>
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
      </div>
    </div>
  );
};

export default CreateCustomerModal;
