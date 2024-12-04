"use client";
import React from "react";

const data = [
  {
    items: [
      {
        title: "Bursdagspakke #1",
        price: "Kr 125,-",
        quantity: 4,
        image: "/images/product1.png",
      },
      {
        title: "Bursdagspakke #2",
        price: "Kr 125,-",
        quantity: 4,
        image: "/images/product2.png",
      },
    ],
  },
  {
    items: [
      {
        title: "Til og fra lapper #1",
        price: "Kr 125,-",
        quantity: 3,
        image: "/images/product1.png",
      },
      {
        title: "Til og fra lapper #2",
        price: "Kr 125,-",
        quantity: 1,
        image: "/images/product2.png",
      },
    ],
  },
];
const ProductList = () => {
  return (
    <div className="container salesover2 mt-4">
      <div className="heads">
        <h1 className="mb-4 ">ABC Idrettsklubb J16</h1>
        <span>Ola Nordmann</span>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="img-section">
            {/* <div className="border-image"> */}
            <div className="">
              <img src="/images/grate.png" />
            </div>
            <div className="text-sectiomn">
              <h5>Bursdagspakke #1 | Kr 125,-</h5>
              <h2>4</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="img-section mt-2">
            {/* <div className="border-image"> */}
            <div className="">
              <img src="/images/bl.png" />
            </div>
            <div className="text-sectiomn">
              <h5>Bursdagspakke #1 | Kr 125,-</h5>
              <h2>4</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="img-section mt-2">
            {/* <div className="border-image"> */}
            <div className="">
              <img src="/images/paper.png" />
            </div>
            <div className="text-sectiomn">
              <h5>Bildepakke #1 | Kr 125,-</h5>
              <h2>4</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="img-section mt-2">
            {/* <div className="border-image"> */}
            <div className="">
              <img src="/images/gira.png" />
            </div>
            <div className="text-sectiomn">
              <h5>Bursdagspakke #3 | Kr 125,-</h5>
              <h2>4</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="img-section mt-2">
            {/* <div className="border-image"> */}
            <div className="">
              <img src="/images/car.png" />
            </div>
            <div className="text-sectiomn">
              <h5>Bursdagspakke #1 | Kr 125,-</h5>
              <h2>4</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="img-section mt-2">
            {/* <div className="border-image"> */}
            <div className="">
              <img src="/images/cake.png" />
            </div>
            <div className="text-sectiomn">
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
