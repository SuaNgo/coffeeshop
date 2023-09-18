"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import SettingsTable from "@/components/Settings/SettingsTable";
import { useSession } from "next-auth/react";

const Settings = () => {
  const [settingDatas, setSettingDatas] = useState([]);
  const [updatedDatas, setUpdateDatas] = useState(true);
  const { data: session } = useSession();
  const roleCheck = session?.user.role === "admin";
  const fetch = () => {
    axios
      .get("/api/settings")
      .then((response) => setSettingDatas(response.data));
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
              Setting
            </h1>
            {roleCheck && (
              <Link
                className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white"
                href="/settings/new"
              >
                Thêm tài khoản
              </Link>
            )}
          </div>
          <div>
            {settingDatas.map((data, index) => (
              <SettingsTable
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

export default Settings;
