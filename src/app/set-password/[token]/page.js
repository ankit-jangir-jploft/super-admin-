"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BARREL_OPTIMIZATION_PREFIX } from "next/dist/shared/lib/constants";

const page = ({}) => {
  const router = useRouter();
  const { token } = useParams();
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New password is required.")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[A-Z]/, "Password must include at least 1 uppercase letter.")
      .matches(/[a-z]/, "Password must include at least 1 lowercase letter.")
      .matches(/\d/, "Password must include at least 1 number.")
      .matches(
        /[@$!%*?&]/,
        "Password must include at least 1 special character (@$!%*?&)."
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match."),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = { password: values.confirmPassword };
        const res = await axios.post(
          `${BASE_URL}/api/admin/SuperAdminUpdatePassword?token=${token}`,
          payload
        );
        if (res?.data?.status) {
          toast.dismiss();
          toast.success(res.data?.message);
          router.push("/login"); // Redirect to login page
        } else {
          toast.dismiss();
          toast.error(res.data?.message);
        }
      } catch (error) {
        console.error("Error during password update:", error);
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
                <h1>Wachtwoord instellen!</h1>
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className='login-frm'
              >
                <Form.Group
                  className='form-group'
                  controlId='formBasicPassword'
                >
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    className='pe-5'
                    type={!newPasswordToggle ? "password" : "text"}
                    name='newPassword'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=''
                    isInvalid={
                      !!formik.errors.newPassword && formik.touched.newPassword
                    }
                  />
                  <img
                    // src={!eyeToggle ? HideEye : ShowEye}
                    src={
                      !newPasswordToggle
                        ? "/images/hide.svg"
                        : "/images/showEye.svg"
                    }
                    className='img-fluid input-icon'
                    onClick={() => setNewPasswordToggle(!newPasswordToggle)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className='form-group'
                  controlId='formBasicPassword'
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    className='pe-5'
                    type={!confirmPasswordToggle ? "password" : "text"}
                    name='confirmPassword'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=''
                    isInvalid={
                      !!formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                    }
                  />
                  <img
                    // src={!eyeToggle ? HideEye : ShowEye}
                    src={
                      !confirmPasswordToggle
                        ? "/images/hide.svg"
                        : "/images/showEye.svg"
                    }
                    className='img-fluid input-icon'
                    onClick={() =>
                      setConfirmPasswordToggle(!confirmPasswordToggle)
                    }
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className='text-center'>
                  <Button
                    className='btn-primary px-5 py-2'
                    type='submit'
                  >
                    Submit
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
