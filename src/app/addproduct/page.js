"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

const page = () => {
  const [value, setValue] = useState("");
  const [imgsSrc, setImgsSrc] = useState([]);
  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  useEffect(() => {
    // Access the document object here
    console.log("document");
  }, []);

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='add-product'>
          <h2>Julepakke #2 - Til og fra lapper</h2>
          <div className='add-prodt-sve'>
            <Link href='addproduct'>/Julepakke-2-Til-og-fra lapper</Link>
            <div>
              <button className='add-icon light-img me-2'>
                <img src='/images/close-fill.svg' />
              </button>
              <button className='add-icon clr-img'>
                <img src='/images/save-fill.svg' />
              </button>
            </div>
          </div>
          <Row>
            <Col
              xxl={3}
              lg={6}
            >
              <div className='order-dtl-box'>
                <h2>Produktbilde</h2>
                <div className='img-pr p-2'>
                  <img
                    className='img-fluid'
                    src='/images/product-img.png'
                  />
                </div>
              </div>
              <div className='order-dtl-box'>
                <h2>Produktbilde</h2>
                <div className='upload-preview-img px-2'>
                  {imgsSrc.map((link) => (
                    <img
                      className='img-fluid'
                      src={link}
                    />
                  ))}
                  <div className='upload-img'>
                    <img
                      className='img-fluid'
                      src='/images/plus.svg'
                    />
                    <input
                      onChange={onChange}
                      type='file'
                      name='file'
                      multiple
                    />
                  </div>
                </div>
              </div>
              <div className='order-dtl-box'>
                <h2>Produktkategori</h2>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Kort'
                  />{" "}
                  <label htmlFor='Kort'>Kort</label>
                </p>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Forhandssalg'
                  />{" "}
                  <label htmlFor='Forhandssalg'>Forhandssalg</label>
                </p>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Provepkker'
                  />{" "}
                  <label htmlFor='Provepkker'>Provepkker</label>
                </p>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Tilbehor'
                  />{" "}
                  <label htmlFor='Tilbehor'>Tilbehor</label>
                </p>
                <div className='px-2 mt-2'>
                  <Link
                    href='/'
                    className='add-category'
                  >
                    Legg til kategori
                  </Link>
                </div>
              </div>
              <div className='order-dtl-box'>
                <h2>Underkategori</h2>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Kort'
                  />{" "}
                  <label htmlFor='Kort'>Jul</label>
                </p>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Forhandssalg'
                  />{" "}
                  <label htmlFor='Forhandssalg'>Anledning</label>
                </p>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Provepkker'
                  />{" "}
                  <label htmlFor='Provepkker'>Bursdag</label>
                </p>
                <p className='d-flex gap-2'>
                  <input
                    type='checkbox'
                    id='Tilbehor'
                  />{" "}
                  <label htmlFor='Tilbehor'>Bilde</label>
                </p>
                <div className='px-2 mt-2'>
                  <Link
                    href='/'
                    className='add-category'
                  >
                    Legg til Underkategori
                  </Link>
                </div>
              </div>
              <div className='order-dtl-box mt-4'>
                <h2>Produkt-stikkord</h2>
                <div className='p-2'>
                  <button className='tags-btn'>
                    Kortpakke <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Kortpakke <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn'>
                    Kort <img src='/images/close.svg' />
                  </button>
                </div>
                <div className='search-frm justify-content-end px-3'>
                  <input
                    type='text'
                    className='rounded ps-2'
                  />
                  <button className='add-icon'>
                    <img src='/images/add.svg' />
                  </button>
                </div>
              </div>
              <div className='order-dtl-box mt-4'>
                <h2>Lenkede produkter</h2>
                <div className='p-2'>
                  <button className='tags-btn w-100 justify-content-between d-flex align-items-center'>
                    Julepakke #1 <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn w-100 justify-content-between d-flex align-items-center'>
                    Julepakke #3 <img src='/images/close.svg' />
                  </button>
                  <button className='tags-btn w-100 justify-content-between d-flex align-items-center'>
                    Konvolutter <img src='/images/close.svg' />
                  </button>
                </div>
                <div className='search-frm justify-content-end px-3'>
                  <input
                    type='text'
                    className='rounded ps-2'
                  />
                </div>
              </div>
            </Col>
            <Col
              xxl={6}
              lg={6}
            >
              <div className='order-dtl-box  add-product-filds'>
                <h2>Generelt</h2>
                <Row>
                  <Col lg={6}>
                    <p>Status</p>
                  </Col>
                  <Col lg={6}>
                    <select>
                      <option>Synlig</option>
                      <option>Synlig</option>
                    </select>
                  </Col>
                  <Col lg={6}>
                    <p>Visning</p>
                  </Col>
                  <Col lg={6}>
                    <select>
                      <option>Overalt</option>
                      <option>Overalt</option>
                    </select>
                  </Col>
                  <Col lg={6}>
                    <p>Ordinaer pris (kr)</p>
                  </Col>
                  <Col lg={6}>
                    <input type='text' />
                  </Col>
                  <Col lg={6}>
                    <p>Tilbudspris (kr)</p>
                  </Col>
                  <Col lg={6}>
                    <input type='text' />
                  </Col>
                  <Col lg={6}>
                    <p>Dugnadspris (kr)</p>
                  </Col>
                  <Col lg={6}>
                    <input type='text' />
                  </Col>
                  <Col lg={6}>
                    <p>Avgiftsstatus</p>
                  </Col>
                  <Col lg={6}>
                    <select>
                      <option>Avgiftspliktig</option>
                      <option>Avgiftspliktig</option>
                    </select>
                  </Col>
                  <Col lg={6}>
                    <p>Avgiftklasse</p>
                  </Col>
                  <Col lg={6}>
                    <select>
                      <option>Standard</option>
                      <option>Standard</option>
                    </select>
                  </Col>
                  <Col lg={6}>
                    <p>Produktnummer</p>
                  </Col>
                  <Col lg={6}>
                    <input type='text' />
                  </Col>
                  <Col lg={6}>
                    <p>Lager lokasjon</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='A1'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Lagerstyring</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='checkbox'
                      placeholder='A1'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Antall</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='53534'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Vekt (g)</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='31'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Lengde (cm)</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='21'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Bredde (cm)</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='9'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Hoyde (cm)</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='1'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Menyrekkefolge</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='1'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>GTIN / EAN</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='text'
                      placeholder='1'
                    />
                  </Col>
                  <Col lg={6}>
                    <p>Vises i produktgalleri</p>
                  </Col>
                  <Col lg={6}>
                    <input
                      type='checkbox'
                      placeholder='1'
                    />
                  </Col>
                </Row>
              </div>
              <div className='order-dtl-box '>
                <h2>Kort beskrivelse</h2>
                {typeof window !== "undefined" && (
                  <ReactQuill
                    theme='snow'
                    value={value}
                    onChange={setValue}
                    className='p-2'
                  />
                )}
              </div>
              <div className='order-dtl-box '>
                <h2>Meta beskrivelse</h2>
                <h6>
                  Dugnadspakke med 40 stk til og fra lapper til jul. Disse en
                  veldig enkle a selge i en dugned for en skoleklasse, ett
                  idrattslag, en russegruppe eller andre organisasjoner.
                </h6>
              </div>
              <div className='order-dtl-box '>
                <h2>Mine sider beskrivelse</h2>
                <h6>
                  Kortene er trykket i norge pa miljovennlig FSC godkjent papir.
                  Storrelsen er 10x15 cm. 10 forskjellige design
                </h6>
              </div>
            </Col>
            <Col
              xxl={3}
              lg={6}
            >
              <div className='order-dtl-box'>
                <h2>Logg </h2>
                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Robert</Link>
                  </span>
                  <label>Produkt opprettet</label>
                </div>
                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Robert</Link>
                  </span>
                  <label>Oppdatert beskrivelse</label>
                </div>
                <div className='logg-dtl'>
                  <span>
                    29.09.2024 - 15:04 <Link href='orderdetail'>Robert</Link>
                  </span>
                  <label>Oppdatert antall: fra 24078 till 54078</label>
                </div>

                <div className='logg-til-desc'>
                  <div className='form-group'>
                    <textarea
                      rows='4'
                      placeholder='Legg til internt notat...'
                    ></textarea>
                  </div>
                  <div className='text-end'>
                    <button className='btn-primary px-3 py-1'>
                      Legg til notat
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default page;
