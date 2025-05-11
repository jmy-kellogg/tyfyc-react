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

  const handleSubmit = (
    e: SyntheticEvent<HTMLFormElement | HTMLInputElement>
  ) => {
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
      <div
        className="flex justify-center w-max"
        onClick={(e) => {
          e.stopPropagation();
          setEdit(!edit);
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {edit || hover ? (
          <form className="flex" onSubmit={handleSubmit}>
            <input
              id={inputName}
              name={inputName}
              placeholder={label}
              type="text"
              className="w-min m-1 rounded-md bg-white p-1 h-min text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData[inputName]}
              onChange={onChangeData}
              onBlur={handleSubmit}
            />
          </form>
        ) : (
          <>
            <span className="flex">
              <p>{inputValue || label}</p>
            </span>
          </>
        )}
      </div>
    </>
  );
}

export default Input;
