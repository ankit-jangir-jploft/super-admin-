"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { GET, POST } from '../Utils/apiFunctions'; // Ensure you import your GET function
import { BASE_URL } from '../Utils/apiHelper'; // Ensure you import your BASE_URL
import { toast } from 'react-toastify'; // Ensure you import toast for error handling

const ProductFilterModal = ({ show, isOpen, onClose, selectedStockOrder, setSelectedStockOrder, selectedCategories, setSelectedCategories, selectedSubcategories, setSelectedSubcategories, categories }) => {
    const { t } = useTranslation();
    const modalRef = useRef();
    const [subcategories, setSubcategories] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);
    const [isSubcategoryDisabled, setIsSubcategoryDisabled] = useState(true); // State to manage subcategory dropdown
     const [openDropdown, setOpenDropdown] = useState(null);

    const initialValues = {
        selectedStockOrder: selectedStockOrder || "asc",
        selectedCategories: selectedCategories || [],
        selectedSubcategories: selectedSubcategories || [],
    };

    const handleSave = (values) => {
        const filterObject = {
            stock_order: values.selectedStockOrder,
            categories: values.selectedCategories,
            subcategories: values.selectedSubcategories,
        };

        setSelectedStockOrder(values.selectedStockOrder);
        setSelectedCategories(values.selectedCategories);
        setSelectedSubcategories(values.selectedSubcategories);
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

    useEffect(() => {
        if (isOpen) {
            // Reset subcategories and disable dropdown when modal opens
            setSubcategories([]);
            setIsSubcategoryDisabled(true);
            setOpenDropdown(null); // Close all dropdowns when modal opens
        }
    }, [isOpen]);

    const fetchSubcategories = async (categories) => {
        if (categories.length > 0) {
            try {
                const payload = {
                    filters: {
                        category_ids: categories,
                        sub_category_ids: [],
                        sort_status: "",
                    },
                };
                const res = await POST(`${BASE_URL}/api/admin/subCategoryListFilter`, payload);
                if (res?.data?.status) {
                    setSubcategories(res.data.data);
                    setIsSubcategoryDisabled(false); // Enable subcategory dropdown
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        } else {
            setSubcategories([]); // Clear subcategories if no category is selected
            setIsSubcategoryDisabled(true); // Disable subcategory dropdown
        }
    };

    useEffect(() => {
        if (selectedCategories.length > 0) {
            fetchSubcategories(selectedCategories);
            setIsSubcategoryDisabled(false); 
        } else {
            setSubcategories([]);
            setIsSubcategoryDisabled(true); 
        }
    }, [selectedCategories]);


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
        setSelectedSubcategories([]);
        setSelectedStockOrder("");
        setSelectedCategories([]);
        onClose();
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown); // Toggle dropdown
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.container} ref={modalRef}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                <h2 className='hedingtext_top custom-pup-mn'>{t("products.filter")}</h2>
                <Formik initialValues={initialValues} onSubmit={handleSave}>
                    {({ values, setFieldValue }) => (
                        <Form className='createcategory_cumtm'>
                            <div style={styles.formGroup}>
                                <h5>{t("products.sort_by_stock")}</h5>
                                <Field as="select" name="selectedStockOrder" className="form-select">
                                    <option value="asc">{t("customers.sort_ascending")}</option>
                                    <option value="desc">{t("customers.sort_descending")}</option>
                                </Field>
                                <ErrorMessage name="selectedStockOrder" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup}>
                                <h5>{t("products.select_category")}</h5>
                                <div style={styles.dropdown} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                                    {values.selectedCategories.length > 0 ? values.selectedCategories.map(id => categories.find(cat => cat.id === id)?.name).join(', ') : t("products.select_category")}
                                </div>
                                {showCategoryDropdown && (
                                    <div style={styles.checkboxContainer}>
                                        {categories.map((category) => (
                                            <div key={category.id}>
                                                <Field
                                                    type="checkbox"
                                                    name="selectedCategories"
                                                    value={category.id}
                                                    checked={values.selectedCategories.includes(category.id)}
                                                    onChange={() => {
                                                        const newCategories = values.selectedCategories.includes(category.id)
                                                            ? values.selectedCategories.filter((id) => id !== category.id)
                                                            : [...values.selectedCategories, category.id];
                                                        setFieldValue("selectedCategories", newCategories);
                                                        fetchSubcategories(newCategories); // Fetch subcategories on category change
                                                    }}
                                                />
                                                <label>{category.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <ErrorMessage name="selectedCategories" component="div" style={styles.errorText} />
                            </div>
                            <div style={styles.formGroup}>
                                <h5>{t("products.select_subcategory")}</h5>
                                <div
                                    style={{
                                        ...styles.dropdown,
                                        cursor: isSubcategoryDisabled ? "not-allowed" : "pointer",
                                        opacity: isSubcategoryDisabled ? 0.5 : 1
                                    }}
                                    onClick={() => {
                                        if (!isSubcategoryDisabled) {
                                            setShowSubcategoryDropdown(!showSubcategoryDropdown);
                                        }
                                    }}
                                >
                                    {values.selectedSubcategories.length > 0
                                        ? values.selectedSubcategories.map(id => subcategories.find(sub => sub.id === id)?.name).join(', ')
                                        : t("products.select_subcategory")
                                    }
                                </div>

                                {showSubcategoryDropdown && (
                                    <div style={styles.checkboxContainer}>
                                        {subcategories.map((subcategory) => (
                                            <div key={subcategory.id}>
                                                <Field
                                                    type="checkbox"
                                                    name="selectedSubcategories"
                                                    value={subcategory.id}
                                                    checked={values.selectedSubcategories.includes(subcategory.id)}
                                                    onChange={() => {
                                                        const newSubcategories = values.selectedSubcategories.includes(subcategory.id)
                                                            ? values.selectedSubcategories.filter((id) => id !== subcategory.id)
                                                            : [...values.selectedSubcategories, subcategory.id];
                                                        setFieldValue("selectedSubcategories", newSubcategories);
                                                    }}
                                                />
                                                <label>{subcategory.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <ErrorMessage name="selectedSubcategories" component="div" style={styles.errorText} />
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

export default ProductFilterModal;