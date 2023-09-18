"use client";

import { Layout } from "@/components";
import CategoryDetails from "@/components/Categories/CategoryDetails";
import axios from "axios";
import { useEffect, useState } from "react";

const editCategoryPage = ({ params }) => {
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [childrenInfo, setChildrenInfo] = useState(null);
  const { slug } = params;
  useEffect(() => {
    if (!slug) {
      return;
    }
    axios.get("/api/categories?id=" + slug).then((response) => {
      setCategoryInfo(response.data);
    });
    axios
      .get("/api/products?idCat=" + slug)
      .then((response) => {
        setChildrenInfo(response.data);
      })
      .catch((error) => setChildrenInfo(error));
  }, [slug]);

  return (
    <main className="bg-login h-full w-full">
      <Layout>
        <h1 className="text-[40px] leading-10 font-title font-semibold mt-2 mb-8 max-[1024px]:mt-20">
          Danh mục
        </h1>
        {categoryInfo && (
          <CategoryDetails data={categoryInfo} children={childrenInfo} />
        )}
      </Layout>
    </main>
  );
};

export default editCategoryPage;
