"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
import { GET } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";

const page = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/customerList`);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main'>
        <div className='admin-header'>
          <h2>kunder</h2>
          <div className='search-frm'>
            <input
              type='text'
              placeholder='Sok i order'
            />
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={"/"}>
              <img src='/images/avatar-style.png' />
            </Link>
          </div>
        </div>
        <div className='table-responsive order-table'>
          <table>
            <thead>
              <tr>
                <th>Merk</th>
                <th>ID</th>
                <th>Lagt til</th>
                <th>Dugnadsgruppe</th>
                <th>Navn</th>
                <th>Epostadresse</th>
                <th>Telefon</th>
                <th>Status</th>
                <th>Tilordnet</th>
                <th>Varer</th>
                <th>Sist kontaktet</th>
                <th>Siste loggforing</th>
                <th>
                  <span className='clr-dott cyan'></span>
                  <span className='clr-dott yellow'></span>
                  <span className='clr-dott red'></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status cyan psn-sts'>KALD</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status yellow psn-sts'>Lunken</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status green'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status red psn-sts'>Varm</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status cyan psn-sts'>KALD</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status yellow psn-sts'>Lunken</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status green'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status red psn-sts'>Varm</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status cyan psn-sts'>KALD</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status yellow psn-sts'>Lunken</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status green'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status red psn-sts'>Varm</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status cyan psn-sts'>KALD</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status yellow'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status yellow psn-sts'>Lunken</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>#10321</td>
                <td>30.09.2024</td>
                <td>Q ldrettslag G14</td>
                <td>Kari Nordmann</td>
                <td>kari.nordmann@firmamail.com</td>
                <td>+47 99 88 77 66</td>
                <td>
                  <button className='status green'>BESTILT PROVEPAKKE</button>
                </td>
                <td>Robert</td>
                <td>11 stk</td>
                <td>Ikk kontaktet</td>
                <td>Opprettet</td>
                <td>
                  <button className='status red psn-sts'>Varm</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='tablebruk'>
          <select>
            <option>Massehandling</option>
            <option>Massehandling</option>
          </select>
          <button className='btn-primary py-1 px-4'>BRUK</button>
        </div>
      </div>
    </>
  );
};

export default page;
