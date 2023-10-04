"use client";

import { Layout } from "@/components";
import ExcelExport from "@/utils/ExcelExport";
import {
  faCartShopping,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const [revenue, setRevenue] = useState([]);
  const [orderDelivering, setOrderDelivering] = useState([]);
  const [orderRef, setOrderRef] = useState([]);
  const [orderWait, setOrderWait] = useState([]);
  const [newOrder, setNewOrder] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?idOrder").then((res) => {
      setRevenue(res.data);
    });
    axios.get("/api/orders?idOrderDelivering").then((res) => {
      setOrderDelivering(res.data);
    });
    axios.get("/api/orders?idOrderRef").then((res) => {
      setOrderRef(res.data);
    });
    axios.get("/api/orders?idOrderWait").then((res) => {
      setOrderWait(res.data);
    });
    axios.get("/api/orders?idNew").then((res) => {
      setNewOrder(res.data);
    });
  }, []);

  let totalRevenue = 0;
  revenue?.map((re) => {
    totalRevenue += re.line_items[0].price_data.unit_amount;
  });

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <div className="flex justify-between items-baseline gap-2 mb-[44px]">
          <h1 className="text-[20px] leading-[20px] pt-8 pr-4 font-welcome font-medium">
            Chào mừng quay trở lại, {session?.user.name}
          </h1>
          {session?.user?.image && (
            <div>
              <img
                src={session.user.image}
                className="w-10 h-10"
                alt="user avatar"
              />
            </div>
          )}

          <div className="flex justify-between items-baseline">
            <Link href="/orders">
              <span className="text-[20px] leading-[20px] pt-8 pr-4 font-welcome font-medium">
                Bạn có <span className="text-red-500">{newOrder?.length}</span>{" "}
                đơn hàng mới
              </span>
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            </Link>
          </div>
        </div>
        <div className="grid-cols-2 grid gap-6 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1">
          <div className="h-[200px]  bg-white shadow-2xl border-2 border-gray-200 p-4 border-solid mb-4 rounded-lg relative">
            <div className="flex justify-between">
              <span className=" text-[20px]">Tổng thu</span>
              <FontAwesomeIcon icon={faDollarSign} className="text-xl" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 absolute">
              <span className="text-[30px]">
                {totalRevenue
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </span>
            </div>
          </div>
          <div className="h-[200px]  bg-white shadow-2xl border-2 border-gray-200 p-4 border-solid mb-4 rounded-lg relative">
            <div className="flex justify-between">
              <span className=" text-[20px]">
                Đơn hàng hoàn thành/ đang vận chuyển
              </span>

              <ExcelExport data={revenue} type="revenue" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 absolute">
              <span className="text-[30px]">
                {revenue?.length}/{orderDelivering?.length || 0}
              </span>
            </div>
          </div>
          <div className="h-[200px]  bg-white shadow-2xl border-2 border-gray-200 p-4 border-solid mb-4 rounded-lg relative">
            <div className="flex justify-between">
              <span className=" text-[20px]">Đơn hàng đang chờ hoàn tiền</span>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 absolute">
              <span className="text-[30px]">{orderWait?.length}</span>
            </div>
          </div>
          <div className="h-[200px]  bg-white shadow-2xl border-2 border-gray-200 p-4 border-solid mb-4 rounded-lg relative">
            <div className="flex justify-between">
              <span className=" text-[20px]">Đơn hàng đã hoàn tiền</span>

              <ExcelExport data={orderRef} type="refund" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 absolute">
              <span className="text-[30px]">{orderRef?.length}</span>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Dashboard;
