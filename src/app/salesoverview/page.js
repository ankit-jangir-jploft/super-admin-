"use client";
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Link from "next/link";
const data = [
  { name: "Ola Nordmann", lapper1: 5, lapper2: 1, lapper3: 5, total: 625 },
  { name: "Kari Nordmann", lapper1: 6, lapper2: 5, lapper3: 5, total: 2500 },
  { name: "Oskar Hansen", lapper1: 4, lapper2: 2, lapper3: 2, total: 500 },
  { name: "Jonas Nordberg", lapper1: 4, lapper2: 1, lapper3: 1, total: 250 },
  { name: "Hans Karlsen", lapper1: 5, lapper2: 2, lapper3: 2, total: 1000 },
  { name: "Espen Knutsen", lapper1: 3, lapper2: 2, lapper3: 2, total: 500 },
  { name: "Sofie Joassen", lapper1: 2, lapper2: 1, lapper3: 1, total: 250 },
  { name: "Lise Nielsen", lapper1: 2, lapper2: 2, lapper3: 1, total: 1000 },
  {
    name: "Karsten Pettersen",
    lapper1: 5,
    lapper2: 2,
    lapper3: 2,
    total: 1125,
  },
  { name: "Henrik Kilen", lapper1: 5, lapper2: 2, lapper3: 2, total: 1000 },
  { name: "Peter Karlsen", lapper1: 4, lapper2: 2, lapper3: 2, total: 1250 },
  { name: "Karoline Nielsen", lapper1: 1, lapper2: 2, lapper3: 3, total: 875 },
  { name: "Karianne Larsen", lapper1: 6, lapper2: 2, lapper3: 1, total: 625 },
  { name: "Tonje Mortensrud", lapper1: 7, lapper2: 3, lapper3: 2, total: 1500 },
  { name: "Hanna Tobiasen", lapper1: 5, lapper2: 3, lapper3: 2, total: 375 },
  { name: "Sandra Simensen", lapper1: 6, lapper2: 2, lapper3: 3, total: 500 },
  { name: "Kjersti Simensen", lapper1: 7, lapper2: 4, lapper3: 2, total: 625 },
  { name: "Vilde Eliassen", lapper1: 4, lapper2: 2, lapper3: 3, total: 625 },
  { name: "Emma Pedersen", lapper1: 5, lapper2: 2, lapper3: 2, total: 625 },
  { name: "Erna Jensen", lapper1: 3, lapper2: 2, lapper3: 2, total: 1000 },
  { name: "Frida Larsson", lapper1: 6, lapper2: 2, lapper3: 3, total: 1000 },
  { name: "Kari Nordmann", lapper1: 5, lapper2: 3, lapper3: 2, total: 625 },
];

const SalesOverview = () => {
  return (
    <>
      {/* <Sidebar /> */}

      <div className="p-5 overviewz">
        <h3>Salesoverview Dugnad ABC Idrettsklubb J16</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Til og fra lapper #1 | Kr 125,-</th>
              <th className="p-2">Til og fra lapper #2 | Kr 125,-</th>
              <th className="p-2">Til og fra lapper #3 | Kr 125,-</th>
              <th className="p-2">Sum å betale</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <Link href={'/salesoverview2'}> {item.name}</Link>
                </td>
                <td className="p-2">{item.lapper1}</td>
                <td className="p-2">{item.lapper2}</td>
                <td className="p-2">{item.lapper3}</td>
                <td className="p-2">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SalesOverview;
