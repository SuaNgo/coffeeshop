"use client";

import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import * as xlsx from "xlsx";

const ExcelExport = ({ data, type }) => {
  const ref = useRef(null);
  const exportExcel = () => {
    var elt = ref.current;
    var wb = xlsx.utils.book_new();
    var ws = xlsx.utils.table_to_sheet(elt);
    if (type === "revenue") {
      xlsx.utils.book_append_sheet(wb, ws, "Tongthu1");
      xlsx.writeFile(wb, "Tongthu.xlsx");
    } else if (type === "refund") {
      xlsx.utils.book_append_sheet(wb, ws, "Hoantien1");
      xlsx.writeFile(wb, "Hoantien.xlsx");
    }
  };

  return (
    <>
      <table hidden ref={ref} border="1">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Sản phẩm</th>
            <th>Thanh toán</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td key={d.name}>{d.name}</td>
              <td key={d.line_items[0].price_data.product_data.name}>
                {d.line_items[0].price_data.product_data.name}
              </td>
              <td key={d.line_items[0].price_data.unit_amount}>
                {d.line_items[0].price_data.unit_amount}
              </td>
              <td key={d.streetAddress}>{d.streetAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={exportExcel} className="flex gap-2">
        <p className="mr-2">Xuất ra Excel</p>

        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Microsoft Excel icon</title>
          <path d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z" />
        </svg>
      </button>
    </>
  );
};

export default ExcelExport;
