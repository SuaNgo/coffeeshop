"use client";
import { Layout } from "@/components";

import ProductForm from "@/components/Products/ProductForm";

const NewProducts = () => {
  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[40px] leading-10 font-title font-semibold mt-2 mb-8 max-[1024px]:mt-20">
          Thêm sản phẩm
        </h1>
        <ProductForm />
      </Layout>
    </main>
  );
};

export default NewProducts;
