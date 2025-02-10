"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

const DugnaderFilterModal = ({ show, isOpen, onClose, selectedStatus, setSelectedStatus, selectedSeller, setSelectedSeller, selectedSort, setSelectedSort, sellers }) => {
    const { t } = useTranslation();
    const modalRef = useRef();

    const statusOptions = [
        { value: "", label: t("dugnader.select_status") },
        { value: "active", label: t("dugnader.active") },
        { value: "inactive", label: t("dugnader.inactive") },
    ];

    const initialValues = {
        selectedStatus: selectedStatus || "",
        selectedSeller: selectedSeller || "",
        selectedSort: selectedSort || "", 
    };

    const handleSave = (values) => {
        const filterObject = {
            order_status: values.selectedStatus,
            seller_id: values.selectedSeller,
            sort_status: values.selectedSort === "asc" ? 0 : 1, 
        };
        setSelectedStatus(values.selectedStatus);
        setSelectedSeller(values.selectedSeller);
        setSelectedSort(values.selectedSort);
        onClose();

        console.log("Filter Object:", filterObject);
    };

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
            width: "666px", 
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
            marginBottom: "20px",
            position: "relative",
        },
        errorText: {
            color: "red",
            fontSize: "12px",
        },
        actions: {
            display: "flex",
            justifyContent: "center",
            marginTop: "49px",
            gap: "18px",
        },
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleCancel = () => {
        setSelectedStatus("");
        setSelectedSeller("");
        setSelectedSort("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.container} ref={modalRef}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                <h2 className='hedingtext_top custom-pup-mn'>{t("customer_status.change_status")}</h2>
                <Formik initialValues={initialValues} onSubmit={handleSave}>
                    {({ values, setFieldValue }) => (
                        <Form className='createcategory_cumtm'>
                            <div style={styles.formGroup}>
                                <h5>{t("customers.select_status")}</h5>
                                <Field as="select" name="selectedStatus" className="form-select">
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="selectedStatus" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup}>
                                <h5>{t("customers.select_seller")}</h5>
                                <Field as="select" name="selectedSeller" className="form-select">
                                    <option value="">{t("customers.select_seller")}</option>
                                    {sellers.map((seller) => (
                                        <option key={seller.seller_id} value={seller.seller_id}>
                                            {seller.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="selectedSeller" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup}>
                                <h5>{t("customers.sort_by_end_date")}</h5>
                                <Field as="select" name="selectedSort" className="form-select">
                                <option value="">{t("customers.select_statuss")}</option>
                                    <option value="asc">{t("customers.sort_ascending")}</option>
                                    <option value="desc">{t("customers.sort_descending")}</option>
                                </Field>
                            </div>
                            <div style={styles.actions}>
                                <button className='createorder_top_right btn_bg_delt w-50' type="button" onClick={handleCancel}>{t("orders.cancel")}</button>
                                <button className='cr-btn btn createcustomer_btn w-50' type="submit">{t("orders.save")}</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default DugnaderFilterModal;