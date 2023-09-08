import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";
import { useState } from "react";
import Link from "next/link";

const CategoriesTable = ({ category, setUpdateDatas }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="grid grid-cols-6 mb-8 shadow-xl rounded-xl border "
        key={category._id}
      >
        <div className="col-span-2 p-4 ">
          <span className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            {category.name}
          </span>
        </div>
        <div className="col-span-2 p-4">
          <span className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            {category?.parentCategory?.name}
          </span>
        </div>

        <div className="flex flex-col justify-between p-4 max-[768px]:col-span-2 max-[425px]:px-1">
          <div className="flex flex-col gap-2">
            <Link
              className="max-[425px]:text-[16px]  text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white"
              href={`/categories/edit/` + category._id}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span className="ml-4">Edit</span>
            </Link>
            <button
              className="max-[425px]:text-[16px] text-center p-1 text-[20px] border-red-600 border-2 rounded-md font-bold"
              href={"/categories/delete/" + category._id}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
              <span className="ml-4">Delete</span>
            </button>
          </div>
        </div>
      </div>
      {isOpen ? (
        <Popup
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          id={category._id}
          setUpdateDatas={setUpdateDatas}
          type="categories"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CategoriesTable;
