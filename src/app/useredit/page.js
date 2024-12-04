"use client";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import {ButtonGroup, ToggleButton } from "react-bootstrap";


const page = () => {

  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Light', value: '1' },
    { name: 'Dark', value: '2' },
  ];
  return (
    <>
      <Sidebar />
      <div className="detail-admin-main stng-pge">
      <div className='admin-header'>
          <h2>Settings</h2>
          <div className='search-frm'>
            <input type='text' placeholder='Sok i order' />
            <img className='input-right-icon' src="/images/search-interface.svg" />
            <Link href={'/'}><img src="/images/notifications_none.svg" /></Link> 
            <Link href={'/'}><img src="/images/avatar-style.png" /></Link>              
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="shdw-crd crte-ordr edte-usr">
            <div className="row">
              <div className="col-md-7 mx-auto">
                <div className="d-block text-center">               
                  <img className="d-inline-block" src="/images/usr-edt.png" />
                  <Link className="d-block" href={'/'}>Edit Photo</Link>
                </div>
                <div className="row">
                  <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Elise Nordmann" />
                      </Form.Group>
                  </div>
                  <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="elise.nordmann@dugnadstid.no" />
                      </Form.Group>
                  </div>
                  <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select>
                              <option>Seller</option>
                        </Form.Select>
                      </Form.Group>
                  </div>
                  <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select>
                              <option>Active</option>
                        </Form.Select>
                      </Form.Group>
                  </div>
                  <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Language</Form.Label>
                        <Form.Select>
                              <option>Norsk</option>
                        </Form.Select>
                      </Form.Group>
                  </div>
                  <div className="col-md-6">
                  <div className='swtch-bt'>
                      <Form.Label>Appearance</Form.Label>
                      <ButtonGroup>
                        {radios.map((radio, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                          >
                            {radio.name}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </div>
                  </div>
                </div>
                  <div className="row mt-3 mb-5">
                                <div className="col-md-6">
                                    <div className="bot-btn add-quet">
                                      <Link className="cr-btn" href="/">Delete user</Link>
                                    </div>
                                  </div>
                                <div className="col-md-6">
                                  <div className="bot-btn justify-content-end">
                                    <Link className="cr-btn" href="/">Save</Link>
                                  </div>
                                </div>
                  </div>
              </div>
            </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
