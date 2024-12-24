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
import { BASE_URL } from "../Utils/apiHelper";

const page = () => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/api/admin/superAdminforgotPassword`,
          values
        );
        if (res?.data?.status) {
          console.log(res.data);

          toast.dismiss();
          toast.success(res.data?.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          toast.dismiss();
          toast.error(res.data?.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false);
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
                <h1>Wachtwoord vergeten</h1>
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

                <div className='text-center'>
                  <Button
                    disabled={loading}
                    className='btn-primary px-5 py-2'
                    type='submit'
                  >
                    {loading ? "Sending..." : "Send"}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default page;
