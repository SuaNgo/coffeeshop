"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import CategoriesTable from "@/components/Categories/CategoriesTable";

const Categories = () => {
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [updatedDatas, setUpdateDatas] = useState(true);

  const fetch = () => {
    axios
      .get("/api/categories")
      .then((response) => setCategoryDatas(response.data));
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
        <div className="max-[1024px]:mt-20 mt-2">
          <div className="flex justify-between mb-4">
            <h1 className="text-[40px] leading-10 font-title font-semibold">
              Tên danh mục
            </h1>
            <Link
              className="col-span-1 text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white"
              href="/categories/new"
            >
              Thêm
            </Link>
          </div>

          <div className="">
            <div className="grid grid-cols-6">
              <h1 className="col-span-2 text-[20px] font-bold mb-4 font-title">
                Danh mục
              </h1>
              <h1 className="col-span-2 text-[20px] font-bold mb-4 font-title">
                Danh mục cha
              </h1>
            </div>
          </div>
          <div>
            {categoryDatas.map((category, index) => (
              <CategoriesTable
                key={index}
                category={category}
                setUpdateDatas={setUpdateDatas}
              />
            ))}
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Categories;
