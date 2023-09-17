"use client";

import { Layout } from "@/components";
import {
  faCartShopping,
  faDollarSign,
  faMessage,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <div className="flex items-baseline gap-2 justify-end mb-[44px]">
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
        </div>
        <div className="grid-cols-2 grid gap-6 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1">
          <div className="h-[200px]  bg-white shadow-2xl border-2 border-gray-200 p-4 border-solid mb-4 rounded-lg relative">
            <div className="flex justify-between">
              <span className=" text-[20px]">Earning</span>
              <FontAwesomeIcon icon={faDollarSign} className="text-xl" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 absolute">
              <span className="text-[30px]">50</span>
            </div>
          </div>
          <div className="h-[200px]  bg-white shadow-2xl border-2 border-gray-200 p-4 border-solid mb-4 rounded-lg relative">
            <div className="flex justify-between">
              <span className=" text-[20px]">Orders</span>
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 top-2/3 left-1/2 absolute">
              <span className="text-[30px]">50</span>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Dashboard;
