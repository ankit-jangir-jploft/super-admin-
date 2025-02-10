"use client";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from "../Utils/apiHelper";
import { GET, POST } from "../Utils/apiFunctions";
import { toast } from "react-toastify";
import StateManagedSelect from "react-select";
import { useRouter } from "next/navigation";
import CreateCategoryModal from "../modals/createcategory";
import CreateSubCategoryModal from "../modals/createsubcategory";
import { useTranslation } from "react-i18next";

const page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  let [count, setCount] = useState(0);

  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateSubCategory, setShowCreateSubCategory] = useState(false);

  function handleChange(e) {
    const theFile = e.target.files[0];
    if (!theFile) return;

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (theFile.size > maxSize) {
      toast.error("File size is too large. Maximum allowed size is 2MB.");
      return;
    }

    setFile((prev) => [...prev, URL.createObjectURL(e.target.files[0])]);
    setFiles((prev) => [...prev, e.target.files[0]]);
  }
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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
    Display: "Everywhere",
    warehouseAddress: "",
    quantity: "",
    keepStock: false,
    vat: "taxable",
    vatClass: "",
    shortDescription: "",
    ProductDescription: "",
    PageDescription: "",
    MetaDescription: "",
    VisibleForDirectSales: false,
    language: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (parseInt(productForm.quantity, 10) > 0) {
      setForm((prev) => ({
        ...prev,
        keepStock: true,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        keepStock: false,
      }));
    }
  }, [productForm.quantity]);

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

    console.log("Sub", res);

    if (res?.data?.status === true) {
      setSubCategories(res.data?.data);
    }
  };

  const fetchVatClass = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/getsetting`);
      console.log(
        "res?.data?.data?.vat_class --- ",
        res?.data?.data?.vat_class
      );

      if (res?.data?.status) {
        setForm((prev) => ({
          ...prev,
          vatClass: res?.data?.data?.vat_class || 12,
          vat: res?.data?.data?.vat_class == 0 ? "" : "taxable",
        }));
      }
    } catch (error) {
      console.error("Error fetching VAT class:", error);
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
  }, [chosendCategory]);

  useEffect(() => {
    fetchReleted();
  }, [chosendCategory, chosendSubCategory]);

  useEffect(() => {
    fetchVatClass();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const tempErrors = {};

    if (!productForm.ProductNumber) {
      tempErrors.ProductNumber = t("create_product.product_number_required");
      isValid = false;
    }

    if (!productForm.ProductName) {
      tempErrors.ProductName = t("create_product.product_name_required");
      isValid = false;
    }

    if (!productForm.Price) {
      tempErrors.Price = t("create_product.price_required");
      isValid = false;
    }

    if (!productForm.SalesPrice) {
      tempErrors.SalesPrice = t("create_product.sales_price_required");
      isValid = false;
    }

    if (productForm.keepStock && !productForm.quantity) {
      tempErrors.quantity = t("create_product.quantity_required");
      isValid = false;
    }

    if (!chosendCategory) {
      tempErrors.chosendCategory = t("create_product.category_required");
      isValid = false;
    }

    // Uncomment these if you need validation for these fields
    // if (!productForm.SpecialPrice) {
    //   tempErrors.SpecialPrice = t("create_product.special_price_required");
    //   isValid = false;
    // }

    // if (!productForm.Length) {
    //   tempErrors.Length = t("create_product.length_required");
    //   isValid = false;
    // }

    // if (!productForm.Width) {
    //   tempErrors.Width = t("create_product.width_required");
    //   isValid = false;
    // }

    // if (!productForm.Depth) {
    //   tempErrors.Depth = t("create_product.depth_required");
    //   isValid = false;
    // }

    // if (!productForm.Weight) {
    //   tempErrors.Weight = t("create_product.weight_required");
    //   isValid = false;
    // }

    if (!files.length) {
      tempErrors.files = t("create_product.product_image_required");
      isValid = false;
    }

    // if (!productForm.gtin) {
    //   tempErrors.gtin = t("create_product.gtin_required");
    //   isValid = false;
    // }

    // if (!productForm.menuOrder) {
    //   tempErrors.menuOrder = t("create_product.menu_order_required");
    //   isValid = false;
    // }

    // Example of more advanced validation
    // if (!productForm.quantity) {
    //   tempErrors.quantity = t("create_product.quantity_required");
    //   isValid = false;
    // } else if (isNaN(productForm.quantity) || Number(productForm.quantity) < 0) {
    //   tempErrors.quantity = t("create_product.quantity_non_negative");
    //   isValid = false;
    // }

    setErrors(tempErrors);
    return isValid;
  };

  const submitHandler = async () => {
    try {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("category_id", chosendCategory);
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
        formData.append(
          "quantity",
          productForm.quantity ? productForm.quantity : 0
        );
        formData.append("stock_keep", productForm.keepStock ? 1 : 0);
        formData.append("vat", productForm.vat);
        formData.append("vat_class", productForm.vatClass);
        formData.append("short_description", productForm.shortDescription);
        formData.append("description", productForm.ProductDescription);
        formData.append("my_page_description", productForm.PageDescription);
        formData.append("meta_description", productForm.MetaDescription);
        formData.append("sub_category_id", chosendSubCategory || "");
        formData.append("language_id", productForm.language);
        formData.append("menu_order", productForm.menuOrder);
        formData.append(
          "visible_for_direct_sale",
          productForm.VisibleForDirectSales ? 1 : 0
        );

        files?.forEach((fi) => {
          formData.append("image[]", fi);
        });

        const res = await POST(`${BASE_URL}/api/admin/productCreate`, formData);
        if (res?.data?.status) {
          toast.dismiss();
          toast.success(res.data?.message);
          router.push("/produkter");
        } else {
          toast.dismiss();
          toast.error(res?.data?.message);
        }
      }
    } catch (error) { }
  };

  const removeFile = (indexToRemove) => {
    setFile((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // const lang = Cookies.get("i18next") || "en";
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setForm((prev) => ({ ...prev, language: selectedLanguage }));
  };


  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <div className='d-flex justify-content-between w-100 align-items-center'>
            {/* <h2>Create product</h2> */}
            <h2>{t("create_product.create_product")}</h2>
            <div className='bot-btn'>
              <Link
                href={"/produkter"}
                className='can-btn'
              >
                {/* Cancel */}
                {t("create_product.cancel")}
              </Link>
              <button
                className='cr-btn btn createorder_top_right'
                onClick={submitHandler}
              >
                {/* Create product */}
                {t("create_product.create_product")}
              </button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr'>
              <h3 className='ad-prdtse mb-4'>
              <Form.Select
                  value={productForm.language} // Set the value from productForm state
                  onChange={handleLanguageChange} // Handle change
                >
                  <option value="1">English</option>
                  <option value="2">Norwegian</option>
                </Form.Select>
              </h3>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Productnumber</Form.Label> */}
                    <Form.Label>{t("create_product.productnumber")}</Form.Label>
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
                          <div className='imb-bx-upl'>
                            {" "}
                            <img
                              key={i}
                              src={fl}
                            />
                            <div
                              className='close_img_top'
                              onClick={() => {
                                removeFile(i, fl);
                              }}
                            >
                              X
                            </div>
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
                  {errors?.files ? (
                    <>
                      <p style={{ color: "#dc3545", fontSize: ".875em" }}>
                        {errors?.files}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      <Form.Label>{t("create_product.category")}</Form.Label>
                      <Form.Select
                        onChange={(e) => setChosendCategory(e.target.value)}
                        value={chosendCategory}
                        isInvalid={!!errors?.chosendCategory} // Check if there's an error
                      >
                        <option value='0'>
                          {t("create_product.categories")}
                        </option>
                        {categories.length > 0 ? (
                          categories.map((cat, i) => (
                            <option
                              key={i}
                              value={cat.id}
                            >
                              {cat.name}
                            </option>
                          ))
                        ) : (
                          <option>{t("create_product.not_available")}</option>
                        )}
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>
                        {errors?.chosendCategory}
                      </Form.Control.Feedback>
                    </div>
                    <button
                      onClick={() => {
                        setShowCreateCategory(true);
                        fetchCategory();
                      }}
                      className='add-btne btn-borderbl'
                      type='button'
                    >
                      +
                    </button>
                  </Form.Group>

                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      {/* <Form.Label>Sub category</Form.Label> */}
                      <Form.Label>
                        {t("create_product.sub_category")}
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => setChosendSubCategory(e.target.value)}
                        value={chosendSubCategory}
                      >
                        {/* <option value='0'>Sub Categories</option> */}
                        <option value='0'>
                          {t("create_product.sub_categories")}
                        </option>
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
                          })) || (
                            <option>{t("create_product.not_available")}</option>
                          )}
                      </Form.Select>
                    </div>
                    <button
                      className='add-btne btn-borderbl'
                      onClick={() => {
                        setShowCreateSubCategory(true);
                        fetchSubCategory();
                      }}
                    >
                      +
                    </button>
                  </Form.Group>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Price</Form.Label> */}
                        <Form.Label>{t("create_product.price")}</Form.Label>
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
                          {t("create_product.sales_price")}
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
                          {t("create_product.special_price")}
                        </Form.Label>
                        <Form.Control
                          value={productForm.SpecialPrice}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              SpecialPrice: e.target.value,
                            }))
                          }
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
                        <Form.Label>{t("create_product.length")}</Form.Label>
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
                        <Form.Label>{t("create_product.width")}</Form.Label>
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
                        <Form.Label>{t("create_product.depth")}</Form.Label>
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
                        <Form.Label>{t("create_product.weight")}</Form.Label>
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
                        <Form.Label>{t("create_product.gtin_ean")}</Form.Label>
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
                          {t("create_product.menu_order")}
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
                      <Form.Label>{t("create_product.keywords")}</Form.Label>
                      <Form.Control
                        value={keyword}
                        onChange={(e) => {
                          if (e.target.value) {
                            setKeyword(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={handleAddKeyword}
                      className='add-btne btn-borderbl'
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
                        {t("create_product.related_products")}
                      </Form.Label>
                      {/* <Form.Control placeholder='Chose product' /> */}
                      <StateManagedSelect
                        isMulti
                        options={options}
                        onChange={(selected) => {
                          setSelected(selected);
                        }}
                        placeholder=''
                      />
                    </div>
                    <Link
                      href=''
                      className='add-btne btn-borderbl'
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
                      {/* {t("create_product.product_name")}{" "} */}
                      {productForm.language == "en"
                        ? "Product name"
                        : "Produktnavn"}
                      {/* <Link href={"/"}>/julepakke-2-til-og-fra-lapper</Link> */}
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
                    <Form.Control.Feedback type='invalid'>
                      {errors?.ProductName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className='row mt-5'>
                    <div className='col-md-6 cstm-chk mb-3'>
                      <Form.Group
                        className=''
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
                        <span className='d-inline-block'>
                          {/* Visible in online store */}
                          {t("create_product.visible_in_online_store")}
                        </span>
                      </Form.Group>
                    </div>
                    <div className='col-md-6 cstm-chk'>
                      <Form.Group
                        className=''
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
                        <span className='d-inline-block'>
                          {/* Visible in productgallery (landing page) */}
                          {t(
                            "create_product.visible_in_product_gallery_landing_page"
                          )}
                        </span>
                      </Form.Group>
                    </div>
                    <div className='col-md-12 cstm-chk'>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <input
                          type='checkbox'
                          name='VisibleForDirectSales'
                          checked={productForm.VisibleForDirectSales}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              VisibleForDirectSales: e.target.checked,
                            }));
                          }}
                        />{" "}
                        <span className='d-inline-block'>
                          {/* Visible in shop-direkte */}
                          {t("create_product.visible_in_shop_direkte")}
                        </span>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Display</Form.Label> */}
                    <Form.Label>{t("create_product.display")}</Form.Label>
                    <Form.Select
                      value={productForm.Display}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          Display: e.target.value,
                        }))
                      }
                    >
                      <option value={"Everywhere"}>
                        {t("create_product.everywhere")}
                      </option>
                    </Form.Select>
                  </Form.Group>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>Warehouse location</Form.Label> */}
                        <Form.Label>
                          {/* {t("create_product.warehouse_location")} */}
                          {productForm.language == "en"
                            ? "Warehouse location"
                            : "Lager lokasjon"}
                        </Form.Label>
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
                        <Form.Label>
                          {t("create_product.quantity_in_stock")}
                        </Form.Label>
                        <Form.Control
                          value={productForm.quantity}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              quantity: e.target.value,
                            }))
                          }
                          isInvalid={!!errors?.quantity}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.quantity}
                        </Form.Control.Feedback>
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
                          {t("create_product.stock_keep")}
                        </span>
                      </Form.Group>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6'>
                      <Form.Group className='mb-3'>
                        <Form.Label>{t("create_product.vat")}</Form.Label>

                        <Form.Select
                          value={productForm.vat}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              vat: e.target.value,
                            }));
                          }}
                        >
                          <option value=''>
                            {t("create_product.select_vat")}
                          </option>
                          <option
                            value='taxable'
                            selected
                          >
                            {t("create_product.taxable")}
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className='col-md-6'>
                      <Form.Group className='mb-3'>
                        {/* <Form.Label>VAT class</Form.Label> */}
                        <Form.Label>{t("create_product.vat_class")}</Form.Label>
                        <Form.Select
                          value={productForm.vatClass}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              vatClass: e.target.value,
                            }))
                          }
                        >
                          <option value={""}>
                            {t("create_product.select_vat_class")}
                          </option>
                          <option value='0'>0%</option>
                          <option value='12'>12%</option>
                          <option value='15'>15%</option>
                          <option value='25'>25%</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className='mb-3'>
                    {/* <Form.Label>Short description</Form.Label> */}
                    <Form.Label>
                      {/* {t("create_product.short_description")} */}
                      {productForm.language == "en"
                        ? "Short description"
                        : "Kort beskrivelse"}
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
                      {/* {t("create_product.product_description")} */}
                      {productForm.language == "en"
                        ? "Product description"
                        : "Produkt beskrivelse"}
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
                      {/* {t("create_product.my_page_description")} */}
                      {productForm.language == "en"
                        ? "My pages description"
                        : "Mine-sider beskrivelse"}
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
                      {/* {t("create_product.meta_description")} */}
                      {productForm.language == "en"
                        ? "Meta description"
                        : "Meta beskrivelse"}
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
        isOpen={showCreateCategory}
        onClose={() => {
          setShowCreateCategory(false);
          fetchCategory();
        }}
      />
      <CreateSubCategoryModal
        isOpen={showCreateSubCategory}
        onClose={() => setShowCreateSubCategory(false)}
      />
    </>
  );
};
export default page;
