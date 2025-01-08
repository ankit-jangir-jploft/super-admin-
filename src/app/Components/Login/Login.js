"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../../i18n";

const Login = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [eyeToggle, setToggle] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[A-Z]/, "Password must include at least 1 uppercase letter.")
      .matches(/[a-z]/, "Password must include at least 1 lowercase letter.")
      .matches(/\d/, "Password must include at least 1 number.")
      .matches(
        /[@$!%*?&]/,
        "Password must include at least 1 special character (@$!%*?&)."
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${BASE_URL}/api/admin/login`, values);
        if (res?.data?.status) {
          console.log("res?.data?.", res?.data);

          toast.dismiss();
          toast.success(res.data?.message);
          console.log("login response", res?.data?.data);
          Cookies.set("dugnadstisadmin", res.data?.data?.token);
          Cookies.set("user", JSON.stringify(res.data.data?.user));
          const language = res.data?.data?.user?.language_id || "en";
          Cookies.set("i18next", language, {
            expires: 365,
            path: "/dashboard",
          });
          changeLanguage(language);
          window.location.href = "/";
          Cookies.set("roleType", res.data?.data?.user?.role_type);
          if (res.data?.data?.user?.role_type === "warehouse") {
            window.location.href = "/order";
          } else {
            window.location.href = "/";
          }
        } else {
          toast.dismiss();
          toast.error(res.data?.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <>
      <section className='login-section'>
        <Container>
          <Row className='justify-content-center'>
            <Col
              lg={4}
              md={10}
            >
              <div className='text-center mt-5 pt-5 mb-4'>
                <img
                  src='/images/logo.png'
                  className='img-fluid'
                />
              </div>
              <div className='title-login text-center'>
                {/* <h1>Velkommen tilbake!</h1> */}
                <h1>{t("loginpage.welcome_back")}</h1>
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className='login-frm'
              >
                <Form.Group
                  className='form-group'
                  controlId='formBasicEmail'
                >
                  {/* <Form.Label>Epostadresse</Form.Label> */}
                  <Form.Label>{t("loginpage.username")}</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=''
                    isInvalid={!!formik.errors.email && formik.touched.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className='form-group'
                  controlId='formBasicPassword'
                >
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Label>{t("loginpage.password")}</Form.Label>
                  <Form.Control
                    className='pe-5'
                    type={!eyeToggle ? "password" : "text"}
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=''
                    isInvalid={
                      !!formik.errors.password && formik.touched.password
                    }
                  />
                  <img
                    // src={!eyeToggle ? HideEye : ShowEye}
                    src={
                      !eyeToggle ? "/images/hide.svg" : "/images/showEye.svg"
                    }
                    className='img-fluid input-icon'
                    onClick={() => setToggle(!eyeToggle)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <div className='pass-for text-end'>
                  {/* <Link href='/forgot-password'>Glemt passord?</Link> */}
                  <Link href='/forgot-password'>
                    {t("loginpage.forgot_password")}
                  </Link>
                </div>
                </Form.Group>

                <div className='text-center mb-4'>
                  <Button
                    className='btn-primary w-100 px-5 py-2'
                    type='submit'
                  >
                    {t("loginpage.log_in")}
                  </Button>
                </div>
            
                <p className='other-option'>
                  {/* <span>eller</span> */}
                  <span>{t("loginpage.or")}</span>
                </p>

                <div className='text-center mt-5'>
                  <Link
                    className='login-other w-100'
                    href='/'
                  >
                    <img
                      src='/images/smile-icon.png'
                      className='img-fluid'
                    />{" "}
                    {t("loginpage.continue_with_vipps")}
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className='justify-content-center mt-5 text-center'>
            <Col
              lg={12}
              md={12}
            >
              <p className='copyright'>
                2024 © Dugnadstid.no - {t("loginpage.all_rights_reserved")}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
