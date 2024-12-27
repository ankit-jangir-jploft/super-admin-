"use client";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from "../Utils/apiHelper";
import { GET, POST } from "../Utils/apiFunctions";
import { toast } from "react-toastify";
import StateManagedSelect from "react-select";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  let [count, setCount] = useState(0);

  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  function handleChange(e) {
    setFile((prev) => [...prev, URL.createObjectURL(e.target.files[0])]);
    setFiles((prev) => [...prev, e.target.files[0]]);
  }
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [chosendCategory, setChosendCategory] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [chosendSubCategory, setChosendSubCategory] = useState();
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

    console.log("Sub", res);

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

  const validateForm = () => {
    let isValid = true;
    const tempErrors = {};
    console.log("files", files);

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

    if (!productForm.SpecialPrice) {
      tempErrors.SpecialPrice = "Special price is required.";
      isValid = false;
    }

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
    if (!productForm.gtin) {
      tempErrors.gtin = "Gtin is required.";
      isValid = false;
    }
    if (!productForm.menuOrder) {
      tempErrors.menuOrder = "Menu Order is required.";
      isValid = false;
    }

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

        const res = await POST(`${BASE_URL}/api/admin/productCreate`, formData);
        console.log(res.data);
        if (res?.data?.status) {
          toast.dismiss();
          toast.success(res.data?.message);
          router.push("/produkter");
        } else {
          toast.dismiss();
          toast.error(res?.data?.message);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <div className='d-flex justify-content-between w-100 align-items-center'>
            <h2>Create product</h2>
            <div className='bot-btn'>
              <Link
                href={"/produkter"}
                className='can-btn'
              >
                Cancel
              </Link>
              <button
                className='cr-btn btn createorder_top_right'
                onClick={submitHandler}
              >
                Create product
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
                    <Form.Label>Productnumber</Form.Label>
                    <Form.Control
                      value={productForm.ProductNumber}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          ProductNumber: e.target.value,
                        }))
                      }
                      placeholder='DUG40GULL'
                      isInvalid={!!errors?.ProductNumber}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.ProductNumber}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className='crpr-im'>
                    {file.map((fl, i) => {
                      return (
                        <img
                          key={i}
                          src={fl}
                        />
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
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        onChange={(e) => setChosendCategory(e.target.value)}
                        value={chosendCategory}
                      >
                        <option value='0'>Categories</option>
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
                    <Link
                      href=''
                      className='add-btne btn-borderbl'
                    >
                      +
                    </Link>
                  </Form.Group>

                  <Form.Group className='mb-3 cstmr-ad'>
                    <div className='cstmr-dve'>
                      <Form.Label>Sub category</Form.Label>
                      <Form.Select
                        onChange={(e) => setChosendSubCategory(e.target.value)}
                        value={chosendSubCategory}
                      >
                        <option value='0'>Sub Categories</option>
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
                      className='add-btne btn-borderbl'
                    >
                      +
                    </Link>
                  </Form.Group>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          value={productForm.Price}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Price: e.target.value,
                            }))
                          }
                          placeholder='50'
                          isInvalid={!!errors?.Price}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Price}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Sales price</Form.Label>
                        <Form.Control
                          value={productForm.SalesPrice}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              SalesPrice: e.target.value,
                            }))
                          }
                          placeholder='125'
                          isInvalid={!!errors?.SalesPrice}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.SalesPrice}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Special price</Form.Label>
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
                        <Form.Label>Length (cm)</Form.Label>
                        <Form.Control
                          value={productForm.Length}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Length: e.target.value,
                            }))
                          }
                          placeholder='21'
                          isInvalid={!!errors?.Length}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Length}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Width (cm)</Form.Label>
                        <Form.Control
                          value={productForm.Width}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Width: e.target.value,
                            }))
                          }
                          placeholder='9'
                          isInvalid={!!errors?.Width}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Width}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Depth (cm)</Form.Label>
                        <Form.Control
                          value={productForm.Depth}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Depth: e.target.value,
                            }))
                          }
                          placeholder='2'
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
                        <Form.Label>Weight (g)</Form.Label>
                        <Form.Control
                          value={productForm.Weight}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              Weight: e.target.value,
                            }))
                          }
                          placeholder='31'
                          isInvalid={!!errors?.Weight}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.Weight}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>GTIN / EAN</Form.Label>
                        <Form.Control
                          value={productForm.gtin}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              gtin: e.target.value,
                            }))
                          }
                          placeholder='21'
                          isInvalid={!!errors?.gtin}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.gtin}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Menu order</Form.Label>
                        <Form.Control
                          value={productForm.menuOrder}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              menuOrder: e.target.value,
                            }))
                          }
                          placeholder='1'
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
                      <Form.Label>Keywords</Form.Label>
                      <Form.Control
                        placeholder=''
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
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
                      <Form.Label>Related products</Form.Label>
                      {/* <Form.Control placeholder='Chose product' /> */}
                      <StateManagedSelect
                        isMulti
                        options={options}
                        onChange={(selected) => {
                          setSelected(selected);
                        }}
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
                      Product name{" "}
                      <Link href={"/"}>/julepakke-2-til-og-fra-lapper</Link>
                    </Form.Label>
                    <Form.Control
                      value={productForm.ProductName}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          ProductName: e.target.value,
                        }))
                      }
                      placeholder='Julepakke #2 - Til og fra lapper'
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
                          Visible in online store
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
                          Visible in productgallery (landing page)
                        </span>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className='mb-3'>
                    <Form.Label>Display</Form.Label>
                    <Form.Select
                      value={productForm.Display}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          Display: e.target.value,
                        }))
                      }
                    >
                      <option value={"Everywhere"}>Everywhere</option>
                    </Form.Select>
                  </Form.Group>

                  <div className='row'>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Warehouse location</Form.Label>
                        <Form.Control
                          value={productForm.warehouseAddress}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              warehouseAddress: e.target.value,
                            }))
                          }
                          placeholder='A1'
                        />
                      </Form.Group>
                    </div>
                    <div className='col-md-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Quantity in stock</Form.Label>
                        <Form.Control
                          value={productForm.quantity}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              quantity: e.target.value,
                            }))
                          }
                          placeholder='53534'
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
                        <span className='mt-2 d-inline-block'>Stock keep</span>
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
                          <option value=''>Select VAT</option>
                          <option value='taxable'>Taxable</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className='col-md-6'>
                      <Form.Group className='mb-3'>
                        <Form.Label>VAT class</Form.Label>
                        <Form.Select
                          value={productForm.vatClass}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              vatClass: e.target.value,
                            }))
                          }
                        >
                          <option value={1}>Select VAT class</option>
                          <option value='standard (25%)'>Standard (25%)</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className='mb-3'>
                    <Form.Label>Short description</Form.Label>
                    <Form.Control
                      as='textarea'
                      value={productForm.shortDescription}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          shortDescription: e.target.value,
                        }))
                      }
                      placeholder='The cards are printed in Norway on environmentally friendly FSC approved paper. The size is 10×15 cm. 10 different designs.'
                      rows={3}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Product description</Form.Label>
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
                    <Form.Label>My pages description</Form.Label>
                    <Form.Control
                      value={productForm.PageDescription}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          PageDescription: e.target.value,
                        }))
                      }
                      placeholder='Kortene er trykket i Norge på miljøvennlig FSC godkjent papir. Størrelsen er 10x15 cm. 10 forskjellige design.'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Meta description</Form.Label>
                    <Form.Control
                      as='textarea'
                      placeholder='Dugnadspakke med 40stk til og fra lapper til jul. Disse er veldig enkle å selge i en dugnad for en skoleklasse, et idrettslag, en russegruppe eller andre organisasjoner.'
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
                <p>Created at: 03.11.2024</p>
                <p>Updated at: 04.11.2024 17:11</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
