import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { divider } from "@utils";

import { setPersonal } from "@/reducers/personalSlice";
import type { State } from "@store";

function Title() {
  const dispatch = useDispatch();
  const personal = useSelector((state: State) => state.personal);
  const [hover, setHover] = useState(false);

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch(setPersonal({ [field]: value }));
  };

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <form>
            <div className="flex justify-center">
              <div className="m-1">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="text-center block w-full h-10 rounded-md bg-white px-3 py-1 font-bold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                  value={personal.firstName}
                  onChange={updateData}
                />
              </div>
              <div className="m-1">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="text-center block w-full h-10 rounded-md bg-white px-3 py-1 font-bold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                  value={personal.lastName}
                  onChange={updateData}
                />
              </div>
            </div>
            <div className="m-1 w-100 justify-self-center">
              <input
                id="job-title"
                name="jobTitle"
                type="text"
                placeholder="Target Job Title"
                className="text-center block w-full rounded-md bg-white px-3 py-1 font-bold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.jobTitle}
                onChange={updateData}
              />
            </div>
          </form>
        ) : (
          <div>
            <h1>{personal.firstName + " " + personal.lastName}</h1>
            <h3>{personal.jobTitle}</h3>
          </div>
        )}
      </div>
      <p className="divider">{divider()}</p>
    </>
  );
}

export default Title;
