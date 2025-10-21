import React, { useState, useEffect, ReactNode } from "react";
import RichEditor from "@/components/RichEditor";
import ReadOnly from "@/components/RichEditor/ReadOnly";
import type { SkillOption } from "@/types";

interface FormData {
  [name: string]: string;
}

interface TextInputProps {
  label: string;
  inputName: string;
  inputValue: string;
  onUpdate: (data: FormData) => void;
  popupBtnMenu?: ReactNode;
  postingSkills?: SkillOption[];
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  inputName,
  inputValue,
  onUpdate,
  popupBtnMenu,
  postingSkills,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>(inputValue);

  const handleUpdate = (textString: string): void => {
    onUpdate({ [inputName]: textString });
  };

  const updateText = (textString: string): void => {
    if (textString !== inputValue) {
      handleUpdate(textString);
    }
    setText(textString);
  };

  const handleSubmit = (): void => {
    if (inputValue !== text) {
      handleUpdate(text);
    }
    setEdit(false);
  };

  useEffect((): void => {
    let newText = inputValue;
    if (postingSkills && !!postingSkills.length) {
      postingSkills.forEach((skill) => {
        const regex = new RegExp(
          `\\b(${skill.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`,
          "gi"
        );

        newText = newText.replace(regex, (match) => {
          const isHighlighted = newText.indexOf(`${match}</mark>`);

          if (isHighlighted > -1) {
            return match;
          } else {
            return `<mark style="background-color: #FAF594">${match}</mark>`;
          }
        });
      });
    }
    setText(newText);
  }, [inputValue, postingSkills]);

  return (
    <div
      id={`${inputName}-text-input`}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        setHover(true);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        // setHover(false);
      }}
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
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                e.stopPropagation();
                handleSubmit();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 m-2 hover:size-5 hover:cursor-pointer hover:text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="hover:cursor-text">
        {edit ? (
          <div>
            <RichEditor
              content={text}
              onTextChange={updateText}
              popupBtnMenu={popupBtnMenu}
            />
          </div>
        ) : (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
              e.stopPropagation();
              setEdit(true);
            }}
          >
            <ReadOnly content={text} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
