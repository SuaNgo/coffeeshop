import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CategoryForm = ({
  _id,
  name: existingName,
  parentCategory: existingParentCategory,
}) => {
  const [name, setName] = useState(existingName || "");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState(
    existingParentCategory || ""
  );

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const createCategory = async (e) => {
    e.preventDefault();
    const category = {
      name,
      parentCategory,
    };
    if (_id) {
      await axios.put("/api/categories", { ...category, _id });
    } else {
      await axios.post("/api/categories", category);
    }

    router.push("/categories");
  };

  return (
    <>
      <form onSubmit={createCategory}>
        <label className="max-[425px]:text-[20px] text-[24px] font-title font-medium">
          Phân loại
        </label>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <select
            onChange={(e) => setParentCategory(e.target.value)}
            value={parentCategory}
            className="w-[300px] border-2 border-gray-500 rounded-lg py-2 px-3 mb-2"
          >
            <option value="">None</option>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex gap-1">
          {_id ? (
            <>
              <button
                type="submit"
                className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
              >
                Sửa
              </button>
              <button
                type="button"
                onClick={() => router.push("/categories")}
                className="text-[20px] p-1 text-center border-gray-400 bg-gray-400 border-2 rounded-md font-bold mt-2 ml-4"
              >
                Quay lại
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
              >
                Thêm
              </button>
              <button
                type="button"
                onClick={() => router.push("/categories")}
                className="text-[20px] p-1 text-center border-gray-400 bg-gray-400 border-2 rounded-md font-bold mt-2 ml-4"
              >
                Quay lại
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
