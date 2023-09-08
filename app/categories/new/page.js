"use client";
import { Layout } from "@/components";
import CategoryForm from "@/components/Categories/CategoryForm";

const NewCategories = () => {
  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[40px] leading-10 font-title font-semibold mt-2 mb-8 max-[1024px]:mt-20">
          Thêm phân loại sản phẩm
        </h1>
        <CategoryForm />
      </Layout>
    </main>
  );
};

export default NewCategories;
