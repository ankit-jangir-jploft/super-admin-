"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { useTranslation } from "react-i18next";

const CreateLeadModal = ({ isOpen, onClose, id }) => {
  const {t} = useTranslation()
  const validationSchema = Yup.object().shape({
    leadType: Yup.string().required("Lead type is required"),
  });

  const initialValues = {
    leadType: "",
  };

  const submitHandler = async (values) => {
    try {
      const payload = {
        user_id: id,
        lead_status: values.leadType,
      };
      const res = await POST(`${BASE_URL}/api/admin/userLeadStatus`, payload);
      if (res?.data?.status) {
        toast.dismiss();
        toast.success("Lead created successfully!");
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
        <h2 className='hedingtext_top custom-pup-mn'>{t('lead_option.create_lead')}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {() => (
            <Form className='createcategory_cumtm'>
              <div style={styles.formGroup}>
                <label htmlFor='leadType'>{t('lead_option.lead_type')}</label>
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
                    label={t('lead_option.select_lead_type')}
                  />
                  <option
                    value='warm'
                    label={t('lead_option.warm')}
                  />
                  <option
                    value='cold'
                    label={t('lead_option.cold')}
                  />
                  <option
                    value='luke'
                    label={t('lead_option.luke')}
                  />
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
                  {t('lead_option.submit')}
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
