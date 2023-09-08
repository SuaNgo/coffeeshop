"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import SettingsTable from "@/components/Settings/SettingsTable";

const Settings = () => {
  const [settingDatas, setSettingDatas] = useState([]);
  const [updatedDatas, setUpdateDatas] = useState(true);

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
        <div className="basic mt-2">
          <h1>Setting</h1>

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

        <Link className="bg-red-200 py-2 px-3 rounded-xl" href="/settings/new">
          Thêm tài khoản
        </Link>
      </Layout>
    </main>
  );
};

export default Settings;
