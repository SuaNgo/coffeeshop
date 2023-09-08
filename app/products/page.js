"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import ProductsTable from "@/components/Products/ProductsTable";

const Products = () => {
  const [productDatas, setProductDatas] = useState([]);
  const [updatedDatas, setUpdateDatas] = useState(true);

  const fetch = () => {
    axios
      .get("/api/products")
      .then((response) => setProductDatas(response.data));
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
              Sản phẩm
            </h1>
            <Link
              className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white"
              href="/products/new"
            >
              Thêm
            </Link>
          </div>

          <div>
            {productDatas.map((data, index) => (
              <ProductsTable
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

export default Products;
