"use client";
import { GET, POST } from "@/app/Utils/apiFunctions";
import { BASE_URL } from "@/app/Utils/apiHelper";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function page({ params }) {
  const { t } = useTranslation();
  const { id } = params;

  const [chosenStatus, setChosenStatus] = useState("");
  const [orderDetails, setOrderDetails] = useState({});

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

  const getStatusData = async () => {
    try {
      const payload = { order_id: id };
      const res = await GET(
        `${BASE_URL}/api/admin/orderUpdateStatusWithOutAuthGet`,
        payload
      );
      if (res?.data?.status) {
        setOrderDetails(res.data?.data);
        setChosenStatus(res.data?.data?.order_status);
        console.log("res.data?.data?.status", res.data?.data?.order_status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatusData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chosenStatus == "") {
      toast.dismiss();
      toast.error("Please select a status");
      return;
    }

    const payload = { order_id: id, order_status: chosenStatus };
    const res = await POST(
      `${BASE_URL}/api/admin/orderUpdateStatusWithOutAuth`,
      payload
    );
    if (res?.data?.status) {
      toast.dismiss();
      toast.success("Status updated successfully");
      setChosenStatus("");
      getStatusData();
      window.location.href = `/shipping/${id}`;
    } else {
      toast.dismiss();
      toast.error(res.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='main-cont-qr-apge'>
      <div className='qr-code-box'>
        <h2 className='hedingtext_top custom-pup-mn'>Update order status</h2>
        <div className='order-id'>
          <h3>Order #{orderDetails?.order_number}</h3>
          <p>{orderDetails?.date}</p>
        </div>
        <div className='order-status-btn'>
          <button
            className={`status-puop ${
              orders[orderDetails?.order_status]?.style
            }`}
          >
            {orders[orderDetails?.order_status]?.name}
          </button>
        </div>
        <form
          action='#'
          className='createcategory_cumtm change-stastu'
          onSubmit={handleSubmit}
        >
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor='categoryName'>Update status</label>
            <select
              id='categorySelect'
              value={chosenStatus}
              style={{
                width: "100%",
                padding: "10px 15px",
                marginTop: "5px",
                height: "50px",
                borderRadius: "40px",
                border: "1px solid rgb(206, 212, 218)",
              }}
              onChange={(e) => setChosenStatus(e.target.value)}
            >
              <option value=''>{t("customer_status.select_status")}</option>
              <option value='0'>{t("order_status.ordered")}</option>
              <option value='1'>{t("order_status.ready_for_picking")}</option>
              <option value='2'>{t("order_status.currently_picking")}</option>
              <option value='3'>{t("order_status.sent")}</option>
              <option value='6'>{t("order_status.completed")}</option>
              <option value='7'>{t("order_status.canceled")}</option>
              <option value='8'>{t("order_status.on_hold")}</option>
            </select>
          </div>
          <div className=''>
            <button
              className='cr-btn btn createcustomer_btn px-5  w-100 mb-3 mt-4'
              type='submit'
            >
              Update
            </button>
            <button
              className='can-btn btn createcustomer_btncmf w-100 px-5 '
              onClick={() => {
                window.location.href = `/shipping/${id}`;
              }}
              type='button'
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
