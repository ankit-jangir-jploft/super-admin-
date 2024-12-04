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
          <h2>Customers</h2>
          <div className='search-frm'>
            <Link href={'/createorder'}><img src="/images/add-plus.svg" /></Link> 
            <input type='text' placeholder='Sok i order' />
            {/* <img className='input-right-icon' src="/images/search-interface.svg" /> */}
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
                <th>ID</th>
                <th>Added</th>
                <th>Dugnadsgroup</th>
                <th>Contact person</th>
                <th>Emailaddress</th>
                <th>Telephone</th>
                <th>Status</th>
                <th>Lead</th>                
                <th>Last log</th>
                <th>Last contact</th>
                <th>Seller</th>
                <th>View</th>
                <th><Link href="/"><img src="/images/fltres.svg" /></Link></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status '>Created</button></td>
                <td><button className='status cold'>Cold</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/kunderdetail"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status green-clr'>Ordered trial package</button></td>
                <td><button className='status brown-btn'>Luke</button></td>
                <td>Order #10242</td>
                <td>29.09.24 12:42</td>
                <td>Stian</td>
                <td><Link href="/kunderdetail"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status '>Created</button></td>
                <td><button className='status cold'>Cold</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/kunderdetail"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status black'>Finished dugnad</button></td>
                <td><button className='status red'>Warm</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/kunderdetail"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status '>Created</button></td>
                <td><button className='status cold'>Cold</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/kunderdetail"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status green-clr'>Ordered trial package</button></td>
                <td><button className='status brown-btn'>Luke</button></td>
                <td>Order #10242</td>
                <td>29.09.24 12:42</td>
                <td>Stian</td>
                <td><Link href="/kunderdetail"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status '>Created</button></td>
                <td><button className='status cold'>Cold</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status black'>Finished dugnad</button></td>
                <td><button className='status red'>Warm</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status '>Created</button></td>
                <td><button className='status cold'>Cold</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status green-clr'>Ordered trial package</button></td>
                <td><button className='status brown-btn'>Luke</button></td>
                <td>Order #10242</td>
                <td>29.09.24 12:42</td>
                <td>Stian</td>
                <td><Link href="/"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status '>Created</button></td>
                <td><button className='status cold'>Cold</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/"><img src="/images/added-us.svg" /></Link></td>
                <td></td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td>#1321</td>
                <td>31.09.24</td>
                <td>Q Iddrettslag G14</td>
                <td>Kari Nordmann</td>                
                <td>kari.nordmann@firmamail.no</td>
                <td>+47 89765445</td>
                <td><button className='status black'>Finished dugnad</button></td>
                <td><button className='status red'>Warm</button></td>
                <td>Created</td>
                <td>29.09.24 12:42</td>
                <td>Robert</td>
                <td><Link href="/"><img src="/images/added-us.svg" /></Link></td>
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