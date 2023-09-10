import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";
import { useState } from "react";

const OrdersTable = ({ data, setUpdateDatas }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-5 mb-8 shadow-xl rounded-xl border ">
        <div className="col-span-1 p-4">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            Mã đơn
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4 break-words">
            {data._id}
          </h1>
        </div>
        <div className="flex flex-col col-span-2 p-4">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            Thông tin đơn hàng
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Tên khách hàng:{" "}
            <span className="text-gray-400 font-bold">{data.name}</span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Email: <span className="text-gray-400 font-bold">{data.email}</span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Thành phố:{" "}
            <span className="text-gray-400 font-bold">{data.city}</span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Mã bưu chính:{" "}
            <span className="text-gray-400 font-bold">{data.postalCode}</span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Quốc gia:{" "}
            <span className="text-gray-400 font-bold">{data.country}</span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Địa chỉ:{" "}
            <span className="text-gray-400 font-bold">
              {data.streetAddress}
            </span>
          </h1>
        </div>

        <div className="flex flex-col p-4 max-[1024px]:col-span-2 max-[425px]:px-1">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            Thanh toán:{" "}
            <span className="font-bold text-red-600">
              {data.line_items[0].price_data.unit_amount *
                data.line_items[0].quantity}{" "}
              VND
            </span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Tên sản phẩm:{" "}
            <span className="text-gray-400 font-bold">
              {data.line_items[0].price_data.product_data.name}
            </span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Loại:{" "}
            <span className="text-gray-400 font-bold">
              {data.line_items[0].price_data.product_data.description}
            </span>
          </h1>
          <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
            Số lượng:{" "}
            <span className="text-gray-400 font-bold">
              {data.line_items[0].quantity}
            </span>
          </h1>
          <div className="flex flex-col gap-2">
            <button
              className="max-[425px]:text-[16px] text-center p-1 text-[20px] border-red-600 border-2 rounded-md font-bold"
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
          type="order"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default OrdersTable;
