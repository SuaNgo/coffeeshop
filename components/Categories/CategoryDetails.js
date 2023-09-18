import { useEffect } from "react";
import axios from "axios";

const CategoryDetails = ({ data, children }) => {
  console.log(data, children);

  return (
    <>
      <div
        className="grid grid-cols-6 mb-8 shadow-xl rounded-xl border "
        key={data._id}
      >
        <div className="col-span-2 p-4 ">
          <span className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            {data.name}
          </span>
        </div>
        <div className="col-span-2 p-4">
          <span className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            {data?.parentCategory?.name}
          </span>
        </div>

        <div className="flex flex-col justify-between p-4 max-[768px]:col-span-2 max-[425px]:px-1">
          {children?.map((child) => (
            <>
              <h1 key={child._id}>{child.product}</h1>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryDetails;
