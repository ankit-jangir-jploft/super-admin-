"use client";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import React, { useState } from "react";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

const page = () => {
  let [count, setCount] = useState(0);

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Sidebar />
      <div className="detail-admin-main">
        <div className="admin-header">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <h2>Create product</h2>
            <div className="bot-btn">
              <Link href={"/"} className="can-btn">
                Cancel
              </Link>
              <Link href={"/"} className="cr-btn">
                Create product
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="shdw-crd crte-ordr">
              <h3 className="ad-prdtse mb-4">
                #123{" "}
                <Form.Select>
                  <option>English</option>
                </Form.Select>
              </h3>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Productnumber</Form.Label>
                    <Form.Control placeholder="DUG40GULL" />
                  </Form.Group>

                  <div className="crpr-im">
                    <img src={file} />
                    <div className="cstm-fle">
                      <input type="file" onChange={handleChange} />
                      <span>
                        <img src="/images/image-upload.svg" />
                      </span>
                    </div>
                  </div>

                  <Form.Group className="mb-3 cstmr-ad">
                    <div className="cstmr-dve">
                      <Form.Label>Category</Form.Label>
                      <Form.Select>
                        <option>Cards</option>
                      </Form.Select>
                    </div>
                    <Link href="" className="add-btne">
                      +
                    </Link>
                  </Form.Group>

                  <Form.Group className="mb-3 cstmr-ad">
                    <div className="cstmr-dve">
                      <Form.Label>Sub category</Form.Label>
                      <Form.Select>
                        <option>Christmas</option>
                      </Form.Select>
                    </div>
                    <Link href="" className="add-btne">
                      +
                    </Link>
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control placeholder="50" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Sales price</Form.Label>
                        <Form.Control placeholder="125" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Special price</Form.Label>
                        <Form.Control placeholder="" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Length (cm)</Form.Label>
                        <Form.Control placeholder="21" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Width (cm)</Form.Label>
                        <Form.Control placeholder="9" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Depth (cm)</Form.Label>
                        <Form.Control placeholder="2" />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Weight (g)</Form.Label>
                        <Form.Control placeholder="31" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>GTIN / EAN</Form.Label>
                        <Form.Control placeholder="21" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Menu order</Form.Label>
                        <Form.Control placeholder="1" />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3 cstmr-ad">
                    <div className="cstmr-dve">
                      <Form.Label>Keywords</Form.Label>
                      <Form.Control placeholder="" />
                    </div>
                    <Link href="" className="add-btne">
                      +
                    </Link>
                  </Form.Group>

                  <ul className="tags-nm">
                    <li>
                      Card <img src="/images/cross.svg" />
                    </li>
                    <li>
                      Cards <img src="/images/cross.svg" />
                    </li>
                    <li>
                      Christmas <img src="/images/cross.svg" />
                    </li>
                    <li>
                      card pack <img src="/images/cross.svg" />
                    </li>
                    <li>
                      dugnad <img src="/images/cross.svg" />
                    </li>
                    <li>
                      keyword 6 <img src="/images/cross.svg" />
                    </li>
                    <li>
                      keyword 7 <img src="/images/cross.svg" />
                    </li>
                    <li>
                      keyword 8 <img src="/images/cross.svg" />
                    </li>
                  </ul>

                  <Form.Group className="mb-3 cstmr-ad">
                    <div className="cstmr-dve">
                      <Form.Label>Related products</Form.Label>
                      <Form.Control placeholder="Chose product" />
                    </div>
                    <Link href="" className="add-btne">
                      +
                    </Link>
                  </Form.Group>

                  <ul className="tags-nm">
                    <li className="d-flex justify-content-between w-100">
                      Anledningspakke #3 (DUG30GULL){" "}
                      <img src="/images/cross.svg" />
                    </li>
                    <li className="d-flex justify-content-between w-100">
                      Julepakke #1 (PDK8) <img src="/images/cross.svg" />
                    </li>
                    <li className="d-flex justify-content-between w-100">
                      Julepakke #2 (PDK9) <img src="/images/cross.svg" />
                    </li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex justify-content-between">
                      Product name{" "}
                      <Link href={"/"}>/julepakke-2-til-og-fra-lapper</Link>
                    </Form.Label>
                    <Form.Control placeholder="Julepakke #2 - Til og fra lapper" />
                  </Form.Group>

                  <div className="row mt-5">
                    <div className="col-md-6 cstm-chk">
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setIsChecked(e.target.checked);
                          }}
                        /> <span className="mt-2 d-inline-block">Visible in online store</span>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 cstm-chk">
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setIsChecked(e.target.checked);
                          }}
                        /> <span className="mt-2 d-inline-block">Visible in productgallery (landing page)</span>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                      <Form.Label>Display</Form.Label>
                      <Form.Select>
                        <option>Everywhere</option>
                      </Form.Select>
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Warehouse location</Form.Label>
                        <Form.Control placeholder="A1" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Quantity in stock</Form.Label>
                        <Form.Control placeholder="53534" />
                      </Form.Group>
                    </div>
                    <div className="col-md-4 cstm-chk">
                    <Form.Label>&nbsp;</Form.Label>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">                      
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setIsChecked(e.target.checked);
                          }}
                        /> <span className="mt-2 d-inline-block">Stock keep</span>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                          <Form.Label>VAT</Form.Label>
                          <Form.Select>
                            <option>Taxable</option>
                          </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                          <Form.Label>VAT class</Form.Label>
                          <Form.Select>
                            <option>Standard (25%)</option>
                          </Form.Select>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Short description</Form.Label>
                    <Form.Control as="textarea" placeholder="The cards are printed in Norway on environmentally friendly FSC approved paper. The size is 10×15 cm. 10 different designs." rows={3} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Product description</Form.Label>
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>My pages description</Form.Label>
                    <Form.Control placeholder="Kortene er trykket i Norge på miljøvennlig FSC godkjent papir. Størrelsen er 10x15 cm. 10 forskjellige design." />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Meta description</Form.Label>
                    <Form.Control as="textarea" placeholder="Dugnadspakke med 40stk til og fra lapper til jul. Disse er veldig enkle å selge i en dugnad for en skoleklasse, et idrettslag, en russegruppe eller andre organisasjoner." rows={3} />
                  </Form.Group>

                </div>
              </div>
              <hr className="mt-5 mb-1"></hr>
              <div className="fotr-bot">
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
