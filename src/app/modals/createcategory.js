"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";

const CreateCategoryModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string()
      .required("Category name is required")
      .min(2, "Must be at least 2 characters"),
  });

  const initialValues = {
    categoryName: "",
  };

  const submitHandler = async (values) => {
    try {
      const payload = {
        language_id: 1,
        parent_category_id: "",
        name: values.categoryName,
      };
      const res = await POST(`${BASE_URL}/api/admin/categoryCreate`, payload);
      if (res?.data?.status) {
        toast.dismiss();
        toast.success("Category created successfully!");
        onClose();
      } else {
        toast.dismiss();
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to create category");
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
      padding: "20px",
      borderRadius: "8px",
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
    buttonPrimary: {
      backgroundColor: "#dc3545",
      border: "none",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonSecondary: {
      backgroundColor: "#6c757d",
      border: "none",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
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
        <h2 className='hedingtext_top'>Create Category</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {() => (
            <Form>
              <div style={styles.formGroup}>
                <label htmlFor='categoryName'>Category Name</label>
                <Field
                  id='categoryName'
                  name='categoryName'
                  type='text'
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                  }}
                />
                <ErrorMessage
                  name='categoryName'
                  component='div'
                  style={styles.errorText}
                />
              </div>

              <div
                className='d-flex justify-content-around'
                style={styles.actions}
              >
                <button
                  style={styles.buttonSecondary}
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  style={styles.buttonPrimary}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
