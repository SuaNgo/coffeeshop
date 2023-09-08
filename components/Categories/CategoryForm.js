import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CategoryForm = ({
  _id,
  name: existingName,
  parentCategory: existingParentCategory,
  properties: existingProperties,
}) => {
  const [name, setName] = useState(existingName || "");
  const [categories, setCategories] = useState(existingProperties || []);
  const [parentCategory, setParentCategory] = useState(
    existingParentCategory || ""
  );
  const [properties, setProperties] = useState(existingProperties || []);
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
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values,
      })),
    };
    if (_id) {
      await axios.put("/api/categories", { ...category, _id });
    } else {
      await axios.post("/api/categories", category);
    }

    router.push("/categories");
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };
  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };
  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
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
        <div className="mb-2">
          <label className="max-[425px]:text-[20px] text-[24px] font-title font-medium block">
            Đặc điểm
          </label>
          <button
            onClick={addProperty}
            type="button"
            className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
          >
            Thêm miêu tả
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mt-4">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="phân loại (màu sắc, kiểu dáng)"
                />
                <input
                  type="text"
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder='giá trị cách nhau bởi ","'
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="max-[425px]:text-[16px] text-center p-1 text-[20px] border-red-600 border-2 rounded-md font-bold bg-red-600 text-white"
                >
                  Remove
                </button>
              </div>
            ))}
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
