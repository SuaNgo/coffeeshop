"use client";

import { Layout } from "@/components";
import SettingsForm from "@/components/Settings/SettingForm";
import axios from "axios";
import { useEffect, useState } from "react";

const editSettingPage = ({ params }) => {
  const [settingInfo, setSettingInfo] = useState(null);
  const { slug } = params;
  useEffect(() => {
    if (!slug) {
      return;
    }
    axios.get("/api/settings?id=" + slug).then((response) => {
      setSettingInfo(response.data);
    });
  }, [slug]);

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[28px]">Sửa tài khoản</h1>
        {settingInfo && <SettingsForm {...settingInfo} />}
      </Layout>
    </main>
  );
};

export default editSettingPage;
