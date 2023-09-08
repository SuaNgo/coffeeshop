import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";
import { useState } from "react";
import Link from "next/link";
const ProductsTable = ({ data, setUpdateDatas }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="grid grid-cols-5 mb-8 shadow-xl rounded-xl border "
        key={data._id}
      >
        <div className="col-span-1">
          <img
            src={data.images[0]}
            className="w-[200px] h-[200px] object-contain"
          />
        </div>
        <div className="flex flex-col col-span-2 p-4">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            {data.product}
          </h1>
          <h1 className="max-[425px]:text-[16px] text-[20px] font-title font-normal mb-4">
            {data.description}
          </h1>
        </div>

        <div className="flex flex-col justify-between p-4 max-[768px]:col-span-2 max-[425px]:px-1">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium">
            {data.price} <span className="font-bold">VND</span>
          </h1>
          <div className="flex flex-col gap-2">
            <Link
              className="max-[425px]:text-[16px]  text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white"
              href={`/products/edit/` + data._id}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span className="ml-4">Edit</span>
            </Link>
            <button
              className="max-[425px]:text-[16px] text-center p-1 text-[20px] border-red-600 border-2 rounded-md font-bold"
              href={"/products/delete/" + data._id}
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
          id={data._id}
          setUpdateDatas={setUpdateDatas}
          type="product"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductsTable;
