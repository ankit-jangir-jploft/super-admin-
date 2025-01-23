"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Cookies from "js-cookie";
import Link from "next/link";
import { GET, POST } from "../Utils/apiFunctions"; // Assuming DELETE is defined in your utils
import { BASE_URL } from "../Utils/apiHelper";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import Paginate from "../Utils/Paginate";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../Components/SkeletonLoader";
import ChangeOrderStatus from "../modals/changeorderstatus";

const page = () => {
  const { t } = useTranslation();
  const [openRowId, setOpenRowId] = useState(null);
  const [allOrders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrent] = useState(1);
  const [searchOuery, setQuery] = useState("");
  const [pagination, setPagination] = useState();
  const [action, setAction] = useState();
  const [userData, setUserData] = useState({});
  const [roleType, setRoleType] = useState();
  const [loading, setLoading] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [customId, setCustomId] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [lang, setLang] = useState("nor");

  useEffect(() => {
    // Fetch roleType only on the client side
    setRoleType(Cookies.get("roleType"));
    setLang(Cookies.get("i18next"));
  }, []);

  const toggleRow = (id) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const options = {
        page: currentPage,
        per_page: 10,
        searchQuery: searchOuery,
        lang: lang,
      };
      const res = await GET(`${BASE_URL}/api/admin/OrderList`, options);
      if (res?.data?.status) {
        setOrders(res.data?.data);
        setPagination(res.data?.pagination);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onPageChange = (selected) => {
    setCurrent(selected);
  };

  // useEffect(() => {
  //   fetchOrders();
  //   const userDetail = JSON.parse(Cookies.get("user"));
  //   setUserData(userDetail);
  // }, [currentPage, searchOuery]);

  // Debouncing searchQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders();
    }, 500); // Delay the API call by 500ms after the user stops typing

    // Cleanup the timeout if searchQuery changes within 500ms
    return () => {
      clearTimeout(timer);
    };
  }, [searchOuery, currentPage]); // Trigger when searchQuery or currentPage changes

  useEffect(() => {
    const userDetail = JSON.parse(Cookies.get("user"));
    setUserData(userDetail);
  }, []);

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleMassDelete = async () => {
    try {
      if (!selectedOrders.length) {
        toast.dismiss();
        toast.error("Please select orders to delete!");
        return;
      }
      const payload = {
        action: action,
        id: selectedOrders,
      };
      const res = await POST(`${BASE_URL}/api/admin/orderStatus`, payload);

      if (res?.data?.status) {
        toast.dismiss();
        toast.success(res?.data?.message);
        setSelectedOrders([]);
        fetchOrders();
        setAction("");
      } else {
        toast.dismiss();
        toast.error("Failed to delete orders!");
      }
    } catch (error) {
      console.log("Error deleting orders:", error);
    }
  };

  const handlePrint = async (data) => {
    const res = await GET(`${BASE_URL}/api/admin/sellerPdfGenerate`, data);
    if (res?.data?.status) {
      downloadFile(res?.data?.data?.file_path);
    } else {
      toast.dismiss();
      toast.error(res?.data?.message);
    }
  };

  const handlePickList = async (data) => {
    const res = await GET(`${BASE_URL}/api/admin/pickList`, data);

    if (res?.data?.status) {
      console.log("res?.data.data", res?.data.data);
      downloadFile(res?.data?.data);
    } else {
      toast.dismiss();
      toast.error(res?.data?.message);
    }
  };

  const downloadFile = (filePath) => {
    const a = document.createElement("a");
    a.href = filePath;
    a.download = filePath.split("/").pop();
    document.body.appendChild(a);
    a.target = "_blank";
    a.click();
    document.body.removeChild(a);
  };

  const order = {
    0: { name: "Pending", style: "green-clr" },
    1: { name: "Confirmed", style: "brown-clr" },
    2: { name: "Processing", style: "gray-clr" },
    3: { name: "Shipped", style: "blue-clr" },
    4: { name: "Delivered", style: "purple-clr" },
    5: { name: "Canceled", style: "red-clr" },
  };

  const orders = {
    0: { name: t("order_status.ordered"), style: "ordered" },
    1: {
      name: t("order_status.ready_for_picking"),
      style: "ready_for_picking",
    },
    2: {
      name: t("order_status.currently_picking"),
      style: "currently_picking",
    },
    3: { name: t("order_status.sent"), style: "ready_for_picking" },
    4: { name: t("order_status.in_transit"), style: "in_transit" },
    5: { name: t("order_status.delivered"), style: "ready_for_picking" },
    6: { name: t("order_status.completed"), style: "completed" },
    7: { name: t("order_status.canceled"), style: "canceled" },
    8: { name: t("order_status.on_hold"), style: "on_hold" },
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className='admin-header'>
              {/* <h2>Orders</h2> */}
              <h2>{t("orders.orders")}</h2>
              <div className='search-frm'>
                {roleType !== "guest" && (
                  <Link href={"/createorder"}>
                    <img src='/images/add-plus.svg' />
                  </Link>
                )}
                <input
                  type='text'
                  // placeholder='Search'
                  value={searchOuery}
                  onChange={(e) => setQuery(e.target.value)}
                  // placeholder='Sok i order'
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
            <div className='shdw-crd'>
              <div className='table-responsive order-table'>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Mark</th> */}
                      <th>{t("orders.mark")}</th>
                      {/* <th>Ordernumber</th> */}
                      <th>{t("orders.ordernumber")}</th>
                      {/* <th>Date</th> */}
                      <th>
                        <b>{t("orders.date")}</b>
                      </th>
                      {/* <th>Ordered by</th> */}
                      <th>{t("orders.ordered_by")}</th>
                      {/* <th>Ordered for/from</th> */}
                      <th>{t("orders.ordered_for")}</th>
                      {/* <th>Status</th> */}
                      <th>{t("orders.status")}</th>
                      {/* <th>Origin</th> */}
                      <th>{t("orders.origin")}</th>
                      {/* <th>Items</th> */}
                      <th>{t("orders.items")}</th>
                      {/* <th>Sum</th> */}
                      <th>{t("orders.sum")}</th>
                      {/* <th>Options</th> */}
                      <th>{t("orders.options")}</th>
                      {/* <th>Contact</th> */}
                      <th>{t("order_more.seller")}</th>
                      <th>{t("orders.contact")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(allOrders.length &&
                      allOrders.map((order, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                checked={selectedOrders.includes(order.id)}
                                onChange={() => handleSelectOrder(order.id)}
                              />
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                (window.location.href = `/orderdetail/${order?.id}`)
                              }
                            >
                              <span className='link-tg'>
                                {" "}
                                #{order.order_number}
                              </span>
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                (window.location.href = `/orderdetail/${order?.id}`)
                              }
                            >
                              {order.created_at}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                (window.location.href = `/orderdetail/${order?.id}`)
                              }
                            >
                              {order.order_by}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                (window.location.href = `/orderdetail/${order?.id}`)
                              }
                            >
                              {order.order_for || "N/A"}
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setShowStatusModal(true);
                                  setCustomId(order?.id);
                                  setCurrentStatus(+order?.order_status);
                                }}
                                className={`status ${
                                  orders[+order.order_status]?.style
                                }`}
                              >
                                {orders[+order.order_status]?.name}
                                {console.log(
                                  "+order.order_status",
                                  orders[+order.order_status]
                                )}
                              </button>
                            </td>
                            <td>{order.origin}</td>
                            <td>{order.order_details_count}</td>
                            <td>
                              <span className='clg-cum'> kr</span>{" "}
                              {order.order_details_price_sum}
                            </td>
                            <td>
                              <div className='action-btn-table'>
                                <img
                                  src='/images/dwn-aro.svg'
                                  className='cursor-pointer'
                                  onClick={() => toggleRow(index)}
                                  alt='Toggle Sub Rows'
                                />
                                {order?.group_id ? (
                                  <button
                                    style={{
                                      border: "none",
                                      borderRadius: "50%",
                                    }}
                                    onClick={() => {
                                      handlePrint({
                                        order_id: order?.id,
                                        group_id: order?.group_id,
                                      });
                                    }}
                                  >
                                    <img src='/images/disable-print.svg' />
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      border: "none",
                                      borderRadius: "50%",
                                    }}
                                    onClick={() => {
                                      toast.dismiss();
                                      toast.error(
                                        t("order_more.misssing_group")
                                      );
                                    }}
                                  >
                                    <img src='/images/disable-print.svg' />
                                  </button>
                                )}
                                <button
                                  // href={`/shipping/${order.id}`}
                                  style={{
                                    border: "none",
                                    borderRadius: "50%",
                                  }}
                                  onClick={() =>
                                    handlePickList({ id: order?.id })
                                  }
                                >
                                  <img src='/images/checklist.svg' />
                                </button>
                                {order?.tracking_no ? (
                                  <a
                                    href={order?.package_slip}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    <img
                                      src='/images/save.svg'
                                      alt='Track Package'
                                    />
                                  </a>
                                ) : (
                                  <span>
                                    <img
                                      src='/images/save.svg'
                                      alt='Tracking Not Available'
                                      style={{ opacity: 0.5 }}
                                    />
                                  </span>
                                )}
                              </div>
                            </td>
                            <td
                              onClick={() =>
                                (window.location.href = `/settings?type=seller`)
                              }
                            >
                              <u>{order?.seller_name}</u>
                            </td>
                            <td>
                              <Link href={`/kunderdetail/${order?.user_id}`}>
                                <img src='/images/prdctes.svg' />
                              </Link>
                            </td>
                          </tr>
                          {openRowId === index && (
                            <tr>
                              <td
                                colSpan='12'
                                className='sub-row'
                              >
                                <table className='sub-table w-full'>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      {/* <th>Product</th> */}
                                      <th>{t("order_more.product")}</th>

                                      {/* <th>Cost</th> */}
                                      <th>{t("order_more.cost")}</th>
                                      {/* <th>Quantity</th> */}
                                      <th>{t("order_more.quantity")}</th>
                                      {/* <th>Total</th> */}
                                      <th>{t("order_more.total")}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order?.orderDetails?.map(
                                      (product, productIndex) => (
                                        <tr key={productIndex}>
                                          <td className='productId'>
                                            {product?.product_number}
                                          </td>
                                          <td>
                                            <div
                                              className='sub-row-img'
                                              onClick={() =>
                                                (window.location.href = `/products-details/${product?.product_id}`)
                                              }
                                            >
                                              <img
                                                src={product?.product_image}
                                                onError={(e) =>
                                                  (e.target.src =
                                                    "/images/product2.png")
                                                }
                                                alt='product'
                                              />
                                              <span>
                                                {product.product_name}
                                              </span>
                                            </div>
                                          </td>

                                          <td>kr {product.price}</td>
                                          <td>{product.qty}</td>
                                          <td>kr {product.total}</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))) || (
                      <tr>
                        <td
                          colSpan='12'
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          {t("order_more.no_order_yet")}
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
                    <option value={""}>{t("orders.mass_action")}</option>
                    <option value={"delete"}>{t("orders.delete")}</option>
                  </select>
                  {action && (
                    <button
                      className='crte-userd Confirm_btn'
                      onClick={handleMassDelete}
                    >
                      {t("confirm_delete.confirm")}
                    </button>
                  )}
                </div>
              )}
              <Paginate
                currentPage={currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
                paginationData={pagination}
              />
            </div>
          </>
        )}
      </div>
      <ChangeOrderStatus
        onClose={() => {
          setShowStatusModal(false);
          fetchOrders();
        }}
        status={currentStatus}
        isOpen={showStatusModal}
        id={customId}
      />
    </>
  );
};

export default page;
