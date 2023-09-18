"use client";

import { Layout } from "@/components";
import OrderForm from "@/components/Orders/OrderForm";
import axios from "axios";
import { useEffect, useState } from "react";

const editOrderPage = ({ params }) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const { slug } = params;
  useEffect(() => {
    if (!slug) {
      return;
    }
    axios.get("/api/orders?id=" + slug).then((response) => {
      setOrderInfo(response.data);
    });
  }, [slug]);

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[28px]">Trạng thái đơn hàng</h1>
        {orderInfo && <OrderForm {...orderInfo} />}
      </Layout>
    </main>
  );
};

export default editOrderPage;
