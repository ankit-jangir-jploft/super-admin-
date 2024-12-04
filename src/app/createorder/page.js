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
    { name: 'No', value: '1' },
    { name: 'Yes', value: '2' },
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
          {/* <h2>Create order</h2> */}
          <div className='d-flex justify-content-between w-100 align-items-center'>
                  <h2>Create order</h2>
                  <div className='bot-btn'>
                    <Link href={'/'} className='can-btn'>Cancel</Link>
                    <Link href={'/'} className='cr-btn'>Create order</Link>
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
                <h3>#10332</h3>
                <div className='row'>
                  <div className='col-md-6'>
                  <Form.Group className="mb-3 cstmr-ad">
                    <div className='cstmr-dve'>
                    <Form.Label>Customer</Form.Label>
                    <Form.Select>
                      <option>Q Iddrettslag G13</option> 
                    </Form.Select>
                    </div>
                    <Link href='' className='add-btne'>+</Link>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Ordered by</Form.Label>
                    <Form.Control placeholder="Roger Nordmann" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Delivery address</Form.Label>
                    <Form.Select>
                      <option>Customers address</option>
                    </Form.Select>
                  </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <div className='swtch-bt'>
                    <Form.Label>Order confirmation</Form.Label>
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
                    <Form.Label>Send order confirmation to</Form.Label>
                    <Form.Select>
                      <option>kari.nordmann@mail.com</option> 
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control placeholder="" />
                  </Form.Group>
            
                  </div>
                  
                </div>
                <h5 className='mt-3'>Products</h5>
                <div className='row'>
                  <div className='col'>
                    <div className='prodct-crd'>
                      <img src="/images/product1.png" />
                      <h4>BIRTHDAY CARDS</h4>
                      <span>20 stk - Price 125,-</span>
                      <Link href={'/'}><img src="/images/bag.svg" /> ADD</Link>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='prodct-crd'>
                      <img src="/images/product2.png" />
                      <h4>ANLEDNINGSKORT</h4>
                      <span>20 stk - Price 125,-</span>
                      <div className="prdct-plmn">
                        <button onClick={decrementCount}>-</button>
                        <div className='qty-cnt'>{count}</div>
                        <button onClick={incrementCount}>+</button>                        
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='prodct-crd'>
                      <img className='prdt-im' src="/images/product1.png" />
                      <h4>BIRTHDAY CARDS</h4>
                      <span>20 stk - Price 125,-</span>
                      <Link href={'/'}><img src="/images/bag.svg" /> ADD</Link>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='prodct-crd'>
                      <img className='prdt-im' src="/images/product2.png" />
                      <h4>ANLEDNINGSKORT</h4>
                      <span>20 stk - Price 125,-</span>
                      <div className="prdct-plmn">
                        <button onClick={decrementCount}>-</button>
                        <div className='qty-cnt'>{count}</div>
                        <button onClick={incrementCount}>+</button>                        
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='prodct-crd'>
                      <img className='prdt-im' src="/images/product2.png" />
                      <h4>ANLEDNINGSKORT</h4>
                      <span>20 stk - Price 125,-</span>
                      <div className="prdct-plmn">
                        <button onClick={decrementCount}>-</button>
                        <div className='qty-cnt'>{count}</div>
                        <button onClick={incrementCount}>+</button>                        
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='prodct-crd'>
                      <img className='prdt-im' src="/images/product1.png" />
                      <h4>BIRTHDAY CARDS</h4>
                      <span>20 stk - Price 125,-</span>
                      <Link href={'/'}><img src="/images/bag.svg" /> ADD</Link>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='prodct-crd'>
                      <img className='prdt-im' src="/images/product2.png" />
                      <h4>ANLEDNINGSKORT</h4>
                      <span>20 stk - Price 125,-</span>
                      <div className="prdct-plmn">
                        <button onClick={decrementCount}>-</button>
                        <div className='qty-cnt'>{count}</div>
                        <button onClick={incrementCount}>+</button>                        
                      </div>
                    </div>
                  </div>
                  <div className='col'></div>
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