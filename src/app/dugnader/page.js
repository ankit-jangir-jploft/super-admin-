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
          <h2>Dugnader</h2>
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
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Dugnadsgroup</th>
                  <th>Sellers</th>
                  <th>Active</th>
                  <th>Packs</th>
                  <th>APS</th>
                  <th>Turnover</th>
                  <th>Profit</th>
                  <th>Status</th>
                  <th>Postnr</th>
                  <th>Contact person</th>
                  <th>Seller</th>
                  <th>Contact</th>
                  <th><Link href="/"><img src="/images/fltres.svg" /></Link></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status yellow'>Direct</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status yellow'>Direct</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status yellow'>Direct</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status green-clr'>Active</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>30.09.24</td>
                  <td>14.10.24</td>
                  <td>Q Iddrettslag G14</td>
                  <td>14</td>                  
                  <td>8/14</td>
                  <td>14</td>
                  <td>1.2</td>
                  <td>kr 3 750</td>
                  <td>kr 2 250</td>
                  <td><button className='status yellow'>Direct</button></td>
                  <td>4211</td>
                  <td>Kari Nordmann</td>
                  <td>Robert</td> 
                  <td>
                    <Link href={'/'}><img src="/images/added-us.svg" /></Link>
                  </td>
                  <td></td>
                </tr>
                        
              </tbody>
            </table>
          </div>
        </div>
        <div className='tablebruk justify-content-end'>
          {/* <select>
            <option>Mass action</option>
            <option>Mass action</option>
          </select> */}

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