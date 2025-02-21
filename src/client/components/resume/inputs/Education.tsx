import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateEducation,
  addNewEdu,
  removeEdu,
} from "../../../store/reducers/educationSlice";

import type { Education, EducationList } from "../../../../types";
import type { State } from "../../../store";

function Education() {
  const eduList: EducationList = useSelector(
    (state: State) => state.education.list
  );
  const dispatch = useDispatch();

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
    dispatch(updateEducation(newEdu));
  };

  const addNew = () => {
    dispatch(addNewEdu());
  };

  const remove = (index: number) => {
    dispatch(removeEdu(index));
  };

  return (
    <>
      <div className="sm:col-span-4">
        <h2>
          <b>Education </b>
        </h2>
        {eduList.map((school: Education, index: number) => (
          <div className="sm:col-span-4" key={index}>
            <label className="block text-sm/6 font-medium">Degree</label>
            <input
              id="degree"
              name="degree"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={school.degree}
              onChange={(e) => saveEducation(e, index)}
            />

            <label className="block text-sm/6 font-medium">School</label>
            <input
              id="school"
              name="school"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={school.school}
              onChange={(e) => saveEducation(e, index)}
            />

            <label className="block text-sm/6 font-medium">Graduated</label>

            <input
              id="grad-year"
              name="gradYear"
              type="month"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={school.gradYear}
              onChange={(e) => saveEducation(e, index)}
            />
            <button
              type="button"
              className="rounded-md text-sm/6 my-3 px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 font-semibold shadow-sm hover:bg-indigo-300 outline-1"
              onClick={() => remove(index)}
            >
              Remove {school.school}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="rounded-md bg-indigo-600 my-3 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={addNew}
        >
          Add School
        </button>
      </div>
    </>
  );
}

export default Education;
