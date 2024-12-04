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
import HideEye from "../../../../public/images/hide.svg";
import ShowEye from "../../../../public/images/showEye.svg";

const Login = () => {
  const router = useRouter();
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
          toast.dismiss();
          toast.success(res.data?.message);

          Cookies.set("dugnadstisadmin", res.data?.data?.token);
          router.push("/");
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
                <h1>Velkommen tilbake!</h1>
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className='login-frm'
              >
                <Form.Group
                  className='form-group'
                  controlId='formBasicEmail'
                >
                  <Form.Label>Brukernavn</Form.Label>
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
                  <Form.Label>Password</Form.Label>
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
                </Form.Group>

                <div className='text-center'>
                  <Button
                    className='btn-primary px-5 py-2'
                    type='submit'
                  >
                    LOGG INN
                  </Button>
                </div>
                <div className='pass-for text-center'>
                  <Link href='/order'>Glemt passord?</Link>
                </div>
                <p className='other-option'>
                  <span>eller</span>
                </p>

                <div className='text-center mt-5'>
                  <Link
                    className='login-other'
                    href='/'
                  >
                    <img
                      src='/images/smile-icon.png'
                      className='img-fluid'
                    />{" "}
                    Fortsett med Vipps
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
