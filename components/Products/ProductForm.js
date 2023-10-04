"use client";

import {
  faPaperclip,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import DialogModal from "../Dialog";

const ProductForm = ({
  _id,
  product: existingProduct,
  properties: existingProperties,
  category: existingCategory,
  images: existingImage,
  description: existingDescription,
  price: existingPrice,
  discount: existingDiscount,
  quantity: existingQuantity,
}) => {
  const [product, setProduct] = useState(existingProduct || "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(
    existingProperties || ""
  );
  const [images, setImage] = useState(existingImage || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(existingDiscount || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories?product=").then((res) => {
      setCategories(res.data);
    });
  }, []);
  const createProduct = async (e) => {
    e.preventDefault();

    const products = {
      product,
      category,
      properties: productProperties,
      description,
      price,
      images,
      discount,
      quantity,
    };
    if (_id) {
      axios.put("/api/products", { ...products, _id });
    } else {
      axios.post("/api/products", products);
    }
    setTimeout(() => {
      router.push("/products");
    }, 2000);
  };

  const uploadImage = async (e) => {
    const files = [...e.target.files];
    const data = new FormData();
    setIsLoading(true);
    files.forEach((file) => data.append("file", file));

    const res = await axios.post("/api/images", data);
    setImage((existingImage) => {
      return [...existingImage, ...res.data];
    });
    setIsLoading(false);
  };

  const removeImage = async (e, link) => {
    e.preventDefault();
    setImage((currentImage) => {
      return currentImage.filter((val) => val !== link);
    });
  };

  return (
    <form onSubmit={createProduct}>
      <label className="text-gray-600 text-[20px] font-title font-normal">
        <span className="text-gray-600 text-[20px] font-title font-medium">
          Tên sản phẩm
        </span>
        <input
          name="product"
          required
          type="text"
          placeholder="Sản phẩm"
          value={product}
          onChange={(e) => {
            setProduct(e.target.value);
          }}
        />
      </label>
      <label className="text-gray-600 text-[20px] font-title font-normal">
        <span className="text-gray-600 text-[20px] font-title font-medium">
          Phân loại sản phẩm
        </span>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">None</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </label>
      <div className="mt-2">
        <label className="text-gray-600 text-[20px] font-title font-normal">
          <span className="text-gray-600 text-[20px] font-title font-medium">
            Mẫu mã, chủng loại
          </span>
          <textarea
            type="text"
            placeholder="cách nhau dấu phẩy, không khoảng trắng"
            value={productProperties}
            onChange={(e) => {
              setProductProperties(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="mt-2">
        <label className="text-gray-600 text-[20px] font-title font-normal">
          <span className="text-gray-600 text-[20px] font-title font-medium">
            Hình ảnh sản phẩm
          </span>
          <div className="my-2 flex gap-2">
            {images?.length > 0 &&
              images.map((link) => (
                <a
                  href={link}
                  target="_blank"
                  key={link}
                  className="h-24 bg-white shadow-sm rounded-sm relative"
                >
                  <button
                    onClick={(e) => removeImage(e, link)}
                    className="w-6 h-6 leading-4 text-[16px] rounded-md absolute -right-2 -top-2 text-white bg-red-500"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  {/\.(jpg|jpeg|png|webp|avif|gif)$/.test(link) ? (
                    <img src={link} alt="" className="h-20 rounded-md" />
                  ) : (
                    <div className="bg-gray-200 h-20 p-2 rounded-md flex items-center gap-1">
                      <FontAwesomeIcon icon={faPaperclip} />
                      {link.split("/")[3].substring(13)}
                    </div>
                  )}
                </a>
              ))}

            <label className="w-20 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary bg-white shadow-xl border-2 border-primary rounded-md">
              {isLoading ? (
                <>
                  <ClipLoader size={18} />
                  <div>Dang tai...</div>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUpload} />
                  <div>Add image</div>
                </>
              )}

              <input
                multiple
                type="file"
                onChange={uploadImage}
                className="hidden"
              />
            </label>
          </div>
        </label>
      </div>
      <div className="mt-2">
        <label className="text-gray-600 text-[20px] font-title font-normal">
          <span className="text-gray-600 text-[20px] font-title font-medium">
            Miêu tả sản phẩm
          </span>
          <textarea
            type="text"
            placeholder="Miêu tả"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <label className="text-gray-600 text-[20px] font-title font-normal">
          <span className="text-gray-600 text-[20px] font-title font-medium">
            Giá sản phẩm(VND)
          </span>
          <input
            type="number"
            placeholder="Giá sản phẩm"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </label>
        <label className="text-gray-600 text-[20px] font-title font-normal">
          <span className="text-gray-600 text-[20px] font-title font-medium">
            Giảm giá
          </span>
          <input
            type="number"
            placeholder="Giảm giá(%)"
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label className="text-gray-600 text-[20px] font-title font-normal">
          <span className="text-gray-600 text-[20px] font-title font-medium">
            Số lượng hàng
          </span>
          <input
            type="number"
            placeholder="Số lượng sản phẩm"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </label>
      </div>

      {_id ? (
        <>
          <button
            type="submit"
            className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
            onClick={() => setIsOpen(true)}
          >
            Sửa sản phẩm
          </button>
          <button
            onClick={() => router.push("/products")}
            className="text-[20px] p-1 text-center border-2 border-gray-400 rounded-md font-bold text-white mt-2 bg-gray-400 ml-4"
          >
            Quay lại
          </button>
        </>
      ) : (
        <>
          <button
            type="submit"
            className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
            // onClick={() => setIsOpen(true)}
          >
            Thêm sản phẩm
          </button>
          <button
            onClick={() => router.push("/products")}
            className="text-[20px] p-1 text-center border-2 border-gray-400 rounded-md font-bold text-white mt-2 bg-gray-400 ml-4"
          >
            Quay lại
          </button>
        </>
      )}
      {isOpen ? (
        <DialogModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : (
        <></>
      )}
    </form>
  );
};

export default ProductForm;
