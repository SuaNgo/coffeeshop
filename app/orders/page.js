"use client";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import OrdersTable from "@/components/Orders/OrdersTable";
import Link from "next/link";
import axios from "axios";

const Orders = () => {
  const [orderDatas, setOrderDatas] = useState([]);
  const [updatedDatas, setUpdateDatas] = useState(true);

  const fetch = () => {
    axios.get("/api/orders").then((response) => setOrderDatas(response.data));
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (updatedDatas) {
      fetch();
      setUpdateDatas(false);
    }
  }, [updatedDatas]);

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <div className="mt-2 max-[1024px]:mt-20">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[40px] leading-10 font-title font-semibold">
              Đơn hàng
            </h1>
          </div>

          <div>
            {orderDatas.map((data, index) => (
              <OrdersTable
                key={index}
                data={data}
                setUpdateDatas={setUpdateDatas}
              />
            ))}
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Orders;
