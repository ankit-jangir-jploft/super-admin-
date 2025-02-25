"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import Cookies from "js-cookie";
import { GET, POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import Paginate from "../Utils/Paginate";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../Components/SkeletonLoader";
import ProductFilterModal from "../modals/productFilterModel";

const page = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrent] = useState(1);
  const [pagination, setPagination] = useState();
  const [products, setProducts] = useState([]);
  const [searchQuery, setQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [action, setAction] = useState("");
  const [userData, setUserData] = useState({});
  const [roleType, setRoleType] = useState();
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockSortOrder, setStockSortOrder] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Fetch roleType only on the client side
    setRoleType(Cookies.get("roleType"));
  }, []);

  // Debounce the API call for searchQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProductList();
    }, 500); // Wait for 500ms after the last keystroke

    return () => {
      clearTimeout(timer); // Cleanup the previous timer if searchQuery changes
    };
  }, [searchQuery, currentPage, selectedCategories, stockSortOrder, selectedSubcategories, pageSize]); // Trigger when searchQuery or currentPage changes


  useEffect(() => {
    setCurrent(1); // Reset to first page
  }, [searchQuery, selectedCategories, selectedCategories, stockSortOrder, selectedSubcategories, pageSize]);

  const fetchProductList = async () => {
    setLoading(true);
    try {
      const payload = {
        per_page: pageSize,
        page: currentPage,
        searchQuery: searchQuery,
        category_id: selectedCategory,
        stockSortOrder: stockSortOrder,
        filters: {
          category_ids: selectedCategories,
          sub_category_ids: selectedSubcategories,
          sort_status: stockSortOrder === "asc" ? "0" : stockSortOrder === "desc" ? "1" : ""
        }
      };

      console.log("pay", payload)

      const res = await POST(`${BASE_URL}/api/admin/ProductlistFilter`, payload);
      if (res?.data?.status === "true") {
        setPagination(res.data?.pagination);
        setProducts(res.data?.data);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
    setLoading(false);
  };

  const onPageChange = (selected) => {
    setCurrent(selected);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts?.length === products?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  const handleMassAction = async () => {
    try {
      if (!selectedProducts?.length) {
        toast.dismiss();
        toast.error("Please select products to perform the action!");
        return;
      }

      const payload = {
        action: action,
        id: selectedProducts,
      };

      const res = await POST(`${BASE_URL}/api/admin/productStatus`, payload);

      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res.data.message);
        setSelectedProducts([]);
        fetchProductList();
        setAction("");
      } else {
        toast.dismiss();
        toast.error("Failed to perform the action!");
      }
    } catch (error) {
      console.log("Error performing mass action:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GET(`${BASE_URL}/api/admin/categoryList`); // Adjust the endpoint as necessary
        if (res?.data?.status) {
          setCategories(res.data.data); // Set the categories state
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Fetch categories on mount

  useEffect(() => {
    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, []);

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className='admin-header'>
              {/* <h2>Products</h2> */}
              <h2>{t("products.product")}</h2>
              <div className='filter-container'>
                {/* <div className='search-frm mx-3'>

                  <select
                    className="form-select m-0"
                    value={stockSortOrder}
                    onChange={(e) => {
                      setStockSortOrder(e.target.value);
                      fetchProductList(); // Fetch products again when sorting order changes
                    }}
                  >
                    <option value="">{t("products.sort_stock")}</option>
                    <option value="1">{t("products.sort_stock_asc")}</option>
                    <option value="0">{t("products.sort_stock_dsc")}</option>
                  </select>

                  <select
                    className="form-select m-0"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                  >
                    <option value="">{t("products.select_category")}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div className='search-frm'>
                  {roleType !== "guest" && (
                    <Link href={"/createproduct"}>
                      <img src='/images/add-plus.svg' />
                    </Link>
                  )}
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}


                  />
                  <img
                    src='/images/filter-ion-header.svg' // Add your filter icon here
                    onClick={() => setShowFilterModal(true)}
                    alt='Filter'
                  />
                  {/* <Link href={""}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={`/useredit/${userData?.id}`}>
              <img
                className='object-fit-cover rounded-circle'
                style={{ width: "41px", height: "41px" }}
                src={userData?.profile_image}
                onError={(e) => {
                  e.target.src = "/images/avatar-style.png";
                }}
              />
            </Link> */}
                </div>
              </div>
            </div>
            <div className='shdw-crd'>
              <div className='table-responsive order-table'>
                <table>
                  <thead>
                    <tr>
                      <th>{t("products.mark")}</th>
                      {/* <th>Product #</th> */}
                      <th>{t("products.product")}#</th>
                      {/* <th>Image</th> */}
                      <th>{t("products.image")}</th>
                      {/* <th>Product name</th> */}
                      <th>{t("products.product_name")}</th>
                      {/* <th>Location</th> */}
                      <th>{t("products.location")}</th>
                      {/* <th>Stock</th> */}
                      <th>{t("products.stock")}</th>
                      {/* <th>Price</th> */}
                      <th>{t("products.price")}</th>
                      {/* <th>Status</th> */}
                      <th>{t("products.status")}</th>
                      {/* <th>Category</th> */}
                      <th>{t("products.category")}</th>
                      {/* <th>Sub category</th> */}
                      <th>{t("products.sub_category")}</th>
                      {/* <th>Created</th> */}
                      <th>{t("products.created")}</th>
                      {/* <th>View</th> */}
                      <th>{t("products.view")}</th>
                      {roleType !== "guest" && <th>{t("kunder.edit")}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {(products?.length &&
                      products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <input
                              type='checkbox'
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleSelectProduct(product.id)}
                            />
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/products-details/${product?.id}`)
                            }
                          >
                            {product?.product_number}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/products-details/${product?.id}`)
                            }
                          >
                            <div className='produt-tile'>
                              <img
                                className='product-img img-fluid'
                                src={product?.image}
                                onError={(e) =>
                                  (e.target.src = "/images/product.png")
                                }
                              />
                            </div>
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/products-details/${product?.id}`)
                            }
                          >
                            {product?.name}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/products-details/${product?.id}`)
                            }
                          >
                            {product?.wareHouseLocation || "N/A"}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/products-details/${product?.id}`)
                            }
                          >
                            <div>
                              {product.stock_keep === 1
                                ? `${product.quantity} stk` ||
                                t("products.inventory_not_tracked")
                                : t("products.inventory_not_tracked")}
                            </div>
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = `/products-details/${product?.id}`)
                            }
                          >
                            {product?.price}
                            {product?.price == 0 ? "" : ",-"}
                          </td>
                          <td>
                            <button
                              className={`status ${product?.product_status == 1
                                ? "green-clr"
                                : "yellow"
                                }`}
                            >
                              {product?.product_status == 1
                                ? t("products.published")
                                : t("products.unpublished")}
                            </button>
                          </td>
                          <td>{product?.category || "N/A"}</td>
                          <td>{product?.subCategory || "N/A"}</td>
                          <td>{product?.createdAt || "N/A"}</td>
                          <td>
                            <Link
                              href={`/products-details/${product?.id}`}
                              style={{ marginRight: "10px" }}
                            >
                              <img src='/images/eye.svg' />
                            </Link>
                          </td>
                          {roleType !== "guest" && (
                            <td>
                              <Link href={`/updateproduct/${product?.id}`}>
                                <img src='/images/prdctes.svg' />
                              </Link>
                            </td>
                          )}
                        </tr>
                      ))) || (
                        <tr>
                          <td
                            className='text-center'
                            colSpan={13}
                          >
                            {t("customers.no_record")}
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='tablebruk'>
              {roleType !== "guest" && (
                <div className='tablebruk_left'>
                  <select
                    className='form-select'
                    value={action}
                    onChange={(e) => {
                      setAction(e.target.value);
                    }}
                  >
                    {/* <option value={""}>Mass action</option> */}
                    <option value={""}>{t("products.mass_action")}</option>
                    {/* <option value={"delete"}>Delete</option> */}
                    <option value={"delete"}>{t("products.delete")}</option>
                  </select>
                  {action && (
                    <button
                      className='crte-userd Confirm_btn'
                      onClick={handleMassAction}
                    >
                      {t("confirm_delete.confirm")}
                    </button>
                  )}
                </div>
              )}

              <select
                className='form-select'
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value)); // Update page size
                  setCurrent(1); // Reset to the first page when page size changes
                }}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <Paginate
                currentPage={currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
                paginationData={pagination}
              />
            </div>
            <ProductFilterModal
              show={showFilterModal}
              isOpen={showFilterModal}
              onClose={() => setShowFilterModal(false)}
              selectedStockOrder={stockSortOrder}
              setSelectedStockOrder={setStockSortOrder}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedSubcategories={selectedSubcategories}
              setSelectedSubcategories={setSelectedSubcategories}
              categories={categories} // Pass categories from the parent
            />
          </>
        )}
      </div>
    </>
  );
};

export default page;
