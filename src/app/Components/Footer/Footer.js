"use client";
import Link from "next/link";
import React from "react";
function Footer() {

  return (
    <>
      <div className="footer-man">
        <Link href="/" className="ftr-box">
          <img className="img-fluid" src="/images/help-center.svg" />
          <span>Helpcenter</span>
        </Link>
        <Link href="/" className="ftr-box w-100">
          <img className="img-fluid" src="/images/home.svg" />
          <span>Home</span>
        </Link>
        <Link href="/profile" className="ftr-box">
          <img className="img-fluid" src="/images/profile.svg" />
          <span>My profile</span>
        </Link>
      </div>
    </>
  );
}

export default Footer;
