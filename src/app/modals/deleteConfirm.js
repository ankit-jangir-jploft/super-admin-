"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { useTranslation } from "react-i18next";

const DeleteConfirm = ({ isOpen, onClose, id }) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      const payload = {
        id: id,
      };

      const res = await POST(`${BASE_URL}/api/admin/UserDelete`, payload);
      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res?.data?.message);
        window.location.href = `/settings?type=seller`;
      } else {
        toast.dismiss();
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
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
      padding: "20px",
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
        {/* <button
          style={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button> */}
        <h2 className='hedingtext_top custom-pup-mn'>
          {t("confirm_delete.title")}
        </h2>

        <form
          onSubmit={handleDelete}
          className='createcategory_cumtm'
        >
          <div style={styles.formGroup}>
            <label className='text-center'>{t("confirm_delete.message")}</label>
          </div>

          <div
            className='d-flex justify-content-around'
            style={styles.actions}
          >
            <button
              className='can-btn btn createcustomer_btncmf px-5'
              onClick={() => onClose()}
            >
              {t("confirm_delete.cancel")}
            </button>
            <button
              className='cr-btn btn createcustomer_btn px-5'
              type='submit'
            >
              {t("confirm_delete.confirm")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteConfirm;
