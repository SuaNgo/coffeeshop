"use client";
import { Layout } from "@/components";

import SettingsForm from "@/components/Settings/SettingForm";

const NewProducts = () => {
  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[28px]">Thêm tài khoản</h1>
        <SettingsForm />
      </Layout>
    </main>
  );
};

export default NewProducts;
