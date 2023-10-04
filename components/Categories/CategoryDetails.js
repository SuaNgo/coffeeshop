const CategoryDetails = ({ data, children }) => {
  console.log(data);

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
        <div className="flex flex-col justify-between p-4 col-span-4 max-[768px]:col-span-2 max-[425px]:px-1">
          <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium mb-4">
            Sản phẩm
          </h1>
          <div className="grid grid-cols-2">
            {children?.map((child) => (
              <>
                <p
                  className="max-[425px]:text-[16px] text-[20px] text-gray-400 font-title font-medium mb-4"
                  key={child._id}
                >
                  {child.product}
                </p>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDetails;
