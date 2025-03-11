import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getFormattedDate, divider } from "@utils";

import { setEducation, addNewEdu, removeEdu } from "@/reducers/educationSlice";
import type { State } from "@store";
import type { Education, EducationList } from "@types";

function Education() {
  const dispatch = useDispatch();
  const eduList: EducationList = useSelector((state: State) => state.education);
  const [hover, setHover] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const saveEducation = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newEdu = [...eduList];
    const edu = newEdu[index];
    newEdu[index] = {
      ...edu,
      ...{ [e.target.name]: e.target.value },
    };
    dispatch(setEducation(newEdu));
  };

  const addNew = () => {
    dispatch(addNewEdu());
  };

  const remove = (index: number) => {
    dispatch(removeEdu(index));
  };

  return (
    <>
      <div
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        <h2>
          <b>Education </b>
          {showAdd && (
            <button
              type="button"
              className="float-right rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={addNew}
            >
              Add Job
            </button>
          )}
        </h2>
        {eduList.map((edu: Education, index: number) => (
          <div
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === index ? (
              <div className="my-3">
                <div className="flex">
                  <input
                    id="school"
                    name="school"
                    type="text"
                    placeholder="School"
                    className="w-50 rounded-md bg-white m-1 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={edu.school}
                    onChange={(e) => saveEducation(e, index)}
                  />
                  <input
                    id="grad-year"
                    name="gradYear"
                    type="month"
                    placeholder="Graduated Date"
                    className="w-50 rounded-md bg-white m-1 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={edu.gradYear}
                    onChange={(e) => saveEducation(e, index)}
                  />
                  <button
                    type="button"
                    className="rounded-md align-sub text-red-600 m-1 p-1 hover:bg-red-100 hover:cursor-pointer"
                    onClick={() => remove(index)}
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
                </div>
                <div className="w-110 m-1">
                  <input
                    id="degree"
                    name="degree"
                    type="text"
                    placeholder="Degree"
                    className="rounded-md w-full bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={edu.degree}
                    onChange={(e) => saveEducation(e, index)}
                  />
                </div>
              </div>
            ) : (
              <div className="body-sub-section">
                <p>
                  {edu.school ||
                    "New School" +
                      " - " +
                      getFormattedDate(edu.gradYear, {
                        month: "short",
                        year: "numeric",
                      })}
                </p>
                <p>{edu.degree || "Degree"}</p>
              </div>
            )}
            <p className="divider">{divider()}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Education;
