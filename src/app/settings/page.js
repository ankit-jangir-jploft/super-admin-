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
import { Badge, Tab, Tabs } from "react-bootstrap";


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
      <div className="detail-admin-main stng-pge">
      <div className='admin-header'>
          <h2>Settings</h2>
          <div className='search-frm'>
            <input type='text' placeholder='Sok i order' />
            <Link href={'/'}><img src="/images/notifications_none.svg" /></Link> 
            <Link href={'/'}><img src="/images/avatar-style.png" /></Link>              
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="shdw-crd crte-ordr">
            <Tabs
                  defaultActiveKey="general"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="general" title="General">
                    <div className="row mt-5">
                      <div className="col-md-6">
                        <div className="cstm-chk">
                          <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                setIsChecked(e.target.checked);
                              }}
                            /> <span className="mt-2 d-inline-block">Automatically unpublish items in the online store
  with less than 100 pieces in stock </span>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="bot-btn justify-content-end">
                        <Link className="cr-btn" href="/">Create Product</Link>
                        </div>
                      </div>
                      <div className="col-md-6 mt-4"> 
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group className="mb-3">
                            <Form.Label>Budget</Form.Label>
                            <Form.Control placeholder="Enter budget " />
                          </Form.Group>
                        </div>
                        <div className="col-md-12">
                          <Form.Group className="mb-3">
                            <Form.Label>Default VAT class</Form.Label>
                            <Form.Select>
                              <option>25%</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                      <h3 className="ad-prdtse mt-4 mb-3">
                        <Form.Select className="ms-0">
                          <option>English</option>
                        </Form.Select>
                      </h3>
                      <Form.Label className="mb-3">Terms of purchase</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Terms of purchase" />
                          </Form.Group>                          
                      </div>
                    </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <Form.Group className="mb-3">
                                  <Form.Label>Text</Form.Label>
                                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                                </Form.Group>
                                </div>
                              </div>                    

                  </Tab>
                  <Tab eventKey="dugnadssettings" title="Dugnadssettings">
                      <h5 className="ad-prdtse mt-4 mb-3">
                      Dugnadssettings
                        <Form.Select className="ms-3">
                          <option>English</option>
                        </Form.Select>
                      </h5>
                              <div className="row">
                                <div className="col-md-6">
                                  <Form.Label className="d-block">Default text when sharing in social media</Form.Label>
                                  <Form.Label className="d-block mt-4">Default image when sharing in social media</Form.Label>
                                </div>
                                <div className="col-md-6 text-end">
                                  <Form.Group className="mb-3">
                                    <Form.Control placeholder="Thank you for your support!" />
                                  </Form.Group> 
                                  <img className="strimg" src="/images/store-im.png" />
                                </div>
                              </div>
                              <Form.Label>Frequently asked questions</Form.Label>
                              <div className="row">
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Question 1</Form.Label>
                                      <Form.Control placeholder="How do i share my online store?" />
                                    </Form.Group>
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Answer</Form.Label>
                                      <Form.Control placeholder="Lorem ipsum sie dolor em a mit" />
                                    </Form.Group>
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Question 2</Form.Label>
                                      <Form.Control placeholder="Can the buyers have the packages sent directly to their home in the post box?" />
                                    </Form.Group>
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Answer</Form.Label>
                                      <Form.Control placeholder="Lorem ipsum sie dolor em a mit" />
                                    </Form.Group>
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Question 3</Form.Label>
                                      <Form.Control placeholder="How do I charge my customers?" />
                                    </Form.Group>
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Answer</Form.Label>
                                      <Form.Control placeholder="Lorem ipsum sie dolor em a mit" />
                                    </Form.Group>
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Question 4</Form.Label>
                                      <Form.Control placeholder="How do I share my webstore on facebook?" />
                                    </Form.Group>
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                    <Form.Label>Answer</Form.Label>
                                      <Form.Control placeholder="Lorem ipsum sie dolor em a mit" />
                                    </Form.Group>
                                  </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="bot-btn add-quet">
                                      <Link className="cr-btn" href="/">Add question and answer</Link>
                                    </div>
                                  </div>
                                <div className="col-md-6">
                                  <div className="bot-btn justify-content-end">
                                    <Link className="cr-btn" href="/">Save</Link>
                                  </div>
                                </div>
                              </div>
                  </Tab>
                  <Tab eventKey="Frontpagesettings" title="Frontpage settings">
                    <div className="row">
                      <div className="col-md-8 mx-auto">
                          <Form.Label className="ad-prdtse mt-4 mb-3">
                              Navbar
                            <Form.Select className="ms-3">
                              <option>English</option>
                            </Form.Select>
                          </Form.Label>
                              <ul className="nvbre-txt">
                                <li>Nav One</li>
                                <li>Nav Two</li>
                                <li>Nav Three</li>
                                <li>Nav Four</li>
                                <li>Nav Five</li>
                              </ul>                      
                        <div className="row">
                          <div className="col-md-6">
                          <Form.Label className="mt-4">Upload Logo</Form.Label>
                            <div className="crpr-im filr-setng">
                              <img src={file} />
                              <div className="cstm-fle">
                                <input type="file" onChange={handleChange} />
                                <img src="/images/image-upload1.svg" />
                                <p className="m-0">Drag & Drop or <span>choose file</span> to upload</p>
                                <small>Supported formats : Jpeg, png</small>
                              </div>
                            </div>
                            <Form.Group className="mb-3">
                                    <Form.Label>Header Title </Form.Label>
                                      <Form.Control placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Header Description</Form.Label>
                                      <Form.Control placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Header Button Label</Form.Label>
                                      <Form.Control placeholder="Header Button Label" />
                                    </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Label className="mt-4">Header Image</Form.Label>
                            <div className="crpr-im filr-setng filr-setng1">
                              <img src={file} />
                              <div className="cstm-fle">
                                <input type="file" onChange={handleChange} />
                                <img src="/images/image-upload1.svg" />
                                <p className="m-0">Drag & Drop or <span>choose file</span> to upload</p>
                                <small>Supported formats : Jpeg, png</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4 "></hr>
                        <div className="row">
                          <div className="col-md-12 text-center">
                            <div className="bot-btn d-block">
                              <Link href={"/"} className="cr-btn d-inline-block">Save</Link>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="users" title="Users">
                    <div className="row">
                      <div className="col-md-12 text-end">
                        <Link href={"/"} className="crte-userd">Create User</Link>
                      </div>
                    </div>
                  <div className='table-responsive order-table'>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Type</th>
                          <th>Email</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><img src="/images/avatar-style.png" /></td>
                          <td>Olivia Gundersen</td>
                          <td><Badge bg="success">Active</Badge></td>
                          <td>Administrator</td>
                          <td>olivia.gundersen@dugnadstid.no</td>    
                          <td><Link href={'/useredit'}><img src="/images/edit-icn.svg" /></Link></td>          
                        </tr>
                        <tr>
                          <td><img src="/images/avatar-style1.png" /></td>
                          <td>Espen Hansen</td>
                          <td><Badge bg="danger">Inactive</Badge></td>
                          <td>Seller</td>
                          <td>espen.hansen@dugnadstid.no</td>    
                          <td><Link href={'/useredit'}><img src="/images/edit-icn.svg" /></Link></td>          
                        </tr>
                        <tr>
                          <td><img src="/images/avatar-style2.png" /></td>
                          <td>Karl Kristiansen</td>
                          <td><Badge bg="success">Active</Badge></td>
                          <td>Guest</td>
                          <td>karl.kristiansen@dugnadstid.no</td>    
                          <td><Link href={'/useredit'}><img src="/images/edit-icn.svg" /></Link></td>          
                        </tr>
                        <tr>
                          <td><img src="/images/avatar-style3.png" /></td>
                          <td>Elise Nordmann</td>
                          <td><Badge bg="success">Active</Badge></td>
                          <td>Seller</td>
                          <td>elise.nordmann@dugnadstid.no</td>    
                          <td><Link href={'/useredit'}><img src="/images/edit-icn.svg" /></Link></td>          
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </Tab>
                </Tabs>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
