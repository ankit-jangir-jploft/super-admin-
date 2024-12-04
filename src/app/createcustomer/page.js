'use client'
import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Form from 'react-bootstrap/Form';
import Link from 'next/link';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const page = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'SE', value: '1' },
    { name: 'NO', value: '2' },
  ];
  let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }
  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <div className='d-flex justify-content-between w-100 align-items-center'>
                  <h2>Create customer</h2>
                  <div className='bot-btn'>
                    <Link href={'/'} className='can-btn'>Cancel</Link>
                    <Link href={'/'} className='cr-btn'>Create customer</Link>
                  </div>
                </div>
          {/* <div className='search-frm'>
            <input type='text' placeholder='Sok i order' />
            <img className='input-right-icon' src="/images/search-interface.svg" />
            <button className='add-icon'>
              <img src="/images/add.svg" />
            </button>
          </div> */}
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr'>
                <h3>#1391</h3>
                <div className='row'>
                  <div className='col-md-6'>
                  <div className='swtch-bt'>
                    <Form.Label>Country</Form.Label>
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

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Q Iddrettslag G13" />
                  </Form.Group>

                  <Form.Group className="mb-3 cstmr-ad">
                    <div className='cstmr-dve'>
                    <Form.Label>Company</Form.Label>
                    <Form.Select>
                      <option>Q Idrettslag AS</option> 
                    </Form.Select>
                    </div>
                    <Link href='' className='add-btne'>+</Link>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Organisation number</Form.Label>
                    <Form.Control placeholder="98787867" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Snarveien 42" />
                  </Form.Group>
                      <div className='row'>
                        <div className='col-md-2'>
                          <Form.Group className="mb-3">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control placeholder="2042" />
                          </Form.Group>
                        </div>
                        <div className='col-md-10'>
                          <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="Storbyåsen" />
                          </Form.Group>
                        </div>
                      </div>
                  </div>
                  <div className='col-md-6'>
                    
                  <Form.Group className="mb-3">
                    <Form.Label>Seller</Form.Label>
                    <Form.Select>
                      <option>Robert Nordmann</option> 
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact person</Form.Label>
                    <Form.Control placeholder="Kari Nordmann" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Telephone number</Form.Label>
                    <Form.Control placeholder="+47 38833663" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control placeholder="kari.nordmann@mail.com" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Delivery address</Form.Label>
                    <Form.Select>
                      <option>Same as address</option> 
                    </Form.Select>
                  </Form.Group>
                  </div>
                  
                </div>


                <hr className='my-5'></hr>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
export default page