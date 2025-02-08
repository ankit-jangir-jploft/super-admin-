"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const FilterModal = ({ show, isOpen, onClose, selectedStatus, setSelectedStatus, selectedOrigin, setSelectedOrigin, sellers, selectedSeller, setSelectedSeller }) => {
    const { t } = useTranslation();
    const lang = Cookies.get("i18next");

    const orders = {
        0: { name: t("order_status.ordered"), style: "ordered" },
        1: { name: t("order_status.ready_for_picking"), style: "ready_for_picking" },
        2: { name: t("order_status.currently_picking"), style: "currently_picking" },
        3: { name: t("order_status.sent"), style: "ready_for_picking" },
        4: { name: t("order_status.in_transit"), style: "in_transit" },
        5: { name: t("order_status.delivered"), style: "ready_for_picking" },
        6: { name: t("order_status.completed"), style: "completed" },
        7: { name: t("order_status.canceled"), style: "canceled" },
        8: { name: t("order_status.on_hold"), style: "on_hold" },
    };

    const originsMapping = {
        "Fullført dugnad": "Finished dugnad",
        "Direkte fra nettbutikken": "Direct from webstore",
        "Manuell ordre": "Manual order",
        "Direkte til postkassen": "Directly to mailbox",
        "Prøvepakke": "Trial package",
        "Salgsbrosjyrer": "Sales brochures",
    };

    const getTranslatedOrigins = () => {
        console.log("lang", lang)
        console.log(" Object.values(originsMapping)", Object.values(originsMapping))
        return lang === "nor" ? Object.keys(originsMapping) : Object.values(originsMapping);
    };

    const getOriginDisplayText = (origin) => {
        return lang === "nor" ? origin : originsMapping[origin] || origin;
    };

    const initialValues = {
        selectedStatus: selectedStatus || [],
        selectedOrigin: selectedOrigin || [],
        selectedSeller: selectedSeller || "",
    };

    const handleSave = (values) => {
        console.log("values", values)
        const filterObject = {
            order_status: values.selectedStatus.map(status => orders[status].name),
            origin: values.selectedOrigin,
            seller_id: values.selectedSeller,
        };

        console.log("Selected Status:", values.selectedStatus);
        console.log("Selected Origin:", values.selectedOrigin);
        console.log("Filter Object:", filterObject);

        setSelectedStatus(values.selectedStatus);
        setSelectedOrigin(values.selectedOrigin);
        setSelectedSeller(values.selectedSeller);
        onClose();
    };

    console.log("selectedOrigin", selectedOrigin)

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
        setSelectedOrigin([]);
        setSelectedSeller("");
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
                                <div style={styles.dropdown} onClick={() => toggleDropdown('status')}>
                                    {values.selectedStatus.length > 0
                                        ? values.selectedStatus.map(status => orders[status].name).join(', ')
                                        : t("customers.select_statuss")}
                                </div>
                                {openDropdown === 'status' && (
                                    <div style={styles.checkboxContainer}>
                                        {Object.keys(orders).map((key) => (
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
                                                <label>{orders[key].name}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <ErrorMessage name="selectedStatus" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup}>
                                <h5>{t("orders.select_origin")}</h5>
                                <div style={styles.dropdown} onClick={() => toggleDropdown('origin')}>
                                    {values.selectedOrigin.length > 0
                                        ? values.selectedOrigin.map(origin => getOriginDisplayText(origin)).join(', ')
                                        : t("customers.select_statuss")}
                                </div>
                                {openDropdown === 'origin' && (
                                    <div style={styles.checkboxContainer}>
                                        {getTranslatedOrigins().map((origin, index) => {
                                            console.log("origin", origin)
                                            return (
                                                <div key={index}>
                                                    <Field
                                                        type="checkbox"
                                                        name="selectedOrigin"
                                                        value={origin}
                                                        checked={values.selectedOrigin.includes(origin)}
                                                        onChange={() => {
                                                            const newOrigin = values.selectedOrigin.includes(origin)
                                                                ? values.selectedOrigin.filter((o) => o !== origin)
                                                                : [...values.selectedOrigin, origin];
                                                            console.log("Origin before update:", values.selectedOrigin);
                                                            console.log("Origin after update:", newOrigin);
                                                            setFieldValue("selectedOrigin", newOrigin);
                                                        }}
                                                    />
                                                    <label className='lables'>{origin}</label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <ErrorMessage name="selectedOrigin" component="div" style={styles.errorText} />
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

export default FilterModal;