import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";

interface FormData {
  [name: string]: string;
}

interface Props {
  inputName: string;
  inputValue: string;
  label: string;
  linkName: string;
  linkValue: string;
  onUpdate: (data: FormData) => void;
  tag?: "h1" | "h2" | "h3";
}

function InputLink({
  inputName,
  inputValue,
  label,
  linkName,
  linkValue,
  onUpdate,
  tag = "h2",
}: Props) {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    [inputName]: inputValue,
    [linkName]: linkValue,
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
    setFormData({ [inputName]: inputValue, [linkName]: linkValue });
  }, [inputName, inputValue, linkName, linkValue]);

  return (
    <>
      <div className="flex justify-center">
        {edit ? (
          <form className="flex" onSubmit={handleSubmit}>
            <div className="flex w-full">
              <input
                id={inputName}
                name={inputName}
                placeholder={label}
                type="text"
                className="w-100 h-fit m-1 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                value={formData[inputName]}
                onChange={onChangeData}
              />
              <input
                id={linkName}
                name={linkName}
                placeholder="Link"
                type="text"
                className="w-full h-fit m-1 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                value={formData[linkName]}
                onChange={onChangeData}
              />
            </div>
            <div className="flex">
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 m-1 hover:size-5 hover:cursor-pointer hover:text-green-500"
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
                  className="size-4 m-1 hover:size-5 hover:cursor-pointer hover:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </form>
        ) : (
          <>
            <button
              className="hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setEdit(true);
              }}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <span className="flex">
                {tag === "h1" && <h1>{inputValue || label}</h1>}
                {tag === "h2" && <h2>{inputValue || label}</h2>}
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
            {linkValue && (
              <a href={linkValue} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-2 text-gray-400 hover:text-blue-400 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </a>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default InputLink;
