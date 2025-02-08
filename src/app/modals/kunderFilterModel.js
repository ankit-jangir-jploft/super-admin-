"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

const KunderFilterModal = ({ show, isOpen, onClose, selectedStatus, setSelectedStatus, selectedLead, setSelectedLead, selectedSeller, setSelectedSeller, selectedSort, setSelectedSort, sellers }) => {
    const { t } = useTranslation();
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const customerStatusOptions = {
        Created: t("customer_status.created"),
        "Ordered trial package": t("customer_status.ordered_trial_package"),
        "Started dugnad": t("customer_status.started_dugnad"),
        "Finished dugnad": t("customer_status.finished_dugnad"),
        "Not started": t("customer_status.not_started"),
    };

    const leadStatusOptions = {
        None: t("lead_option.none"),
        Warm: t("lead_option.warm"),
        Cold: t("lead_option.cold"),
        Luke: t("lead_option.luke"),
    };

    const initialValues = {
        selectedStatus: selectedStatus || [],
        selectedLead: selectedLead || "",
        selectedSeller: selectedSeller || "",
        selectedSort: selectedSort || "", 
    };

    useEffect(() => {
        if (isOpen) {
            setOpenDropdown(null); // Close all dropdowns when modal opens
        }
    }, [isOpen]);

    const handleSave = (values) => {
        console.log("values", values)
        // Determine sort status based on selected sort order
        const sortStatus = values.selectedSort === "asc" ? 0 : 1;

        // Create a filter object
        const filterObject = {
            order_status: values.selectedStatus,
            lead: values.selectedLead,
            seller_id: values.selectedSeller,
            sort_status: sortStatus, // Add sort status to the filter object
        };

        // Set the selected values in the parent component
        setSelectedStatus(values.selectedStatus);
        setSelectedLead(values.selectedLead);
        setSelectedSeller(values.selectedSeller);
        setSelectedSort(values.selectedSort);
        onClose();

        // You can also return the filterObject if needed
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
            width: "666px", // Match the width of FilterModal
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
        dropdown: {
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "10px 15px",
            borderRadius: "40px",
            marginBottom: "5px",
        },
        checkboxContainer: {
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "10px",
            position: "absolute",
            backgroundColor: "white",
            zIndex: "1000",
            width: "100%",
        },
    };

    const [openDropdown, setOpenDropdown] = useState(null);
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenDropdown(null);
                setShowStatusDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isOpen) return null;

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const handleCancel = () => {
        setSelectedStatus([]);
        setSelectedLead("");
        setSelectedSeller("");
        setSelectedSort("");
        onClose();
    };

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
                                <div style={styles.dropdown} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
                                    {values.selectedStatus.length > 0 ? values.selectedStatus.map(status => customerStatusOptions[status]).join(', ') : t("customers.select_statuss")}
                                </div>
                                {showStatusDropdown && (
                                    <div style={styles.checkboxContainer}>
                                        {Object.keys(customerStatusOptions).map((key) => (
                                            <div key={key}>
                                                <Field
                                                    type="checkbox"
                                                    name="selectedStatus"
                                                    value={key}
                                                    checked={values.selectedStatus.includes(key)}
                                                    onChange={() => {
                                                        const newStatus = values.selectedStatus.includes(key)
                                                            ? values.selectedStatus.filter((s) => s !== key)
                                                            : [...values.selectedStatus, key];
                                                        setFieldValue("selectedStatus", newStatus);
                                                    }}
                                                />
                                                <label>{customerStatusOptions[key]}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <ErrorMessage name="selectedStatus" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup }>
                                <h5>{t("customers.select_lead")}</h5>
                                <Field as="select" name="selectedLead" className="form-select">
                                    <option value="">{t("customers.select_statuss")}</option>
                                    {Object.keys(leadStatusOptions).map((key) => (
                                        <option key={key} value={key}>
                                            {leadStatusOptions[key]}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="selectedLead" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup}>
                                <h5>{t("customers.select_seller")}</h5>
                                <Field as="select" name="selectedSeller" className="form-select">
                                    <option value="">{t("customers.select_statuss")}</option>
                                    {sellers.map((seller) => (
                                        <option key={seller.seller_id} value={seller.seller_id}>
                                            {seller.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="selectedSeller" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup}>
                                <h5>{t("customers.sort_by_last_contact")}</h5>
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

export default KunderFilterModal;