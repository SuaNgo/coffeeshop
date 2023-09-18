import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const OrdersTable = ({ data, setUpdateDatas }) => {
  const [isOpen, setIsOpen] = useState(false);
  const propData =
    data.line_items[0].price_data.product_data.description.split(",");
  const dupeData = {};
  propData.forEach((element) => {
    dupeData[element] = (dupeData[element] || 0) + 1;
  });
  const { data: session } = useSession();
  const roleCheck = session?.user.role === "admin";
  return (
    <>
      <div className="grid grid-cols-5 mb-8 shadow-xl rounded-xl border ">
        <div className="col-span-1 p-4">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            Mã đơn
          </h1>
          <h1 className="max-[425px]:text-[16px] text-[20px] font-title font-medium mb-4 break-words">
            {data._id}
          </h1>
        </div>
        <div className="flex flex-col col-span-2 p-4">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            Thông tin đơn hàng
          </h1>
          <h1 className="max-[425px]:text-[16px] text-[20px] font-title font-medium mb-4">
            Tên sản phẩm:{" "}
            <span className="text-gray-400 font-bold">
              {data.line_items[0].price_data.product_data.name}
            </span>
          </h1>
          <h1 className="max-[425px]:text-[16px] text-[20px] font-title font-medium mb-4">
            Loại:{" "}
            <span className="text-gray-400 font-bold">
              <div className="flex flex-row gap-10">
                <div className="flex flex-col">
                  {Object.keys(dupeData).map((key, index) => (
                    <div key={index}>{key}</div>
                  ))}
                </div>
                <div className="flex flex-col ">
                  {Object.values(dupeData).map((value, index) => (
                    <div key={index}>x{value}</div>
                  ))}
                </div>
              </div>
            </span>
          </h1>
          <h1 className="max-[425px]:text-[16px] text-[20px] font-title font-medium mb-4">
            Trạng thái đơn hàng <br />
            {data.status === "paid-delivering" ? (
              <>
                <span className="text-gray-400 font-bold">
                  Hàng đã thanh toán - chờ giao hàng
                </span>
              </>
            ) : data.status === "paid-delivered" ? (
              <>
                <span className="text-gray-400 font-bold">
                  Hàng đã thanh toán -{" "}
                  <span className="text-green-500 font-bold">đã giao hàng</span>
                </span>
              </>
            ) : data.status === "paid-refund" ? (
              <>
                <span className="text-gray-400 font-bold">
                  Hàng đã thanh toán - chờ hoàn tiền
                </span>
              </>
            ) : data.status === "paid-refunded" ? (
              <>
                <span className="text-gray-400 font-bold">
                  Hàng đã thanh toán -{" "}
                  <span className="text-green-500 font-bold">đã hoàn tiền</span>
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-400 font-bold">
                  Hàng đã thanh toán chờ xác nhận
                </span>
              </>
            )}
          </h1>
          <h1 className="max-[425px]:text-[16px] text-[20px] font-title font-medium mb-4">
            Nhân viên giao dịch:{" "}
            <span className="text-gray-400 font-bold">{data.employee}</span>
          </h1>
        </div>

        <div className="flex flex-col p-4 max-[1024px]:col-span-2 max-[425px]:px-1">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            Thanh toán:{" "}
            <span className="font-bold text-red-600">
              {(
                data.line_items[0].price_data.unit_amount *
                data.line_items[0].quantity
              )
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              <span>&#8363;</span>
            </span>
          </h1>

          <div className="flex flex-col gap-2">
            {roleCheck && (
              <button
                className="max-[425px]:text-[16px] text-center p-1 text-[20px] border-red-600 border-2 rounded-md font-bold"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span className="ml-4">Delete</span>
              </button>
            )}
            <Link
              className="max-[425px]:text-[16px] text-center p-1 text-[20px] border-red-600 border-2 rounded-md font-bold"
              href={`/orders/edit/` + data._id}
            >
              <FontAwesomeIcon icon={faCheckToSlot} />
              <span className="ml-4">Kiểm tra đơn hàng</span>
            </Link>
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
