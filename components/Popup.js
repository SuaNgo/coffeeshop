"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const Popup = ({ isOpen, closeModal, id, setUpdateDatas, type }) => {
  const deleteObject = async () => {
    if (type === "product") await axios.delete("/api/products?id=" + id);
    else if (type === "categories")
      await axios.delete("/api/categories?id=" + id);
    else if (type === "setting") await axios.delete("/api/settings?id=" + id);
    setUpdateDatas(true);
    closeModal();
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className="flex min-h-full items-center justify-center 
            text-center p-4 "
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-hidden transform rounded-2xl bg-white text-center shadow-xl transition-all p-4">
                  <h1 className="text-[24px]">Do you want to delete</h1>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button
                      className="bg-red-600 py-1 px-5 rounded-xl text-white"
                      onClick={deleteObject}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-gray-300 py-1 px-5 rounded-xl"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Popup;
