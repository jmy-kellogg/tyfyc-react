import { useState, useEffect } from "react";
import RichEditor from "@/components/RichEditor";
import ReadOnly from "@/components/RichEditor/ReadOnly";
interface FormData {
  [name: string]: string;
}

interface Props {
  label: string;
  inputName: string;
  inputValue: string;
  onUpdate: (data: FormData) => void;
}

function TextInput({ label, inputName, inputValue, onUpdate }: Props) {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onUpdate({ [inputName]: text });
    setEdit(false);
    setHover(false);
  };

  useEffect(() => {
    setText(inputValue);
  }, [inputValue]);

  return (
    <>
      <div
        className="hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setEdit(true);
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <div className="flex">
          <h2 className="block text-sm/6 font-medium">{label}</h2>
          {hover && !edit && (
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
          {edit && (
            <>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 m-2 hover:size-5 hover:cursor-pointer hover:text-green-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit();
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
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
            </>
          )}
        </div>
        <div className="m-3">
          {edit ? (
            <RichEditor content={text} handleTextChange={setText} />
          ) : (
            <ReadOnly content={text} />
          )}
        </div>
      </div>
    </>
  );
}

export default TextInput;
