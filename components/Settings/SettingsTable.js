import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";
import { useState } from "react";
import Link from "next/link";
const SettingsTable = ({ data, setUpdateDatas }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex w-[50%] justify-between" key={data._id}>
        <h1>{data.username}</h1>
        <div className="flex gap-8">
          <Link className="btn-default" href={`/settings/edit/` + data._id}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </Link>
          <button
            className="btn-red"
            href={"/settings/delete/" + data._id}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
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
