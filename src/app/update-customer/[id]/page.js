"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET, POST } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const page = ({ params }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = params;
  const [sellers, setSeller] = useState([]);
  const [orderConfirm, setOrderConfirm] = useState(0);
  const [initialValues, setValues] = useState({});
  const [customAddress, setCustomAddress] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const fetchSellers = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/roleSellerList`);
      if (res?.data?.status) {
        setSeller(res?.data?.data);
      }
    } catch (error) {}
  };

  const fetchCustomerDetails = async () => {
    try {
      const options = {
        id: id,
      };
      const res = await GET(
        `${BASE_URL}/api/admin/customerDetailShow`,
        options
      );

      if (res?.data?.status) {
        setValues({
          name: res.data?.data?.name,
          address: res.data?.data?.address,
          zip: res.data?.data?.zip,
          city: res.data?.data?.city,
          seller_id: res.data?.data?.seller_id,
          contactPerson: res.data?.data?.contactPerson,
          phone: res.data?.data?.phone,
          email: res.data?.data?.email,
          DeliveryAddress: res.data?.data?.DeliveryAddress,
          countryCode: res.data?.data?.countryCode,
          country: res.data?.data?.country || 0,
          customZip: res.data?.data?.customZip,
          customCity: res.data?.data?.customCity,
          customAddress: res.data?.data?.customAddress,
        });
        setOrderConfirm(res.data?.data?.country || 0);
        setIsCustom(res.data?.data?.DeliveryAddress === "Custom");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSellers();
    fetchCustomerDetails();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("customers_create.name_required")),
    address: Yup.string().required(t("customers_create.address_required")),
    zip: Yup.string()
      .matches(/^\d+$/, t("customers_create.zip_must_be_number"))
      .required(t("customers_create.zip_required")),
    city: Yup.string().required(t("customers_create.city_required")),
    contactPerson: Yup.string().required(
      t("customers_create.contact_person_required")
    ),
    phone: Yup.string()
      .matches(/^\+?\d+$/, t("customers_create.valid_phone_number"))
      .required(t("customers_create.phone_required")),
    email: Yup.string()
      .email(t("customers_create.invalid_email"))
      .required(t("customers_create.email_required")),
    // Uncomment the following if you have conditional validation for custom fields
    // customZip: Yup.string()
    //   .matches(/^\d+$/, t("customers_create.custom_zip_must_be_number"))
    //   .when("DeliveryAddress", {
    //     is: "Custom",
    //     then: Yup.string().required(t("customers_create.custom_zip_required")),
    //   }),
    // customCity: Yup.string().when("DeliveryAddress", {
    //   is: "Custom",
    //   then: Yup.string().required(t("customers_create.custom_city_required")),
    // }),
    // customAddress: Yup.string().when("DeliveryAddress", {
    //   is: "Custom",
    //   then: Yup.string().required(t("customers_create.custom_address_required")),
    // }),
  });

  const radios = [
    { name: t("customers_create.yes"), value: 1 },
    { name: t("customers_create.no"), value: 0 },
  ];
  const submitHandler = async (values) => {
    const payload = { ...values, id: id };
    const res = await POST(`${BASE_URL}/api/admin/customerUpdate`, payload);
    if (res?.data?.status) {
      toast.dismiss();
      toast.success(res.data?.message);
      router.push(`/kunderdetail/${id}`);
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
            <h2>{t("customers_create.update_customer")}</h2>
            <div className='bot-btn'>
              <Link
                href={`/kunderdetail/${id}`}
                className='can-btn'
              >
                {t("customers_create.cancel")}
              </Link>
              <button
                type='submit'
                form='customerForm'
                className='cr-btn btn createorder_top_right'
              >
                {t("customers_create.update_customer")}
              </button>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
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
                              name='country'
                              value={radio.value}
                              checked={values.country === radio.value}
                              onChange={() => {
                                setOrderConfirm(radio.value); // Update local state
                                handleChange({
                                  target: {
                                    name: "country",
                                    value: radio.value,
                                  }, // Mimic form input change
                                });
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
                          <option value=''>{t("customers_create.none")}</option>
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
                            setIsCustom(value === "Custom");
                            setFieldValue("DeliveryAddress", value);
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
                          <div className='form-group'>
                            <label>{t("customers_create.address")}</label>
                            <Field
                              type='text'
                              id='customAddress'
                              name='customAddress'
                              className='form-control'
                              value={values.customAddress} // Use Formik's value
                              onChange={(e) => {
                                const value = e.target.value;
                                setFieldValue("customAddress", value); // Update Formik's state
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
    </>
  );
};

export default page;
