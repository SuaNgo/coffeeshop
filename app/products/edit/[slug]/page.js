"use client";

import { Layout } from "@/components";
import ProductForm from "@/components/Products/ProductForm";
import axios from "axios";
import { useEffect, useState } from "react";

const editProductPage = ({ params }) => {
  const [productInfo, setProductInfo] = useState(null);
  const { slug } = params;
  useEffect(() => {
    if (!slug) {
      return;
    }
    axios.get("/api/products?id=" + slug).then((response) => {
      setProductInfo(response.data);
    });
  }, [slug]);

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[40px] leading-10 font-title font-semibold mt-2 mb-8 max-[1024px]:mt-20">
          Sửa sản phẩm
        </h1>
        {productInfo && <ProductForm {...productInfo} />}
      </Layout>
    </main>
  );
};

export default editProductPage;
