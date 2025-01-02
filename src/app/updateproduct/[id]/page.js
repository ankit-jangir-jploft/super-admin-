"use client";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from "../../Utils/apiHelper";
import { GET, POST } from "../../Utils/apiFunctions";
import { toast } from "react-toastify";
import StateManagedSelect from "react-select";
import CreateCategoryModal from "@/app/modals/createcategory";
import { useTranslation } from "react-i18next";

const page = ({ params }) => {
  const { t } = useTranslation();
  const { id } = params;
  const fetchProductData = async () => {
    try {
      const options = { id: id };
      const res = await GET(`${BASE_URL}/api/admin/productDetail`, options);
      if (res?.data?.status == "true") {
        setFile(res.data?.data[0]?.images);
        setKeywords(res.data?.data[0]?.keywords);
        setChosendCategory(res.data?.data[0]?.category_id);
        setChosendSubCategory(res.data?.data[0]?.sub_category_id);
        const related = res.data?.data[0]?.related_products?.map((product) => {
          const value = product.id;
          const label = `${product.name} (${product.product_number})`;
          const id = product.id;
          return { value, label, id };
        });
        console.log("related -- ", related);
        setSelected(related);
        setForm({
          ProductNumber: res.data?.data[0]?.product_number || "",
          ProductName: res.data?.data[0]?.name || "",
          VisibleInStore: res.data?.data[0]?.product_status ? true : false,
          VisibleInProductGallery: res.data?.data[0]?.visible_in_productgallery
            ? true
            : false,
          Price: res.data?.data[0]?.price || 0,
          SalesPrice: res.data?.data[0]?.sale_price || 0,
          SpecialPrice: res.data?.data[0]?.speacial_price || "",
          Length: res.data?.data[0]?.height || "",
          Width: res.data?.data[0]?.width || "",
          Depth: res.data?.data[0]?.depth || "",
          Weight: res.data?.data[0]?.weight || "",
          gtin: res.data?.data[0]?.gtin || "",
          menuOrder: res.data?.data[0]?.menu_order || "",
          Display: res.data?.data[0]?.display || "",
          warehouseAddress: res.data?.data[0]?.warehouse_address || "",
          quantity: res.data?.data[0]?.quantity || "",
          keepStock: res.data?.data[0]?.stock_keep ? true : false,
          vat: res.data?.data[0]?.vat || "",
          vatClass: res.data?.data[0]?.vat_class || "",
          shortDescription: res.data?.data[0]?.short_description || "",
          ProductDescription: res.data?.data[0]?.product_description || "",
          PageDescription: res.data?.data[0]?.page_description || "",
          MetaDescription: res.data?.data[0]?.meta_description || "",
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  function handleChange(e) {
    setFile((prev) => [...prev, URL.createObjectURL(e.target.files[0])]);
    setFiles((prev) => [...prev, e.target.files[0]]);
  }

  const [categories, setCategories] = useState([]);
  const [chosendCategory, setChosendCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [chosendSubCategory, setChosendSubCategory] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [reletedProducts, setReleted] = useState([]);
  const [selectedReletedProducts, setSelected] = useState([]);
  const [productForm, setForm] = useState({
    ProductNumber: "",
    ProductName: "",
    VisibleInStore: false,
    VisibleInProductGallery: false,
    Price: "",
    SalesPrice: "",
    SpecialPrice: "",
    Length: "",
    Width: "",
    Depth: "",
    Weight: "",
    gtin: "",
    menuOrder: "",
    Display: "",
    warehouseAddress: "",
    quantity: "",
    keepStock: false,
    vat: "",
    vatClass: "",
    shortDescription: "",
    ProductDescription: "",
    PageDescription: "",
    MetaDescription: "",
  });
  const [errors, setErrors] = useState({});

  const options = reletedProducts.map((product) => {
    const value = product.id;
    const label = `${product.name} (${product.product_number})`;
    const id = product.id;
    return { value, label, id };
  });

  const fetchCategory = async () => {
    const res = await GET(`${BASE_URL}/api/admin/categoryList`);
    console.log(res);
    if (res?.data?.status === true) {
      setCategories(res.data?.data);
    }
  };

  const fetchSubCategory = async () => {
    const res = await GET(`${BASE_URL}/api/admin/subCategoryList`, {
      parent_category_id: chosendCategory || "",
    });
    if (res?.data?.status === true) {
      setSubCategories(res.data?.data);
    }
  };

  const fetchReleted = async () => {
    const payload = {
      category_id: chosendCategory || "",
      sub_category_id: chosendSubCategory || "",
    };
    const res = await GET(`${BASE_URL}/api/admin/relatedProductlist`, payload);
    if (res?.data?.status === "true") {
      setReleted(res.data?.data);
    }
  };

  const handleAddKeyword = () => {
    if (!keyword) {
      toast.dismiss();
      toast.error("Keyword cannot be empty");
      return;
    }
    if (!keywords.includes(keyword)) {
      setKeywords((prev) => [...prev, keyword]);
      setKeyword("");
    } else {
      toast.dismiss();
      toast.error(`${keyword} already exists`);
    }
  };

  const handleDeleteKeyword = (keywordToDelete) => {
    setKeywords((prev) =>
      prev.filter((keyword) => keyword !== keywordToDelete)
    );
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, [chosendCategory, chosendSubCategory]);

  useEffect(() => {
    fetchReleted();
  }, [chosendCategory, chosendSubCategory]);

  const validateForm = () => {
    let isValid = true;
    const tempErrors = {};

    if (!productForm.ProductNumber) {
      tempErrors.ProductNumber = "Product number is required.";
      isValid = false;
    }

    if (!productForm.ProductName) {
      tempErrors.ProductName = "Product name is required.";
      isValid = false;
    }

    if (!productForm.Price) {
      tempErrors.Price = "Price is required.";
      isValid = false;
    }

    if (!productForm.SalesPrice) {
      tempErrors.SalesPrice = "Sales price is required.";
      isValid = false;
    }

    if (!productForm.quantity) {
      tempErrors.quantity = "Quantity in stock required";
      isValid = false;
    }

    // if (!productForm.SpecialPrice) {
    //   tempErrors.SpecialPrice = "Special price is required.";
    //   isValid = false;
    // }

    if (!productForm.Length) {
      tempErrors.Length = "Length is required.";
      isValid = false;
    }

    if (!productForm.Width) {
      tempErrors.Width = "Width is required.";
      isValid = false;
    }

    if (!productForm.Depth) {
      tempErrors.Depth = "Depth is required.";
      isValid = false;
    }

    if (!productForm.Weight) {
      tempErrors.Weight = "Weight is required.";
      isValid = false;
    }

    // if (!files.length) {
    //   tempErrors.files = "Product image is required.";
    //   isValid = false;
    // }
    // if (!productForm.gtin) {
    //   tempErrors.gtin = "Gtin is required.";
    //   isValid = false;
    // }
    // if (!productForm.menuOrder) {
    //   tempErrors.menuOrder = "Menu Order is required.";
    //   isValid = false;
    // }

    // if (!productForm.quantity) {
    //   tempErrors.quantity = "Quantity is required.";
    //   isValid = false;
    // } else if (
    //   isNaN(productForm.quantity) ||
    //   Number(productForm.quantity) < 0
    // ) {
    //   tempErrors.quantity = "Quantity must be a non-negative number.";
    //   isValid = false;
    // }

    setErrors(tempErrors);
    return isValid;
  };

  const submitHandler = async () => {
    try {
      console.log("errors", errors);
      if (validateForm()) {
        const formData = new FormData();
        formData.append("category_id", chosendCategory ? chosendCategory : "");
        formData.append("price", productForm.Price);
        formData.append("sale_price", productForm.SalesPrice);
        formData.append("special_price", productForm.SpecialPrice);
        formData.append("height", productForm.Length);
        formData.append("width", productForm.Width);
        formData.append("depth", productForm.Depth);
        formData.append("wight", productForm.Weight);
        formData.append("gtin", productForm.gtin);
        formData.append("keyword", keywords);
        formData.append(
          "related_product_id",
          selectedReletedProducts.map((pr) => pr.id)
        );
        formData.append("name", productForm.ProductName);
        formData.append("product_number", productForm.ProductNumber);
        formData.append("product_status", productForm.VisibleInStore ? 1 : 0);
        formData.append(
          "visible_in_productgallery",
          productForm.VisibleInProductGallery ? 1 : 0
        );
        formData.append("display", productForm.Display);
        formData.append("warehouse_address", productForm.warehouseAddress);
        formData.append("quantity", productForm.quantity);
        formData.append("stock_keep", productForm.keepStock ? 1 : 0);
        formData.append("vat", productForm.vat);
        formData.append("vat_class", productForm.vatClass);
        formData.append("short_description", productForm.shortDescription);
        formData.append("description", productForm.ProductDescription);
        formData.append("my_page_description", productForm.PageDescription);
        formData.append("meta_description", productForm.MetaDescription);
        formData.append("sub_category_id", chosendSubCategory || "");
        formData.append("language_id", "1");
        formData.append("menu_order", productForm.menuOrder);

        files?.forEach((fi) => {
          formData.append("image[]", fi);
        });

        const res = await POST(
          `${BASE_URL}/api/admin/productUpdate?id=${id}`,
          formData
        );
        console.log("res.data", res.data);
        if (res?.data?.status) {
          toast.dismiss();
          toast.success(res.data?.message);
          window.location.href = "/produkter";
        } else {
          toast.dismiss();
          toast.error(res?.data?.message);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeFile = async (file) => {
    if (file?.id) {
      try {
        const payload = {
          id: file?.id,
          product_id: id,
        };
        const res = await POST(
          `${BASE_URL}/api/admin/productImageDelete`,
          payload
        );
        if (res?.data?.status) {
          toast.dismiss();
          toast.success(res.data?.message);
          fetchProductData();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setFiles((prev) => prev?.filter((f) => f?.name !== file?.name));
    }
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <div className='d-flex justify-content-between w-100 align-items-center'>
            {/* <h2>Update product</h2> */}
            <h2>{t("update_product.update_product")}</h2>
            <div className='bot-btn'>
              <Link
                href={"/produkter"}
                className='can-btn'
              >
                {/* Cancel */}
                <span>{t("update_product.cancel")}</span>
              </Link>
              <button
                className='cr-btn btn createorder_top_right'
                onClick={submitHandler}
              >
                {/* Update product */}
                <span>{t("update_product.update_product")}</span>
              </button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr'>
              <h3 className='ad-prdtse mb-4'>
                #123{" "}
                <Form.Select>
                  <option>English</option>
                </Form.Select>
              </h3>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Productnumber</Form.Label> */}
                    <Form.Label>{t("update_product.productnumber")}</Form.Label>
                    <Form.Control
                      value={productForm.ProductNumber}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          ProductNumber: e.target.value,
                        }))
                      }
                      isInvalid={!!errors?.ProductNumber}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.ProductNumber}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className='crpr-im'>
                    {file.map((fl, i) => {
                      return (
                        <>
                          {" "}
                          <img
                            key={i}
                            src={fl?.image}
                          />
                          <div
                            className='close_img_top'
                            onClick={() => {
                              removeFile(fl);
                            }}
                          >
                            X
                          </div>
                        </>
                      );
                    })}

                    <div className='cstm-fle'>
                      <input
                        type='file'
                        onChange={handleChange}
                      />
                      <span>
                        <img src='/images/image-upload.svg' />
                      </span>
                    </div>
                  </div>

                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      {/* <Form.Label>Category</Form.Label> */}
                      <Form.Label>{t("update_product.category")}</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          setChosendCategory(e.target.value);
                        }}
                        value={chosendCategory}
                      >
                        <option value=''>Select Category</option>
                        {(categories.length &&
                          categories?.map((cat, i) => {
                            return (
                              <option
                                key={i}
                                value={cat.id}
                              >
                                {cat.name}
                              </option>
                            );
                          })) || <option>Not Available</option>}
                      </Form.Select>
                    </div>
                    <button
                      className='add-btne'
                      onClick={() => {
                        setShowCreateCategory(true);
                      }}
                    >
                      +
                    </button>
                  </Form.Group>

                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      {/* <Form.Label>Sub category</Form.Label> */}
                      <Form.Label>
                        {t("update_product.sub_category")}
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => setChosendSubCategory(e.target.value)}
                        value={chosendSubCategory}
                      >
                        <option value=''>Select Sub Category</option>
                        {(subCategories.length &&
                          subCategories?.map((sub, i) => {
                            return (
                              <option
                                value={sub.id}
                                key={i}
                              >
                                {sub.name}
                              </option>
                            );
                          })) || <option>Not Available</option>}
                      </Form.Select>
                    </div>
                    <Link
                      href=''
                      className='add-btne'
                    >
                      +
                    </Link>
                  </Form.Group>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Price</Form.Label> */}
                        <Form.Label>{t("update_product.price")}</Form.Label>
                        <Form.Control
                          value={productForm.Price}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Price: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.Price}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Price}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Sales price</Form.Label> */}
                        <Form.Label>
                          {t("update_product.sales_price")}
                        </Form.Label>
                        <Form.Control
                          value={productForm.SalesPrice}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              SalesPrice: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.SalesPrice}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.SalesPrice}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Special price</Form.Label> */}
                        <Form.Label>
                          {t("update_product.special_price")}
                        </Form.Label>
                        <Form.Control
                          value={productForm.SpecialPrice}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              SpecialPrice: e.target.value,
                            }))
                          }
                          placeholder=''
                          isInvalid={!!errors?.SpecialPrice}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.SpecialPrice}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Length (cm)</Form.Label> */}
                        <Form.Label>{t("update_product.length")}</Form.Label>
                        <Form.Control
                          value={productForm.Length}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Length: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.Length}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Length}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Width (cm)</Form.Label> */}
                        <Form.Label>{t("update_product.width")}</Form.Label>
                        <Form.Control
                          value={productForm.Width}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Width: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.Width}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Width}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Depth (cm)</Form.Label> */}
                        <Form.Label>{t("update_product.depth")}</Form.Label>
                        <Form.Control
                          value={productForm.Depth}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Depth: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.Depth}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Depth}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Weight (g)</Form.Label> */}
                        <Form.Label>{t("update_product.weight")}</Form.Label>
                        <Form.Control
                          value={productForm.Weight}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Weight: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.Weight}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Weight}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>GTIN / EAN</Form.Label> */}
                        <Form.Label>{t("update_product.gtin_ean")}</Form.Label>
                        <Form.Control
                          value={productForm.gtin}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              gtin: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.gtin}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.gtin}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Menu order</Form.Label> */}
                        <Form.Label>
                          {t("update_product.menu_order")}
                        </Form.Label>
                        <Form.Control
                          value={productForm.menuOrder}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              menuOrder: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.menuOrder}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.menuOrder}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      {/* <Form.Label>Keywords</Form.Label> */}
                      <Form.Label>{t("update_product.keywords")}</Form.Label>
                      <Form.Control
                        placeholder=''
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleAddKeyword}
                      className='add-btne'
                    >
                      +
                    </button>
                  </Form.Group>

                  <ul className='tags-nm'>
                    {keywords.map((keyword, i) => {
                      return (
                        <li key={i}>
                          {keyword}{" "}
                          <img
                            onClick={() => handleDeleteKeyword(keyword)}
                            src='/images/cross.svg'
                          />
                        </li>
                      );
                    })}
                  </ul>

                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      {/* <Form.Label>Related products</Form.Label> */}
                      <Form.Label>
                        {t("update_product.related_products")}
                      </Form.Label>
                      {/* <Form.Control placeholder='Chose product' /> */}
                      <StateManagedSelect
                        isMulti
                        options={options}
                        value={selectedReletedProducts}
                        onChange={(selected) => {
                          setSelected(selected);
                        }}
                      />
                    </div>
                    <Link
                      href='/createproduct'
                      className='add-btne'
                    >
                      +
                    </Link>
                  </Form.Group>

                  {/* <ul className='tags-nm'>
                    {selectedReletedProducts.map((product, i) => {
                      return (
                        <li
                          key={i}
                          className='d-flex justify-content-between w-100'
                        >
                          {product.label}
                          <img src='/images/cross.svg' />
                        </li>
                      );
                    })}
                  </ul> */}
                </div>

                <div className='col-md-6'>
                  <Form.Group className='mb-3'>
                    <Form.Label className='d-flex justify-content-between'>
                      {/* Product name{" "} */}
                      {t("update_product.product_name")}{" "}
                      <Link href={""}>/julepakke-2-til-og-fra-lapper</Link>
                    </Form.Label>
                    <Form.Control
                      value={productForm.ProductName}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          ProductName: e.target.value,
                        }))
                      }
                      isInvalid={!!errors?.ProductName}
                    />
                    <Form.Control.Feedback>
                      {errors?.ProductName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className='row mt-5'>
                    <div className='col-md-6 cstm-chk'>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <input
                          type='checkbox'
                          name='VisibleInStore'
                          checked={productForm.VisibleInStore}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              VisibleInStore: e.target.checked,
                            }));
                          }}
                        />{" "}
                        <span className='mt-2 d-inline-block'>
                          {/* Visible in online store */}
                          {t("update_product.visible_in_online_store")}
                        </span>
                      </Form.Group>
                    </div>
                    <div className='col-md-6 cstm-chk'>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <input
                          type='checkbox'
                          name='VisibleInProductGallery'
                          checked={productForm.VisibleInProductGallery}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              VisibleInProductGallery: e.target.checked,
                            }));
                          }}
                        />{" "}
                        <span className='mt-2 d-inline-block'>
                          {/* Visible in productgallery (landing page) */}
                          {t(
                            "update_product.visible_in_productgallery_landing_page"
                          )}
                        </span>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Display</Form.Label> */}
                    {t("update_product.display")}
                    <Form.Select
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          Display: e.target.value,
                        }))
                      }
                    >
                      <option value={1}>Everywhere</option>
                    </Form.Select>
                  </Form.Group>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Warehouse location</Form.Label> */}
                        {t("update_product.warehouse_location")}
                        <Form.Control
                          value={productForm.warehouseAddress}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              warehouseAddress: e.target.value,
                            }))
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Quantity in stock</Form.Label> */}
                        {t("update_product.quantity_in_stock")}
                        <Form.Control
                          value={productForm.quantity}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              quantity: e.target.value,
                            }))
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className='col-md-4 cstm-chk'>
                      <Form.Label>&nbsp;</Form.Label>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <input
                          type='checkbox'
                          checked={productForm.keepStock}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              keepStock: e.target.checked,
                            }));
                          }}
                        />{" "}
                        {/* <span className='mt-2 d-inline-block'>Stock keep</span> */}
                        <span className='mt-2 d-inline-block'>
                          {t("update_product.stock_keep")}
                        </span>
                      </Form.Group>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6'>
                      <Form.Group className='mb-3'>
                        <Form.Label>VAT</Form.Label>
                        <Form.Select
                          value={productForm.vat}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              vat: e.target.value,
                            }));
                          }}
                        >
                          <option value={1}>Taxable</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className='col-md-6'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>VAT class</Form.Label> */}
                        <Form.Label>{t("update_product.vat_class")}</Form.Label>
                        <Form.Select
                          value={productForm.vatClass}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              vatClass: e.target.value,
                            }))
                          }
                        >
                          <option value={1}>Standard (25%)</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Short description</Form.Label> */}
                    <Form.Label>
                      {t("update_product.short_description")}
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      value={productForm.shortDescription}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          shortDescription: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Product description</Form.Label> */}
                    <Form.Label>
                      {t("update_product.product_description")}
                    </Form.Label>
                    <ReactQuill
                      theme='snow'
                      value={productForm.ProductDescription}
                      onChange={(val) =>
                        setForm((prev) => ({
                          ...prev,
                          ProductDescription: val,
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>My pages description</Form.Label> */}
                    <Form.Label>
                      {t("update_product.my_page_description")}
                    </Form.Label>
                    <Form.Control
                      value={productForm.PageDescription}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          PageDescription: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Meta description</Form.Label> */}
                    <Form.Label>
                      {t("update_product.meta_description")}
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      value={productForm.MetaDescription}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          MetaDescription: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                </div>
              </div>
              <hr className='mt-5 mb-1'></hr>
              <div className='fotr-bot'>
                {/* <p>Created at: 03.11.2024</p>
                <p>Updated at: 04.11.2024 17:11</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateCategoryModal
        onClose={() => {
          setChosendCategory(false);
          fetchCategory();
        }}
        isOpen={showCreateCategory}
      />
    </>
  );
};
export default page;
