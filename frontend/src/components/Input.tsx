import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";

interface FormData {
  [name: string]: string;
}

interface Props {
  inputName: string;
  inputValue: string;
  label: string;
  onUpdate: (data: FormData) => void;
}

function Input({ inputName, inputValue, label, onUpdate }: Props) {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    [inputName]: inputValue,
  });

  const onChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
    setEdit(false);
    setHover(false);
  };

  useEffect(() => {
    setFormData({ [inputName]: inputValue });
  }, [inputName, inputValue]);

  return (
    <>
      <div className="flex justify-center w-max">
        {edit ? (
          <form className="flex" onSubmit={handleSubmit}>
            <input
              id={inputName}
              name={inputName}
              placeholder={label}
              type="text"
              className="w-max m-1 rounded-md bg-white p-1 h-min text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData[inputName]}
              onChange={onChangeData}
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 hover:size-5 hover:cursor-pointer hover:text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
            <button onClick={() => setEdit(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 hover:size-5 hover:cursor-pointer hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
        ) : (
          <>
            <button
              className="hover:cursor-text mx-1"
              onClick={(e) => {
                e.stopPropagation();
                setEdit(true);
              }}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <span className="flex">
                <p>{inputValue || label}</p>
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
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Input;
