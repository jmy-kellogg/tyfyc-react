import React, { useState, ChangeEvent, MouseEvent } from "react";
import { getFormattedDate } from "@utils";

interface FormData {
  [name: string]: string;
}

interface DateInputProps {
  inputName: string;
  inputValue: string;
  onUpdate: (data: FormData) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  inputName,
  inputValue,
  onUpdate,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const onChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    onUpdate({ [e.target.name]: e.target.value });
    setEdit(false);
    setHover(false);
  };

  return (
    <>
      <div className="flex justify-center w-max">
        {edit ? (
          <div className="flex w-full">
            <input
              id={inputName}
              name={inputName}
              type="date"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={inputValue}
              onChange={onChangeData}
            />

            <div className="block">
              <button
                onClick={(e: MouseEvent<HTMLButtonElement>): void => {
                  e.stopPropagation();
                  setEdit(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 m-2 hover:size-5 hover:cursor-pointer hover:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              className="hover:cursor-pointer mx-1"
              onClick={(e: MouseEvent<HTMLButtonElement>): void => {
                e.stopPropagation();
                setEdit(true);
              }}
              onMouseOver={(): void => setHover(true)}
              onMouseOut={(): void => setHover(false)}
            >
              <div className="flex">
                <p> {getFormattedDate(inputValue)} </p>
                {hover && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                )}
              </div>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DateInput;
