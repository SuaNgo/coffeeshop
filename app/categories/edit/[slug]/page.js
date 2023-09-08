"use client";

import { Layout } from "@/components";
import CategoryForm from "@/components/Categories/CategoryForm";
import axios from "axios";
import { useEffect, useState } from "react";

const editCategoryPage = ({ params }) => {
  const [categoryInfo, setCategoryInfo] = useState(null);
  const { slug } = params;
  useEffect(() => {
    if (!slug) {
      return;
    }
    axios.get("/api/categories?id=" + slug).then((response) => {
      setCategoryInfo(response.data);
    });
  }, [slug]);

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[40px] leading-10 font-title font-semibold mt-2 mb-8 max-[1024px]:mt-20">
          Sửa phân loại sản phẩm
        </h1>
        {categoryInfo && <CategoryForm {...categoryInfo} />}
      </Layout>
    </main>
  );
};

export default editCategoryPage;
