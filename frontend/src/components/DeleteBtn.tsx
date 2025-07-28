import { useState } from "react";
import type { Application } from "@/types";

interface Props {
  application: Partial<Application>;
  onRemove: () => void;
}

function DeleteBtn({ application, onRemove }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md align-sub text-red-600 m-1 p-1 hover:bg-red-100 hover:cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      {showModal && (
        <div
          id="default-modal"
          className="backdrop-brightness-50 overflow-auto fixed z-50 w-full md:inset-0"
        >
          <div className="bg-white p-4 w-2xl rounded-lg m-auto mt-100 text-center">
            <div className="items-center justify-between p-1 border-b border-slate-300 rounded-t">
              <div className="text-lg">
                <span>{"Are you sure you want to"}</span>
                <span className="font-bold text-red-500">{" delete "}</span>
                <span>{"your application at"}</span>
              </div>
              <div className="text-lg">
                <span className="font-bold text-xl text-purple-400">
                  {application.company}
                </span>
                <span>{" for the"}</span>
                <span className="font-bold"> {application.title}</span>
                <span> {" position?"}</span>
              </div>
            </div>
            <div className="h-full justify-self-end">
              <button
                type="button"
                className="rounded-md bg-gray-400 text-white m-2 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-red-500 text-white m-2 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-white hover:text-red-500 hover:border hover:border-red-500 hover:"
                onClick={() => {
                  onRemove();
                  setShowModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteBtn;
