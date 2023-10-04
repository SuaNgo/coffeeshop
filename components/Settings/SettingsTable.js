import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const SettingsTable = ({ data, setUpdateDatas }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const roleCheck = session?.user.role === "admin";
  return (
    <>
      <div className="flex justify-between mb-4" key={data._id}>
        <h1 className="max-[425px]:text-[20px] text-[24px] font-title font-medium">
          {data.username}
        </h1>
        {roleCheck && (
          <div className="flex gap-8">
            <Link
              className="max-[425px]:text-[16px]  text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white"
              href={`/settings/edit/` + data._id}
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </Link>
            <button
              className="max-[425px]:text-[16px] text-center p-1 text-[20px] border-red-600 border-2 rounded-md font-bold"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </div>
        )}
      </div>
      {isOpen ? (
        <Popup
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          id={data._id}
          setUpdateDatas={setUpdateDatas}
          type="setting"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SettingsTable;
