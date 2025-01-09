"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { useTranslation } from "react-i18next";

const CreateLeadModal = ({ isOpen, onClose, id, orderId }) => {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    leadType: Yup.string().required("Lead type is required"),
  });

  const initialValues = {
    leadType: "",
  };

  const submitHandler = async (values) => {
    try {
      const payload = {
        customer_id: id,
        customer_status: values.leadType,
        order_id: orderId,
      };
      const res = await POST(
        `${BASE_URL}/api/admin/customerUpdateStatus`,
        payload
      );
      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res?.data?.message);
        onClose();
      } else {
        toast.dismiss();
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to create lead");
    }
  };

  if (!isOpen) return null;

  // Inline Styles
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    container: {
      backgroundColor: "#fff",
      padding: "0",
      borderRadius: "20px",
      width: "400px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
    },
    formGroup: {
      marginBottom: "15px",
    },
    errorText: {
      color: "red",
      fontSize: "12px",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      marginTop: "15px",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <button
          style={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>
        <h2 className='hedingtext_top custom-pup-mn'>
          {t("customer_status.change_status")}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {() => (
            <Form className='createcategory_cumtm'>
              <div style={styles.formGroup}>
                <label htmlFor='leadType'>
                  {t("customer_status.customer_status")}
                </label>
                <Field
                  as='select'
                  id='leadType'
                  name='leadType'
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    marginTop: "5px",
                    borderRadius: "40px",
                    border: "1px solid #ced4da",
                  }}
                >
                  <option
                    value=''
                    label={t("customer_status.select_status")}
                  ></option>
                  <option
                    value='Created'
                    label={t("customer_status.created")}
                  ></option>
                  <option
                    value='Ordered trial package'
                    label={t("customer_status.ordered_trial_package")}
                  ></option>
                  <option
                    value='Started dugnad'
                    label={t("customer_status.started_dugnad")}
                  ></option>
                  <option
                    value='Finished dugnad'
                    label={t("customer_status.finished_dugnad")}
                  ></option>
                  <option
                    value='Not started'
                    label={t("customer_status.not_started")}
                  ></option>
                </Field>
                <ErrorMessage
                  name='leadType'
                  component='div'
                  style={styles.errorText}
                />
              </div>
              <div style={styles.actions}>
                <button
                  className='cr-btn btn createcustomer_btn px-5'
                  type='submit'
                >
                  {t("customer_status.submit")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateLeadModal;
