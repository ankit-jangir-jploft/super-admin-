"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import the useRouter hook
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [smallsidebar, setSmallSidebar] = useState(false);
  const [imagePath, setImagePath] = useState("/images/menu.svg");
  const [roleType, setRoleType] = useState(null); // Initialize as null
  const router = usePathname();
  const route = useRouter();

  useEffect(() => {
    // Fetch roleType only on the client side
    setRoleType(Cookies.get("roleType"));
  }, []);

  // Function to toggle the sidebar state
  const toggleClass = () => {
    setIsActive(!isActive);
    setSmallSidebar(false);
    setImagePath((prevImage) =>
      prevImage === "/images/menu.svg"
        ? "/images/close-menu.svg"
        : "/images/menu.svg"
    );
  };

  // Render nothing until roleType is available
  if (roleType === null) {
    return null;
  }

  let menuItems = [];

  if (roleType === "seller") {
    menuItems = [
      { href: "/", icon: "/images/home.svg", label: t("sidebar.dashboard") },
      { href: "/order", icon: "/images/order.svg", label: t("sidebar.orders") },
      {
        href: "/kunder",
        icon: "/images/customers.svg",
        label: t("sidebar.customers"),
      },
      {
        href: "/dugnader",
        icon: "/images/shopping-bag.svg",
        label: t("sidebar.dugnad_compaigns"),
      },
      {
        href: "/statistics",
        icon: "/images/statistikk.svg",
        label: t("sidebar.statistics"),
      },
    ];
  } else if (roleType === "administrator" || roleType === "guest") {
    menuItems = [
      { href: "/", icon: "/images/home.svg", label: t("sidebar.dashboard") },
      { href: "/order", icon: "/images/order.svg", label: t("sidebar.orders") },
      {
        href: "/kunder",
        icon: "/images/customers.svg",
        label: t("sidebar.customers"),
      },
      {
        href: "/produkter",
        icon: "/images/product.svg",
        label: t("sidebar.products"),
      },
      {
        href: "/dugnader",
        icon: "/images/shopping-bag.svg",
        label: t("sidebar.dugnad_compaigns"),
      },
      {
        href: "/statistics",
        icon: "/images/statistikk.svg",
        label: t("sidebar.statistics"),
      },
      {
        href: "/settings",
        icon: "/images/settings.svg",
        label: t("sidebar.settings"),
      },
    ];
  } else if (roleType === "warehouse") {
    menuItems = [
      { href: "/order", icon: "/images/order.svg", label: t("sidebar.orders") },
    ];
  }

  return (
    <div
      className={
        isActive
          ? "active sidebar-admin"
          : smallsidebar
          ? "small-sidebar sidebar-admin"
          : "sidebar-admin"
      }
    >
      <span
        className='mune-tgl'
        onClick={() => {
          setIsActive(false);
          setSmallSidebar(!smallsidebar);
        }}
      >
        <img
          src='/images/menu-sr.svg'
          alt='Toggle Menu'
        />
      </span>
      <div className='side-logo'>
        {!smallsidebar ? (
          <img
            src='/images/logo.png'
            className='img-fluid h-100'
            alt='Logo'
          />
        ) : (
          <img
            src='/images/sml-log.svg'
            className='img-fluid h-100 smlg-nm'
            alt='Small Logo'
          />
        )}
        <button
          className='mobile-menu-icon'
          onClick={toggleClass}
        >
          <img
            src={imagePath}
            className='img-fluid h-100'
            alt='Menu Icon'
          />
        </button>
      </div>
      <ul className='menu-list-mange'>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={router == item.href ? "active" : ""}
            >
              <img
                src={item.icon}
                alt={item.label}
              />{" "}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className='logout-btn btn'
        onClick={() => {
          Cookies.remove("dugnadstisadmin");
          window.location.href = "/login";
        }}
      >
        <img
          src='/images/logout.svg'
          alt='Logout'
        />{" "}
        {t("sidebar.logout")}
      </button>
    </div>
  );
};

export default Sidebar;
