'use client'
import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>Products</h2>
          <div className='search-frm'>
            <input type='text' placeholder='Sok i order' />
            <Link href={'/'}><img src="/images/notifications_none.svg" /></Link> 
            <Link href={'/'}><img src="/images/avatar-style.png" /></Link>              
          </div>
        </div>
        <div className='shdw-crd'>
          <div className='table-responsive order-table'>
            <table>
              <thead>
                <tr>
                  <th>Mark</th>
                  <th>Product #</th>
                  <th>Image</th>
                  <th>Product name</th>
                  <th>Location</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Sub category</th>
                  <th>Created</th>
                  <th>View</th>
                  <th><Link href="/"><img src="/images/fltres.svg" /></Link></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD8</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Birthday pack #2</td>                  
                  <td>A2</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status yellow'>Unpublished</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status yellow'>Unpublished</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><input type='checkbox' /></td>
                  <td>PKD9</td>
                  <td>
                    <div className='produt-tile'>
                      <img className="product-img img-fluid" src="/images/product.png" />
                    </div>
                  </td>
                  <td>Juiepakke #3 - Til og fra lapper</td>                  
                  <td>A1</td>
                  <td>7410 stk</td>
                  <td>50,-</td>
                  <td><button className='status green-clr'>Published</button></td>
                  <td>Cards</td>
                  <td>Christmas</td>
                  <td>21.05.2022</td> 
                  <td>
                    <Link href={'/orderdetail'}><img src="/images/prdctes.svg" /></Link>
                  </td>
                  <td></td>
                </tr>           
              </tbody>
            </table>
          </div>
        </div>
        <div className='tablebruk'>
          <select>
            <option>Mass action</option>
            <option>Mass action</option>
          </select>

            <ul className='pgnatne'>
              <li>Showing 15 of 1154 elements</li>
              <li><Link href={'/'}><img src="/images/frst-aro.svg" /></Link></li>
              <li><Link href={'/'}><img src="/images/revrse.svg" /></Link></li>
              <li>1 of 42</li>
              <li><Link href={'/'}><img src="/images/nxt-aro.svg" /></Link></li>
              <li><Link href={'/'}><img src="/images/lstpge-aro.svg" /></Link></li>
            </ul>

        </div>
      </div>
    </>
  )
}

export default page