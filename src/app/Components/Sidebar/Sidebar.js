"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import the useRouter hook
import React, { useEffect, useState } from "react";

const Sidebar = () => {
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

  let menuItems = []

  if (roleType === "seller") {
    menuItems = [
      { href: "/", icon: "/images/home.svg", label: "Dashboard" },
      { href: "/order", icon: "/images/order.svg", label: "Orders" },
      { href: "/kunder", icon: "/images/customers.svg", label: "Customers" },
      {
        href: "/dugnader",
        icon: "/images/shopping-bag.svg",
        label: "Dugnad campaigns",
      },
      {
        href: "/statistics",
        icon: "/images/statistikk.svg",
        label: "Statistics",
      },
    ]
  } else if (roleType === "superadmin" || roleType === 'guest') {
    menuItems = [
      { href: "/", icon: "/images/home.svg", label: "Dashboard" },
      { href: "/order", icon: "/images/order.svg", label: "Orders" },
      { href: "/kunder", icon: "/images/customers.svg", label: "Customers" },
      { href: "/produkter", icon: "/images/product.svg", label: "Products" },
      {
        href: "/dugnader",
        icon: "/images/shopping-bag.svg",
        label: "Dugnad campaigns",
      },
      {
        href: "/statistics",
        icon: "/images/statistikk.svg",
        label: "Statistics",
      },
      { href: "/settings", icon: "/images/settings.svg", label: "Settings" },
    ];
  } else if (roleType === 'warehouse') {
    menuItems = [
      { href: "/order", icon: "/images/order.svg", label: "Orders" }
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
        href=''
        onClick={() => {
          Cookies.remove("dugnadstisadmin");
          window.location.href = "/login";
        }}
      >
        <img
          src='/images/logout.svg'
          alt='Logout'
        />{" "}
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
