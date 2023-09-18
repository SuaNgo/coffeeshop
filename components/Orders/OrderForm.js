"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const OrderForm = ({
  _id,
  name: existingName,
  email: existingEmail,
  city: existingCity,
  postalCode: existingPostalCode,
  country: existingCountry,
  streetAddress: existingAddress,
  line_items: existingItems,
  status: existingStatus,
  employee: existingEmployee,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const roleCheck = session?.user.role === "admin";
  const [status, setStatus] = useState(existingStatus || "");

  const changeOrder = async (e) => {
    e.preventDefault();
    const order = {
      existingName,
      existingEmail,
      existingCity,
      existingPostalCode,
      existingCountry,
      existingAddress,
      existingItems,
      status,
      employee: session?.user.role,
    };

    await axios.put("/api/orders", { ...order, _id });

    router.push("/orders");
  };
  const propData =
    existingItems[0].price_data.product_data.description.split(",");
  const dupeData = {};
  propData.forEach((element) => {
    dupeData[element] = (dupeData[element] || 0) + 1;
  });

  return (
    <>
      <form onSubmit={changeOrder}>
        <div className="grid grid-cols-5 mb-8 shadow-xl rounded-xl border ">
          <div className="col-span-1 p-4">
            <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
              Mã đơn
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4 break-words">
              {_id}
            </h1>
          </div>
          <div className="flex flex-col col-span-2 p-4">
            <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
              Thông tin đơn hàng
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
              Tên khách hàng:{" "}
              <span className="text-gray-400 font-bold">{existingName}</span>
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
              Email:{" "}
              <span className="text-gray-400 font-bold">{existingEmail}</span>
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
              Thành phố:{" "}
              <span className="text-gray-400 font-bold">{existingCity}</span>
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
              Mã bưu chính:{" "}
              <span className="text-gray-400 font-bold">
                {existingPostalCode}
              </span>
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
              Quốc gia:{" "}
              <span className="text-gray-400 font-bold">{existingCountry}</span>
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
              Địa chỉ:{" "}
              <span className="text-gray-400 font-bold">{existingAddress}</span>
            </h1>
          </div>

          <div className="flex flex-col p-4 col-span-2 max-[425px]:px-1">
            <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
              Thanh toán:{" "}
              <span className="font-bold text-red-600">
                {(
                  existingItems[0].price_data.unit_amount *
                  existingItems[0].quantity
                )
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                <span>&#8363;</span>
              </span>
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
              Tên sản phẩm:{" "}
              <span className="text-gray-400 font-bold">
                {existingItems[0].price_data.product_data.name}
              </span>
            </h1>
            <h1 className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
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

            <div className="flex flex-col gap-2">
              <label className="max-[425px]:text-[20px] text-[20px] font-title font-medium mb-4">
                Trạng thái:
                <select
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  className="focus:outline-none text-[20px] font-title font-thin"
                >
                  <option value={status} hidden selected disabled>
                    {status === "paid-delivering"
                      ? "Thanh toán - Chờ giao hàng"
                      : status === "paid-delivered"
                      ? "Thanh toán - Đã giao hàng"
                      : status === "paid-refund"
                      ? "Thanh toán - Chờ hoàn tiền"
                      : status === "paid-refunded"
                      ? "Thanh toán - Đã hoàn tiền"
                      : "Choose"}
                  </option>
                  <option value="paid-delivering">
                    Thanh toán - Chờ giao hàng
                  </option>
                  <option value="paid-delivered">
                    Thanh toán - Đã giao hàng
                  </option>
                  <option value="paid-refund">
                    Thanh toán - Chờ hoàn tiền
                  </option>
                  <option value="paid-refunded">
                    Thanh toán - Đã hoàn tiền
                  </option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-1">
          {_id && (
            <>
              <button
                type="submit"
                className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
              >
                Sửa
              </button>
              <button
                type="button"
                onClick={() => router.push("/orders")}
                className="text-[20px] p-1 text-center border-2 border-gray-400 rounded-md font-bold text-white mt-2 bg-gray-400 ml-4"
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

export default OrderForm;
